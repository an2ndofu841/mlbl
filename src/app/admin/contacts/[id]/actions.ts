'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ContactStatus } from '@/types/database'

const STATUSES: readonly ContactStatus[] = ['unread', 'read', 'replied', 'archived'] as const

function isContactStatus(v: string): v is ContactStatus {
  return (STATUSES as readonly string[]).includes(v)
}

export type UpdateContactResult = { error: string } | { ok: true }

export async function updateContactStatus(formData: FormData): Promise<UpdateContactResult> {
  const id = formData.get('id')
  if (typeof id !== 'string' || !id.trim()) return { error: 'IDがありません。' }

  const statusRaw = formData.get('status')
  const status: ContactStatus =
    typeof statusRaw === 'string' && isContactStatus(statusRaw) ? statusRaw : 'unread'

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('contacts').update({ status }).eq('id', id)
  if (error) return { error: error.message || '更新に失敗しました。' }

  revalidatePath('/admin/contacts')
  revalidatePath(`/admin/contacts/${id}`)
  return { ok: true }
}
