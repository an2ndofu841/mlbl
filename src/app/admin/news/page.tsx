import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { NewsListClient } from './news-list'

export default async function AdminNewsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: rows } = await supabase.from('news').select('*').order('published_at', { ascending: false })

  return (
    <div>
      <AdminPageHeader title="ニュース管理" description="お知らせ・リリース情報" createHref="/admin/news/new" />
      <NewsListClient rows={rows ?? []} />
    </div>
  )
}
