'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { WorkType } from '@/types/database'

const TYPES: readonly WorkType[] = ['appearance', 'hosted', 'production', 'tieup', 'media', 'other'] as const

function isWorkType(v: string): v is WorkType {
  return (TYPES as readonly string[]).includes(v)
}

function optionalString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (val == null || typeof val !== 'string') return null
  const t = val.trim()
  return t === '' ? null : t
}

export type SaveWorkResult = { error: string } | { ok: true }

async function syncArtistWorks(workId: string, artistIds: string[]) {
  const supabase = await createServerSupabaseClient()
  await supabase.from('artist_works').delete().eq('work_id', workId)
  if (artistIds.length === 0) return null
  return supabase
    .from('artist_works')
    .insert(artistIds.map((artist_id) => ({ artist_id, work_id: workId })))
    .then((r) => r.error)
}

export async function saveWork(formData: FormData): Promise<SaveWorkResult> {
  const title = optionalString(formData, 'title')
  const slug = optionalString(formData, 'slug')
  if (!title || !slug) return { error: 'タイトルとスラッグは必須です。' }

  const existingId = optionalString(formData, 'id')
  const isCreate = !existingId

  const workTypeRaw = formData.get('work_type')
  const work_type: WorkType =
    typeof workTypeRaw === 'string' && isWorkType(workTypeRaw) ? workTypeRaw : 'other'

  const eventDateRaw = optionalString(formData, 'event_date')
  const event_date = eventDateRaw && /^\d{4}-\d{2}-\d{2}$/.test(eventDateRaw) ? eventDateRaw : null

  const sortOrderRaw = formData.get('sort_order')
  let sort_order = 0
  if (typeof sortOrderRaw === 'string' && sortOrderRaw.trim() !== '') {
    const n = Number.parseInt(sortOrderRaw, 10)
    if (Number.isFinite(n)) sort_order = n
  }

  const artistIds = formData
    .getAll('artist_id')
    .filter((v): v is string => typeof v === 'string' && v.length > 0)

  const payload = {
    title,
    slug,
    thumbnail_url: optionalString(formData, 'thumbnail_url'),
    description: optionalString(formData, 'description'),
    work_type,
    event_date,
    external_url: optionalString(formData, 'external_url'),
    featured: formData.get('featured') === 'on',
    sort_order,
  }

  const supabase = await createServerSupabaseClient()

  if (isCreate) {
    const id = randomUUID()
    const { error } = await supabase.from('works').insert({ ...payload, id })
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistWorks(id, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  } else {
    const { error } = await supabase.from('works').update(payload).eq('id', existingId)
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
    const linkErr = await syncArtistWorks(existingId, artistIds)
    if (linkErr) return { error: linkErr.message || '関連アーティストの保存に失敗しました。' }
  }

  revalidatePath('/admin/works')
  revalidatePath('/works')
  revalidatePath('/')
  return { ok: true }
}
