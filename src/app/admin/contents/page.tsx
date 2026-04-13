import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ContentListClient } from './content-list'

export default async function AdminContentsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: rows } = await supabase.from('contents').select('*').order('published_at', { ascending: false })

  return (
    <div>
      <AdminPageHeader title="コンテンツ管理" description="インタビュー・コラム等" createHref="/admin/contents/new" />
      <ContentListClient rows={rows ?? []} />
    </div>
  )
}
