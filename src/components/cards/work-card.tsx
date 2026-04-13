import Link from 'next/link'
import type { Work } from '@/types/database'
import { WORK_TYPE_LABELS, formatDateShort } from '@/lib/utils'
import { CategoryBadge } from '@/components/ui/category-badge'

interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  const inner = (
    <>
      <div className="aspect-[16/9] overflow-hidden bg-surface-alt">
        {work.thumbnail_url ? (
          <img
            src={work.thumbnail_url}
            alt={work.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-border-light">
            <span className="text-xl font-bold text-ink-muted/20">WORKS</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <CategoryBadge label={WORK_TYPE_LABELS[work.work_type] || work.work_type} variant="outline" />
          {work.event_date && (
            <time className="text-xs text-ink-muted">{formatDateShort(work.event_date)}</time>
          )}
        </div>
        <h3 className="mt-2 text-base font-bold text-ink group-hover:text-vermillion transition-colors line-clamp-2">
          {work.title}
        </h3>
        {work.description && (
          <p className="mt-2 text-sm text-ink-light line-clamp-2">{work.description}</p>
        )}
      </div>
    </>
  )

  if (work.external_url) {
    return (
      <a href={work.external_url} target="_blank" rel="noopener noreferrer" className="group block">
        {inner}
      </a>
    )
  }

  return (
    <Link href={`/works/${work.slug}`} className="group block">
      {inner}
    </Link>
  )
}
