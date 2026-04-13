-- Storage バケット「cms-uploads」を SQL で用意する場合（Dashboard から作成しても可）
insert into storage.buckets (id, name, public)
values ('cms-uploads', 'cms-uploads', true)
on conflict (id) do nothing;

drop policy if exists "Public read cms-uploads" on storage.objects;
create policy "Public read cms-uploads"
  on storage.objects for select
  using (bucket_id = 'cms-uploads');

drop policy if exists "Authenticated upload cms-uploads" on storage.objects;
create policy "Authenticated upload cms-uploads"
  on storage.objects for insert
  with check (bucket_id = 'cms-uploads' and auth.role() = 'authenticated');

drop policy if exists "Authenticated update cms-uploads" on storage.objects;
create policy "Authenticated update cms-uploads"
  on storage.objects for update
  using (bucket_id = 'cms-uploads' and auth.role() = 'authenticated');

drop policy if exists "Authenticated delete cms-uploads" on storage.objects;
create policy "Authenticated delete cms-uploads"
  on storage.objects for delete
  using (bucket_id = 'cms-uploads' and auth.role() = 'authenticated');
