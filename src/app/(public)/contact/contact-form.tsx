'use client'

import { useState, useTransition } from 'react'
import { CONTACT_CATEGORY_LABELS } from '@/lib/utils'
import { submitContact } from './actions'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitContact(formData)
      setResult(res)
    })
  }

  if (result?.success) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl font-bold text-ink mb-4">送信が完了しました。</p>
        <p className="text-ink-light">お問い合わせいただきありがとうございます。内容を確認の上、担当よりご連絡いたします。</p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {result && !result.success && (
        <div className="p-4 bg-vermillion/10 text-vermillion text-sm">
          {result.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          お問い合わせ種別 <span className="text-vermillion">*</span>
        </label>
        <select
          name="category"
          required
          className="w-full px-4 py-3 bg-surface-alt border border-border text-ink text-sm focus:outline-none focus:border-vermillion transition-colors"
        >
          <option value="">選択してください</option>
          {Object.entries(CONTACT_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          お名前 <span className="text-vermillion">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 bg-surface-alt border border-border text-ink text-sm focus:outline-none focus:border-vermillion transition-colors"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          メールアドレス <span className="text-vermillion">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-surface-alt border border-border text-ink text-sm focus:outline-none focus:border-vermillion transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          会社名・団体名
        </label>
        <input
          type="text"
          name="company"
          className="w-full px-4 py-3 bg-surface-alt border border-border text-ink text-sm focus:outline-none focus:border-vermillion transition-colors"
          placeholder="株式会社◯◯"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">
          メッセージ <span className="text-vermillion">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 bg-surface-alt border border-border text-ink text-sm focus:outline-none focus:border-vermillion transition-colors resize-y"
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 bg-ink text-white font-medium text-sm tracking-wide hover:bg-vermillion transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? '送信中...' : '送信する'}
      </button>

      <p className="text-xs text-ink-muted text-center">
        送信いただいた情報は、お問い合わせへの対応のみに使用いたします。
      </p>
    </form>
  )
}
