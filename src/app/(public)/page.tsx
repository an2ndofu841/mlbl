import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  getTopPageSettings,
  getFeaturedArtists,
  getPublishedNews,
  getHomePickupContents,
  getPublishedSpecials,
  getWorks,
} from '@/lib/queries'
import { SectionTitle } from '@/components/ui/section-title'
import { CTAButton } from '@/components/ui/cta-button'
import { ArtistCard } from '@/components/cards/artist-card'
import { NewsCard } from '@/components/cards/news-card'
import { ContentCard } from '@/components/cards/content-card'
import { WorkCard } from '@/components/cards/work-card'
import { SpecialCard } from '@/components/cards/special-card'

export const revalidate = 60

export default async function HomePage() {
  const topSettings = await getTopPageSettings()
  const [artists, newsList, contents, specials, works] = await Promise.all([
    getFeaturedArtists(),
    getPublishedNews(5),
    getHomePickupContents(topSettings, 4),
    getPublishedSpecials(3),
    getWorks(),
  ])
  const settings = topSettings

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-surface overflow-hidden">
        {settings?.hero_background_url && (
          <img
            src={settings.hero_background_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/0 via-cream/30 to-cream" />
        <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-vermillion/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-[10%] w-48 h-48 rounded-full bg-vermillion/3 blur-2xl" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs md:text-sm tracking-[0.3em] text-vermillion font-medium mb-6 uppercase">
            Meshiaga Label
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-ink">
            {settings?.hero_title || '作品を、召し上がれ。'}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-light max-w-2xl mx-auto leading-relaxed">
            {settings?.hero_subtitle || '熱量と愛嬌で、エンタメを届けるレーベル。'}
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton
              href={settings?.hero_cta_primary_url || '/talent'}
              variant="primary"
              size="lg"
            >
              {settings?.hero_cta_primary_text || '所属アーティストを見る'}
            </CTAButton>
            <CTAButton
              href={settings?.hero_cta_secondary_url || '/about'}
              variant="outline"
              size="lg"
            >
              {settings?.hero_cta_secondary_text || 'めしあがレーベルとは'}
            </CTAButton>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-ink-muted/30" />
        </div>
      </section>

      {/* About Intro */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] text-vermillion font-medium mb-4">ABOUT</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
            {settings?.about_intro_title || 'めしあがレーベルとは？'}
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-vermillion mx-auto" />
          <p className="mt-10 text-base md:text-lg text-ink-light leading-[2] max-w-2xl mx-auto">
            {settings?.about_intro_text ||
              '私たちは、作品を"差し出す"という行為に、最大限の敬意と遊び心を込めています。「めしあがれ」——この言葉に込めた想いが、すべての活動の起点です。'}
          </p>
          <div className="mt-10">
            <CTAButton href="/about" variant="outline" size="md">
              もっと知る <ArrowRight className="ml-2 w-4 h-4" />
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Pick Up Contents */}
      {contents.length > 0 && (
        <section className="py-24 md:py-32 bg-surface">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-12">
              <SectionTitle title="PICK UP" subtitle="注目のコンテンツ" />
              <Link href="/contents" className="hidden md:flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors">
                すべて見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contents.slice(0, 4).map((content, i) => (
                <ContentCard key={content.id} content={content} featured={i === 0} />
              ))}
            </div>
            <div className="mt-10 text-center md:hidden">
              <CTAButton href="/contents" variant="outline" size="sm">
                すべて見る
              </CTAButton>
            </div>
          </div>
        </section>
      )}

      {/* Talent */}
      {artists.length > 0 && (
        <section className="py-24 md:py-32 bg-cream">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-12">
              <SectionTitle title="TALENT" subtitle="所属アーティスト" />
              <Link href="/talent" className="hidden md:flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors">
                すべて見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special */}
      {specials.length > 0 && (
        <section className="py-24 md:py-32 bg-ink">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.3em] text-vermillion-light font-medium mb-2">SPECIAL</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  特設コンテンツ
                </h2>
                <div className="mt-4 h-0.5 w-12 bg-vermillion-light" />
              </div>
              <Link href="/special" className="hidden md:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                すべて見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specials.map((special) => (
                <SpecialCard key={special.id} special={special} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Works */}
      {works.length > 0 && (
        <section className="py-24 md:py-32 bg-surface">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between mb-12">
              <SectionTitle title="WORKS" subtitle="実績" />
              <Link href="/works" className="hidden md:flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors">
                すべて見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.slice(0, 6).map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle title="NEWS" subtitle="お知らせ" />
            <Link href="/news" className="hidden md:flex items-center gap-2 text-sm text-ink-muted hover:text-vermillion transition-colors">
              すべて見る <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-border-light">
            {newsList.map((news) => (
              <NewsCard key={news.id} news={news} compact />
            ))}
          </div>
          {newsList.length === 0 && (
            <p className="text-center text-ink-muted py-8">ニュースはまだありません。</p>
          )}
          <div className="mt-10 text-center">
            <CTAButton href="/news" variant="outline" size="sm">
              ニュース一覧へ
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Audition CTA */}
      <section className="py-24 md:py-32 bg-vermillion text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs tracking-[0.3em] font-medium mb-4 text-white/60 uppercase">Audition</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {settings?.audition_banner_title || '仲間、募集中。'}
          </h2>
          <p className="mt-8 text-base md:text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            {settings?.audition_banner_text ||
              'あなたの熱量を、ここで。めしあがレーベルでは、共に作品を届ける仲間を募集しています。'}
          </p>
          <div className="mt-10">
            <CTAButton href="/audition" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-vermillion">
              詳しく見る
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionTitle title="CONTACT" subtitle="お問い合わせ" align="center" />
          <p className="mt-8 text-ink-light leading-relaxed">
            出演依頼・取材・コラボレーションなど、お気軽にご連絡ください。
          </p>
          <div className="mt-10">
            <CTAButton href="/contact" variant="secondary" size="lg">
              お問い合わせはこちら
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
