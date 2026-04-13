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
import { saveAudition, type SaveAuditionResult } from './actions'
import type { Audition } from '@/types/database'
import { AUDITION_STATUS_LABELS } from '@/lib/utils'

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function AuditionForm({ row }: { row: Audition | null }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveAuditionResult | null>(null)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveAudition(formData)
      if ('ok' in res && res.ok) {
        router.push('/admin/auditions')
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

      <FormSection title="オーディション">
        <FormField label="タイトル" name="title" required>
          <FormInput name="title" defaultValue={row?.title ?? ''} required />
        </FormField>
        <FormField label="スラッグ" name="slug" required>
          <FormInput name="slug" defaultValue={row?.slug ?? ''} required />
        </FormField>
        <FormField label="ステータス" name="status">
          <FormSelect name="status" defaultValue={row?.status ?? 'draft'}>
            {Object.entries(AUDITION_STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </FormSelect>
        </FormField>
        <FormField label="リード" name="summary">
          <FormTextarea name="summary" rows={3} defaultValue={row?.summary ?? ''} />
        </FormField>
        <FormField label="本文（募集要項・求める人物像など）" name="body">
          <FormTextarea name="body" rows={10} defaultValue={row?.body ?? ''} />
        </FormField>
        <FormField label="応募条件" name="requirements">
          <FormTextarea name="requirements" rows={6} defaultValue={row?.requirements ?? ''} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="応募URL" name="application_url">
            <FormInput name="application_url" type="url" defaultValue={row?.application_url ?? ''} />
          </FormField>
          <FormField label="締切" name="deadline">
            <FormInput type="datetime-local" name="deadline" defaultValue={toDatetimeLocal(row?.deadline ?? null)} />
          </FormField>
        </div>
        <FormCheckbox name="featured" defaultChecked={row?.featured ?? false} label="注目" />
      </FormSection>

      <FormActions isPending={pending} cancelHref="/admin/auditions" />
    </form>
  )
}
