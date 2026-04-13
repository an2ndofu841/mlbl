import Link from 'next/link'
import type { Special } from '@/types/database'

interface SpecialCardProps {
  special: Special
}

export function SpecialCard({ special }: SpecialCardProps) {
  return (
    <Link href={`/special/${special.slug}`} className="group block relative overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden bg-ink">
        {special.thumbnail_url ? (
          <img
            src={special.thumbnail_url}
            alt={special.title}
            className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-60"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink">
            <span className="text-2xl font-bold text-white/20">SPECIAL</span>
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-ink/80 to-transparent">
          <p className="text-xs tracking-[0.15em] uppercase text-vermillion-light font-medium">
            SPECIAL
          </p>
          <h3 className="mt-2 text-xl md:text-2xl font-bold text-white line-clamp-2">
            {special.title}
          </h3>
          {special.subtitle && (
            <p className="mt-1 text-sm text-white/70 line-clamp-1">{special.subtitle}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
