import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
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
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-300 tracking-wide hover:scale-105 active:scale-95'
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full shadow-ambient',
    secondary: 'bg-gradient-to-r from-secondary to-secondary/80 text-on-secondary rounded-full shadow-ambient',
    outline: 'text-on-surface-variant rounded-2xl bg-transparent hover:bg-surface-low',
    ghost: 'text-primary hover:text-primary-dim rounded-2xl',
  }
  const sizes = {
    sm: 'px-5 py-2 text-xs gap-1.5',
    md: 'px-8 py-3.5 text-sm gap-2',
    lg: 'px-10 py-4.5 text-base gap-2.5',
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
