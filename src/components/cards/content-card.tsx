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
      <div className={`overflow-hidden bg-surface-low rounded-2xl ${featured ? 'aspect-[2/1]' : 'aspect-[16/9]'}`}>
        {content.thumbnail_url ? (
          <img
            src={content.thumbnail_url}
            alt={content.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-low">
            <span className="text-2xl font-black text-outline/15">CONTENTS</span>
          </div>
        )}
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-3">
          <CategoryBadge
            label={CONTENT_CATEGORY_LABELS[content.category] || content.category}
            variant="primary"
          />
          <time className="text-xs text-outline">{formatDateShort(content.published_at)}</time>
        </div>
        <h3 className={`mt-2.5 font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 ${featured ? 'text-xl md:text-2xl' : 'text-base'}`}>
          {content.title}
        </h3>
        {content.excerpt && (
          <p className="mt-2 text-sm text-on-surface-variant line-clamp-2">{content.excerpt}</p>
        )}
        {content.author_name && (
          <p className="mt-2 text-xs text-outline font-medium">by {content.author_name}</p>
        )}
      </div>
    </Link>
  )
}
