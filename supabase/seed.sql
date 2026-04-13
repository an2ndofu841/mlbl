-- ダミーデータ（開発・プレビュー用）— schema.sql 適用後に実行
-- 既存データがある場合は truncate するか、手動で調整してください。

-- 固定UUID（参照用）
-- アーティスト
INSERT INTO artists (
  id, slug, name, kana, english_name, role, short_copy, short_bio, full_bio,
  group_name, status, featured, sort_order, profile_image_url, thumbnail_url
) VALUES
(
  'a1000000-0000-4000-8000-000000000001',
  'yuki-hanami',
  '雪 花見',
  'ゆき はなみ',
  'Yuki Hanami',
  'シンガー / 配信者',
  '熱量は、声に乗って届く。',
  '歌とトークで距離を縮める、めしあがレーベル所属のフロントランナー。',
  'ライブと配信を軸に、オリジナル楽曲と企画動画をリリース。少し抜けたところが愛嬌のポップスシンガー。',
  'めしあがレーベル',
  'published', true, 10,
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200'
),
(
  'a1000000-0000-4000-8000-000000000002',
  'ren-karasu',
  '蓮 鴉',
  'れん からす',
  'Ren Karasu',
  '俳優 / ナレーター',
  '本気で、遊ぶ。',
  '舞台と映像で幅広く活動。低音のナレーションが印象的。',
  '古典から現代劇まで。声の演技に定評がある。',
  NULL,
  'published', true, 20,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
),
(
  'a1000000-0000-4000-8000-000000000003',
  'mio-tsukimi',
  '澪 月見',
  'みお つきみ',
  'Mio Tsukimi',
  'バラエティ / MC',
  '現場が、作品になる。',
  'イベントMCと冠番組を中心に、企画力で場を作る。',
  'おもてなしとツッコミのバランスが取れた進行で、レーベル主催イベントの顔。',
  NULL,
  'published', false, 30,
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
)
ON CONFLICT (slug) DO NOTHING;

-- ニュース
INSERT INTO news (
  id, slug, title, excerpt, body, category, published_at, status, pinned, featured, thumbnail_url
) VALUES
(
  'b1000000-0000-4000-8000-000000000001',
  'one-man-live-2026',
  'ワンマンライブ開催決定',
  '雪花見 初のワンマン。会場は下北沢。',
  '会場・チケット情報は追ってお知らせします。',
  'live', now() - interval '2 days', 'published', true, true,
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200'
),
(
  'b1000000-0000-4000-8000-000000000002',
  'digital-ep-release',
  '新EPデジタルリリース',
  '全3曲入り。各配信サービスにて配信中。',
  'Linkは各ストアにて検索してください。',
  'release', now() - interval '5 days', 'published', false, false,
  NULL
),
(
  'b1000000-0000-4000-8000-000000000003',
  'media-appearance-radio',
  'ラジオ出演のお知らせ',
  '蓮 鴉が深夜番組にゲスト出演。',
  '放送日時は番組公式サイトをご確認ください。',
  'media', now() - interval '1 day', 'published', false, false,
  NULL
)
ON CONFLICT (slug) DO NOTHING;

-- コンテンツ
INSERT INTO contents (
  id, slug, title, excerpt, body, category, author_name, featured, published_at, status, thumbnail_url
) VALUES
(
  'c1000000-0000-4000-8000-000000000001',
  'meshiaga-label-story',
  'めしあがレーベルが大切にしていること',
  '「召し上がれ」は比喩だ。',
  '私たちにとって作品とは、丁寧に仕込んで差し出すもの。飲食店のサイトではなく、思想の入ったメディアとしてこのサイトを育てていきます。',
  'column', '編集部', true, now() - interval '3 days', 'published',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200'
),
(
  'c1000000-0000-4000-8000-000000000002',
  'interview-yuki-hanami',
  '雪花見インタビュー',
  '歌うことと、配信すること。',
  '「本気でふざける」について語ってもらいました。',
  'interview', '編集部', true, now() - interval '7 days', 'published',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200'
),
(
  'c1000000-0000-4000-8000-000000000003',
  'behind-the-live',
  'ライブリハの裏側',
  '音合わせから当日まで。',
  '短い密着レポートです。',
  'behind', 'スタッフ', false, now() - interval '10 days', 'published',
  NULL
)
ON CONFLICT (slug) DO NOTHING;

-- 実績
INSERT INTO works (
  id, slug, title, description, work_type, event_date, featured, sort_order, thumbnail_url
) VALUES
(
  'd1000000-0000-4000-8000-000000000001',
  'festival-2025',
  '野外フェス出演',
  'メインステージにて30分セット。',
  'appearance', '2025-08-10', true, 1,
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200'
),
(
  'd1000000-0000-4000-8000-000000000002',
  'label-night-vol3',
  '主催イベント「Label Night vol.3」',
  '全組オリジナル構成の90分。',
  'hosted', '2025-11-02', true, 2,
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200'
),
(
  'd1000000-0000-4000-8000-000000000003',
  'web-drama-production',
  'オリジナルウェブドラマ制作',
  '脚本から楽曲までレーベル内制作。',
  'production', '2025-06-01', false, 3,
  NULL
)
ON CONFLICT (slug) DO NOTHING;

