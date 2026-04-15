interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
}

export function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-surface-low">
      <div className="mx-auto max-w-5xl px-6">
        {subtitle && (
          <p className="text-[11px] tracking-[0.3em] uppercase text-secondary font-bold mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tight text-on-surface">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
