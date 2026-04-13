'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminTable } from '@/components/admin/admin-table'
import { StatusBadge } from '@/components/admin/status-badge'
import type { Content } from '@/types/database'
import { CONTENT_CATEGORY_LABELS, formatDateShort } from '@/lib/utils'

export function ContentListClient({ rows }: { rows: Content[] }) {
  const router = useRouter()

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('contents').delete().eq('id', id)
    router.refresh()
  }

  return (
    <AdminTable
      data={rows}
      columns={[
        {
          key: 'title',
          label: 'タイトル',
          render: (c) => (
            <div>
              <p className="font-medium text-gray-900">{c.title}</p>
              <p className="text-xs text-gray-400">{c.slug}</p>
            </div>
          ),
        },
        {
          key: 'category',
          label: 'カテゴリ',
          render: (c) => CONTENT_CATEGORY_LABELS[c.category] || c.category,
        },
        { key: 'status', label: '状態', render: (c) => <StatusBadge status={c.status} /> },
        {
          key: 'published_at',
          label: '公開日',
          render: (c) => formatDateShort(c.published_at),
        },
        {
          key: 'featured',
          label: '注目',
          render: (c) => (c.featured ? '★' : '—'),
        },
      ]}
      editHref={(c) => `/admin/contents/${c.id}`}
      onDelete={handleDelete}
    />
  )
}
