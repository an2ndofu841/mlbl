import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getArtistBySlug } from '@/lib/queries'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NewsCard } from '@/components/cards/news-card'
import { ContentCard } from '@/components/cards/content-card'
import type { News, Content, Work } from '@/types/database'
import { WorkCard } from '@/components/cards/work-card'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)
  if (!artist) return {}
  return {
    title: artist.seo_title || artist.name,
    description: artist.seo_description || artist.short_bio || `${artist.name} | めしあがレーベル`,
    openGraph: {
      images: artist.og_image_url ? [artist.og_image_url] : artist.profile_image_url ? [artist.profile_image_url] : [],
    },
  }
}

export const revalidate = 60

export default async function ArtistDetailPage({ params }: Props) {
  const { slug } = await params
  const artist = await getArtistBySlug(slug)
  if (!artist) notFound()

  const supabase = await createServerSupabaseClient()

  const [newsResult, contentsResult, worksResult] = await Promise.all([
    supabase
      .from('artist_news')
      .select('news_id, news:news(*)')
      .eq('artist_id', artist.id),
    supabase
      .from('artist_contents')
      .select('content_id, contents:contents(*)')
      .eq('artist_id', artist.id),
    supabase
      .from('artist_works')
      .select('work_id, works:works(*)')
      .eq('artist_id', artist.id),
  ])

  const relatedNews = (newsResult.data ?? [])
    .map((r) => r.news as unknown as News)
    .filter((n): n is News => n !== null && n.status === 'published')
  const relatedContents = (contentsResult.data ?? [])
    .map((r) => r.contents as unknown as Content)
    .filter((c): c is Content => c !== null && c.status === 'published')
  const relatedWorks = (worksResult.data ?? [])
    .map((r) => r.works as unknown as Work)
    .filter((w): w is Work => Boolean(w))

  const socialLinks = [
    { label: 'X (Twitter)', url: artist.x_url },
    { label: 'Instagram', url: artist.instagram_url },
    { label: 'TikTok', url: artist.tiktok_url },
    { label: 'YouTube', url: artist.youtube_url },
  ].filter((s) => s.url)

  return (
    <div className="pt-24 md:pt-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/talent" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> TALENT一覧に戻る
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Photo */}
          <div className="aspect-[3/4] bg-surface-alt overflow-hidden">
            {artist.profile_image_url ? (
              <img
                src={artist.profile_image_url}
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-6xl font-black text-ink-muted/20">{artist.name.charAt(0)}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {artist.role && (
              <p className="text-xs tracking-[0.2em] text-vermillion font-medium mb-2 uppercase">
                {artist.role}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-ink tracking-tight">
              {artist.name}
            </h1>
            {artist.english_name && (
              <p className="mt-1 text-sm text-ink-muted tracking-wider font-[family-name:var(--font-inter)]">
                {artist.english_name}
              </p>
            )}
            {artist.kana && (
              <p className="mt-1 text-xs text-ink-muted">{artist.kana}</p>
            )}

            {artist.short_copy && (
              <p className="mt-6 text-lg text-ink-light italic leading-relaxed">
                &ldquo;{artist.short_copy}&rdquo;
              </p>
            )}

            {artist.short_bio && (
              <p className="mt-6 text-sm text-ink-light leading-[2]">{artist.short_bio}</p>
            )}

            {artist.group_name && (
              <div className="mt-6">
                <span className="text-xs text-ink-muted">所属グループ</span>
                <p className="text-sm font-medium text-ink mt-1">{artist.group_name}</p>
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-medium border border-border text-ink-light hover:border-vermillion hover:text-vermillion transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Full Bio */}
        {artist.full_bio && (
          <section className="mt-20 py-16 border-t border-border-light">
            <h2 className="text-xl font-bold text-ink mb-8">プロフィール</h2>
            <div className="rich-text text-ink-light max-w-3xl whitespace-pre-wrap">
              {artist.full_bio}
            </div>
          </section>
        )}

        {/* Embed Video */}
        {artist.embed_video_url && (
          <section className="mt-8 pb-16">
            <h2 className="text-xl font-bold text-ink mb-8">映像</h2>
            <div className="aspect-video bg-ink overflow-hidden">
              <iframe
                src={artist.embed_video_url}
                title={`${artist.name} - Video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="py-16 border-t border-border-light">
            <h2 className="text-xl font-bold text-ink mb-8">関連ニュース</h2>
            <div className="divide-y divide-border-light">
              {relatedNews.slice(0, 5).map((news) => (
                <NewsCard key={news.id} news={news} compact />
              ))}
            </div>
          </section>
        )}

        {/* Related Contents */}
        {relatedContents.length > 0 && (
          <section className="py-16 border-t border-border-light">
            <h2 className="text-xl font-bold text-ink mb-8">関連コンテンツ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedContents.slice(0, 3).map((content) => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </section>
        )}

        {relatedWorks.length > 0 && (
          <section className="py-16 border-t border-border-light">
            <h2 className="text-xl font-bold text-ink mb-8">関連実績</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedWorks.slice(0, 4).map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="h-24" />
    </div>
  )
}