-- SPECIAL
INSERT INTO specials (
  id, slug, title, subtitle, summary, body, template_type, status, featured,
  publish_start_at, hero_image_url, thumbnail_url, cta_text, cta_url
) VALUES
(
  'e1000000-0000-4000-8000-000000000001',
  'welcome-to-meshiaga',
  'ようこそ、めしあがの卓へ',
  '期間限定ウェルカムページ',
  '新しくサイトを訪れた方へ。世界観の入口です。',
  'ここは特設ページの例です。テンプレートや公開期間をCMSから切り替えられます。',
  'lp', 'published', true, now() - interval '30 days',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  'タレント一覧', '/talent'
),
(
  'e1000000-0000-4000-8000-000000000002',
  'secret-menu',
  'シークレットメニュー',
  '遊び心コンテンツ',
  '通常のNEWSやCONTENTSとは違うトーンで掲載する企画向けです。',
  '本文は自由に。CTAで別LPへ飛ばすこともできます。',
  'campaign', 'published', true, now() - interval '14 days',
  NULL,
  NULL,
  'お問い合わせ', '/contact'
)
ON CONFLICT (slug) DO NOTHING;

-- オーディション
INSERT INTO auditions (
  id, slug, title, status, summary, body, requirements, application_url, deadline, featured
) VALUES
(
  'f1000000-0000-4000-8000-000000000001',
  'talent-2026-spring',
  '2026年度 タレント募集',
  'active',
  '熱量と愛嬌を持って作品を届けられる方へ。',
  '募集要項の詳細テキストです。活動方針に共感いただける方を歓迎します。',
  '18歳以上。経歴不問。応募フォームより必要事項を送信してください。',
  'https://forms.gle/example', now() + interval '60 days', true
)
ON CONFLICT (slug) DO NOTHING;

-- 関連付け
INSERT INTO artist_news (artist_id, news_id) VALUES
  ('a1000000-0000-4000-8000-000000000001', 'b1000000-0000-4000-8000-000000000001'),
  ('a1000000-0000-4000-8000-000000000001', 'b1000000-0000-4000-8000-000000000002'),
  ('a1000000-0000-4000-8000-000000000002', 'b1000000-0000-4000-8000-000000000003')
ON CONFLICT (artist_id, news_id) DO NOTHING;

INSERT INTO artist_contents (artist_id, content_id) VALUES
  ('a1000000-0000-4000-8000-000000000001', 'c1000000-0000-4000-8000-000000000002'),
  ('a1000000-0000-4000-8000-000000000002', 'c1000000-0000-4000-8000-000000000003')
ON CONFLICT (artist_id, content_id) DO NOTHING;

INSERT INTO artist_works (artist_id, work_id) VALUES
  ('a1000000-0000-4000-8000-000000000001', 'd1000000-0000-4000-8000-000000000001'),
  ('a1000000-0000-4000-8000-000000000001', 'd1000000-0000-4000-8000-000000000002'),
  ('a1000000-0000-4000-8000-000000000002', 'd1000000-0000-4000-8000-000000000003')
ON CONFLICT (artist_id, work_id) DO NOTHING;

INSERT INTO artist_specials (artist_id, special_id) VALUES
  ('a1000000-0000-4000-8000-000000000001', 'e1000000-0000-4000-8000-000000000001'),
  ('a1000000-0000-4000-8000-000000000003', 'e1000000-0000-4000-8000-000000000002')
ON CONFLICT (artist_id, special_id) DO NOTHING;

-- TOP のピックアップ（任意）
UPDATE top_page_settings
SET pickup_content_ids = ARRAY[
  'c1000000-0000-4000-8000-000000000001'::uuid,
  'c1000000-0000-4000-8000-000000000002'::uuid
]
WHERE id = (SELECT id FROM top_page_settings LIMIT 1);

-- 固定ページサンプル
UPDATE pages SET body = '会社名: めしあがレーベル（運営会社名はダミー）\n所在地: 東京都\nお問い合わせ: contact@example.com'
WHERE page_key = 'company';

UPDATE pages SET body = $json$[
  {"q":"サイトの更新頻度は？","a":"CONTENTSとNEWSを中心に、不定期で更新しています。"},
  {"q":"取材の連絡先は？","a":"CONTACTフォームの「取材 / メディア」よりご連絡ください。"}
]$json$
WHERE page_key = 'faq';
