import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Audition, Content, Page, SiteSettings, TopPageSettings } from '@/types/database'

export async function getPublishedArtists() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('artists')
    .select('*')
    .eq('status', 'published')
    .order('sort_order')
  return data ?? []
}

export async function getFeaturedArtists() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('artists')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order')
    .limit(6)
  return data ?? []
}

export async function getArtistBySlug(slug: string) {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

export async function getPublishedNews(limit?: number) {
  const supabase = await createServerSupabaseClient()
  const now = new Date().toISOString()
  let query = supabase
    .from('news')
    .select('*')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', now)
    .order('pinned', { ascending: false })
    .order('published_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data } = await query
  return data ?? []
}

export async function getNewsBySlug(slug: string) {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (!data) return null
  const now = new Date()
  if (!data.published_at || new Date(data.published_at) > now) return null
  return data
}

export async function getPublishedContents(category?: string, limit?: number) {
  const supabase = await createServerSupabaseClient()
  const now = new Date().toISOString()
  let query = supabase
    .from('contents')
    .select('*')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', now)
    .order('published_at', { ascending: false })
  if (category && category !== 'all') query = query.eq('category', category)
  if (limit) query = query.limit(limit)
  const { data } = await query
  return data ?? []
}

export async function getFeaturedPublishedContents(limit: number) {
  const supabase = await createServerSupabaseClient()
  const now = new Date().toISOString()
  const { data } = await supabase
    .from('contents')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .not('published_at', 'is', null)
    .lte('published_at', now)
    .order('published_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

function isSpecialInWindow(
  row: { publish_start_at: string | null; publish_end_at: string | null },
  now = new Date()
) {
  if (row.publish_start_at && new Date(row.publish_start_at) > now) return false
  if (row.publish_end_at && new Date(row.publish_end_at) < now) return false
  return true
}

export async function getContentsByIdsOrdered(ids: string[]): Promise<Content[]> {
  if (!ids.length) return []
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('contents')
    .select('*')
    .in('id', ids)
    .eq('status', 'published')
  const map = new Map((data ?? []).map((c) => [c.id, c]))
  return ids.map((id) => map.get(id)).filter((c): c is Content => Boolean(c))
}

export async function getHomePickupContents(top: TopPageSettings | null, limit = 4): Promise<Content[]> {
  const ids = (top?.pickup_content_ids ?? []).filter(Boolean)
  if (ids.length > 0) {
    const ordered = await getContentsByIdsOrdered(ids)
    if (ordered.length > 0) return ordered.slice(0, limit)
  }
  const featured = await getFeaturedPublishedContents(limit)
  if (featured.length > 0) return featured
  return getPublishedContents(undefined, limit)
}

export async function getContentBySlug(slug: string) {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('contents')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (!data) return null
  const now = new Date()
  if (!data.published_at || new Date(data.published_at) > now) return null
  return data
}

export async function getWorks(workType?: string) {
  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('works')
    .select('*')
    .order('featured', { ascending: false })
    .order('sort_order')
    .order('event_date', { ascending: false })
  if (workType && workType !== 'all') query = query.eq('work_type', workType)
  const { data } = await query
  return data ?? []
}

export async function getWorkBySlug(slug: string) {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('works').select('*').eq('slug', slug).single()
  return data
}

export async function getPublishedSpecials(limit?: number) {
  const supabase = await createServerSupabaseClient()
  let query = supabase
    .from('specials')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  if (limit) query = query.limit(limit * 3)
  const { data } = await query
  const filtered = (data ?? []).filter((s) => isSpecialInWindow(s))
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
}

export async function getSpecialBySlug(slug: string) {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('specials')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (!data) return null
  if (!isSpecialInWindow(data)) return null
  return data
}

export async function getActiveAuditions(): Promise<Audition[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('auditions')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  return (data ?? []) as Audition[]
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single()
  return data as SiteSettings | null
}

export async function getTopPageSettings(): Promise<TopPageSettings | null> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('top_page_settings')
    .select('*')
    .limit(1)
    .single()
  return data as TopPageSettings | null
}

export async function getPage(pageKey: string): Promise<Page | null> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('pages')
    .select('*')
    .eq('page_key', pageKey)
    .single()
  return data as Page | null
}

export async function getRelatedArtists(table: string, foreignKey: string, id: string) {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from(table)
    .select(`artist_id, artists(*)`)
    .eq(foreignKey, id)
  return data?.map((r: Record<string, unknown>) => r.artists).filter(Boolean) ?? []
}
