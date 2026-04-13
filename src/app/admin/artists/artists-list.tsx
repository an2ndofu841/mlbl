'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminTable } from '@/components/admin/admin-table'
import { StatusBadge } from '@/components/admin/status-badge'
import type { Artist } from '@/types/database'

export function ArtistsList({ artists }: { artists: Artist[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('artists').delete().eq('id', id)
    router.refresh()
  }

  return (
    <AdminTable
      data={artists}
      columns={[
        {
          key: 'name',
          label: '名前',
          render: (a) => <span className="font-medium text-gray-900">{a.name}</span>,
        },
        {
          key: 'role',
          label: '肩書き',
          render: (a) => a.role ?? <span className="text-gray-400">—</span>,
        },
        {
          key: 'status',
          label: 'ステータス',
          render: (a) => <StatusBadge status={a.status} />,
        },
        {
          key: 'featured',
          label: '注目',
          render: (a) =>
            a.featured ? (
              <span className="text-amber-600 text-sm font-medium">はい</span>
            ) : (
              <span className="text-gray-400 text-sm">いいえ</span>
            ),
        },
        { key: 'sort_order', label: '表示順' },
      ]}
      editHref={(a) => `/admin/artists/${a.id}`}
      onDelete={handleDelete}
    />
  )
}
