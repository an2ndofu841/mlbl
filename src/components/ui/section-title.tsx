import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({ title, subtitle, align = 'left', className }: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-ink-muted text-base md:text-lg">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-4 h-0.5 w-12 bg-vermillion',
          align === 'center' && 'mx-auto'
        )}
      />
    </div>
  )
}
