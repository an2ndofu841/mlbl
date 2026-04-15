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
    { label: 'Instagram', href: instagramUrl },
    { label: 'YouTube', href: youtubeUrl },
    { label: 'TikTok', href: tiktokUrl },
  ].filter((i) => i.href)

  if (items.length === 0) {
    return (
      <div className={cn('flex gap-6 text-ink-muted', className)}>
        <span className="text-sm tracking-wider opacity-40">SNS</span>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-wrap gap-5', className)}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-wider hover:text-vermillion transition-colors"
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
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-surface/95 backdrop-blur-sm border-b border-border-light shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative z-50" onClick={() => setIsOpen(false)}>
          <img src="/logo.png" alt="めしあがレーベル" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-[0.15em] font-medium text-ink-light hover:text-vermillion transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <SocialLinks
            xUrl={xUrl}
            instagramUrl={instagramUrl}
            youtubeUrl={youtubeUrl}
            tiktokUrl={tiktokUrl}
            className="text-xs text-ink-muted"
          />
        </div>

        <button
          type="button"
          className="lg:hidden relative z-50 p-2 text-ink"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 bg-surface z-40 lg:hidden transition-all duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold tracking-wide text-ink hover:text-vermillion transition-colors"
              style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ))}
          <SocialLinks
            xUrl={xUrl}
            instagramUrl={instagramUrl}
            youtubeUrl={youtubeUrl}
            tiktokUrl={tiktokUrl}
            className="text-ink-muted mt-8"
          />
        </nav>
      </div>
    </header>
  )
}
