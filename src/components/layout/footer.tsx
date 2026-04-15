import Link from 'next/link'

const FOOTER_NAV = [
  {
    title: 'DISCOVER',
    items: [
      { label: 'ABOUT', href: '/about' },
      { label: 'TALENT', href: '/talent' },
      { label: 'CONTENTS', href: '/contents' },
      { label: 'WORKS', href: '/works' },
    ],
  },
  {
    title: 'EXPLORE',
    items: [
      { label: 'NEWS', href: '/news' },
      { label: 'SPECIAL', href: '/special' },
      { label: 'AUDITION', href: '/audition' },
    ],
  },
  {
    title: 'INFO',
    items: [
      { label: 'COMPANY', href: '/company' },
      { label: 'FAQ', href: '/faq' },
      { label: 'CONTACT', href: '/contact' },
    ],
  },
]

export function Footer({
  tagline,
  footerNote,
  xUrl,
  instagramUrl,
  youtubeUrl,
  tiktokUrl,
}: {
  tagline?: string | null
  footerNote?: string | null
  xUrl?: string | null
  instagramUrl?: string | null
  youtubeUrl?: string | null
  tiktokUrl?: string | null
}) {
  const socials = [
    { label: 'X', href: xUrl },
    { label: 'Instagram', href: instagramUrl },
    { label: 'YouTube', href: youtubeUrl },
    { label: 'TikTok', href: tiktokUrl },
  ].filter((s) => s.href)

  return (
    <footer className="bg-on-surface text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div>
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="めしあがレーベル" className="h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-5 text-sm text-white/40 leading-relaxed">{tagline || '作品を、召し上がれ。'}</p>
            <div className="flex flex-wrap gap-5 mt-6">
              {socials.length > 0 ? (
                socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/35 hover:text-primary-container transition-colors tracking-wider font-semibold"
                  >
                    {s.label}
                  </a>
                ))
              ) : (
                <span className="text-xs text-white/20">SNSは共通設定から追加できます</span>
              )}
            </div>
          </div>

          {FOOTER_NAV.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] tracking-[0.25em] text-primary-container/50 font-bold mb-6 uppercase">{section.title}</p>
              <ul className="space-y-3.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(167, 240, 245, 0.08)' }}>
          <p className="text-[11px] text-white/25">{footerNote || `© ${new Date().getFullYear()} めしあがレーベル All Rights Reserved.`}</p>
          <div className="flex gap-6">
            <Link href="/company" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
              運営会社
            </Link>
            <Link href="/faq" className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
              よくある質問
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
