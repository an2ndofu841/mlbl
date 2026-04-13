'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FormField, FormInput, FormActions, FormSection } from '@/components/admin/admin-form'
import { saveDefaultOgImage, type SaveSeoSnippetResult } from './actions'
import type { SiteSettings } from '@/types/database'

export function SeoSettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveSeoSnippetResult | null>(null)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveDefaultOgImage(formData)
      if ('ok' in res && res.ok) {
        router.refresh()
        return
      }
      setResult(res)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-3xl">
      {result && 'error' in result && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">{result.error}</div>
      )}

      <FormSection title="デフォルトOGP">
        <FormField label="デフォルトOGP画像URL" name="default_og_image_url">
          <FormInput name="default_og_image_url" type="url" defaultValue={settings.default_og_image_url ?? ''} />
        </FormField>
        <p className="text-xs text-gray-500">
          各ページで OGP 画像が未設定のときに使われます。サイト名・説明は「共通設定」で編集してください。
        </p>
      </FormSection>

      <FormActions isPending={pending} cancelHref="/admin" submitLabel="SEO設定を保存" />
    </form>
  )
}
