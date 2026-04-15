'use client'

import { useState, useRef, useTransition, useCallback, useEffect } from 'react'
import {
  Upload, Trash2, Copy, Check, FolderOpen, RefreshCw, Image as ImageIcon, X,
} from 'lucide-react'
import {
  uploadCmsImage,
  listCmsImages,
  deleteCmsImage,
  type MediaFile,
  type MediaFolder,
} from '@/app/admin/actions/upload-image'

const MEDIA_FOLDERS: MediaFolder[] = ['site', 'artists', 'news', 'contents', 'works', 'specials', 'misc']

const FOLDER_LABELS: Record<string, string> = {
  artists: 'アーティスト',
  news: 'ニュース',
  contents: 'コンテンツ',
  works: '実績',
  specials: '特設企画',
  site: 'サイト共通',
  misc: 'その他',
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function MediaLibrary() {
  const [folder, setFolder] = useState<MediaFolder>('site')
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedUrl, setCopiedUrl] = useState('')
  const [isPending, startTransition] = useTransition()
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    setError('')
    const res = await listCmsImages(folder)
    if ('error' in res) {
      setError(res.error)
      setFiles([])
    } else {
      setFiles(res.files)
    }
    setLoading(false)
  }, [folder])

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  function handleUpload(fileList: FileList | null) {
    if (!fileList?.length) return
    const uploads = Array.from(fileList)

    startTransition(async () => {
      setError('')
      for (const file of uploads) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('folder', folder)
        const res = await uploadCmsImage(fd)
        if ('error' in res) {
          setError(res.error)
          return
        }
      }
      await fetchFiles()
    })
  }

  function handleDelete(file: MediaFile) {
    if (!confirm(`「${file.name}」を削除しますか？\n※ この画像を使用中の箇所では表示されなくなります。`)) return
    const fullPath = file.folder ? `${file.folder}/${file.name}` : file.name
    startTransition(async () => {
      const res = await deleteCmsImage(fullPath)
      if ('error' in res) {
        setError(res.error)
        return
      }
      await fetchFiles()
    })
  }

  function handleCopy(url: string) {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(''), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Folder tabs */}
      <div className="flex flex-wrap gap-2">
        {MEDIA_FOLDERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFolder(f)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-colors ${
              folder === f
                ? 'bg-red-600 text-white font-medium'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            {FOLDER_LABELS[f] || f}
          </button>
        ))}
      </div>

      {/* Upload area */}
      <div
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files) }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-red-400 bg-red-50/50'
            : 'border-gray-200 hover:border-red-300 hover:bg-red-50/20'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        {isPending ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">アップロード中...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-8 h-8 text-gray-300" />
            <div>
              <p className="text-sm font-medium text-gray-600">クリック or ドラッグ&ドロップ</p>
              <p className="text-xs text-gray-400 mt-1">JPEG / PNG / WebP / GIF / SVG（10MB以下・複数可）</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">{error}</div>
      )}

      {/* File list header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{FOLDER_LABELS[folder]}</span>
          {' '}— {files.length} ファイル
        </p>
        <button
          type="button"
          onClick={fetchFiles}
          disabled={loading}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          更新
        </button>
      </div>

      {/* File grid */}
      {loading && files.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : files.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-gray-200">
          <ImageIcon className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">このフォルダにはまだ画像がありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <div key={file.name}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button type="button" onClick={() => setPreviewUrl(file.url)}
                className="block w-full aspect-square bg-[repeating-conic-gradient(#f5f5f5_0%_25%,#fff_0%_50%)] bg-[length:12px_12px] relative">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </button>
              <div className="p-2.5">
                <p className="text-xs text-gray-700 truncate font-medium" title={file.name}>
                  {file.name}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{formatBytes(file.size)}</p>
                <div className="flex gap-1 mt-2">
                  <button type="button" onClick={() => handleCopy(file.url)}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-1 text-[10px] text-gray-500 hover:text-blue-600 border border-gray-100 rounded hover:border-blue-200 transition-colors">
                    {copiedUrl === file.url ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    {copiedUrl === file.url ? 'Copied!' : 'URL'}
                  </button>
                  <button type="button" onClick={() => handleDelete(file)}
                    disabled={isPending}
                    className="p-1 text-gray-400 hover:text-red-600 border border-gray-100 rounded hover:border-red-200 transition-colors disabled:opacity-50">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-8"
          onClick={() => setPreviewUrl(null)}>
          <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <img src={previewUrl} alt="preview" className="max-w-full max-h-[70vh] object-contain" />
            <div className="p-4 flex items-center gap-3 border-t border-gray-100">
              <input type="text" value={previewUrl} readOnly
                className="flex-1 px-3 py-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded"
                onClick={(e) => (e.target as HTMLInputElement).select()} />
              <button type="button" onClick={() => handleCopy(previewUrl)}
                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors">
                {copiedUrl === previewUrl ? 'Copied!' : 'URLをコピー'}
              </button>
            </div>
            <button type="button" onClick={() => setPreviewUrl(null)}
              className="absolute top-3 right-3 p-1.5 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
