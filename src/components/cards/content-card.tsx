import Link from 'next/link'
import type { Content } from '@/types/database'
import { formatDateShort, CONTENT_CATEGORY_LABELS } from '@/lib/utils'
import { CategoryBadge } from '@/components/ui/category-badge'

interface ContentCardProps {
  content: Content
  featured?: boolean
}

export function ContentCard({ content, featured }: ContentCardProps) {
  return (
    <Link href={`/contents/${content.slug}`} className="group block">
      <div className={`aspect-[16/9] overflow-hidden bg-surface-alt ${featured ? 'md:aspect-[2/1]' : ''}`}>
        {content.thumbnail_url ? (
          <img
            src={content.thumbnail_url}
            alt={content.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-border-light">
            <span className="text-2xl font-bold text-ink-muted/20">CONTENTS</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <CategoryBadge
            label={CONTENT_CATEGORY_LABELS[content.category] || content.category}
          />
          <time className="text-xs text-ink-muted">{formatDateShort(content.published_at)}</time>
        </div>
        <h3 className={`mt-2 font-bold text-ink group-hover:text-vermillion transition-colors line-clamp-2 ${featured ? 'text-xl md:text-2xl' : 'text-base'}`}>
          {content.title}
        </h3>
        {content.excerpt && (
          <p className="mt-2 text-sm text-ink-light line-clamp-2">{content.excerpt}</p>
        )}
        {content.author_name && (
          <p className="mt-2 text-xs text-ink-muted">by {content.author_name}</p>
        )}
      </div>
    </Link>
  )
}
