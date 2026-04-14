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
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-24 pt-32 overflow-hidden bg-surface">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-vermillion/8 blob-bg -z-10 animate-float" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-gold/5 blob-bg -z-10 animate-float-delayed" />

        {settings?.hero_background_url && (
          <img
            src={settings.hero_background_url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.06] -z-20"
          />
        )}

        <div className="z-10 order-2 md:order-1 mt-12 md:mt-0 flex flex-col items-center md:items-start">
          <h1 className="writing-vertical font-headline text-5xl md:text-[6.5rem] tracking-[0.15em] leading-relaxed text-ink">
            {settings?.hero_title ? (
              settings.hero_title
            ) : (
              <>心を、<br /><span className="text-vermillion">召し上がれ。</span></>
            )}
          </h1>
          <p className="mt-8 md:mt-12 text-sm md:text-base text-ink-light max-w-xs leading-relaxed text-center md:text-left"
            style={{ writingMode: 'horizontal-tb' }}
          >
            {settings?.hero_subtitle || '熱量と愛嬌で、エンタメを届けるレーベル。'}
          </p>
          <div className="flex gap-3 mt-8" style={{ writingMode: 'horizontal-tb' }}>
            <CTAButton href={settings?.hero_cta_primary_url || '/talent'} variant="primary" size="md">
              {settings?.hero_cta_primary_text || 'Talents'}
            </CTAButton>
            <CTAButton href={settings?.hero_cta_secondary_url || '/about'} variant="outline" size="md">
              {settings?.hero_cta_secondary_text || 'About'}
            </CTAButton>
          </div>
        </div>

        <div className="relative w-full md:w-3/5 order-1 md:order-2 flex justify-center items-center mb-8 md:mb-0">
          <div className="relative w-full max-w-2xl aspect-square md:rotate-2 hover:rotate-0 transition-transform duration-700">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-3 md:gap-5">
              <div className="col-span-3 row-span-2 bg-surface-alt overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl">
                {artists[0]?.profile_image_url ? (
                  <img src={artists[0].profile_image_url} alt={artists[0].name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-surface-alt to-border-light flex items-center justify-center">
                    <span className="font-headline text-6xl text-ink-muted/10">め</span>
                  </div>
                )}
              </div>

              <div className="col-span-1 row-span-1 bg-gold overflow-hidden rounded-2xl md:rounded-full rotate-6 flex items-center justify-center shadow-lg">
                <span className="text-white font-headline text-3xl">★</span>
              </div>

              <div className="col-span-1 row-span-2 bg-surface-alt overflow-hidden rounded-2xl md:rounded-[1.5rem] shadow-xl translate-y-6">
                {artists[1]?.profile_image_url ? (
                  <img src={artists[1].profile_image_url} alt={artists[1].name}
                    className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-vermillion/10 to-cream" />
                )}
              </div>

              <div className="col-span-2 row-span-1 bg-vermillion overflow-hidden rounded-2xl md:rounded-full -translate-x-6 flex items-center justify-center p-4">
                <span className="text-white font-headline text-lg md:text-2xl tracking-[0.4em] font-black uppercase">
                  Label
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-ink-muted/40">Scroll</span>
          <div className="w-px h-12 bg-ink-muted/20 rounded-full overflow-hidden">
            <div className="w-full h-1/2 bg-vermillion animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* ─── About Concept ─── */}
      <section className="px-8 md:px-16 py-28 md:py-36 bg-surface-alt/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-vermillion/10 text-vermillion font-bold text-xs tracking-[0.2em] uppercase mb-8">
            Concept
          </span>
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl leading-tight mb-12">
            {settings?.about_intro_title || (
              <>思想を<span className="text-vermillion italic">「味わう」</span>、<br />新しい体験を。</>
            )}
          </h2>
          <p className="text-base md:text-lg leading-[2] text-ink-light max-w-2xl mx-auto">
            {settings?.about_intro_text ||
              '私たちは、作品を"差し出す"という行為に、最大限の敬意と遊び心を込めています。「めしあがれ」——この言葉に込めた想いが、すべての活動の起点です。'}
          </p>
          <div className="mt-12">
            <CTAButton href="/about" variant="outline" size="md">
              もっと知る <ArrowRight className="ml-2 w-4 h-4 inline" />
            </CTAButton>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-vermillion/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* ─── Pick Up Contents ─── */}
      {contents.length > 0 && (
        <section className="px-8 md:px-16 py-28 md:py-36 bg-surface">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-vermillion font-medium mb-2 block">Curation</span>
              <h2 className="font-headline text-4xl md:text-5xl font-black text-ink">Specials</h2>
            </div>
            <Link href="/contents" className="font-medium text-sm text-vermillion hover:text-vermillion-dark flex items-center gap-2 transition-colors group">
              VIEW ALL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-7 group relative overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-surface-alt h-[400px] md:h-[560px] shadow-xl hover:shadow-2xl transition-all">
              {contents[0]?.thumbnail_url ? (
                <img src={contents[0].thumbnail_url} alt={contents[0].title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-ink/80 to-ink flex items-center justify-center">
                  <span className="text-white/10 font-headline text-8xl">C</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-8 md:p-10 flex flex-col justify-end">
                <span className="inline-block w-fit px-3 py-1 rounded bg-vermillion text-white font-bold text-[10px] tracking-widest mb-4 uppercase">
                  {contents[0].category || 'PICK UP'}
                </span>
                <h3 className="text-white font-headline text-2xl md:text-4xl mb-6 leading-tight line-clamp-3">
                  {contents[0].title}
                </h3>
                <Link href={`/contents/${contents[0].slug}`}
                  className="w-fit bg-vermillion text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-white hover:text-vermillion transition-all shadow-lg">
                  READ
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
              {contents.slice(1, 3).map((c) => (
                <Link key={c.id} href={`/contents/${c.slug}`}
                  className="group flex-1 rounded-2xl md:rounded-[1.5rem] overflow-hidden relative shadow-lg hover:-translate-y-1 transition-transform duration-500 min-h-[220px]">
                  {c.thumbnail_url ? (
                    <img src={c.thumbnail_url} alt={c.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 absolute inset-0" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-alt to-border" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-ink/70 to-transparent">
                    <h4 className="text-white font-headline text-xl md:text-2xl line-clamp-2">{c.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Talents ─── */}
      {artists.length > 0 && (
        <section className="px-8 md:px-16 py-28 md:py-36 bg-vermillion/5 rounded-[2rem] md:rounded-[3.5rem] mx-4 md:mx-8">
          <div className="text-center mb-20">
            <span className="font-medium text-xs tracking-[0.4em] uppercase text-vermillion mb-4 block">Creative Minds</span>
            <h2 className="font-headline text-5xl md:text-6xl font-black text-ink">Talents</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 max-w-6xl mx-auto">
            {artists.slice(0, 3).map((artist, i) => (
              <Link key={artist.id} href={`/talent/${artist.slug}`}
                className={`group text-center ${i === 1 ? 'md:translate-y-12' : ''}`}>
                <div className="aspect-[4/5] bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-6 relative shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
                  {artist.profile_image_url || artist.thumbnail_url ? (
                    <img src={artist.profile_image_url || artist.thumbnail_url!} alt={artist.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-surface to-surface-alt flex items-center justify-center">
                      <span className="text-6xl font-black text-ink-muted/10">{artist.name.charAt(0)}</span>
                    </div>
                  )}
                  {artist.member_color && (
                    <div className="absolute bottom-0 inset-x-0 h-1" style={{ backgroundColor: artist.member_color }} />
                  )}
                </div>
                <span className="font-medium text-xs tracking-widest text-vermillion mb-2 block uppercase">
                  {artist.role || 'Artist'}
                </span>
                <h3 className="font-headline text-2xl md:text-3xl mb-3 text-ink">{artist.name}</h3>
                {artist.short_copy && (
                  <p className="text-sm text-ink-light/60 leading-relaxed italic line-clamp-2">
                    「{artist.short_copy}」
                  </p>
                )}
              </Link>
            ))}
          </div>

          {artists.length > 3 && (
            <div className="text-center mt-16">
              <CTAButton href="/talent" variant="outline" size="md">
                すべてのアーティストを見る
              </CTAButton>
            </div>
          )}
        </section>
      )}

      {/* ─── Special / Playful Banner ─── */}
      {specials.length > 0 ? (
        <section className="px-4 md:px-16 py-28 md:py-36">
          <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] group shadow-2xl">
            {specials[0].thumbnail_url || specials[0].hero_image_url ? (
              <img src={specials[0].hero_image_url || specials[0].thumbnail_url!} alt={specials[0].title}
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-ink via-ink/90 to-vermillion-dark" />
            )}
            <div className="absolute inset-0 bg-vermillion/30 flex flex-col items-center justify-center text-center p-8 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700">
              <span className="text-white font-medium text-sm tracking-[0.5em] mb-6 uppercase drop-shadow-lg">
                Special
              </span>
              <h2 className="text-white font-headline text-4xl md:text-7xl mb-10 drop-shadow-xl font-black leading-tight">
                {specials[0].title}
              </h2>
              <div className="relative">
                <div className="absolute -top-10 -right-10 bg-gold text-white text-[10px] font-bold py-1.5 px-3 rounded-full rotate-12 animate-pulse z-20">
                  NEW
                </div>
                <Link href={`/special/${specials[0].slug}`}
                  className="group/btn relative px-12 py-5 bg-white text-vermillion font-black tracking-widest overflow-hidden rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-block">
                  <span className="relative z-10 group-hover/btn:text-white transition-colors uppercase text-sm">
                    {specials[0].cta_text || 'くわしく見る'}
                  </span>
                  <div className="absolute inset-0 bg-vermillion translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 rounded-full" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 md:px-16 py-28 md:py-36">
          <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] group shadow-2xl bg-ink">
            <div className="absolute inset-0 bg-vermillion/20 flex flex-col items-center justify-center text-center p-8">
              <span className="text-white/60 font-medium text-sm tracking-[0.5em] mb-6 uppercase">Experimental Phase</span>
              <h2 className="text-white font-headline text-4xl md:text-7xl mb-10 font-black">秘密の招待状</h2>
              <div className="relative">
                <div className="absolute -top-10 -right-10 bg-gold text-white text-[10px] font-bold py-1.5 px-3 rounded-full rotate-12 animate-pulse z-20">
                  押さないで？
                </div>
                <Link href="/special"
                  className="group/btn relative px-14 py-5 bg-white text-vermillion font-black tracking-widest overflow-hidden rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-block">
                  <span className="relative z-10 group-hover/btn:text-white transition-colors uppercase italic text-sm">
                    開けてはいけないボタン
                  </span>
                  <div className="absolute inset-0 bg-vermillion translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 rounded-full" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Works + News Side by Side ─── */}
      <section className="px-8 md:px-16 py-28 md:py-36 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        <div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-headline text-3xl md:text-4xl font-black text-vermillion">Portfolio</h2>
            <div className="h-px flex-grow mx-6 bg-vermillion/10" />
            <Link href="/works" className="text-xs text-ink-muted hover:text-vermillion transition-colors tracking-widest uppercase font-medium">
              All
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {works.slice(0, 5).map((work, i) => (
              <Link key={work.id} href={work.external_url || `/works/${work.slug}`}
                {...(work.external_url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex gap-6 items-center p-5 rounded-2xl hover:bg-vermillion/5 transition-all">
                <span className="font-headline text-3xl text-vermillion font-black opacity-15 group-hover:opacity-100 group-hover:scale-110 transition-all tabular-nums w-10 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-base mb-1 truncate group-hover:text-vermillion transition-colors">{work.title}</h4>
                  <p className="text-xs font-medium text-ink-muted/60 uppercase tracking-widest">
                    {WORK_TYPE_LABELS[work.work_type] || work.work_type}
                    {work.event_date && <> · {formatDateShort(work.event_date)}</>}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-headline text-3xl md:text-4xl font-black text-vermillion">Journal</h2>
            <div className="h-px flex-grow mx-6 bg-vermillion/10" />
            <Link href="/news" className="text-xs text-ink-muted hover:text-vermillion transition-colors tracking-widest uppercase font-medium">
              All
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {newsList.slice(0, 4).map((news, i) => {
              const borderColors = ['border-vermillion', 'border-gold', 'border-ink', 'border-vermillion-light']
              return (
                <Link key={news.id} href={news.external_url || `/news/${news.slug}`}
                  {...(news.external_url ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`bg-surface-alt rounded-2xl p-6 border-l-4 ${borderColors[i % borderColors.length]} hover:translate-x-2 transition-transform group`}>
                  <time className="font-medium text-xs text-ink-muted/50 mb-2 block">
                    {formatDateShort(news.published_at)}
                    {news.category && (
                      <span className="ml-3 text-vermillion/60">{NEWS_CATEGORY_LABELS[news.category]}</span>
                    )}
                  </time>
                  <h4 className="font-bold text-base group-hover:text-vermillion transition-colors leading-snug line-clamp-2">
                    {news.title}
                  </h4>
                </Link>
              )
            })}
            {newsList.length === 0 && (
              <p className="text-center text-ink-muted py-8">ニュースはまだありません。</p>
            )}
          </div>
        </div>
      </section>

      {/* ─── Audition CTA ─── */}
      <section className="py-28 md:py-36 bg-vermillion text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="relative mx-auto max-w-3xl px-8 text-center">
          <span className="text-xs tracking-[0.3em] font-medium mb-4 text-white/50 uppercase block">Audition</span>
          <h2 className="font-headline text-3xl md:text-5xl font-black">
            {settings?.audition_banner_title || '仲間、募集中。'}
          </h2>
          <p className="mt-8 text-base md:text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
            {settings?.audition_banner_text ||
              'あなたの熱量を、ここで。めしあがレーベルでは、共に作品を届ける仲間を募集しています。'}
          </p>
          <div className="mt-10">
            <Link href="/audition"
              className="inline-flex items-center justify-center px-9 py-4 text-base font-bold border-2 border-white text-white hover:bg-white hover:text-vermillion transition-all rounded-full">
              詳しく見る
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section className="py-28 md:py-36 bg-surface">
        <div className="mx-auto max-w-3xl px-8 text-center">
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
