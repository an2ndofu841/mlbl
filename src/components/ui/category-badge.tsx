import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  label: string
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'outline' | 'vermillion'
  className?: string
}

export function CategoryBadge({ label, variant = 'default', className }: CategoryBadgeProps) {
  const variants = {
    default: 'bg-surface-low text-on-surface-variant',
    primary: 'bg-primary-container text-primary-dim',
    secondary: 'bg-secondary-container text-secondary',
    tertiary: 'bg-tertiary-container text-on-tertiary',
    outline: 'bg-surface-low text-on-surface-variant',
    vermillion: 'bg-primary-container/60 text-primary-dim',
  }

  return (
    <span
      className={cn(
        'inline-block px-3.5 py-1 text-[11px] font-bold tracking-wider rounded-full',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
