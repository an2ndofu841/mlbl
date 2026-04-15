import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { MediaLibrary } from './media-library'

export default function AdminMediaPage() {
  return (
    <div>
      <AdminPageHeader
        title="メディアライブラリ"
        description="サイトで使用する画像素材のアップロード・管理"
      />
      <MediaLibrary />
    </div>
  )
}
