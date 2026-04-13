import type { Metadata } from 'next'
import { getActiveAuditions } from '@/lib/queries'
import { PageHeader } from '@/components/ui/page-header'
import { CTAButton } from '@/components/ui/cta-button'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'AUDITION',
  description: 'めしあがレーベルのオーディション情報。一緒に作品を届ける仲間を募集しています。',
}

export const revalidate = 60

export default async function AuditionPage() {
  const auditions = await getActiveAuditions()

  return (
    <>
      <PageHeader
        title="AUDITION"
        subtitle="Join Us"
        description="あなたの熱量を、ここで。めしあがレーベルでは、共に作品を届ける仲間を募集しています。"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-3xl px-6">
          {auditions.length > 0 ? (
            <div className="space-y-16">
              {auditions.map((audition) => (
                <article key={audition.id} className="pb-16 border-b border-border-light last:border-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-ink">{audition.title}</h2>

                  {audition.deadline && (
                    <p className="mt-3 text-sm text-vermillion font-medium">
                      応募締切：{formatDate(audition.deadline)}
                    </p>
                  )}

                  {audition.summary && (
                    <p className="mt-6 text-base text-ink-light leading-[2]">{audition.summary}</p>
                  )}

                  {audition.body && (
                    <div className="mt-8 rich-text text-ink-light whitespace-pre-wrap">
                      {audition.body}
                    </div>
                  )}

                  {audition.requirements && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-ink mb-4">応募条件</h3>
                      <div className="text-sm text-ink-light leading-[2] whitespace-pre-wrap">
                        {audition.requirements}
                      </div>
                    </div>
                  )}

                  {audition.application_url && (
                    <div className="mt-10">
                      <CTAButton href={audition.application_url} variant="secondary" size="lg" external>
                        応募する
                      </CTAButton>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-ink mb-4">現在、募集は行っておりません。</p>
              <p className="text-ink-light">
                新しいオーディション情報は、NEWSページやSNSでお知らせします。
              </p>
              <div className="mt-8">
                <CTAButton href="/news" variant="outline" size="md">
                  NEWSを見る
                </CTAButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
