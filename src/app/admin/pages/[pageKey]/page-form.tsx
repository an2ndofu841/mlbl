'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import {
  FormField,
  FormInput,
  FormTextarea,
  FormActions,
  FormSection,
  SEOFields,
  PageAdvancedSeo,
} from '@/components/admin/admin-form'
import { savePage, type SavePageResult } from './actions'
import type { Page } from '@/types/database'

export function PageForm({ row }: { row: Page }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SavePageResult | null>(null)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await savePage(formData)
      if ('ok' in res && res.ok) {
        router.push('/admin/pages')
        router.refresh()
        return
      }
      setResult(res)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-4xl">
      {result && 'error' in result && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">{result.error}</div>
      )}
      <input type="hidden" name="page_key" value={row.page_key} />

      <FormSection title="ページ">
        <p className="text-sm text-gray-500 mb-2">
          ページキー: <span className="font-mono text-gray-800">{row.page_key}</span>
        </p>
        <FormField label="タイトル" name="title" required>
          <FormInput name="title" defaultValue={row.title} required />
        </FormField>
        <FormField label="本文（HTML不可のプレーンテキスト。FAQは JSON 配列も可）" name="body">
          <FormTextarea name="body" rows={16} defaultValue={row.body ?? ''} />
        </FormField>
        <p className="text-xs text-gray-500">
          FAQ の例: <code className="bg-gray-100 px-1">[&#123;&quot;q&quot;:&quot;質問&quot;,&quot;a&quot;:&quot;回答&quot;&#125;]</code>
        </p>
      </FormSection>

      <SEOFields seoTitle={row.seo_title} seoDescription={row.seo_description} ogImageUrl={row.og_image_url} />
      <PageAdvancedSeo noindex={row.noindex} canonicalUrl={row.canonical_url} />

      <FormActions isPending={pending} cancelHref="/admin/pages" />
    </form>
  )
}
