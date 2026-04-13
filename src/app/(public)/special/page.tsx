import type { Metadata } from 'next'
import { getPublishedSpecials } from '@/lib/queries'
import { PageHeader } from '@/components/ui/page-header'
import { SpecialCard } from '@/components/cards/special-card'

export const metadata: Metadata = {
  title: 'SPECIAL',
  description: 'めしあがレーベルの特設コンテンツ。',
}

export const revalidate = 60

export default async function SpecialPage() {
  const specials = await getPublishedSpecials()

  return (
    <>
      <PageHeader
        title="SPECIAL"
        subtitle="Featured Projects"
        description="めしあがレーベルの特設コンテンツ・企画ページ。"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          {specials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specials.map((special) => (
                <SpecialCard key={special.id} special={special} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-muted py-16">特設コンテンツは準備中です。</p>
          )}
        </div>
      </section>
    </>
  )
}
