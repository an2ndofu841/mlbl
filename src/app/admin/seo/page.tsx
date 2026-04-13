import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SeoSettingsForm } from './seo-settings-form'

export default async function AdminSeoPage() {
  const supabase = await createServerSupabaseClient()
  const [{ data: settings }, { data: pages }] = await Promise.all([
    supabase.from('site_settings').select('*').limit(1).single(),
    supabase.from('pages').select('page_key, title, seo_title, noindex').order('page_key'),
  ])

  if (!settings) notFound()

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">SEO設定</h1>
        <p className="text-sm text-gray-500">サイト全体のデフォルト OGP と、固定ページのメタ情報を管理します。</p>
      </div>

      <SeoSettingsForm settings={settings} />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">固定ページの個別SEO</h2>
        <ul className="divide-y divide-gray-100">
          {(pages ?? []).map((p) => (
            <li key={p.page_key} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900">{p.title}</p>
                <p className="text-xs text-gray-400 font-mono">{p.page_key}</p>
                {p.noindex && <span className="text-xs text-amber-600">noindex</span>}
              </div>
              <Link href={`/admin/pages/${p.page_key}`} className="text-sm text-red-600 hover:underline shrink-0">
                編集
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
