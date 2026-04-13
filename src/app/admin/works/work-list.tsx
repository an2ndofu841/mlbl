'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminTable } from '@/components/admin/admin-table'
import type { Work } from '@/types/database'
import { WORK_TYPE_LABELS, formatDateShort } from '@/lib/utils'

export function WorkListClient({ rows }: { rows: Work[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('works').delete().eq('id', id)
    router.refresh()
  }

  return (
    <AdminTable
      data={rows}
      columns={[
        {
          key: 'title',
          label: 'タイトル',
          render: (w) => (
            <div>
              <p className="font-medium text-gray-900">{w.title}</p>
              <p className="text-xs text-gray-400">{w.slug}</p>
            </div>
          ),
        },
        {
          key: 'work_type',
          label: '種別',
          render: (w) => WORK_TYPE_LABELS[w.work_type] || w.work_type,
        },
        {
          key: 'event_date',
          label: '日付',
          render: (w) => formatDateShort(w.event_date),
        },
        { key: 'sort_order', label: '順' },
      ]}
      editHref={(w) => `/admin/works/${w.id}`}
      onDelete={handleDelete}
    />
  )
}
