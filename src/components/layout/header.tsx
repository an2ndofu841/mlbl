'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'TALENT', href: '/talent' },
  { label: 'CONTENTS', href: '/contents' },
  { label: 'WORKS', href: '/works' },
  { label: 'NEWS', href: '/news' },
  { label: 'SPECIAL', href: '/special' },
  { label: 'AUDITION', href: '/audition' },
  { label: 'CONTACT', href: '/contact' },
]

function SocialLinks({
  xUrl,
  instagramUrl,
  youtubeUrl,
  tiktokUrl,
  className,
}: {
  xUrl?: string | null
  instagramUrl?: string | null
  youtubeUrl?: string | null
  tiktokUrl?: string | null
  className?: string
}) {
  const items = [
    { label: 'X', href: xUrl },
    { label: 'IG', href: instagramUrl },
    { label: 'YT', href: youtubeUrl },
    { label: 'TK', href: tiktokUrl },
  ].filter((i) => i.href)

  if (items.length === 0) return null

  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold tracking-wider text-on-surface-variant hover:text-primary transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

export function Header({
  xUrl,
  instagramUrl,
  youtubeUrl,
  tiktokUrl,
}: {
  xUrl?: string | null
  instagramUrl?: string | null
  youtubeUrl?: string | null
  tiktokUrl?: string | null
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'glass shadow-ambient' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative z-50" onClick={() => setIsOpen(false)}>
          <img src="/logo.png" alt="めしあがレーベル" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] tracking-[0.18em] font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <SocialLinks
            xUrl={xUrl}
            instagramUrl={instagramUrl}
            youtubeUrl={youtubeUrl}
            tiktokUrl={tiktokUrl}
          />
        </div>

        <button
          type="button"
          className="lg:hidden relative z-50 p-2 text-on-surface"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300',
          isOpen
            ? 'opacity-100 pointer-events-auto bg-surface-base'
            : 'opacity-0 pointer-events-none bg-surface-base'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-7">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold tracking-wide text-on-surface hover:text-primary transition-colors"
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6">
            <SocialLinks
              xUrl={xUrl}
              instagramUrl={instagramUrl}
              youtubeUrl={youtubeUrl}
              tiktokUrl={tiktokUrl}
              className="text-outline"
            />
          </div>
        </nav>
      </div>
    </header>
  )
}
