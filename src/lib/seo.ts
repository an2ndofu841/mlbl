import type { Metadata } from 'next'
import { getSiteUrl } from '@/lib/site-url'

export function buildDetailMetadata(opts: {
  title: string
  description: string
  path: string
  images?: string[]
  noindex?: boolean
  canonicalOverride?: string | null
}): Metadata {
  const base = getSiteUrl()
  const canonical = (opts.canonicalOverride?.trim() || `${base}${opts.path}`).trim()
  const images = opts.images?.filter(Boolean) ?? []
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    robots: opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      ...(images.length ? { images: images.map((url) => ({ url })) } : {}),
    },
  }
}
