'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ContactCategory } from '@/types/database'

export async function submitContact(formData: FormData) {
  const honeypot = formData.get('website') as string
  if (honeypot) {
    return { success: false, message: 'エラーが発生しました。' }
  }

  const category = formData.get('category') as ContactCategory
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const company = (formData.get('company') as string)?.trim() || null
  const message = (formData.get('message') as string)?.trim()

  if (!category || !name || !email || !message) {
    return { success: false, message: '必須項目を入力してください。' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: '有効なメールアドレスを入力してください。' }
  }

  const validCategories: ContactCategory[] = ['appearance', 'media', 'collaboration', 'audition', 'other']
  if (!validCategories.includes(category)) {
    return { success: false, message: '有効な種別を選択してください。' }
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.from('contacts').insert({
      category,
      name,
      email,
      company,
      message,
    })

    if (error) throw error

    return { success: true, message: '送信が完了しました。' }
  } catch {
    return { success: false, message: '送信に失敗しました。しばらく経ってから再度お試しください。' }
  }
}
