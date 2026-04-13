'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FormField, FormSelect, FormSection } from '@/components/admin/admin-form'
import { updateContactStatus, type UpdateContactResult } from './actions'
import type { Contact } from '@/types/database'
import { CONTACT_CATEGORY_LABELS, formatDate } from '@/lib/utils'

const STATUSES: { value: Contact['status']; label: string }[] = [
  { value: 'unread', label: '未読' },
  { value: 'read', label: '既読' },
  { value: 'replied', label: '返信済み' },
  { value: 'archived', label: 'アーカイブ' },
]

export function ContactDetail({ contact }: { contact: Contact }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<UpdateContactResult | null>(null)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await updateContactStatus(formData)
      if ('ok' in res && res.ok) {
        router.refresh()
        return
      }
      setResult(res)
    })
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <FormSection title="問い合わせ内容">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-gray-500">受信日時</dt>
            <dd className="font-medium text-gray-900">{formatDate(contact.created_at)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">種別</dt>
            <dd className="font-medium text-gray-900">{CONTACT_CATEGORY_LABELS[contact.category]}</dd>
          </div>
          <div>
            <dt className="text-gray-500">お名前</dt>
            <dd className="font-medium text-gray-900">{contact.name}</dd>
          </div>
          <div>
            <dt className="text-gray-500">メール</dt>
            <dd>
              <a href={`mailto:${contact.email}`} className="text-red-600 hover:underline">
                {contact.email}
              </a>
            </dd>
          </div>
          {contact.company && (
            <div>
              <dt className="text-gray-500">会社・団体</dt>
              <dd>{contact.company}</dd>
            </div>
          )}
          <div>
            <dt className="text-gray-500 mb-2">メッセージ</dt>
            <dd className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md border border-gray-100">{contact.message}</dd>
          </div>
        </dl>
      </FormSection>

      <form action={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        {result && 'error' in result && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded">{result.error}</div>
        )}
        <input type="hidden" name="id" value={contact.id} />
        <FormField label="ステータス" name="status">
          <FormSelect name="status" defaultValue={contact.status}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </FormSelect>
        </FormField>
        <div className="mt-4">
          <button
            type="submit"
            disabled={pending}
            className="px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? '更新中...' : 'ステータスを更新'}
          </button>
        </div>
      </form>
    </div>
  )
}
