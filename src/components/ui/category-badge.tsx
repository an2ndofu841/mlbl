import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  label: string
  variant?: 'default' | 'vermillion' | 'outline'
  className?: string
}

export function CategoryBadge({ label, variant = 'default', className }: CategoryBadgeProps) {
  const variants = {
    default: 'bg-surface-alt text-ink-light',
    vermillion: 'bg-vermillion/10 text-vermillion',
    outline: 'border border-border text-ink-muted',
  }

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-medium tracking-wide',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
