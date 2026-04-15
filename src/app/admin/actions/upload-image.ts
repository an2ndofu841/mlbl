'use server'

import { createServiceRoleClient } from '@/lib/supabase/server'

export type UploadImageResult = { url: string } | { error: string }

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export type MediaFolder = 'artists' | 'news' | 'contents' | 'works' | 'specials' | 'site' | 'misc'

export async function uploadCmsImage(formData: FormData): Promise<UploadImageResult> {
  const file = formData.get('file')
  if (!file || typeof file === 'string' || file.size === 0) {
    return { error: '画像ファイルを選択してください。' }
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY が未設定のためアップロードできません。' }
  }
  if (file.size > MAX_SIZE) {
    return { error: '10MB 以下のファイルにしてください。' }
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: '対応形式: JPEG, PNG, WebP, GIF, SVG' }
  }

  const folder = (formData.get('folder') as string) || 'misc'
  const ext = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'bin'
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const supabase = await createServiceRoleClient()
  const { data, error } = await supabase.storage.from('cms-uploads').upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  })

  if (error) return { error: error.message }

  const { data: pub } = supabase.storage.from('cms-uploads').getPublicUrl(data.path)
  return { url: pub.publicUrl }
}

export type MediaFile = {
  name: string
  url: string
  folder: string
  size: number
  created_at: string
}

export async function listCmsImages(folder?: string): Promise<{ files: MediaFile[] } | { error: string }> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY が未設定です。' }
  }
  const supabase = await createServiceRoleClient()

  const targetFolder = folder || ''
  const { data, error } = await supabase.storage.from('cms-uploads').list(targetFolder, {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' },
  })
  if (error) return { error: error.message }

  const files: MediaFile[] = (data ?? [])
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((f) => {
      const fullPath = targetFolder ? `${targetFolder}/${f.name}` : f.name
      const { data: pub } = supabase.storage.from('cms-uploads').getPublicUrl(fullPath)
      return {
        name: f.name,
        url: pub.publicUrl,
        folder: targetFolder,
        size: f.metadata?.size ?? 0,
        created_at: f.created_at ?? '',
      }
    })

  return { files }
}

export async function deleteCmsImage(path: string): Promise<{ ok: true } | { error: string }> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY が未設定です。' }
  }
  const supabase = await createServiceRoleClient()
  const { error } = await supabase.storage.from('cms-uploads').remove([path])
  if (error) return { error: error.message }
  return { ok: true }
}
