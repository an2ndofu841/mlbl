import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { NewsForm } from './news-form'
import type { News } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminNewsEditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: allArtists } = await supabase.from('artists').select('id, name').order('sort_order')

  let news: News | null = null
  let linkedArtistIds: string[] = []

  if (id !== 'new') {
    const { data } = await supabase.from('news').select('*').eq('id', id).single()
    if (!data) notFound()
    news = data
    const { data: links } = await supabase.from('artist_news').select('artist_id').eq('news_id', id)
    linkedArtistIds = links?.map((l) => l.artist_id) ?? []
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{news ? `ニュース編集` : '新規ニュース'}</h1>
      <NewsForm news={news} allArtists={allArtists ?? []} linkedArtistIds={linkedArtistIds} />
    </div>
  )
}
