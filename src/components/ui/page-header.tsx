interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
}

export function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        {subtitle && (
          <p className="text-sm tracking-[0.2em] uppercase text-vermillion font-medium mb-3">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-lg text-ink-light leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        <div className="mt-8 h-0.5 w-16 bg-vermillion" />
      </div>
    </section>
  )
}
