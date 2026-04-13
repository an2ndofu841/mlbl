import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getWorkBySlug, getRelatedArtists } from '@/lib/queries'
import { WORK_TYPE_LABELS, formatDateShort } from '@/lib/utils'
import { CategoryBadge } from '@/components/ui/category-badge'
import { buildDetailMetadata } from '@/lib/seo'
import type { Artist } from '@/types/database'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const work = await getWorkBySlug(slug)
  if (!work) return {}
  return buildDetailMetadata({
    title: work.title,
    description: work.description || `${WORK_TYPE_LABELS[work.work_type] || ''} | めしあがレーベル`,
    path: `/works/${work.slug}`,
    images: work.thumbnail_url ? [work.thumbnail_url] : [],
  })
}

export const revalidate = 60

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const work = await getWorkBySlug(slug)
  if (!work) notFound()

  const relatedArtists = (await getRelatedArtists('artist_works', 'work_id', work.id)) as unknown as Artist[]

  return (
    <div className="pt-24 md:pt-32">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/works" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> WORKS一覧に戻る
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge label={WORK_TYPE_LABELS[work.work_type] || work.work_type} variant="outline" />
          {work.event_date && <time className="text-sm text-ink-muted">{formatDateShort(work.event_date)}</time>}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">{work.title}</h1>

        {work.thumbnail_url && (
          <div className="mt-10 aspect-video overflow-hidden bg-surface-alt">
            <img src={work.thumbnail_url} alt={work.title} className="h-full w-full object-cover" />
          </div>
        )}

        {work.description && (
          <div className="mt-10 text-ink-light leading-[2] whitespace-pre-wrap">{work.description}</div>
        )}

        {work.external_url && (
          <p className="mt-10">
            <a
              href={work.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vermillion font-medium hover:underline"
            >
              関連リンクを開く →
            </a>
          </p>
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
      </div>
      <div className="h-24" />
    </div>
  )
}
