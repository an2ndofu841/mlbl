'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FormField, FormInput, FormTextarea, FormActions, FormSection } from '@/components/admin/admin-form'
import { saveTopPageSettings, type SaveTopResult } from './actions'
import type { TopPageSettings } from '@/types/database'

type ContentPick = { id: string; title: string; slug: string; status: string }

export function TopSettingsForm({
  top,
  publishedContents,
}: {
  top: TopPageSettings
  publishedContents: ContentPick[]
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveTopResult | null>(null)
  const selected = new Set(top.pickup_content_ids ?? [])

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveTopPageSettings(formData)
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

      <FormSection title="ヒーロー">
        <FormField label="メインコピー" name="hero_title">
          <FormInput name="hero_title" defaultValue={top.hero_title ?? ''} />
        </FormField>
        <FormField label="サブコピー" name="hero_subtitle">
          <FormTextarea name="hero_subtitle" rows={2} defaultValue={top.hero_subtitle ?? ''} />
        </FormField>
        <FormField label="背景ビジュアルURL" name="hero_background_url">
          <FormInput name="hero_background_url" type="url" defaultValue={top.hero_background_url ?? ''} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="CTA1 文言" name="hero_cta_primary_text">
            <FormInput name="hero_cta_primary_text" defaultValue={top.hero_cta_primary_text ?? ''} />
          </FormField>
          <FormField label="CTA1 URL" name="hero_cta_primary_url">
            <FormInput name="hero_cta_primary_url" defaultValue={top.hero_cta_primary_url ?? ''} />
          </FormField>
          <FormField label="CTA2 文言" name="hero_cta_secondary_text">
            <FormInput name="hero_cta_secondary_text" defaultValue={top.hero_cta_secondary_text ?? ''} />
          </FormField>
          <FormField label="CTA2 URL" name="hero_cta_secondary_url">
            <FormInput name="hero_cta_secondary_url" defaultValue={top.hero_cta_secondary_url ?? ''} />
          </FormField>
        </div>
      </FormSection>

      <FormSection title="ABOUT 導入（TOP）">
        <FormField label="見出し" name="about_intro_title">
          <FormInput name="about_intro_title" defaultValue={top.about_intro_title ?? ''} />
        </FormField>
        <FormField label="本文" name="about_intro_text">
          <FormTextarea name="about_intro_text" rows={4} defaultValue={top.about_intro_text ?? ''} />
        </FormField>
      </FormSection>

      <FormSection title="PICK UP コンテンツ">
        <p className="text-sm text-gray-500 mb-3">表示順はチェックを付けた順ではなく、下の一覧上からの順で保存されます（複数選択可）。</p>
        <div className="max-h-64 overflow-y-auto border border-gray-100 rounded-md p-3 space-y-2">
          {publishedContents.map((c) => (
            <label key={c.id} className="flex items-start gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="pickup_content_id"
                value={c.id}
                defaultChecked={selected.has(c.id)}
                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span>
                <span className="font-medium text-gray-900">{c.title}</span>
                <span className="text-gray-400 text-xs ml-2">{c.slug}</span>
              </span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">未選択の場合は「注目」→新着順で TOP に表示します。</p>
      </FormSection>

      <FormSection title="オーディションバナー">
        <FormField label="見出し" name="audition_banner_title">
          <FormInput name="audition_banner_title" defaultValue={top.audition_banner_title ?? ''} />
        </FormField>
        <FormField label="本文" name="audition_banner_text">
          <FormTextarea name="audition_banner_text" rows={3} defaultValue={top.audition_banner_text ?? ''} />
        </FormField>
      </FormSection>

      <FormActions isPending={pending} cancelHref="/admin" submitLabel="保存" />
    </form>
  )
}
