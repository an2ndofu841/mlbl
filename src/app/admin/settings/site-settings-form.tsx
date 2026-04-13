'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import {
  FormField,
  FormInput,
  FormTextarea,
  FormActions,
  FormSection,
} from '@/components/admin/admin-form'
import { saveSiteSettings, type SaveSettingsResult } from './actions'
import type { SiteSettings } from '@/types/database'

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveSettingsResult | null>(null)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveSiteSettings(formData)
      if ('ok' in res && res.ok) {
        router.refresh()
        return
      }
      setResult(res)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-3xl">
      {result && 'error' in result && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">{result.error}</div>
      )}

      <FormSection title="基本">
        <FormField label="サイト名" name="site_name" required>
          <FormInput name="site_name" defaultValue={settings.site_name} required />
        </FormField>
        <FormField label="サイト説明" name="site_description">
          <FormTextarea name="site_description" rows={2} defaultValue={settings.site_description ?? ''} />
        </FormField>
        <FormField label="フッターテキスト" name="footer_text">
          <FormTextarea name="footer_text" rows={2} defaultValue={settings.footer_text ?? ''} />
        </FormField>
        <FormField label="問い合わせ受付メール（自動返信の To 想定）" name="contact_email">
          <FormInput name="contact_email" type="email" defaultValue={settings.contact_email ?? ''} />
        </FormField>
      </FormSection>

      <FormSection title="ブランド画像">
        <FormField label="ロゴURL" name="logo_url">
          <FormInput name="logo_url" type="url" defaultValue={settings.logo_url ?? ''} />
        </FormField>
        <FormField label="ファビコンURL" name="favicon_url">
          <FormInput name="favicon_url" type="url" defaultValue={settings.favicon_url ?? ''} />
        </FormField>
        <FormField label="デフォルトOGP画像" name="default_og_image_url">
          <FormInput name="default_og_image_url" type="url" defaultValue={settings.default_og_image_url ?? ''} />
        </FormField>
      </FormSection>

      <FormSection title="SNS">
        <FormField label="X" name="x_url">
          <FormInput name="x_url" type="url" defaultValue={settings.x_url ?? ''} />
        </FormField>
        <FormField label="Instagram" name="instagram_url">
          <FormInput name="instagram_url" type="url" defaultValue={settings.instagram_url ?? ''} />
        </FormField>
        <FormField label="TikTok" name="tiktok_url">
          <FormInput name="tiktok_url" type="url" defaultValue={settings.tiktok_url ?? ''} />
        </FormField>
        <FormField label="YouTube" name="youtube_url">
          <FormInput name="youtube_url" type="url" defaultValue={settings.youtube_url ?? ''} />
        </FormField>
      </FormSection>

      <FormActions isPending={pending} cancelHref="/admin" submitLabel="保存" />
    </form>
  )
}
