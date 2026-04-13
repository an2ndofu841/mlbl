'use client'

import { useRouter } from 'next/navigation'
import { CONTENT_CATEGORY_LABELS } from '@/lib/utils'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { value: 'all', label: 'すべて' },
  ...Object.entries(CONTENT_CATEGORY_LABELS).map(([value, label]) => ({ value, label })),
]

export function ContentFilter({ currentCategory }: { currentCategory: string }) {
  const router = useRouter()

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => {
            const params = new URLSearchParams()
            if (cat.value !== 'all') params.set('category', cat.value)
            router.push(`/contents${params.toString() ? `?${params}` : ''}`)
          }}
          className={cn(
            'px-4 py-2 text-xs font-medium tracking-wide transition-colors',
            currentCategory === cat.value
              ? 'bg-ink text-white'
              : 'bg-surface-alt text-ink-light hover:bg-ink hover:text-white'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
