import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ContentForm } from './content-form'
import type { Content } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminContentEditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: allArtists } = await supabase.from('artists').select('id, name').order('sort_order')

  let row: Content | null = null
  let linkedArtistIds: string[] = []

  if (id !== 'new') {
    const { data } = await supabase.from('contents').select('*').eq('id', id).single()
    if (!data) notFound()
    row = data
    const { data: links } = await supabase.from('artist_contents').select('artist_id').eq('content_id', id)
    linkedArtistIds = links?.map((l) => l.artist_id) ?? []
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{row ? 'コンテンツ編集' : '新規コンテンツ'}</h1>
      <ContentForm row={row} allArtists={allArtists ?? []} linkedArtistIds={linkedArtistIds} />
    </div>
  )
}
