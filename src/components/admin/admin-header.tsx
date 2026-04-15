'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function AdminHeader() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="md:hidden">
        <span className="text-lg font-bold text-gray-900">
          めしあが<span className="text-teal-600">CMS</span>
        </span>
      </div>
      <div className="flex-1" />
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        ログアウト
      </button>
    </header>
  )
}
