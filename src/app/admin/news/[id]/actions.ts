'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ContentStatus, NewsCategory } from '@/types/database'

const NEWS_CATEGORIES: readonly NewsCategory[] = [
  'live',
  'release',
  'goods',
  'media',
  'audition',
  'important',
  'other',
] as const

const STATUSES: readonly ContentStatus[] = ['draft', 'published', 'archived'] as const

function isNewsCategory(v: string): v is NewsCategory {
  return (NEWS_CATEGORIES as readonly string[]).includes(v)
}

function isContentStatus(v: string): v is ContentStatus {
  return (STATUSES as readonly string[]).includes(v)
}

function optionalString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (val == null || typeof val !== 'string') return null
  const t = val.trim()
  return t === '' ? null : t
}

export type SaveNewsResult = { error: string } | { ok: true }

async function syncArtistNews(newsId: string, artistIds: string[]) {
  const supabase = await createServerSupabaseClient()
  await supabase.from('artist_news').delete().eq('news_id', newsId)
  if (artistIds.length === 0) return null
  const { error } = await supabase
    .from('artist_news')
    .insert(artistIds.map((artist_id) => ({ artist_id, news_id: newsId })))
  return error
}

export async function saveNews(formData: FormData): Promise<SaveNewsResult> {
  const title = optionalString(formData, 'title')
  const slug = optionalString(formData, 'slug')
  if (!title || !slug) return { error: 'タイトルとスラッグは必須です。' }

  const existingId = optionalString(formData, 'id')
  const isCreate = !existingId

  const categoryRaw = formData.get('category')
  const category: NewsCategory =
    typeof categoryRaw === 'string' && isNewsCategory(categoryRaw) ? categoryRaw : 'other'

  const statusRaw = formData.get('status')
  const status: ContentStatus =
    typeof statusRaw === 'string' && isContentStatus(statusRaw) ? statusRaw : 'draft'

  const publishedAtRaw = optionalString(formData, 'published_at')
  let published_at: string | null = null
  if (publishedAtRaw) {
    const d = new Date(publishedAtRaw)
    if (!Number.isNaN(d.getTime())) published_at = d.toISOString()
  }

  const artistIds = formData
    .getAll('artist_id')
    .filter((v): v is string => typeof v === 'string' && v.length > 0)

  const payload = {
    slug,
    title,
    excerpt: optionalString(formData, 'excerpt'),
    thumbnail_url: optionalString(formData, 'thumbnail_url'),
    body: optionalString(formData, 'body'),
    category,
    published_at,
    status,
    pinned: formData.get('pinned') === 'on',
    featured: formData.get('featured') === 'on',
    external_url: optionalString(formData, 'external_url'),
    seo_title: optionalString(formData, 'seo_title'),
    seo_description: optionalString(formData, 'seo_description'),
    og_image_url: optionalString(formData, 'og_image_url'),
  }

  const supabase = await createServerSupabaseClient()

  if (isCreate) {
    const id = randomUUID()
    const { error } = await supabase.from('news').insert({ ...payload, id })
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistNews(id, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  } else {
    const { error } = await supabase.from('news').update(payload).eq('id', existingId)
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistNews(existingId, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  }

  revalidatePath('/admin/news')
  revalidatePath('/news')
  revalidatePath('/')
  return { ok: true }
}

export async function deleteNews(id: string): Promise<{ error: string } | { ok: true }> {
  if (!id?.trim()) return { error: 'IDがありません。' }
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('news').delete().eq('id', id)
  if (error) return { error: error.message || '削除に失敗しました。' }
  revalidatePath('/admin/news')
  return { ok: true }
}
