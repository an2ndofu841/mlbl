import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { TopSettingsForm } from './top-settings-form'

export default async function AdminTopSettingsPage() {
  const supabase = await createServerSupabaseClient()
  const [{ data: top }, { data: contents }] = await Promise.all([
    supabase.from('top_page_settings').select('*').limit(1).single(),
    supabase.from('contents').select('id, title, slug, status').order('published_at', { ascending: false }).limit(80),
  ])

  if (!top) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">トップページ設定</h1>
      <TopSettingsForm top={top} publishedContents={contents ?? []} />
    </div>
  )
}
