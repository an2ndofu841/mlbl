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
} from '@/components/admin/admin-form'
import { saveWork, type SaveWorkResult } from './actions'
import type { Work } from '@/types/database'
import { WORK_TYPE_LABELS } from '@/lib/utils'

export function WorkForm({
  row,
  allArtists,
  linkedArtistIds,
}: {
  row: Work | null
  allArtists: { id: string; name: string }[]
  linkedArtistIds: string[]
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveWorkResult | null>(null)
  const linked = new Set(linkedArtistIds)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveWork(formData)
      if ('ok' in res && res.ok) {
        router.push('/admin/works')
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

      <FormSection title="実績">
        <FormField label="タイトル" name="title" required>
          <FormInput name="title" defaultValue={row?.title ?? ''} required />
        </FormField>
        <FormField label="スラッグ（詳細ページURL）" name="slug" required>
          <FormInput name="slug" defaultValue={row?.slug ?? ''} required />
        </FormField>
        <FormField label="概要" name="description">
          <FormTextarea name="description" rows={4} defaultValue={row?.description ?? ''} />
        </FormField>
        <FormField label="サムネイルURL" name="thumbnail_url">
          <FormInput name="thumbnail_url" type="url" defaultValue={row?.thumbnail_url ?? ''} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="種別" name="work_type">
            <FormSelect name="work_type" defaultValue={row?.work_type ?? 'other'}>
              {Object.entries(WORK_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </FormSelect>
          </FormField>
          <FormField label="イベント日" name="event_date">
            <FormInput type="date" name="event_date" defaultValue={row?.event_date ?? ''} />
          </FormField>
          <FormField label="外部リンク（任意）" name="external_url">
            <FormInput name="external_url" type="url" defaultValue={row?.external_url ?? ''} />
          </FormField>
          <FormField label="表示順" name="sort_order">
            <FormInput name="sort_order" type="number" defaultValue={String(row?.sort_order ?? 0)} />
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
                className="w-4 h-4 text-red-600 border-gray-300 rounded"
              />
              <span>{a.name}</span>
            </label>
          ))}
        </div>
      </FormSection>

      <FormActions isPending={pending} cancelHref="/admin/works" />
    </form>
  )
}
