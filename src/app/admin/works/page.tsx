import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { WorkListClient } from './work-list'

export default async function AdminWorksPage() {
  const supabase = await createServerSupabaseClient()
  const { data: rows } = await supabase.from('works').select('*').order('sort_order').order('event_date', { ascending: false })

  return (
    <div>
      <AdminPageHeader title="実績管理" description="出演・主催・制作など" createHref="/admin/works/new" />
      <WorkListClient rows={rows ?? []} />
    </div>
  )
}
