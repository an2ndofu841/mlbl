import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getSpecialBySlug } from '@/lib/queries'
import { CTAButton } from '@/components/ui/cta-button'
import { buildDetailMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const special = await getSpecialBySlug(slug)
  if (!special) return {}
  const images = special.og_image_url ? [special.og_image_url] : special.hero_image_url ? [special.hero_image_url] : []
  return buildDetailMetadata({
    title: special.seo_title || special.title,
    description: special.seo_description || special.summary || special.title,
    path: `/special/${special.slug}`,
    images,
  })
}

export const revalidate = 60

export default async function SpecialDetailPage({ params }: Props) {
  const { slug } = await params
  const special = await getSpecialBySlug(slug)
  if (!special) notFound()

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end bg-ink overflow-hidden">
        {special.hero_image_url && (
          <img
            src={special.hero_image_url}
            alt={special.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-40 w-full">
          <Link href="/special" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> SPECIAL一覧に戻る
          </Link>
          <p className="text-xs tracking-[0.3em] text-vermillion-light font-medium mb-3">SPECIAL</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {special.title}
          </h1>
          {special.subtitle && (
            <p className="mt-4 text-lg text-white/70">{special.subtitle}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className={`mx-auto px-6 ${special.template_type === 'lp' ? 'max-w-5xl' : 'max-w-3xl'}`}>
          {special.summary && (
            <p className="text-lg text-ink-light leading-[2] mb-12">{special.summary}</p>
          )}

          {special.body && (
            <div className="rich-text text-ink-light whitespace-pre-wrap">
              {special.body}
            </div>
          )}

          {special.cta_text && special.cta_url && (
            <div className="mt-16 text-center">
              <CTAButton href={special.cta_url} variant="secondary" size="lg">
                {special.cta_text}
              </CTAButton>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
