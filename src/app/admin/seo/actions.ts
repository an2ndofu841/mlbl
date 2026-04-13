'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'

function optionalString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (val == null || typeof val !== 'string') return null
  const t = val.trim()
  return t === '' ? null : t
}

export type SaveSeoSnippetResult = { error: string } | { ok: true }

export async function saveDefaultOgImage(formData: FormData): Promise<SaveSeoSnippetResult> {
  const default_og_image_url = optionalString(formData, 'default_og_image_url')

  const supabase = await createServerSupabaseClient()
  const { data: row } = await supabase.from('site_settings').select('id').limit(1).single()
  if (!row?.id) return { error: 'site_settings が見つかりません。' }

  const { error } = await supabase.from('site_settings').update({ default_og_image_url }).eq('id', row.id)
  if (error) return { error: error.message || '保存に失敗しました。' }

  revalidatePath('/admin/seo')
  revalidatePath('/', 'layout')
  return { ok: true }
}
