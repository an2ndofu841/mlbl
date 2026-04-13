import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { AuditionForm } from './audition-form'
import type { Audition } from '@/types/database'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminAuditionEditPage({ params }: Props) {
  const { id } = await params
  let row: Audition | null = null

  if (id !== 'new') {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase.from('auditions').select('*').eq('id', id).single()
    if (!data) notFound()
    row = data
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{row ? 'オーディション編集' : '新規オーディション'}</h1>
      <AuditionForm row={row} />
    </div>
  )
}
