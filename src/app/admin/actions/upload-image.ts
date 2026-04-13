'use server'

import { createServiceRoleClient } from '@/lib/supabase/server'

export type UploadImageResult = { url: string } | { error: string }

export async function uploadCmsImage(formData: FormData): Promise<UploadImageResult> {
  const file = formData.get('file')
  if (!file || typeof file === 'string' || file.size === 0) {
    return { error: '画像ファイルを選択してください。' }
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY が未設定のためアップロードできません。' }
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: '5MB 以下のファイルにしてください。' }
  }

  const ext = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'bin'
  const path = `cms/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const supabase = await createServiceRoleClient()
  const { data, error } = await supabase.storage.from('cms-uploads').upload(path, file, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  })

  if (error) {
    return { error: error.message }
  }

  const { data: pub } = supabase.storage.from('cms-uploads').getPublicUrl(data.path)
  return { url: pub.publicUrl }
}
