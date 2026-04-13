import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { AuditionListClient } from './audition-list'

export default async function AdminAuditionsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: rows } = await supabase.from('auditions').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <AdminPageHeader title="オーディション管理" description="募集ページの内容" createHref="/admin/auditions/new" />
      <AuditionListClient rows={rows ?? []} />
    </div>
  )
}
