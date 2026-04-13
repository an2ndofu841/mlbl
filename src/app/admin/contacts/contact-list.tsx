'use client'

import { AdminTable } from '@/components/admin/admin-table'
import { StatusBadge } from '@/components/admin/status-badge'
import type { Contact } from '@/types/database'
import { CONTACT_CATEGORY_LABELS, formatDate } from '@/lib/utils'

export function ContactListClient({ rows }: { rows: Contact[] }) {
  return (
    <AdminTable
      data={rows}
      columns={[
        {
          key: 'created_at',
          label: '日時',
          render: (c) => formatDate(c.created_at),
        },
        {
          key: 'category',
          label: '種別',
          render: (c) => CONTACT_CATEGORY_LABELS[c.category],
        },
        { key: 'name', label: '名前' },
        { key: 'email', label: 'メール' },
        { key: 'status', label: '状態', render: (c) => <StatusBadge status={c.status} /> },
      ]}
      editHref={(c) => `/admin/contacts/${c.id}`}
    />
  )
}
