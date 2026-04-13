import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { getPage } from '@/lib/queries'
import { buildDetailMetadata } from '@/lib/seo'

const FALLBACK_ROWS = [
  { label: '会社名', value: 'めしあがレーベル（運営：株式会社◯◯◯）' },
  { label: '代表', value: '◯◯ ◯◯' },
  { label: '設立', value: '2024年◯月' },
  { label: '所在地', value: '〒000-0000 東京都◯◯区◯◯ 0-0-0' },
  { label: '事業内容', value: 'タレントマネジメント / コンテンツ企画・制作 / イベント企画・運営 / メディア運営' },
  { label: 'メール', value: 'info@meshiaga-label.com' },
]

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('company')
  return buildDetailMetadata({
    title: page?.seo_title || page?.title || 'COMPANY',
    description: page?.seo_description || 'めしあがレーベルの会社概要。',
    path: '/company',
    images: page?.og_image_url ? [page.og_image_url] : [],
    noindex: page?.noindex,
    canonicalOverride: page?.canonical_url,
  })
}

export const revalidate = 120

export default async function CompanyPage() {
  const page = await getPage('company')
  const body = page?.body?.trim()

  return (
    <>
      <PageHeader
        title={page?.title || 'COMPANY'}
        subtitle="Company Info"
        description={page?.seo_description || 'めしあがレーベルの運営情報。'}
      />

      <section className="py-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6">
          {body ? (
            <div className="text-base text-ink-light leading-[2] whitespace-pre-wrap">{body}</div>
          ) : (
            <div className="divide-y divide-border">
              {FALLBACK_ROWS.map((row) => (
                <div key={row.label} className="py-6 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-8">
                  <dt className="text-sm font-medium text-ink-muted">{row.label}</dt>
                  <dd className="text-base text-ink leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
