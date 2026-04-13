'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('メールアドレスまたはパスワードが正しくありません。')
      } else {
        router.push(redirect)
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-vermillion/10 text-vermillion text-sm">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-ink mb-2">メールアドレス</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm focus:outline-none focus:border-vermillion"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">パスワード</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-3 bg-surface border border-border text-ink text-sm focus:outline-none focus:border-vermillion"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-ink text-white font-medium text-sm hover:bg-vermillion transition-colors disabled:opacity-50"
      >
        {isPending ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  )
}
