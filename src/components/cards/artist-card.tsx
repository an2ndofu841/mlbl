import Link from 'next/link'
import type { Artist } from '@/types/database'

interface ArtistCardProps {
  artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/talent/${artist.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-low rounded-3xl shadow-ambient">
        {artist.thumbnail_url ? (
          <img
            src={artist.thumbnail_url}
            alt={artist.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface-low">
            <span className="text-4xl font-black text-outline/20">
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
      <div className="mt-5">
        <p className="text-[11px] font-bold text-secondary tracking-wider uppercase">
          {artist.role || 'Artist'}
        </p>
        <h3 className="mt-1.5 text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
          {artist.name}
        </h3>
        {artist.short_copy && (
          <p className="mt-1.5 text-sm text-on-surface-variant line-clamp-2">
            {artist.short_copy}
          </p>
        )}
      </div>
    </Link>
  )
}
