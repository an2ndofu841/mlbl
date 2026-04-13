'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminTable } from '@/components/admin/admin-table'
import { StatusBadge } from '@/components/admin/status-badge'
import type { Special } from '@/types/database'
import { SPECIAL_TEMPLATE_LABELS } from '@/lib/utils'

export function SpecialListClient({ rows }: { rows: Special[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('specials').delete().eq('id', id)
    router.refresh()
  }

  return (
    <AdminTable
      data={rows}
      columns={[
        {
          key: 'title',
          label: 'タイトル',
          render: (s) => (
            <div>
              <p className="font-medium text-gray-900">{s.title}</p>
              <p className="text-xs text-gray-400">{s.slug}</p>
            </div>
          ),
        },
        {
          key: 'template_type',
          label: 'テンプレート',
          render: (s) => SPECIAL_TEMPLATE_LABELS[s.template_type] || s.template_type,
        },
        { key: 'status', label: '状態', render: (s) => <StatusBadge status={s.status} /> },
      ]}
      editHref={(s) => `/admin/specials/${s.id}`}
      onDelete={handleDelete}
    />
  )
}
