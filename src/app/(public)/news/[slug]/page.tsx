import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getNewsBySlug, getRelatedArtists } from '@/lib/queries'
import { formatDate, NEWS_CATEGORY_LABELS } from '@/lib/utils'
import { CategoryBadge } from '@/components/ui/category-badge'
import { buildDetailMetadata } from '@/lib/seo'
import type { Artist } from '@/types/database'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) return {}
  const images = news.og_image_url ? [news.og_image_url] : news.thumbnail_url ? [news.thumbnail_url] : []
  return buildDetailMetadata({
    title: news.seo_title || news.title,
    description: news.seo_description || news.excerpt || news.title,
    path: `/news/${news.slug}`,
    images,
  })
}

export const revalidate = 60

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) notFound()

  const relatedArtists = (await getRelatedArtists('artist_news', 'news_id', news.id)) as unknown as Artist[]

  return (
    <div className="pt-24 md:pt-32">
      <article className="mx-auto max-w-3xl px-6">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> NEWS一覧に戻る
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge label={NEWS_CATEGORY_LABELS[news.category] || news.category} variant="vermillion" />
          <time className="text-sm text-ink-muted">{formatDate(news.published_at)}</time>
          {news.pinned && <span className="text-xs text-vermillion font-medium">PIN</span>}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight leading-tight">
          {news.title}
        </h1>

        {news.thumbnail_url && (
          <div className="mt-10 aspect-[2/1] overflow-hidden bg-surface-alt">
            <img src={news.thumbnail_url} alt={news.title} className="h-full w-full object-cover" />
          </div>
        )}

        {news.body && (
          <div className="mt-12 rich-text text-ink-light whitespace-pre-wrap">
            {news.body}
          </div>
        )}

        {news.external_url && (
          <div className="mt-12 p-6 bg-surface-alt">
            <p className="text-sm text-ink-muted mb-2">外部リンク</p>
            <a
              href={news.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vermillion hover:underline break-all"
            >
              {news.external_url}
            </a>
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

      <div className="h-24" />
    </div>
  )
}
