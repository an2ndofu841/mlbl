import Link from 'next/link'
import { Plus } from 'lucide-react'

interface AdminPageHeaderProps {
  title: string
  description?: string
  createHref?: string
  createLabel?: string
}

export function AdminPageHeader({ title, description, createHref, createLabel }: AdminPageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {createHref && (
        <Link
          href={createHref}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {createLabel || '新規作成'}
        </Link>
      )}
    </div>
  )
}
