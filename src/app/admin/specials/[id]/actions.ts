'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ContentStatus, SpecialTemplate } from '@/types/database'

const TEMPLATES: readonly SpecialTemplate[] = ['standard', 'lp', 'feature', 'campaign'] as const
const STATUSES: readonly ContentStatus[] = ['draft', 'published', 'archived'] as const

function isSpecialTemplate(v: string): v is SpecialTemplate {
  return (TEMPLATES as readonly string[]).includes(v)
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

export type SaveSpecialResult = { error: string } | { ok: true }

async function syncArtistSpecials(specialId: string, artistIds: string[]) {
  const supabase = await createServerSupabaseClient()
  await supabase.from('artist_specials').delete().eq('special_id', specialId)
  if (artistIds.length === 0) return null
  return supabase
    .from('artist_specials')
    .insert(artistIds.map((artist_id) => ({ artist_id, special_id: specialId })))
    .then((r) => r.error)
}

function parseOptionalDate(formData: FormData, key: string): string | null {
  const raw = optionalString(formData, key)
  if (!raw) return null
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString()
}

export async function saveSpecial(formData: FormData): Promise<SaveSpecialResult> {
  const title = optionalString(formData, 'title')
  const slug = optionalString(formData, 'slug')
  if (!title || !slug) return { error: 'タイトルとスラッグは必須です。' }

  const existingId = optionalString(formData, 'id')
  const isCreate = !existingId

  const templateRaw = formData.get('template_type')
  const template_type: SpecialTemplate =
    typeof templateRaw === 'string' && isSpecialTemplate(templateRaw) ? templateRaw : 'standard'

  const statusRaw = formData.get('status')
  const status: ContentStatus =
    typeof statusRaw === 'string' && isContentStatus(statusRaw) ? statusRaw : 'draft'

  const artistIds = formData
    .getAll('artist_id')
    .filter((v): v is string => typeof v === 'string' && v.length > 0)

  const payload = {
    slug,
    title,
    subtitle: optionalString(formData, 'subtitle'),
    thumbnail_url: optionalString(formData, 'thumbnail_url'),
    hero_image_url: optionalString(formData, 'hero_image_url'),
    summary: optionalString(formData, 'summary'),
    body: optionalString(formData, 'body'),
    template_type,
    cta_text: optionalString(formData, 'cta_text'),
    cta_url: optionalString(formData, 'cta_url'),
    publish_start_at: parseOptionalDate(formData, 'publish_start_at'),
    publish_end_at: parseOptionalDate(formData, 'publish_end_at'),
    status,
    featured: formData.get('featured') === 'on',
    seo_title: optionalString(formData, 'seo_title'),
    seo_description: optionalString(formData, 'seo_description'),
    og_image_url: optionalString(formData, 'og_image_url'),
  }

  const supabase = await createServerSupabaseClient()

  if (isCreate) {
    const id = randomUUID()
    const { error } = await supabase.from('specials').insert({ ...payload, id })
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistSpecials(id, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  } else {
    const { error } = await supabase.from('specials').update(payload).eq('id', existingId)
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistSpecials(existingId, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  }

  revalidatePath('/admin/specials')
  revalidatePath('/special')
  revalidatePath('/')
  return { ok: true }
}
