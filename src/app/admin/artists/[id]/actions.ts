'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ArtistStatus } from '@/types/database'

const ARTIST_STATUSES: readonly ArtistStatus[] = [
  'draft',
  'published',
  'inactive',
  'graduated',
] as const

function isArtistStatus(v: string): v is ArtistStatus {
  return (ARTIST_STATUSES as readonly string[]).includes(v)
}

function optionalString(formData: FormData, key: string): string | null {
  const v = formData.get(key)
  if (v == null || typeof v !== 'string') return null
  const t = v.trim()
  return t === '' ? null : t
}

function parseSortOrder(formData: FormData): number {
  const raw = formData.get('sort_order')
  if (raw == null || typeof raw !== 'string' || raw.trim() === '') return 0
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) ? n : 0
}

function parseStatus(formData: FormData): ArtistStatus {
  const raw = formData.get('status')
  if (typeof raw === 'string' && isArtistStatus(raw)) return raw
  return 'draft'
}

export type SaveArtistResult = { error: string } | { ok: true }

export async function saveArtist(formData: FormData): Promise<SaveArtistResult> {
  const name = optionalString(formData, 'name')
  const slug = optionalString(formData, 'slug')
  if (!name || !slug) {
    return { error: '名前とスラッグは必須です。' }
  }

  const existingId = optionalString(formData, 'id')
  const isCreate = !existingId

  const payload = {
    slug,
    name,
    kana: optionalString(formData, 'kana'),
    english_name: optionalString(formData, 'english_name'),
    profile_image_url: optionalString(formData, 'profile_image_url'),
    thumbnail_url: optionalString(formData, 'thumbnail_url'),
    role: optionalString(formData, 'role'),
    short_copy: optionalString(formData, 'short_copy'),
    short_bio: optionalString(formData, 'short_bio'),
    full_bio: optionalString(formData, 'full_bio'),
    group_name: optionalString(formData, 'group_name'),
    member_color: optionalString(formData, 'member_color'),
    x_url: optionalString(formData, 'x_url'),
    instagram_url: optionalString(formData, 'instagram_url'),
    tiktok_url: optionalString(formData, 'tiktok_url'),
    youtube_url: optionalString(formData, 'youtube_url'),
    embed_video_url: optionalString(formData, 'embed_video_url'),
    status: parseStatus(formData),
    featured: formData.get('featured') === 'on',
    sort_order: parseSortOrder(formData),
    seo_title: optionalString(formData, 'seo_title'),
    seo_description: optionalString(formData, 'seo_description'),
    og_image_url: optionalString(formData, 'og_image_url'),
  }

  const supabase = await createServerSupabaseClient()

  if (isCreate) {
    const id = randomUUID()
    const { error } = await supabase.from('artists').insert({ ...payload, id })
    if (error) {
      if (error.code === '23505') return { error: 'このスラッグは既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
  } else {
    const { error } = await supabase.from('artists').update(payload).eq('id', existingId)
    if (error) {
      if (error.code === '23505') return { error: 'このスラッグは既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
  }

  revalidatePath('/admin/artists')
  revalidatePath('/talent')
  revalidatePath('/')
  return { ok: true }
}
