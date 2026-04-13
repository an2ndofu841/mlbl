import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ContactDetail } from './contact-detail'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminContactDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: contact } = await supabase.from('contacts').select('*').eq('id', id).single()
  if (!contact) notFound()

  return (
    <div>
      <Link href="/admin/contacts" className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-block">
        ← 一覧に戻る
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">お問い合わせ詳細</h1>
      <ContactDetail contact={contact} />
    </div>
  )
}
