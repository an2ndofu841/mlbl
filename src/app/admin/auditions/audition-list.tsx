'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminTable } from '@/components/admin/admin-table'
import { StatusBadge } from '@/components/admin/status-badge'
import type { Audition } from '@/types/database'
import { formatDateShort } from '@/lib/utils'

export function AuditionListClient({ rows }: { rows: Audition[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('auditions').delete().eq('id', id)
    router.refresh()
  }

  return (
    <AdminTable
      data={rows}
      columns={[
        {
          key: 'title',
          label: 'タイトル',
          render: (a) => (
            <div>
              <p className="font-medium text-gray-900">{a.title}</p>
              <p className="text-xs text-gray-400">{a.slug}</p>
            </div>
          ),
        },
        {
          key: 'status',
          label: '状態',
          render: (a) => <StatusBadge status={a.status} />,
        },
        {
          key: 'deadline',
          label: '締切',
          render: (a) => formatDateShort(a.deadline),
        },
      ]}
      editHref={(a) => `/admin/auditions/${a.id}`}
      onDelete={handleDelete}
    />
  )
}
