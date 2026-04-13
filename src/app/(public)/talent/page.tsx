import type { Metadata } from 'next'
import { getPublishedArtists } from '@/lib/queries'
import { PageHeader } from '@/components/ui/page-header'
import { ArtistCard } from '@/components/cards/artist-card'

export const metadata: Metadata = {
  title: 'TALENT',
  description: 'めしあがレーベル所属アーティスト一覧。',
}

export const revalidate = 60

export default async function TalentPage() {
  const artists = await getPublishedArtists()

  return (
    <>
      <PageHeader
        title="TALENT"
        subtitle="Artists"
        description="めしあがレーベル所属アーティスト。"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          {artists.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-muted py-16">アーティスト情報は準備中です。</p>
          )}
        </div>
      </section>
    </>
  )
}
