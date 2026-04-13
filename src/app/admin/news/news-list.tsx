'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminTable } from '@/components/admin/admin-table'
import { StatusBadge } from '@/components/admin/status-badge'
import type { News } from '@/types/database'
import { NEWS_CATEGORY_LABELS, formatDateShort } from '@/lib/utils'

export function NewsListClient({ rows }: { rows: News[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('news').delete().eq('id', id)
    router.refresh()
  }

  return (
    <AdminTable
      data={rows}
      columns={[
        {
          key: 'title',
          label: 'タイトル',
          render: (n) => (
            <div>
              <p className="font-medium text-gray-900">{n.title}</p>
              <p className="text-xs text-gray-400">{n.slug}</p>
            </div>
          ),
        },
        {
          key: 'category',
          label: 'カテゴリ',
          render: (n) => NEWS_CATEGORY_LABELS[n.category] || n.category,
        },
        {
          key: 'status',
          label: '状態',
          render: (n) => <StatusBadge status={n.status} />,
        },
        {
          key: 'published_at',
          label: '公開日',
          render: (n) => formatDateShort(n.published_at),
        },
        {
          key: 'pinned',
          label: 'ピン',
          render: (n) => (n.pinned ? <span className="text-amber-500">📌</span> : '—'),
        },
      ]}
      editHref={(n) => `/admin/news/${n.id}`}
      onDelete={handleDelete}
    />
  )
}
