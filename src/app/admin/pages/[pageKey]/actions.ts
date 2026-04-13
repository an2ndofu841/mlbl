'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'

function optionalString(formData: FormData, key: string): string | null {
  const val = formData.get(key)
  if (val == null || typeof val !== 'string') return null
  const t = val.trim()
  return t === '' ? null : t
}

export type SavePageResult = { error: string } | { ok: true }

export async function savePage(formData: FormData): Promise<SavePageResult> {
  const pageKey = optionalString(formData, 'page_key')
  const title = optionalString(formData, 'title')
  if (!pageKey || !title) return { error: 'page_key とタイトルは必須です。' }

  const payload = {
    title,
    body: optionalString(formData, 'body'),
    seo_title: optionalString(formData, 'seo_title'),
    seo_description: optionalString(formData, 'seo_description'),
    og_image_url: optionalString(formData, 'og_image_url'),
    noindex: formData.get('noindex') === 'on',
    canonical_url: optionalString(formData, 'canonical_url'),
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('pages').update(payload).eq('page_key', pageKey)
  if (error) return { error: error.message || '保存に失敗しました。' }

  revalidatePath('/admin/pages')
  revalidatePath('/company')
  revalidatePath('/faq')
  return { ok: true }
}
