import Link from 'next/link'
import type { News } from '@/types/database'
import { formatDateShort, NEWS_CATEGORY_LABELS } from '@/lib/utils'
import { CategoryBadge } from '@/components/ui/category-badge'

interface NewsCardProps {
  news: News
  compact?: boolean
}

export function NewsCard({ news, compact }: NewsCardProps) {
  const href = news.external_url || `/news/${news.slug}`
  const isExternal = !!news.external_url

  const innerCompact = (
    <>
      <time className="shrink-0 text-sm text-outline tabular-nums">{formatDateShort(news.published_at)}</time>
      <CategoryBadge label={NEWS_CATEGORY_LABELS[news.category] || news.category} variant="primary" />
      <p className="text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1 flex-1">{news.title}</p>
    </>
  )

  if (compact) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 py-4"
        >
          {innerCompact}
        </a>
      )
    }
    return (
      <Link href={href} className="group flex items-start gap-4 py-4">
        {innerCompact}
      </Link>
    )
  }

  const innerFull = (
    <>
      {news.thumbnail_url && (
        <div className="aspect-[16/9] overflow-hidden bg-surface-low rounded-2xl">
          <img
            src={news.thumbnail_url}
            alt={news.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <CategoryBadge label={NEWS_CATEGORY_LABELS[news.category] || news.category} variant="primary" />
          <time className="text-xs text-outline">{formatDateShort(news.published_at)}</time>
          {news.pinned && <span className="text-[10px] font-bold text-secondary tracking-wider">PIN</span>}
        </div>
        <h3 className="mt-2.5 text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>
        {news.excerpt && <p className="mt-2 text-sm text-on-surface-variant line-clamp-2">{news.excerpt}</p>}
      </div>
    </>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
        {innerFull}
      </a>
    )
  }

  return (
    <Link href={href} className="group block">
      {innerFull}
    </Link>
  )
}
