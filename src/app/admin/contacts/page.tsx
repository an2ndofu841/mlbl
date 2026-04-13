import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ContactListClient } from './contact-list'

export default async function AdminContactsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: rows } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <AdminPageHeader title="お問い合わせ" description="フォーム送信一覧" />
      <ContactListClient rows={rows ?? []} />
    </div>
  )
}
