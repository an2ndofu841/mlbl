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
        <div className="p-3 bg-secondary-container text-secondary text-sm rounded-xl">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-on-surface mb-2">メールアドレス</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-surface-lowest text-on-surface text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 transition-shadow"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-on-surface mb-2">パスワード</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-3 bg-surface-lowest text-on-surface text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 transition-shadow"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-semibold text-sm rounded-full hover:scale-[1.02] transition-all disabled:opacity-50 shadow-ambient"
      >
        {isPending ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  )
}
