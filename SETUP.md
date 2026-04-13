# めしあがレーベル サイト — 初期セットアップ

## 1. 依存関係

```bash
npm install
```

## 2. Supabase プロジェクト

1. [Supabase](https://supabase.com) でプロジェクトを作成する。
2. SQL Editor で `supabase/schema.sql` を実行する（新規DB向けのフルスキーマ）。
3. 既に `schema.sql` 適用済みの場合は `supabase/migrations/002_extensions_pickup_seo_storage.sql` のみ追実行。
4. ダミーデータ: `supabase/seed.sql` を実行（任意）。
5. **Storage**: Dashboard でバケット `cms-uploads` を Public で作成するか、`supabase/storage-setup.sql` を実行。管理画面から画像アップロードを使う場合は `SUPABASE_SERVICE_ROLE_KEY` が必須。
6. **Auth**: Authentication で Email ユーザーを作成し、そのユーザーで `/login` から管理画面へ入る。

## 3. 環境変数

ルートに `.env.local` を作成し、`.env.local.example` を参照して値を設定する。

必須:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`（本番では `https://your-domain.com`）

画像アップロード（サーバーアクション）利用時:

- `SUPABASE_SERVICE_ROLE_KEY`（サーバーのみ。クライアントに含めないこと）

## 4. 開発サーバー

```bash
npm run dev
```

- 公開サイト: `http://localhost:3000`
- 管理ログイン: `http://localhost:3000/login` → `/admin`

## 5. Vercel デプロイ

1. GitHub 等にリポジトリを接続。
2. 環境変数に上記を登録（`NEXT_PUBLIC_SITE_URL` を本番URLに）。
3. Build Command: `next build`（デフォルト）。

## 6. RLS について

`schema.sql` では匿名ユーザーは公開コンテンツの SELECT と `contacts` の INSERT のみ。`authenticated` ロールに更新系ポリシーを付与しているため、**ログインユーザー＝管理権限**の前提です。将来的に `profiles` テーブルでロール分岐する拡張が容易です。
