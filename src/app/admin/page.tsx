import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Users, Newspaper, FileText, Briefcase, Sparkles, Mail } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()

  const [artists, news, contents, works, specials, contacts] = await Promise.all([
    supabase.from('artists').select('id', { count: 'exact', head: true }),
    supabase.from('news').select('id', { count: 'exact', head: true }),
    supabase.from('contents').select('id', { count: 'exact', head: true }),
    supabase.from('works').select('id', { count: 'exact', head: true }),
    supabase.from('specials').select('id', { count: 'exact', head: true }),
    supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
  ])

  const stats = [
    { label: 'アーティスト', count: artists.count ?? 0, href: '/admin/artists', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'ニュース', count: news.count ?? 0, href: '/admin/news', icon: Newspaper, color: 'bg-green-50 text-green-600' },
    { label: 'コンテンツ', count: contents.count ?? 0, href: '/admin/contents', icon: FileText, color: 'bg-purple-50 text-purple-600' },
    { label: '実績', count: works.count ?? 0, href: '/admin/works', icon: Briefcase, color: 'bg-amber-50 text-amber-600' },
    { label: '特設企画', count: specials.count ?? 0, href: '/admin/specials', icon: Sparkles, color: 'bg-pink-50 text-pink-600' },
    { label: '未読お問い合わせ', count: contacts.count ?? 0, href: '/admin/contacts', icon: Mail, color: 'bg-red-50 text-red-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">ダッシュボード</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
