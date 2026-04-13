import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ArtistForm } from './artist-form'
import type { Artist } from '@/types/database'

interface AdminArtistFormPageProps {
  params: Promise<{ id: string }>
}

export default async function AdminArtistFormPage({ params }: AdminArtistFormPageProps) {
  const { id } = await params
  const isCreate = id === 'new'

  let artist: Artist | null = null
  if (!isCreate) {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase.from('artists').select('*').eq('id', id).single()
    if (!data) notFound()
    artist = data
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {artist ? `${artist.name} を編集` : '新規アーティスト'}
      </h1>
      <ArtistForm artist={artist} />
    </div>
  )
}
