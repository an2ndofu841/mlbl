import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { WorkForm } from './work-form'
import type { Work } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminWorkEditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: allArtists } = await supabase.from('artists').select('id, name').order('sort_order')

  let row: Work | null = null
  let linkedArtistIds: string[] = []

  if (id !== 'new') {
    const { data } = await supabase.from('works').select('*').eq('id', id).single()
    if (!data) notFound()
    row = data
    const { data: links } = await supabase.from('artist_works').select('artist_id').eq('work_id', id)
    linkedArtistIds = links?.map((l) => l.artist_id) ?? []
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{row ? '実績編集' : '新規実績'}</h1>
      <WorkForm row={row} allArtists={allArtists ?? []} linkedArtistIds={linkedArtistIds} />
    </div>
  )
}
