-- 既存DB向け追加分（新規は schema.sql に含まれています）
alter table site_settings add column if not exists tiktok_url text;
alter table pages add column if not exists noindex boolean not null default false;
alter table pages add column if not exists canonical_url text;
alter table top_page_settings add column if not exists hero_background_url text;
alter table top_page_settings add column if not exists pickup_content_ids uuid[] not null default '{}';
