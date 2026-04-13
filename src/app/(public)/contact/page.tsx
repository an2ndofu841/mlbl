import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/page-header'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'CONTACT',
  description: 'めしあがレーベルへのお問い合わせ。出演依頼、取材、コラボレーションなど。',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="CONTACT"
        subtitle="Get in Touch"
        description="出演依頼・取材・コラボレーションなど、お気軽にご連絡ください。"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-2xl px-6">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
