'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'

function optionalString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (val == null || typeof val !== 'string') return null
  const t = val.trim()
  return t === '' ? null : t
}

export type SaveSettingsResult = { error: string } | { ok: true }

export async function saveSiteSettings(formData: FormData): Promise<SaveSettingsResult> {
  const site_name = optionalString(formData, 'site_name')
  if (!site_name) return { error: 'サイト名は必須です。' }

  const payload = {
    site_name,
    site_description: optionalString(formData, 'site_description'),
    default_og_image_url: optionalString(formData, 'default_og_image_url'),
    logo_url: optionalString(formData, 'logo_url'),
    favicon_url: optionalString(formData, 'favicon_url'),
    x_url: optionalString(formData, 'x_url'),
    instagram_url: optionalString(formData, 'instagram_url'),
    tiktok_url: optionalString(formData, 'tiktok_url'),
    youtube_url: optionalString(formData, 'youtube_url'),
    footer_text: optionalString(formData, 'footer_text'),
    contact_email: optionalString(formData, 'contact_email'),
  }

  const supabase = await createServerSupabaseClient()
  const { data: row } = await supabase.from('site_settings').select('id').limit(1).single()
  if (!row?.id) return { error: 'site_settings 行が見つかりません。' }

  const { error } = await supabase.from('site_settings').update(payload).eq('id', row.id)
  if (error) return { error: error.message || '保存に失敗しました。' }

  revalidatePath('/admin/settings')
  revalidatePath('/', 'layout')
  return { ok: true }
}
