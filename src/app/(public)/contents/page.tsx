import type { Metadata } from 'next'
import { getPublishedContents } from '@/lib/queries'
import { PageHeader } from '@/components/ui/page-header'
import { ContentCard } from '@/components/cards/content-card'
import { ContentFilter } from './content-filter'

export const metadata: Metadata = {
  title: 'CONTENTS',
  description: 'めしあがレーベルのコンテンツ。インタビュー、コラム、対談、密着、企画記事など。',
}

export const revalidate = 60

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ContentsPage({ searchParams }: Props) {
  const { category } = await searchParams
  const contents = await getPublishedContents(category)

  return (
    <>
      <PageHeader
        title="CONTENTS"
        subtitle="Read & Discover"
        description="インタビュー、コラム、対談、企画記事。めしあがレーベルの読み物。"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <ContentFilter currentCategory={category || 'all'} />

          {contents.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contents.map((content, i) => (
                <ContentCard key={content.id} content={content} featured={i === 0 && !category} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-muted py-16">コンテンツはまだありません。</p>
          )}
        </div>
      </section>
    </>
  )
}
