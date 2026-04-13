import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getContentBySlug, getPublishedContents, getRelatedArtists } from '@/lib/queries'
import { formatDate, CONTENT_CATEGORY_LABELS } from '@/lib/utils'
import { CategoryBadge } from '@/components/ui/category-badge'
import { ContentCard } from '@/components/cards/content-card'
import { buildDetailMetadata } from '@/lib/seo'
import type { Artist } from '@/types/database'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = await getContentBySlug(slug)
  if (!content) return {}
  const images = content.og_image_url ? [content.og_image_url] : content.thumbnail_url ? [content.thumbnail_url] : []
  return buildDetailMetadata({
    title: content.seo_title || content.title,
    description: content.seo_description || content.excerpt || content.title,
    path: `/contents/${content.slug}`,
    images,
  })
}

export const revalidate = 60

export default async function ContentDetailPage({ params }: Props) {
  const { slug } = await params
  const content = await getContentBySlug(slug)
  if (!content) notFound()

  const relatedArtists = (await getRelatedArtists('artist_contents', 'content_id', content.id)) as unknown as Artist[]

  const relatedContents = (await getPublishedContents(content.category, 4))
    .filter((c) => c.id !== content.id)
    .slice(0, 3)

  return (
    <div className="pt-24 md:pt-32">
      <article className="mx-auto max-w-3xl px-6">
        <Link href="/contents" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> CONTENTS一覧に戻る
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge label={CONTENT_CATEGORY_LABELS[content.category] || content.category} variant="vermillion" />
          <time className="text-sm text-ink-muted">{formatDate(content.published_at)}</time>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight leading-tight">
          {content.title}
        </h1>

        {content.excerpt && (
          <p className="mt-6 text-lg text-ink-light leading-relaxed">{content.excerpt}</p>
        )}

        {content.author_name && (
          <p className="mt-4 text-sm text-ink-muted">by {content.author_name}</p>
        )}

        {content.thumbnail_url && (
          <div className="mt-10 aspect-[2/1] overflow-hidden bg-surface-alt">
            <img src={content.thumbnail_url} alt={content.title} className="h-full w-full object-cover" />
          </div>
        )}

        {content.body && (
          <div className="mt-12 rich-text text-ink-light whitespace-pre-wrap">
            {content.body}
          </div>
        )}

        {relatedArtists.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border-light">
            <h2 className="text-lg font-bold text-ink mb-4">関連アーティスト</h2>
            <ul className="flex flex-wrap gap-3">
              {relatedArtists.map((a) => (
                <li key={a.id}>
                  <Link href={`/talent/${a.slug}`} className="text-sm text-ink-light hover:text-vermillion">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {relatedContents.length > 0 && (
        <section className="mt-20 py-16 bg-cream">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-xl font-bold text-ink mb-8">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedContents.map((c) => (
                <ContentCard key={c.id} content={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="h-24" />
    </div>
  )
}
