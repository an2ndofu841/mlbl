'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import {
  FormActions,
  FormCheckbox,
  FormField,
  FormInput,
  FormSection,
  FormSelect,
  FormTextarea,
  SEOFields,
} from '@/components/admin/admin-form'
import type { Artist, ArtistStatus } from '@/types/database'
import { saveArtist, type SaveArtistResult } from './actions'

const STATUS_OPTIONS: { value: ArtistStatus; label: string }[] = [
  { value: 'draft', label: '下書き' },
  { value: 'published', label: '公開' },
  { value: 'inactive', label: '非アクティブ' },
  { value: 'graduated', label: '卒業' },
]

interface ArtistFormProps {
  artist: Artist | null
}

export function ArtistForm({ artist }: ArtistFormProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<SaveArtistResult | null>(null)

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await saveArtist(formData)
      if ('ok' in res && res.ok) {
        router.push('/admin/artists')
        router.refresh()
        return
      }
      setResult(res)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-3xl">
      {artist && <input type="hidden" name="id" value={artist.id} />}

      {result && 'error' in result && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{result.error}</div>
      )}

      <FormSection title="基本情報">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="スラッグ" name="slug" required>
            <FormInput
              name="slug"
              required
              defaultValue={artist?.slug ?? ''}
              placeholder="unique-slug"
              autoComplete="off"
            />
          </FormField>
          <FormField label="表示名" name="name" required>
            <FormInput name="name" required defaultValue={artist?.name ?? ''} placeholder="山田 太郎" />
          </FormField>
          <FormField label="ふりがな" name="kana">
            <FormInput name="kana" defaultValue={artist?.kana ?? ''} placeholder="やまだ たろう" />
          </FormField>
          <FormField label="英語名" name="english_name">
            <FormInput name="english_name" defaultValue={artist?.english_name ?? ''} placeholder="Taro Yamada" />
          </FormField>
        </div>
        <FormField label="肩書き / ロール" name="role">
          <FormInput name="role" defaultValue={artist?.role ?? ''} />
        </FormField>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="ステータス" name="status">
            <FormSelect name="status" defaultValue={artist?.status ?? 'draft'}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </FormSelect>
          </FormField>
          <FormField label="表示順" name="sort_order">
            <FormInput
              name="sort_order"
              type="number"
              inputMode="numeric"
              defaultValue={String(artist?.sort_order ?? 0)}
            />
          </FormField>
        </div>
        <FormCheckbox name="featured" defaultChecked={artist?.featured ?? false} label="注目アーティストとして表示" />
      </FormSection>

      <FormSection title="プロフィール">
        <FormField label="プロフィール画像URL" name="profile_image_url">
          <FormInput name="profile_image_url" defaultValue={artist?.profile_image_url ?? ''} placeholder="https://..." />
        </FormField>
        <FormField label="サムネイルURL" name="thumbnail_url">
          <FormInput name="thumbnail_url" defaultValue={artist?.thumbnail_url ?? ''} placeholder="https://..." />
        </FormField>
        <FormField label="ショートコピー" name="short_copy">
          <FormTextarea name="short_copy" rows={2} defaultValue={artist?.short_copy ?? ''} />
        </FormField>
        <FormField label="短い自己紹介" name="short_bio">
          <FormTextarea name="short_bio" rows={4} defaultValue={artist?.short_bio ?? ''} />
        </FormField>
        <FormField label="詳細プロフィール" name="full_bio">
          <FormTextarea name="full_bio" rows={8} defaultValue={artist?.full_bio ?? ''} />
        </FormField>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="グループ名" name="group_name">
            <FormInput name="group_name" defaultValue={artist?.group_name ?? ''} />
          </FormField>
          <FormField label="メンバーカラー" name="member_color">
            <FormInput name="member_color" defaultValue={artist?.member_color ?? ''} placeholder="#RRGGBB" />
          </FormField>
        </div>
        <FormField label="埋め込み動画URL" name="embed_video_url">
          <FormInput name="embed_video_url" defaultValue={artist?.embed_video_url ?? ''} placeholder="https://..." />
        </FormField>
      </FormSection>

      <FormSection title="SNS">
        <FormField label="X (Twitter)" name="x_url">
          <FormInput name="x_url" defaultValue={artist?.x_url ?? ''} placeholder="https://x.com/..." />
        </FormField>
        <FormField label="Instagram" name="instagram_url">
          <FormInput name="instagram_url" defaultValue={artist?.instagram_url ?? ''} placeholder="https://instagram.com/..." />
        </FormField>
        <FormField label="TikTok" name="tiktok_url">
          <FormInput name="tiktok_url" defaultValue={artist?.tiktok_url ?? ''} placeholder="https://www.tiktok.com/..." />
        </FormField>
        <FormField label="YouTube" name="youtube_url">
          <FormInput name="youtube_url" defaultValue={artist?.youtube_url ?? ''} placeholder="https://www.youtube.com/..." />
        </FormField>
      </FormSection>

      <SEOFields
        seoTitle={artist?.seo_title}
        seoDescription={artist?.seo_description}
        ogImageUrl={artist?.og_image_url}
      />

      <FormActions isPending={pending} cancelHref="/admin/artists" />
    </form>
  )
}
