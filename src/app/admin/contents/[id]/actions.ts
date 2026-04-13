'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ContentCategory, ContentStatus } from '@/types/database'

const CATEGORIES: readonly ContentCategory[] = [
  'interview',
  'column',
  'talk',
  'behind',
  'project',
  'backstage',
  'other',
] as const

const STATUSES: readonly ContentStatus[] = ['draft', 'published', 'archived'] as const

function isContentCategory(v: string): v is ContentCategory {
  return (CATEGORIES as readonly string[]).includes(v)
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

export type SaveContentResult = { error: string } | { ok: true }

async function syncArtistContents(contentId: string, artistIds: string[]) {
  const supabase = await createServerSupabaseClient()
  await supabase.from('artist_contents').delete().eq('content_id', contentId)
  if (artistIds.length === 0) return null
  return supabase
    .from('artist_contents')
    .insert(artistIds.map((artist_id) => ({ artist_id, content_id: contentId })))
    .then((r) => r.error)
}

export async function saveContent(formData: FormData): Promise<SaveContentResult> {
  const title = optionalString(formData, 'title')
  const slug = optionalString(formData, 'slug')
  if (!title || !slug) return { error: 'タイトルとスラッグは必須です。' }

  const existingId = optionalString(formData, 'id')
  const isCreate = !existingId

  const categoryRaw = formData.get('category')
  const category: ContentCategory =
    typeof categoryRaw === 'string' && isContentCategory(categoryRaw) ? categoryRaw : 'other'

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
    author_name: optionalString(formData, 'author_name'),
    featured: formData.get('featured') === 'on',
    template_type: optionalString(formData, 'template_type'),
    published_at,
    status,
    seo_title: optionalString(formData, 'seo_title'),
    seo_description: optionalString(formData, 'seo_description'),
    og_image_url: optionalString(formData, 'og_image_url'),
  }

  const supabase = await createServerSupabaseClient()

  if (isCreate) {
    const id = randomUUID()
    const { error } = await supabase.from('contents').insert({ ...payload, id })
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistContents(id, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  } else {
    const { error } = await supabase.from('contents').update(payload).eq('id', existingId)
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistContents(existingId, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  }

  revalidatePath('/admin/contents')
  revalidatePath('/contents')
  revalidatePath('/')
  return { ok: true }
}
