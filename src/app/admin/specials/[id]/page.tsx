import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SpecialForm } from './special-form'
import type { Special } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminSpecialEditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: allArtists } = await supabase.from('artists').select('id, name').order('sort_order')

  let row: Special | null = null
  let linkedArtistIds: string[] = []

  if (id !== 'new') {
    const { data } = await supabase.from('specials').select('*').eq('id', id).single()
    if (!data) notFound()
    row = data
    const { data: links } = await supabase.from('artist_specials').select('artist_id').eq('special_id', id)
    linkedArtistIds = links?.map((l) => l.artist_id) ?? []
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{row ? '特設企画を編集' : '新規特設企画'}</h1>
      <SpecialForm row={row} allArtists={allArtists ?? []} linkedArtistIds={linkedArtistIds} />
    </div>
  )
}
