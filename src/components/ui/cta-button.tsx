import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
}

export function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external,
}: CTAButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 tracking-wide'
  const variants = {
    primary: 'bg-ink text-white hover:bg-vermillion',
    secondary: 'bg-vermillion text-white hover:bg-vermillion-dark',
    outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
  }
  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
