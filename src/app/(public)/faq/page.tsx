import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { FAQAccordion } from './faq-accordion'
import { getPage } from '@/lib/queries'
import { buildDetailMetadata } from '@/lib/seo'

const FAQ_DEFAULT = [
  {
    q: 'めしあがレーベルとは何ですか？',
    a: '「めしあがレーベル」は、タレントマネジメント・コンテンツ制作・イベント企画を行うエンタメレーベルです。"作品を差し出す"という精神を軸に活動しています。',
  },
  {
    q: '所属タレントになるにはどうすればいいですか？',
    a: 'オーディションページから応募いただけます。不定期で募集を行っておりますので、最新のオーディション情報はNEWSページをご確認ください。',
  },
  {
    q: '出演依頼はどこからできますか？',
    a: 'CONTACTページのフォームから「出演依頼」を選択してお問い合わせください。内容を確認の上、担当よりご連絡いたします。',
  },
]

function parseFaqItems(body: string | null): { q: string; a: string }[] {
  if (!body?.trim()) return FAQ_DEFAULT
  try {
    const parsed = JSON.parse(body) as unknown
    if (!Array.isArray(parsed)) return FAQ_DEFAULT
    const items = parsed
      .filter((row): row is { q: string; a: string } => {
        if (!row || typeof row !== 'object') return false
        const r = row as Record<string, unknown>
        return typeof r.q === 'string' && typeof r.a === 'string'
      })
      .map((row) => ({ q: row.q, a: row.a }))
    return items.length ? items : FAQ_DEFAULT
  } catch {
    return FAQ_DEFAULT
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('faq')
  return buildDetailMetadata({
    title: page?.seo_title || page?.title || 'FAQ',
    description: page?.seo_description || 'めしあがレーベルに関するよくある質問。',
    path: '/faq',
    images: page?.og_image_url ? [page.og_image_url] : [],
    noindex: page?.noindex,
    canonicalOverride: page?.canonical_url,
  })
}

export const revalidate = 120

export default async function FAQPage() {
  const page = await getPage('faq')
  const items = parseFaqItems(page?.body ?? null)

  return (
    <>
      <PageHeader
        title={page?.title || 'FAQ'}
        subtitle="Frequently Asked Questions"
        description="よくいただくご質問をまとめました。"
      />

      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6">
          <FAQAccordion items={items} />
        </div>
      </section>
    </>
  )
}
