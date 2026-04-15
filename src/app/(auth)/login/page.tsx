import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src="/logo.png" alt="めしあがレーベル" className="h-16 mx-auto mb-4" />
          <p className="mt-2 text-sm text-ink-muted">管理画面にログイン</p>
        </div>
        <Suspense fallback={<p className="text-center text-sm text-ink-muted">読み込み中...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
