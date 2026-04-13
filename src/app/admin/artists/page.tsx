import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ArtistsList } from './artists-list'

export default async function AdminArtistsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: artists } = await supabase
    .from('artists')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  return (
    <div>
      <AdminPageHeader
        title="アーティスト管理"
        description="所属アーティストの管理"
        createHref="/admin/artists/new"
      />
      <ArtistsList artists={artists ?? []} />
    </div>
  )
}
