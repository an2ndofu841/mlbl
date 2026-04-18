import type { Metadata } from 'next'
import { CTAButton } from '@/components/ui/cta-button'
import { getPage } from '@/lib/queries'
import { buildDetailMetadata } from '@/lib/seo'
import { Building2, MapPin, Mail, Globe, Calendar, Users, Briefcase } from 'lucide-react'

const VIDEO_BASE = 'https://ltzcmmvaeemmwqukpzcw.supabase.co/storage/v1/object/public/cms-videos'

const COMPANY_INFO = [
  { label: '会社名', value: '株式会社めしあがレーベル' },
  { label: '所在地', value: '〒150-0044\n東京都渋谷区円山町5番3号 MIEUX渋谷ビル8階' },
  {
    label: '事業内容',
    value:
      'タレントマネジメント / コンテンツ企画・制作 / イベント企画・運営 / メディア運営 / 広告・プロモーション支援 / SNSマーケティング',
  },
  { label: 'メール', value: 'info@mlbl.co.jp' },
]

const SERVICES = [
  {
    icon: Users,
    title: 'タレントマネジメント',
    description:
      '所属タレントの育成・マネジメントを行い、企業様のプロモーションやイベント出演など、最適なキャスティングをご提案します。',
  },
  {
    icon: Globe,
    title: 'コンテンツ企画・制作',
    description:
      '動画・音楽・ライブ配信など、SNS時代に最適化されたコンテンツの企画から制作・運用までをワンストップで対応します。',
  },
  {
    icon: Briefcase,
    title: 'イベント企画・運営',
    description:
      'ファンイベント、企業タイアップイベント、展示会出展サポートなど、目的に合わせたイベントの企画・制作・当日運営を行います。',
  },
  {
    icon: Building2,
    title: '広告・プロモーション支援',
    description:
      'タレントを活用したSNSプロモーション、インフルエンサーマーケティング、タイアップ広告の企画・実施をサポートします。',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('company')
  return buildDetailMetadata({
    title: page?.seo_title || page?.title || 'COMPANY',
    description:
      page?.seo_description ||
      '株式会社めしあがレーベルの会社概要。タレントマネジメント、コンテンツ制作、イベント企画などの事業を展開しています。',
    path: '/company',
    images: page?.og_image_url ? [page.og_image_url] : [],
    noindex: page?.noindex,
    canonicalOverride: page?.canonical_url,
  })
}

export const revalidate = 120

export default async function CompanyPage() {
  const page = await getPage('company')

  return (
    <>
      {/* ════════ Hero: Cinematic FV ════════ */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-on-surface">
        {/* Background video mosaic */}
        <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 grid-rows-2 gap-1 opacity-25">
          <div className="col-span-2 row-span-2 overflow-hidden">
            <video
              src={`${VIDEO_BASE}/td03.mp4`}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="overflow-hidden">
            <video
              src={`${VIDEO_BASE}/sgm01.mp4`}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="hidden md:block overflow-hidden">
            <video
              src={`${VIDEO_BASE}/winordie01.mp4`}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="overflow-hidden">
            <video
              src={`${VIDEO_BASE}/winordie01.mp4`}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="hidden md:block overflow-hidden">
            <video
              src={`${VIDEO_BASE}/td03.mp4`}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-on-surface/60 via-on-surface/70 to-on-surface" />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/40 to-transparent" />

        {/* Floating video cards */}
        <div className="absolute top-28 right-8 md:top-32 md:right-20 w-28 h-20 md:w-44 md:h-28 rounded-2xl overflow-hidden shadow-ambient-lg rotate-6 hero-image-enter opacity-80">
          <video
            src={`${VIDEO_BASE}/sgm01.mp4`}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-32 right-12 md:bottom-40 md:right-32 w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden shadow-ambient-lg -rotate-3 hero-image-enter opacity-70">
          <video
            src={`${VIDEO_BASE}/winordie01.mp4`}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block absolute top-1/2 right-48 w-32 h-20 rounded-xl overflow-hidden shadow-ambient-lg rotate-2 hero-image-enter opacity-60">
          <video
            src={`${VIDEO_BASE}/td03.mp4`}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-24 left-6 md:bottom-32 md:left-16 w-20 h-28 md:w-28 md:h-40 rounded-2xl overflow-hidden shadow-ambient-lg rotate-3 hero-image-enter opacity-60">
          <video
            src={`${VIDEO_BASE}/td03.mp4`}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ambient blobs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-secondary/15 rounded-full blur-[80px] animate-float-delayed" />

        {/* Hero text */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-20">
          <p className="text-[11px] tracking-[0.4em] uppercase text-primary-container font-bold mb-6 hero-stagger-1">
            Company
          </p>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight hero-stagger-2">
            {page?.title || (
              <>
                作品を、
                <br />
                <span className="text-primary-container">召し上がれ。</span>
              </>
            )}
          </h1>
          <p className="mt-8 text-base md:text-lg text-white/60 leading-relaxed max-w-lg hero-stagger-3">
            {page?.seo_description ||
              'エンタメの力で企業と人をつなぐ。株式会社めしあがレーベルの会社情報をご紹介します。'}
          </p>

          {/* Scroll indicator */}
          <div className="flex items-center gap-3 mt-16 hero-stagger-4">
            <div className="w-12 h-px bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-primary-container animate-scroll-line" />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-semibold">
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ── 会社概要テーブル ── */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs tracking-[0.3em] text-primary font-medium mb-4">
            OVERVIEW
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
            会社概要
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-primary" />

          <div className="mt-12 divide-y divide-border">
            {COMPANY_INFO.map((row) => (
              <div
                key={row.label}
                className="py-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8"
              >
                <dt className="text-sm font-semibold text-on-surface">
                  {row.label}
                </dt>
                <dd className="text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {row.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 事業内容 ── */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs tracking-[0.3em] text-primary font-medium mb-4">
            SERVICES
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
            事業内容
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-primary" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="p-8 bg-surface rounded-2xl shadow-ambient transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-[1.9]">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 私たちの強み ── */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs tracking-[0.3em] text-primary font-medium mb-4">
            STRENGTHS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
            選ばれる理由
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-primary" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: '企画から運用まで\nワンストップ',
                body: 'キャスティング・企画・制作・配信・レポーティングまで、すべてを社内で完結。複数の外注先とのやり取りは不要です。',
              },
              {
                number: '02',
                title: 'SNS時代に最適化した\nコンテンツ力',
                body: '所属タレントのSNS運用ノウハウを活かし、エンゲージメントの高いコンテンツを企画・制作します。',
              },
              {
                number: '03',
                title: 'スピーディーな\nコミュニケーション',
                body: '少数精鋭体制だからこそ実現する、迅速な意思決定とレスポンス。クライアント様の期待に素早くお応えします。',
              },
            ].map((item) => (
              <div key={item.number} className="text-center">
                <span className="text-5xl font-black text-primary/15 font-[family-name:var(--font-inter)]">
                  {item.number}
                </span>
                <h3 className="mt-3 text-lg font-bold text-on-surface whitespace-pre-line leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-on-surface-variant leading-[1.9]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── アクセス ── */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs tracking-[0.3em] text-primary font-medium mb-4">
            ACCESS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
            アクセス
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-primary" />

          <div className="mt-12 flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-on-surface mb-1">
                    所在地
                  </p>
                  <p className="text-base text-on-surface-variant leading-relaxed">
                    〒150-0044
                    <br />
                    東京都渋谷区円山町5番3号
                    <br />
                    MIEUX渋谷ビル8階
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-on-surface mb-1">
                    最寄り駅
                  </p>
                  <p className="text-base text-on-surface-variant leading-relaxed">
                    JR / 東京メトロ / 東急 / 京王「渋谷駅」より徒歩約5分
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-on-surface mb-1">
                    メール
                  </p>
                  <p className="text-base text-on-surface-variant leading-relaxed">
                    info@mlbl.co.jp
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-ambient">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d139.693!3d35.656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b57a4e47e7d%3A0x0!2z5p2x5Lqs6YO95riL6LC35Yy65YaG5bGx55S6!5e0!3m2!1sja!2sjp!4v1700000000000"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="株式会社めしあがレーベル所在地"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight mb-4">
            お仕事のご依頼・ご相談
          </h2>
          <p className="text-base text-on-surface-variant leading-relaxed mb-10 max-w-xl mx-auto">
            タレントキャスティング、コンテンツ制作、イベント企画など、お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton href="/contact" variant="primary" size="lg">
              お問い合わせ
            </CTAButton>
            <CTAButton href="/works" variant="outline" size="lg">
              実績を見る
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
