'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import {
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormActions,
  FormSection,
  SEOFields,
} from '@/components/admin/admin-form'
import { saveSpecial, type SaveSpecialResult } from './actions'
import type { Special } from '@/types/database'
import { SPECIAL_TEMPLATE_LABELS } from '@/lib/utils'

const STATUSES = [
  { value: 'draft', label: '下書き' },
  { value: 'published', label: '公開' },
  { value: 'archived', label: 'アーカイブ' },
] as const

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function SpecialForm({
  row,
  allArtists,
  linkedArtistIds,
}: {
  row: Special | null
  allArtists: { id: string; name: string }[]
  linkedArtistIds: string[]
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveSpecialResult | null>(null)
  const linked = new Set(linkedArtistIds)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveSpecial(formData)
      if ('ok' in res && res.ok) {
        router.push('/admin/specials')
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
      {row && <input type="hidden" name="id" value={row.id} />}

      <FormSection title="特設企画">
        <FormField label="タイトル" name="title" required>
          <FormInput name="title" defaultValue={row?.title ?? ''} required />
        </FormField>
        <FormField label="スラッグ" name="slug" required>
          <FormInput name="slug" defaultValue={row?.slug ?? ''} required />
        </FormField>
        <FormField label="サブタイトル" name="subtitle">
          <FormInput name="subtitle" defaultValue={row?.subtitle ?? ''} />
        </FormField>
        <FormField label="サムネイルURL" name="thumbnail_url">
          <FormInput name="thumbnail_url" type="url" defaultValue={row?.thumbnail_url ?? ''} />
        </FormField>
        <FormField label="ヒーロー画像URL" name="hero_image_url">
          <FormInput name="hero_image_url" type="url" defaultValue={row?.hero_image_url ?? ''} />
        </FormField>
        <FormField label="リード" name="summary">
          <FormTextarea name="summary" rows={3} defaultValue={row?.summary ?? ''} />
        </FormField>
        <FormField label="本文" name="body">
          <FormTextarea name="body" rows={10} defaultValue={row?.body ?? ''} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="テンプレート" name="template_type">
            <FormSelect name="template_type" defaultValue={row?.template_type ?? 'standard'}>
              {Object.entries(SPECIAL_TEMPLATE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </FormSelect>
          </FormField>
          <FormField label="ステータス" name="status">
            <FormSelect name="status" defaultValue={row?.status ?? 'draft'}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </FormSelect>
          </FormField>
          <FormField label="公開開始" name="publish_start_at">
            <FormInput
              type="datetime-local"
              name="publish_start_at"
              defaultValue={toDatetimeLocal(row?.publish_start_at ?? null)}
            />
          </FormField>
          <FormField label="公開終了" name="publish_end_at">
            <FormInput
              type="datetime-local"
              name="publish_end_at"
              defaultValue={toDatetimeLocal(row?.publish_end_at ?? null)}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="CTA文言" name="cta_text">
            <FormInput name="cta_text" defaultValue={row?.cta_text ?? ''} />
          </FormField>
          <FormField label="CTA URL" name="cta_url">
            <FormInput name="cta_url" type="url" defaultValue={row?.cta_url ?? ''} />
          </FormField>
        </div>
        <FormCheckbox name="featured" defaultChecked={row?.featured ?? false} label="注目" />
      </FormSection>

      <FormSection title="関連アーティスト">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border border-gray-100 rounded-md p-3">
          {allArtists.map((a) => (
            <label key={a.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="artist_id"
                value={a.id}
                defaultChecked={linked.has(a.id)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded"
              />
              <span>{a.name}</span>
            </label>
          ))}
        </div>
      </FormSection>

      <SEOFields seoTitle={row?.seo_title} seoDescription={row?.seo_description} ogImageUrl={row?.og_image_url} />

      <FormActions isPending={pending} cancelHref="/admin/specials" />
    </form>
  )
}
