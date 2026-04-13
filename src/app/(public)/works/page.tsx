import type { Metadata } from 'next'
import { getWorks } from '@/lib/queries'
import { PageHeader } from '@/components/ui/page-header'
import { WorkCard } from '@/components/cards/work-card'
import { WorksFilter } from './works-filter'

export const metadata: Metadata = {
  title: 'WORKS',
  description: 'めしあがレーベルの実績。出演、主催、制作、タイアップなど。',
}

export const revalidate = 60

interface Props {
  searchParams: Promise<{ type?: string }>
}

export default async function WorksPage({ searchParams }: Props) {
  const { type } = await searchParams
  const works = await getWorks(type)

  return (
    <>
      <PageHeader
        title="WORKS"
        subtitle="Portfolio"
        description="出演、主催、制作、タイアップ。めしあがレーベルの実績。"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <WorksFilter currentType={type || 'all'} />

          {works.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-muted py-16">実績はまだありません。</p>
          )}
        </div>
      </section>
    </>
  )
}
