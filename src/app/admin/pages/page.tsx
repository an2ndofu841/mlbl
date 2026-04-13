import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminPageHeader } from '@/components/admin/admin-page-header'

export default async function AdminPagesIndex() {
  const supabase = await createServerSupabaseClient()
  const { data: rows } = await supabase.from('pages').select('page_key, title, updated_at').order('page_key')

  return (
    <div>
      <AdminPageHeader title="固定ページ" description="COMPANY / FAQ など CMS 管理" />
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
        {(rows ?? []).map((p) => (
          <Link
            key={p.page_key}
            href={`/admin/pages/${p.page_key}`}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-medium text-gray-900">{p.title}</p>
              <p className="text-xs text-gray-400">{p.page_key}</p>
            </div>
            <span className="text-sm text-red-600">編集 →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
