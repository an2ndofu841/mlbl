'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Newspaper,
  FileText,
  Briefcase,
  Sparkles,
  Mic,
  BookOpen,
  Mail,
  Settings,
  PanelTop,
  Search,
  ImageIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'ダッシュボード', href: '/admin', icon: LayoutDashboard },
  { label: 'アーティスト', href: '/admin/artists', icon: Users },
  { label: 'ニュース', href: '/admin/news', icon: Newspaper },
  { label: 'コンテンツ', href: '/admin/contents', icon: FileText },
  { label: '実績', href: '/admin/works', icon: Briefcase },
  { label: '特設企画', href: '/admin/specials', icon: Sparkles },
  { label: 'オーディション', href: '/admin/auditions', icon: Mic },
  { label: '固定ページ', href: '/admin/pages', icon: BookOpen },
  { label: 'お問い合わせ', href: '/admin/contacts', icon: Mail },
  { label: 'メディア', href: '/admin/media', icon: ImageIcon },
  { label: 'トップページ設定', href: '/admin/top-settings', icon: PanelTop },
  { label: 'SEO設定', href: '/admin/seo', icon: Search },
  { label: '共通設定', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-60 flex-col bg-white border-r border-gray-200 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/admin" className="text-lg font-bold text-gray-900">
          めしあが<span className="text-teal-600">CMS</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors',
                isActive
                  ? 'bg-teal-50 text-teal-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors" target="_blank">
          公開サイトを見る →
        </Link>
      </div>
    </aside>
  )
}
