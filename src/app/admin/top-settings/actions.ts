'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'

function optionalString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (val == null || typeof val !== 'string') return null
  const t = val.trim()
  return t === '' ? null : t
}

export type SaveTopResult = { error: string } | { ok: true }

export async function saveTopPageSettings(formData: FormData): Promise<SaveTopResult> {
  const pickupIds = formData
    .getAll('pickup_content_id')
    .filter((v): v is string => typeof v === 'string' && v.length > 0)

  const payload = {
    hero_title: optionalString(formData, 'hero_title'),
    hero_subtitle: optionalString(formData, 'hero_subtitle'),
    hero_background_url: optionalString(formData, 'hero_background_url'),
    hero_cta_primary_text: optionalString(formData, 'hero_cta_primary_text'),
    hero_cta_primary_url: optionalString(formData, 'hero_cta_primary_url'),
    hero_cta_secondary_text: optionalString(formData, 'hero_cta_secondary_text'),
    hero_cta_secondary_url: optionalString(formData, 'hero_cta_secondary_url'),
    about_intro_title: optionalString(formData, 'about_intro_title'),
    about_intro_text: optionalString(formData, 'about_intro_text'),
    audition_banner_title: optionalString(formData, 'audition_banner_title'),
    audition_banner_text: optionalString(formData, 'audition_banner_text'),
    pickup_content_ids: pickupIds,
  }

  const supabase = await createServerSupabaseClient()
  const { data: row } = await supabase.from('top_page_settings').select('id').limit(1).single()
  if (!row?.id) return { error: 'top_page_settings 行が見つかりません。' }

  const { error } = await supabase.from('top_page_settings').update(payload).eq('id', row.id)
  if (error) return { error: error.message || '保存に失敗しました。' }

  revalidatePath('/admin/top-settings')
  revalidatePath('/')
  return { ok: true }
}
