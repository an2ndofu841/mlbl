export type ArtistStatus = 'draft' | 'published' | 'inactive' | 'graduated'
export type ContentStatus = 'draft' | 'published' | 'archived'
export type ContactStatus = 'unread' | 'read' | 'replied' | 'archived'
export type AuditionStatus = 'draft' | 'active' | 'closed'
export type NewsCategory = 'live' | 'release' | 'goods' | 'media' | 'audition' | 'important' | 'other'
export type ContentCategory = 'interview' | 'column' | 'talk' | 'behind' | 'project' | 'backstage' | 'other'
export type WorkType = 'appearance' | 'hosted' | 'production' | 'tieup' | 'media' | 'other'
export type SpecialTemplate = 'standard' | 'lp' | 'feature' | 'campaign'
export type ContactCategory = 'appearance' | 'media' | 'collaboration' | 'audition' | 'other'

export interface Artist {
  id: string
  slug: string
  name: string
  kana: string | null
  english_name: string | null
  profile_image_url: string | null
  thumbnail_url: string | null
  role: string | null
  short_copy: string | null
  short_bio: string | null
  full_bio: string | null
  group_name: string | null
  member_color: string | null
  x_url: string | null
  instagram_url: string | null
  tiktok_url: string | null
  youtube_url: string | null
  embed_video_url: string | null
  status: ArtistStatus
  featured: boolean
  sort_order: number
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  created_at: string
  updated_at: string
}

export interface News {
  id: string
  slug: string
  title: string
  excerpt: string | null
  thumbnail_url: string | null
  body: string | null
  category: NewsCategory
  published_at: string | null
  status: ContentStatus
  pinned: boolean
  featured: boolean
  external_url: string | null
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  created_at: string
  updated_at: string
}

export interface Content {
  id: string
  slug: string
  title: string
  excerpt: string | null
  thumbnail_url: string | null
  body: string | null
  category: ContentCategory
  author_name: string | null
  featured: boolean
  template_type: string | null
  published_at: string | null
  status: ContentStatus
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  created_at: string
  updated_at: string
}

export interface Work {
  id: string
  title: string
  slug: string
  thumbnail_url: string | null
  description: string | null
  work_type: WorkType
  event_date: string | null
  external_url: string | null
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Special {
  id: string
  slug: string
  title: string
  subtitle: string | null
  thumbnail_url: string | null
  hero_image_url: string | null
  summary: string | null
  body: string | null
  template_type: SpecialTemplate
  cta_text: string | null
  cta_url: string | null
  publish_start_at: string | null
  publish_end_at: string | null
  status: ContentStatus
  featured: boolean
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  created_at: string
  updated_at: string
}

export interface Audition {
  id: string
  title: string
  slug: string
  status: AuditionStatus
  summary: string | null
  body: string | null
  requirements: string | null
  application_url: string | null
  deadline: string | null
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  page_key: string
  title: string
  body: string | null
  seo_title: string | null
  seo_description: string | null
  og_image_url: string | null
  noindex: boolean
  canonical_url: string | null
  updated_at: string
}

export interface Contact {
  id: string
  category: ContactCategory
  name: string
  email: string
  company: string | null
  message: string
  status: ContactStatus
  created_at: string
}

export interface SiteSettings {
  id: string
  site_name: string
  site_description: string | null
  default_og_image_url: string | null
  logo_url: string | null
  favicon_url: string | null
  x_url: string | null
  instagram_url: string | null
  tiktok_url: string | null
  youtube_url: string | null
  footer_text: string | null
  contact_email: string | null
  updated_at: string
}

export interface TopPageSettings {
  id: string
  hero_title: string | null
  hero_subtitle: string | null
  hero_background_url: string | null
  hero_cta_primary_text: string | null
  hero_cta_primary_url: string | null
  hero_cta_secondary_text: string | null
  hero_cta_secondary_url: string | null
  about_intro_title: string | null
  about_intro_text: string | null
  audition_banner_title: string | null
  audition_banner_text: string | null
  pickup_content_ids: string[] | null
  updated_at: string
}

export interface ArtistRelation {
  artist_id: string
  artists?: Artist
}

export interface Database {
  public: {
    /** Supabase クライアント型推論用 */
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
    Tables: {
      artists: { Row: Artist; Insert: Partial<Artist> & Pick<Artist, 'slug' | 'name'>; Update: Partial<Artist> }
      news: { Row: News; Insert: Partial<News> & Pick<News, 'slug' | 'title'>; Update: Partial<News> }
      contents: { Row: Content; Insert: Partial<Content> & Pick<Content, 'slug' | 'title'>; Update: Partial<Content> }
      works: { Row: Work; Insert: Partial<Work> & Pick<Work, 'title' | 'slug'>; Update: Partial<Work> }
      specials: { Row: Special; Insert: Partial<Special> & Pick<Special, 'slug' | 'title'>; Update: Partial<Special> }
      auditions: { Row: Audition; Insert: Partial<Audition> & Pick<Audition, 'title' | 'slug'>; Update: Partial<Audition> }
      pages: {
        Row: Page
        Insert: Partial<Page> & { page_key: string; title: string }
        Update: Partial<Page>
      }
      contacts: { Row: Contact; Insert: Partial<Contact> & Pick<Contact, 'category' | 'name' | 'email' | 'message'>; Update: Partial<Contact> }
      site_settings: { Row: SiteSettings; Insert: Partial<SiteSettings>; Update: Partial<SiteSettings> }
      top_page_settings: { Row: TopPageSettings; Insert: Partial<TopPageSettings>; Update: Partial<TopPageSettings> }
      artist_news: { Row: { artist_id: string; news_id: string }; Insert: { artist_id: string; news_id: string }; Update: { artist_id?: string; news_id?: string } }
      artist_contents: { Row: { artist_id: string; content_id: string }; Insert: { artist_id: string; content_id: string }; Update: { artist_id?: string; content_id?: string } }
      artist_works: { Row: { artist_id: string; work_id: string }; Insert: { artist_id: string; work_id: string }; Update: { artist_id?: string; work_id?: string } }
      artist_specials: { Row: { artist_id: string; special_id: string }; Insert: { artist_id: string; special_id: string }; Update: { artist_id?: string; special_id?: string } }
    }
  }
}
