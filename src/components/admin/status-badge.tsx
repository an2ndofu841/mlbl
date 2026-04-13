import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  published: 'bg-green-50 text-green-700',
  archived: 'bg-yellow-50 text-yellow-700',
  inactive: 'bg-gray-100 text-gray-500',
  graduated: 'bg-purple-50 text-purple-700',
  active: 'bg-green-50 text-green-700',
  closed: 'bg-red-50 text-red-700',
  unread: 'bg-blue-50 text-blue-700',
  read: 'bg-gray-100 text-gray-600',
  replied: 'bg-green-50 text-green-700',
}

const STATUS_LABELS: Record<string, string> = {
  draft: '下書き',
  published: '公開',
  archived: 'アーカイブ',
  inactive: '非アクティブ',
  graduated: '卒業',
  active: '募集中',
  closed: '終了',
  unread: '未読',
  read: '既読',
  replied: '返信済み',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-block px-2 py-0.5 text-xs font-medium rounded', STATUS_STYLES[status] || 'bg-gray-100 text-gray-600')}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}
