-- ============================================
-- めしあがレーベル - Supabase Schema
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- ENUM Types
-- ============================================
create type artist_status as enum ('draft', 'published', 'inactive', 'graduated');
create type content_status as enum ('draft', 'published', 'archived');
create type contact_status as enum ('unread', 'read', 'replied', 'archived');
create type audition_status as enum ('draft', 'active', 'closed');
create type news_category as enum ('live', 'release', 'goods', 'media', 'audition', 'important', 'other');
create type content_category as enum ('interview', 'column', 'talk', 'behind', 'project', 'backstage', 'other');
create type work_type as enum ('appearance', 'hosted', 'production', 'tieup', 'media', 'other');
create type special_template as enum ('standard', 'lp', 'feature', 'campaign');
create type contact_category as enum ('appearance', 'media', 'collaboration', 'audition', 'other');

-- ============================================
-- Artists
-- ============================================
create table artists (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  kana text,
  english_name text,
  profile_image_url text,
  thumbnail_url text,
  role text,
  short_copy text,
  short_bio text,
  full_bio text,
  group_name text,
  member_color text,
  x_url text,
  instagram_url text,
  tiktok_url text,
  youtube_url text,
  embed_video_url text,
  status artist_status not null default 'draft',
  featured boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_artists_status on artists(status);
create index idx_artists_featured on artists(featured) where featured = true;
create index idx_artists_sort on artists(sort_order);

-- ============================================
-- News
-- ============================================
create table news (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text,
  thumbnail_url text,
  body text,
  category news_category not null default 'other',
  published_at timestamptz,
  status content_status not null default 'draft',
  pinned boolean not null default false,
  featured boolean not null default false,
  external_url text,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_news_status on news(status);
create index idx_news_published on news(published_at desc);
create index idx_news_pinned on news(pinned) where pinned = true;

-- ============================================
-- Contents
-- ============================================
create table contents (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text,
  thumbnail_url text,
  body text,
  category content_category not null default 'other',
  author_name text,
  featured boolean not null default false,
  template_type text,
  published_at timestamptz,
  status content_status not null default 'draft',
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_contents_status on contents(status);
create index idx_contents_published on contents(published_at desc);

-- ============================================
-- Works
-- ============================================
create table works (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  thumbnail_url text,
  description text,
  work_type work_type not null default 'other',
  event_date date,
  external_url text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_works_type on works(work_type);
create index idx_works_sort on works(sort_order);

-- ============================================
-- Specials
-- ============================================
create table specials (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  subtitle text,
  thumbnail_url text,
  hero_image_url text,
  summary text,
  body text,
  template_type special_template not null default 'standard',
  cta_text text,
  cta_url text,
  publish_start_at timestamptz,
  publish_end_at timestamptz,
  status content_status not null default 'draft',
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_specials_status on specials(status);

-- ============================================
-- Auditions
-- ============================================
create table auditions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  status audition_status not null default 'draft',
  summary text,
  body text,
  requirements text,
  application_url text,
  deadline timestamptz,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- Pages (fixed pages like about, company, faq)
-- ============================================
create table pages (
  id uuid primary key default uuid_generate_v4(),
  page_key text unique not null,
  title text not null,
  body text,
  seo_title text,
  seo_description text,
  og_image_url text,
  noindex boolean not null default false,
  canonical_url text,
  updated_at timestamptz not null default now()
);

-- ============================================
-- Contacts
-- ============================================
create table contacts (
  id uuid primary key default uuid_generate_v4(),
  category contact_category not null default 'other',
  name text not null,
  email text not null,
  company text,
  message text not null,
  status contact_status not null default 'unread',
  created_at timestamptz not null default now()
);

create index idx_contacts_status on contacts(status);
create index idx_contacts_created on contacts(created_at desc);

-- ============================================
-- Site Settings (singleton)
-- ============================================
create table site_settings (
  id uuid primary key default uuid_generate_v4(),
  site_name text not null default 'めしあがレーベル',
  site_description text,
  default_og_image_url text,
  logo_url text,
  favicon_url text,
  x_url text,
  instagram_url text,
  tiktok_url text,
  youtube_url text,
  footer_text text,
  contact_email text,
  updated_at timestamptz not null default now()
);

-- ============================================
-- Top Page Settings (singleton)
-- ============================================
create table top_page_settings (
  id uuid primary key default uuid_generate_v4(),
  hero_title text,
  hero_subtitle text,
  hero_background_url text,
  hero_cta_primary_text text,
  hero_cta_primary_url text,
  hero_cta_secondary_text text,
  hero_cta_secondary_url text,
  about_intro_title text,
  about_intro_text text,
  audition_banner_title text,
  audition_banner_text text,
  pickup_content_ids uuid[] not null default '{}',
  updated_at timestamptz not null default now()
);

-- ============================================
-- Junction Tables (artist relations)
-- ============================================
create table artist_news (
  artist_id uuid not null references artists(id) on delete cascade,
  news_id uuid not null references news(id) on delete cascade,
  primary key (artist_id, news_id)
);

create table artist_contents (
  artist_id uuid not null references artists(id) on delete cascade,
  content_id uuid not null references contents(id) on delete cascade,
  primary key (artist_id, content_id)
);

create table artist_works (
  artist_id uuid not null references artists(id) on delete cascade,
  work_id uuid not null references works(id) on delete cascade,
  primary key (artist_id, work_id)
);

create table artist_specials (
  artist_id uuid not null references artists(id) on delete cascade,
  special_id uuid not null references specials(id) on delete cascade,
  primary key (artist_id, special_id)
);

-- ============================================
-- Updated_at trigger function
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply triggers
create trigger trg_artists_updated before update on artists for each row execute function update_updated_at();
create trigger trg_news_updated before update on news for each row execute function update_updated_at();
create trigger trg_contents_updated before update on contents for each row execute function update_updated_at();
create trigger trg_works_updated before update on works for each row execute function update_updated_at();
create trigger trg_specials_updated before update on specials for each row execute function update_updated_at();
create trigger trg_auditions_updated before update on auditions for each row execute function update_updated_at();
create trigger trg_pages_updated before update on pages for each row execute function update_updated_at();
create trigger trg_site_settings_updated before update on site_settings for each row execute function update_updated_at();
create trigger trg_top_page_settings_updated before update on top_page_settings for each row execute function update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================
alter table artists enable row level security;
alter table news enable row level security;
alter table contents enable row level security;
alter table works enable row level security;
alter table specials enable row level security;
alter table auditions enable row level security;
alter table pages enable row level security;
alter table contacts enable row level security;
alter table site_settings enable row level security;
alter table top_page_settings enable row level security;
alter table artist_news enable row level security;
alter table artist_contents enable row level security;
alter table artist_works enable row level security;
alter table artist_specials enable row level security;

-- Public read for published content
create policy "Public read artists" on artists for select using (status = 'published');
create policy "Public read news" on news for select using (status = 'published');
create policy "Public read contents" on contents for select using (status = 'published');
create policy "Public read works" on works for select using (true);
create policy "Public read specials" on specials for select using (status = 'published');
create policy "Public read auditions" on auditions for select using (status = 'active');
create policy "Public read pages" on pages for select using (true);
create policy "Public read site_settings" on site_settings for select using (true);
create policy "Public read top_page_settings" on top_page_settings for select using (true);
create policy "Public read artist_news" on artist_news for select using (true);
create policy "Public read artist_contents" on artist_contents for select using (true);
create policy "Public read artist_works" on artist_works for select using (true);
create policy "Public read artist_specials" on artist_specials for select using (true);
create policy "Public insert contacts" on contacts for insert with check (true);

-- Authenticated full access (admin)
create policy "Admin all artists" on artists for all using (auth.role() = 'authenticated');
create policy "Admin all news" on news for all using (auth.role() = 'authenticated');
create policy "Admin all contents" on contents for all using (auth.role() = 'authenticated');
create policy "Admin all works" on works for all using (auth.role() = 'authenticated');
create policy "Admin all specials" on specials for all using (auth.role() = 'authenticated');
create policy "Admin all auditions" on auditions for all using (auth.role() = 'authenticated');
create policy "Admin all pages" on pages for all using (auth.role() = 'authenticated');
create policy "Admin all contacts" on contacts for all using (auth.role() = 'authenticated');
create policy "Admin all site_settings" on site_settings for all using (auth.role() = 'authenticated');
create policy "Admin all top_page_settings" on top_page_settings for all using (auth.role() = 'authenticated');
create policy "Admin all artist_news" on artist_news for all using (auth.role() = 'authenticated');
create policy "Admin all artist_contents" on artist_contents for all using (auth.role() = 'authenticated');
create policy "Admin all artist_works" on artist_works for all using (auth.role() = 'authenticated');
create policy "Admin all artist_specials" on artist_specials for all using (auth.role() = 'authenticated');

-- ============================================
-- Seed: Initial settings rows
-- ============================================
insert into site_settings (site_name, site_description, footer_text)
values ('めしあがレーベル', '作品を、召し上がれ。', '© めしあがレーベル');

insert into top_page_settings (
  hero_title, hero_subtitle,
  hero_cta_primary_text, hero_cta_primary_url,
  hero_cta_secondary_text, hero_cta_secondary_url,
  about_intro_title, about_intro_text,
  audition_banner_title, audition_banner_text
) values (
  '作品を、召し上がれ。',
  '熱量と愛嬌で、エンタメを届けるレーベル。',
  '所属アーティストを見る', '/talent',
  'めしあがレーベルとは', '/about',
  'めしあがレーベルとは？',
  '私たちは、作品を"差し出す"という行為に、最大限の敬意と遊び心を込めています。「めしあがれ」——この言葉に込めた想いが、すべての活動の起点です。',
  '仲間、募集中。',
  'あなたの熱量を、ここで。めしあがレーベルでは、共に作品を届ける仲間を募集しています。'
);

-- Seed: Fixed pages
insert into pages (page_key, title, body) values
('about', 'ABOUT', ''),
('company', 'COMPANY', ''),
('faq', 'FAQ', '');
