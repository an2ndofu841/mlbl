'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { AuditionStatus } from '@/types/database'

const STATUSES: readonly AuditionStatus[] = ['draft', 'active', 'closed'] as const

function isAuditionStatus(v: string): v is AuditionStatus {
  return (STATUSES as readonly string[]).includes(v)
}

function optionalString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (val == null || typeof val !== 'string') return null
  const t = val.trim()
  return t === '' ? null : t
}

export type SaveAuditionResult = { error: string } | { ok: true }

export async function saveAudition(formData: FormData): Promise<SaveAuditionResult> {
  const title = optionalString(formData, 'title')
  const slug = optionalString(formData, 'slug')
  if (!title || !slug) return { error: 'タイトルとスラッグは必須です。' }

  const existingId = optionalString(formData, 'id')
  const isCreate = !existingId

  const statusRaw = formData.get('status')
  const status: AuditionStatus =
    typeof statusRaw === 'string' && isAuditionStatus(statusRaw) ? statusRaw : 'draft'

  const deadlineRaw = optionalString(formData, 'deadline')
  let deadline: string | null = null
  if (deadlineRaw) {
    const d = new Date(deadlineRaw)
    if (!Number.isNaN(d.getTime())) deadline = d.toISOString()
  }

  const payload = {
    title,
    slug,
    status,
    summary: optionalString(formData, 'summary'),
    body: optionalString(formData, 'body'),
    requirements: optionalString(formData, 'requirements'),
    application_url: optionalString(formData, 'application_url'),
    deadline,
    featured: formData.get('featured') === 'on',
  }

  const supabase = await createServerSupabaseClient()

  if (isCreate) {
    const id = randomUUID()
    const { error } = await supabase.from('auditions').insert({ ...payload, id })
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
  } else {
    const { error } = await supabase.from('auditions').update(payload).eq('id', existingId)
    if (error) {
      if (error.code === '23505') return { error: 'スラッグが既に使用されています。' }
      return { error: error.message || '保存に失敗しました。' }
    }
  }

  revalidatePath('/admin/auditions')
  revalidatePath('/audition')
  return { ok: true }
}
