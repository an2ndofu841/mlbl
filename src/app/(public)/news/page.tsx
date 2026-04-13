import type { Metadata } from 'next'
import { getPublishedNews } from '@/lib/queries'
import { PageHeader } from '@/components/ui/page-header'
import { NewsCard } from '@/components/cards/news-card'

export const metadata: Metadata = {
  title: 'NEWS',
  description: 'めしあがレーベルからのお知らせ。',
}

export const revalidate = 60

export default async function NewsPage() {
  const newsList = await getPublishedNews()

  return (
    <>
      <PageHeader
        title="NEWS"
        subtitle="Information"
        description="めしあがレーベルからのお知らせ。"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-4xl px-6">
          {newsList.length > 0 ? (
            <div className="divide-y divide-border-light">
              {newsList.map((news) => (
                <NewsCard key={news.id} news={news} compact />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-muted py-16">ニュースはまだありません。</p>
          )}
        </div>
      </section>
    </>
  )
}
