import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SiteSettingsForm } from './site-settings-form'

export default async function AdminSettingsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: settings } = await supabase.from('site_settings').select('*').limit(1).single()
  if (!settings) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">共通設定</h1>
      <SiteSettingsForm settings={settings} />
    </div>
  )
}
