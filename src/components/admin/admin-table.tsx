'use client'

import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
  className?: string
}

interface AdminTableProps<T extends { id: string }> {
  data: T[]
  columns: Column<T>[]
  editHref?: (item: T) => string
  onDelete?: (id: string) => void
  emptyMessage?: string
}

export function AdminTable<T extends { id: string }>({
  data,
  columns,
  editHref,
  onDelete,
  emptyMessage = 'データがありません。',
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn('px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider', col.className)}
              >
                {col.label}
              </th>
            ))}
            {(editHref || onDelete) && (
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                操作
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-sm text-gray-700', col.className)}>
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
              {(editHref || onDelete) && (
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {editHref && (
                      <Link
                        href={editHref(item)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        title="編集"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('本当に削除しますか？')) onDelete(item.id)
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="削除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
