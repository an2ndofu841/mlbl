-- =============================================
-- Storage: cms-uploads バケット
-- =============================================
-- 公開バケット（画像は誰でも閲覧可能）
-- アップロード・更新・削除は認証済みユーザーのみ
--
-- フォルダ構造（推奨）:
--   artists/     … アーティスト写真
--   news/        … ニュース画像
--   contents/    … コンテンツ記事画像
--   works/       … 実績画像
--   specials/    … 特設企画画像
--   site/        … ヒーロー画像・ロゴ・OGP等サイト共通素材
--   misc/        … その他

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-uploads',
  'cms-uploads',
  true,
  52428800,  -- 50MB
  '{image/jpeg,image/png,image/webp,image/gif,image/svg+xml}'
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 公開読み取り
drop policy if exists "Public read cms-uploads" on storage.objects;
create policy "Public read cms-uploads"
  on storage.objects for select
  using (bucket_id = 'cms-uploads');

-- 認証済みユーザーのアップロード
drop policy if exists "Authenticated upload cms-uploads" on storage.objects;
create policy "Authenticated upload cms-uploads"
  on storage.objects for insert
  with check (bucket_id = 'cms-uploads' and auth.role() = 'authenticated');

-- 認証済みユーザーの更新
drop policy if exists "Authenticated update cms-uploads" on storage.objects;
create policy "Authenticated update cms-uploads"
  on storage.objects for update
  using (bucket_id = 'cms-uploads' and auth.role() = 'authenticated');

-- 認証済みユーザーの削除
drop policy if exists "Authenticated delete cms-uploads" on storage.objects;
create policy "Authenticated delete cms-uploads"
  on storage.objects for delete
  using (bucket_id = 'cms-uploads' and auth.role() = 'authenticated');
