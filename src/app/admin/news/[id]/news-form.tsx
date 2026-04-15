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
import { saveNews, type SaveNewsResult } from './actions'
import type { News } from '@/types/database'
import { NEWS_CATEGORY_LABELS } from '@/lib/utils'

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

export function NewsForm({
  news,
  allArtists,
  linkedArtistIds,
}: {
  news: News | null
  allArtists: { id: string; name: string }[]
  linkedArtistIds: string[]
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveNewsResult | null>(null)
  const linked = new Set(linkedArtistIds)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveNews(formData)
      if ('ok' in res && res.ok) {
        router.push('/admin/news')
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
      {news && <input type="hidden" name="id" value={news.id} />}

      <FormSection title="記事">
        <FormField label="タイトル" name="title" required>
          <FormInput name="title" defaultValue={news?.title ?? ''} required />
        </FormField>
        <FormField label="スラッグ" name="slug" required>
          <FormInput name="slug" defaultValue={news?.slug ?? ''} required />
        </FormField>
        <FormField label="抜粋" name="excerpt">
          <FormTextarea name="excerpt" rows={2} defaultValue={news?.excerpt ?? ''} />
        </FormField>
        <FormField label="サムネイルURL" name="thumbnail_url">
          <FormInput name="thumbnail_url" type="url" defaultValue={news?.thumbnail_url ?? ''} />
        </FormField>
        <FormField label="本文" name="body">
          <FormTextarea name="body" rows={12} defaultValue={news?.body ?? ''} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="カテゴリ" name="category">
            <FormSelect name="category" defaultValue={news?.category ?? 'other'}>
              {Object.entries(NEWS_CATEGORY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </FormSelect>
          </FormField>
          <FormField label="ステータス" name="status">
            <FormSelect name="status" defaultValue={news?.status ?? 'draft'}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </FormSelect>
          </FormField>
          <FormField label="公開日時" name="published_at">
            <FormInput
              type="datetime-local"
              name="published_at"
              defaultValue={toDatetimeLocal(news?.published_at ?? null)}
            />
          </FormField>
          <FormField label="外部リンク（任意）" name="external_url">
            <FormInput name="external_url" type="url" defaultValue={news?.external_url ?? ''} />
          </FormField>
        </div>
        <div className="flex flex-wrap gap-6">
          <FormCheckbox name="pinned" defaultChecked={news?.pinned ?? false} label="ピン留め" />
          <FormCheckbox name="featured" defaultChecked={news?.featured ?? false} label="注目" />
        </div>
      </FormSection>

      <FormSection title="関連アーティスト">
        <p className="text-sm text-gray-500 mb-3">このニュースに紐づけるアーティストを選択</p>
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

      <SEOFields
        seoTitle={news?.seo_title}
        seoDescription={news?.seo_description}
        ogImageUrl={news?.og_image_url}
      />

      <FormActions isPending={pending} cancelHref="/admin/news" />
    </form>
  )
}
