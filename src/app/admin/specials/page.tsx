import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { SpecialListClient } from './special-list'

export default async function AdminSpecialsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: rows } = await supabase.from('specials').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <AdminPageHeader title="特設企画" description="SPECIAL ページ用コンテンツ" createHref="/admin/specials/new" />
      <SpecialListClient rows={rows ?? []} />
    </div>
  )
}
