import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  label?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({ title, subtitle, label, align = 'left', className }: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {label && (
        <span className={cn(
          'inline-block text-[11px] font-bold tracking-[0.3em] uppercase mb-4',
          'text-secondary'
        )}>
          {label}
        </span>
      )}
      <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tight text-on-surface">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-on-surface-variant text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
