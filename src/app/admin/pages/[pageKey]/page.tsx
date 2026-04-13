import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PageForm } from './page-form'

interface Props {
  params: Promise<{ pageKey: string }>
}

export default async function AdminPageEditPage({ params }: Props) {
  const { pageKey } = await params
  const supabase = await createServerSupabaseClient()
  const { data: row } = await supabase.from('pages').select('*').eq('page_key', pageKey).single()
  if (!row) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">固定ページ: {row.page_key}</h1>
      <PageForm row={row} />
    </div>
  )
}
