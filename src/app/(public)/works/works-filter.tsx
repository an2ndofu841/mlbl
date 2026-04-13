'use client'

import { useRouter } from 'next/navigation'
import { WORK_TYPE_LABELS } from '@/lib/utils'
import { cn } from '@/lib/utils'

const TYPES = [
  { value: 'all', label: 'すべて' },
  ...Object.entries(WORK_TYPE_LABELS).map(([value, label]) => ({ value, label })),
]

export function WorksFilter({ currentType }: { currentType: string }) {
  const router = useRouter()

  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => {
            const params = new URLSearchParams()
            if (t.value !== 'all') params.set('type', t.value)
            router.push(`/works${params.toString() ? `?${params}` : ''}`)
          }}
          className={cn(
            'px-4 py-2 text-xs font-medium tracking-wide transition-colors',
            currentType === t.value
              ? 'bg-ink text-white'
              : 'bg-surface-alt text-ink-light hover:bg-ink hover:text-white'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
