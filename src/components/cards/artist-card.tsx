import Link from 'next/link'
import type { Artist } from '@/types/database'

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/talent/${artist.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-alt">
        {artist.thumbnail_url ? (
          <img
            src={artist.thumbnail_url}
            alt={artist.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-border-light">
            <span className="text-4xl font-bold text-ink-muted/30">
              {artist.name.charAt(0)}
            </span>
          </div>
        )}
        {artist.member_color && (
          <div
            className="absolute bottom-0 left-0 h-1 w-full"
            style={{ backgroundColor: artist.member_color }}
          />
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs text-ink-muted tracking-wide">
          {artist.role || 'Artist'}
        </p>
        <h3 className="mt-1 text-lg font-bold text-ink group-hover:text-vermillion transition-colors">
          {artist.name}
        </h3>
        {artist.short_copy && (
          <p className="mt-1 text-sm text-ink-light line-clamp-2">
            {artist.short_copy}
          </p>
        )}
      </div>
    </Link>
  )
}
