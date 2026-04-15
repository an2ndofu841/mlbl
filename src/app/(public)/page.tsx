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
import { CTAButton } from '@/components/ui/cta-button'
import { AnimateIn } from '@/components/ui/animate-in'
import { NEWS_CATEGORY_LABELS, WORK_TYPE_LABELS, formatDateShort } from '@/lib/utils'

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
      {/* ════════ Hero: The Kinetic Gallery ════════ */}
      <section className="relative bg-surface-base">
        {/* Ambient blobs */}
        <div className="absolute top-20 -right-32 w-[420px] h-[420px] bg-primary-container/30 blob-bg -z-10 animate-float blur-2xl" />
        <div className="absolute bottom-32 -left-24 w-80 h-80 bg-secondary-container/20 blob-bg -z-10 animate-float-delayed blur-xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-tertiary-container/15 rounded-full -z-10 animate-pulse-soft blur-2xl" />

        {settings?.hero_background_url && (
          <img
            src={settings.hero_background_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.04] -z-20"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] items-center gap-4 md:gap-8 px-8 md:px-12 lg:px-20 pt-28 pb-8">
          {/* Left: Typography */}
          <div className="z-10 flex flex-col items-center md:items-center">
            <h1 className="writing-vertical font-headline text-4xl md:text-5xl lg:text-[3.5rem] tracking-[0.12em] leading-snug text-on-surface hero-stagger-1">
              {settings?.hero_title ? (
                settings.hero_title
              ) : (
                <>心を、<br /><span className="text-primary">召し上がれ。</span></>
              )}
            </h1>
            <p className="mt-4 md:mt-6 text-sm md:text-base text-on-surface-variant max-w-xs leading-relaxed text-center md:text-left hero-stagger-3"
              style={{ writingMode: 'horizontal-tb' }}
            >
              {settings?.hero_subtitle || '熱量と愛嬌で、エンタメを届けるレーベル。'}
            </p>
            <div className="flex gap-3 mt-4 hero-stagger-4" style={{ writingMode: 'horizontal-tb' }}>
              <CTAButton href={settings?.hero_cta_primary_url || '/talent'} variant="primary" size="sm">
                {settings?.hero_cta_primary_text || 'Talents'}
              </CTAButton>
              <CTAButton href={settings?.hero_cta_secondary_url || '/about'} variant="outline" size="sm">
                {settings?.hero_cta_secondary_text || 'About'}
              </CTAButton>
            </div>
          </div>

          {/* Right: Photo collage */}
          <div className="relative flex justify-center items-center hero-image-enter">
            <div className="relative w-full max-w-xl aspect-square md:rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 md:gap-4">
                {/* Main video/photo */}
                <div className="col-span-3 row-span-2 bg-surface-low overflow-hidden rounded-3xl shadow-ambient-lg">
                  <video
                    src="https://ltzcmmvaeemmwqukpzcw.supabase.co/storage/v1/object/public/cms-videos/td03.mp4"
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pop-art accent */}
                <div className="col-span-1 row-span-1 bg-secondary overflow-hidden rounded-full rotate-6 flex items-center justify-center shadow-ambient">
                  <span className="text-on-secondary font-headline text-2xl md:text-3xl">★</span>
                </div>

                {/* Secondary video */}
                <div className="col-span-1 row-span-2 bg-surface-low overflow-hidden rounded-2xl shadow-ambient translate-y-4">
                  <video
                    src="https://ltzcmmvaeemmwqukpzcw.supabase.co/storage/v1/object/public/cms-videos/sgm01.mp4"
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Video plate */}
                <div className="col-span-2 row-span-1 overflow-hidden rounded-full -translate-x-4 shadow-ambient">
                  <video
                    src="https://ltzcmmvaeemmwqukpzcw.supabase.co/storage/v1/object/public/cms-videos/winordie01.mp4"
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-1.5 py-6 hero-stagger-5">
          <span className="text-[10px] tracking-[0.3em] uppercase text-outline/40 font-semibold">Scroll</span>
          <div className="w-px h-8 bg-outline/15 rounded-full overflow-hidden">
            <div className="w-full h-1/2 bg-primary animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ════════ About Concept ════════ */}
      <section className="px-8 md:px-16 py-28 md:py-36 bg-surface-low relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimateIn>
            <span className="inline-block px-5 py-2 rounded-full bg-secondary-container text-secondary font-bold text-[11px] tracking-[0.2em] uppercase mb-8">
              Concept
            </span>
          </AnimateIn>
          <AnimateIn delay={150}>
            <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl leading-tight mb-12 text-on-surface">
              {settings?.about_intro_title || (
                <>思想を<span className="text-primary italic">「味わう」</span>、<br />新しい体験を。</>
              )}
            </h2>
          </AnimateIn>
          <AnimateIn delay={300}>
            <p className="text-base md:text-lg leading-[2] text-on-surface-variant max-w-2xl mx-auto">
              {settings?.about_intro_text ||
                '私たちは、作品を"差し出す"という行為に、最大限の敬意と遊び心を込めています。「めしあがれ」——この言葉に込めた想いが、すべての活動の起点です。'}
            </p>
          </AnimateIn>
          <AnimateIn delay={400}>
            <div className="mt-12">
              <CTAButton href="/about" variant="outline" size="md">
                もっと知る <ArrowRight className="ml-2 w-4 h-4 inline" />
              </CTAButton>
            </div>
          </AnimateIn>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary-container/15 rounded-full blur-3xl -z-10" />
      </section>

      {/* ════════ Pick Up Contents — The Idea Tray ════════ */}
      {contents.length > 0 && (
        <section className="px-8 md:px-16 py-28 md:py-36 bg-surface-base">
          <AnimateIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
              <div>
                <span className="text-[11px] tracking-[0.4em] uppercase text-secondary font-bold mb-3 block">Curation</span>
                <h2 className="font-headline text-4xl md:text-5xl font-black text-on-surface">Specials</h2>
              </div>
              <Link href="/contents" className="font-semibold text-sm text-primary hover:text-primary-dim flex items-center gap-2 transition-colors group">
                VIEW ALL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Featured large card */}
              <div className="md:col-span-7 group relative overflow-hidden rounded-3xl bg-surface-low h-[400px] md:h-[560px] shadow-ambient-lg hover:shadow-ambient transition-all">
                {contents[0]?.thumbnail_url ? (
                  <img src={contents[0].thumbnail_url} alt={contents[0].title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-on-surface/80 to-on-surface flex items-center justify-center">
                    <span className="text-white/10 font-headline text-8xl">C</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent p-8 md:p-10 flex flex-col justify-end">
                  <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-secondary text-on-secondary font-bold text-[10px] tracking-widest mb-4 uppercase">
                    {contents[0].category || 'PICK UP'}
                  </span>
                  <h3 className="text-white font-headline text-2xl md:text-4xl mb-6 leading-tight line-clamp-3">
                    {contents[0].title}
                  </h3>
                  <Link href={`/contents/${contents[0].slug}`}
                    className="w-fit bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:scale-105 transition-all shadow-ambient">
                    READ
                  </Link>
                </div>
              </div>

              {/* Side cards */}
              <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
                {contents.slice(1, 3).map((c) => (
                  <Link key={c.id} href={`/contents/${c.slug}`}
                    className="group flex-1 rounded-2xl overflow-hidden relative shadow-ambient hover:-translate-y-1 transition-transform duration-500 min-h-[220px]">
                    {c.thumbnail_url ? (
                      <img src={c.thumbnail_url} alt={c.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 absolute inset-0" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-low to-surface-mid" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-on-surface/70 to-transparent">
                      <h4 className="text-white font-headline text-xl md:text-2xl line-clamp-2">{c.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>
      )}

      {/* ════════ Special Banner (only when specials exist) ════════ */}
      {specials.length > 0 && (
        <section className="px-4 md:px-16 py-28 md:py-36">
          <AnimateIn>
            <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] group shadow-ambient-lg">
              {specials[0].thumbnail_url || specials[0].hero_image_url ? (
                <img src={specials[0].hero_image_url || specials[0].thumbnail_url!} alt={specials[0].title}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-on-surface via-on-surface/90 to-primary-dim" />
              )}
              <div className="absolute inset-0 bg-primary/30 flex flex-col items-center justify-center text-center p-8 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700">
                <span className="text-white font-semibold text-sm tracking-[0.5em] mb-6 uppercase drop-shadow-lg">
                  Special
                </span>
                <h2 className="text-white font-headline text-4xl md:text-7xl mb-10 drop-shadow-xl font-black leading-tight">
                  {specials[0].title}
                </h2>
                <div className="relative">
                  <div className="absolute -top-10 -right-10 bg-tertiary text-on-tertiary text-[10px] font-bold py-1.5 px-3 rounded-full rotate-12 animate-pulse z-20">
                    NEW
                  </div>
                  <Link href={`/special/${specials[0].slug}`}
                    className="group/btn relative px-12 py-5 bg-surface-lowest text-primary font-black tracking-widest overflow-hidden rounded-full shadow-ambient-lg hover:scale-105 active:scale-95 transition-all duration-300 inline-block">
                    <span className="relative z-10 group-hover/btn:text-on-primary transition-colors uppercase text-sm">
                      {specials[0].cta_text || 'くわしく見る'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dim translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </section>
      )}

      {/* ════════ Talents — Pop-Art Frames ════════ */}
      {artists.length > 0 && (
        <section className="px-8 md:px-16 py-28 md:py-36 bg-surface-low rounded-[2rem] md:rounded-[3.5rem] mx-4 md:mx-8">
          <AnimateIn>
            <div className="text-center mb-20">
              <span className="font-bold text-[11px] tracking-[0.4em] uppercase text-secondary mb-4 block">Creative Minds</span>
              <h2 className="font-headline text-5xl md:text-6xl font-black text-on-surface">Talents</h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-6xl mx-auto">
            {artists.slice(0, 3).map((artist, i) => (
              <AnimateIn key={artist.id} delay={i * 200}>
                <Link href={`/talent/${artist.slug}`}
                  className={`group text-center block ${i === 1 ? 'md:translate-y-12' : ''}`}>
                  <div className="aspect-[4/5] bg-surface-lowest rounded-3xl overflow-hidden mb-6 relative shadow-ambient-lg group-hover:scale-[1.02] transition-transform duration-700">
                    {artist.profile_image_url || artist.thumbnail_url ? (
                      <img src={artist.profile_image_url || artist.thumbnail_url!} alt={artist.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-b from-surface-lowest to-surface-low flex items-center justify-center">
                        <span className="text-6xl font-black text-outline/10">{artist.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-secondary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {artist.member_color && (
                      <div className="absolute bottom-0 inset-x-0 h-1" style={{ backgroundColor: artist.member_color }} />
                    )}
                  </div>
                  <span className="font-bold text-[11px] tracking-widest text-secondary mb-2 block uppercase">
                    {artist.role || 'Artist'}
                  </span>
                  <h3 className="font-headline text-2xl md:text-3xl mb-3 text-on-surface">{artist.name}</h3>
                  {artist.short_copy && (
                    <p className="text-sm text-on-surface-variant/60 leading-relaxed italic line-clamp-2">
                      「{artist.short_copy}」
                    </p>
                  )}
                </Link>
              </AnimateIn>
            ))}
          </div>

          {artists.length > 3 && (
            <AnimateIn delay={600}>
              <div className="text-center mt-16">
                <CTAButton href="/talent" variant="outline" size="md">
                  すべてのアーティストを見る
                </CTAButton>
              </div>
            </AnimateIn>
          )}
        </section>
      )}

      {/* ════════ Works + News — Asymmetric Split ════════ */}
      <section className="px-8 md:px-16 py-28 md:py-36 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 bg-surface-base">
        {/* Works: Numbered list */}
        <AnimateIn>
          <div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-headline text-3xl md:text-4xl font-black text-on-surface">Portfolio</h2>
              <Link href="/works" className="text-[11px] text-outline hover:text-primary transition-colors tracking-widest uppercase font-bold">
                All
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              {works.slice(0, 5).map((work, i) => (
                <Link key={work.id} href={work.external_url || `/works/${work.slug}`}
                  {...(work.external_url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex gap-6 items-center p-5 rounded-2xl hover:bg-surface-low transition-all">
                  <span className="font-headline text-3xl text-primary font-black opacity-15 group-hover:opacity-100 group-hover:scale-110 transition-all tabular-nums w-10 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-base mb-1 truncate text-on-surface group-hover:text-primary transition-colors">{work.title}</h4>
                    <p className="text-xs font-semibold text-outline/60 uppercase tracking-widest">
                      {WORK_TYPE_LABELS[work.work_type] || work.work_type}
                      {work.event_date && <> · {formatDateShort(work.event_date)}</>}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* News: Cards with accent bar */}
        <AnimateIn delay={200}>
          <div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-headline text-3xl md:text-4xl font-black text-on-surface">Journal</h2>
              <Link href="/news" className="text-[11px] text-outline hover:text-primary transition-colors tracking-widest uppercase font-bold">
                All
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {newsList.slice(0, 4).map((news, i) => {
                const accentColors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-primary-container']
                return (
                  <Link key={news.id} href={news.external_url || `/news/${news.slug}`}
                    {...(news.external_url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group bg-surface-lowest rounded-2xl p-6 flex gap-4 hover:translate-x-2 transition-transform shadow-ambient">
                    <div className={`w-1 shrink-0 rounded-full ${accentColors[i % accentColors.length]}`} />
                    <div className="min-w-0">
                      <time className="font-semibold text-xs text-outline/50 mb-2 block">
                        {formatDateShort(news.published_at)}
                        {news.category && (
                          <span className="ml-3 text-secondary">{NEWS_CATEGORY_LABELS[news.category]}</span>
                        )}
                      </time>
                      <h4 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {news.title}
                      </h4>
                    </div>
                  </Link>
                )
              })}
              {newsList.length === 0 && (
                <p className="text-center text-outline py-8">ニュースはまだありません。</p>
              )}
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ════════ Audition CTA ════════ */}
      <section className="py-28 md:py-36 bg-gradient-to-br from-primary to-primary-dim text-on-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/3 blur-lg" />
        <AnimateIn>
          <div className="relative mx-auto max-w-3xl px-8 text-center">
            <span className="text-[11px] tracking-[0.3em] font-bold mb-4 text-on-primary/50 uppercase block">Audition</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black">
              {settings?.audition_banner_title || '仲間、募集中。'}
            </h2>
            <p className="mt-8 text-base md:text-lg text-on-primary/70 leading-relaxed max-w-xl mx-auto">
              {settings?.audition_banner_text ||
                'あなたの熱量を、ここで。めしあがレーベルでは、共に作品を届ける仲間を募集しています。'}
            </p>
            <div className="mt-10">
              <Link href="/audition"
                className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold bg-surface-lowest text-primary rounded-full hover:scale-105 active:scale-95 transition-all shadow-ambient-lg">
                詳しく見る
              </Link>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ════════ Contact CTA ════════ */}
      <section className="py-28 md:py-36 bg-surface-low">
        <AnimateIn>
          <div className="mx-auto max-w-3xl px-8 text-center">
            <span className="text-[11px] tracking-[0.3em] uppercase text-secondary font-bold mb-4 block">Contact</span>
            <h2 className="font-headline text-3xl md:text-4xl font-black text-on-surface mb-4">お問い合わせ</h2>
            <p className="mt-6 text-on-surface-variant leading-relaxed">
              出演依頼・取材・コラボレーションなど、お気軽にご連絡ください。
            </p>
            <div className="mt-10">
              <CTAButton href="/contact" variant="secondary" size="lg">
                お問い合わせはこちら
              </CTAButton>
            </div>
          </div>
        </AnimateIn>
      </section>
    </>
  )
}
