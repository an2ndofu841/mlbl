'use client'

import { useState, useRef, useTransition } from 'react'
import { Upload, X, Copy, Check, Image as ImageIcon } from 'lucide-react'
import { uploadCmsImage, type UploadImageResult, type MediaFolder } from '@/app/admin/actions/upload-image'

interface ImageUploaderProps {
  name: string
  defaultValue?: string
  folder?: MediaFolder
  label?: string
  onUploaded?: (url: string) => void
}

export function ImageUploader({
  name,
  defaultValue = '',
  folder = 'misc',
  label,
  onUploaded,
}: ImageUploaderProps) {
  const [url, setUrl] = useState(defaultValue)
  const [preview, setPreview] = useState(defaultValue)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    setError('')
    const localPreview = URL.createObjectURL(file)
    setPreview(localPreview)

    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', folder)

    startTransition(async () => {
      const res: UploadImageResult = await uploadCmsImage(fd)
      if ('error' in res) {
        setError(res.error)
        setPreview(url)
        return
      }
      setUrl(res.url)
      setPreview(res.url)
      onUploaded?.(res.url)
    })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function handleCopy() {
    if (!url) return
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function handleClear() {
    setUrl('')
    setPreview('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

      <input type="hidden" name={name} value={url} />

      {preview ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-contain bg-[repeating-conic-gradient(#f3f3f3_0%_25%,#fff_0%_50%)] bg-[length:16px_16px]"
          />
          {isPending && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" onClick={handleCopy} title="URLをコピー"
              className="p-1.5 bg-white rounded-md shadow text-gray-500 hover:text-blue-600">
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button type="button" onClick={handleClear} title="画像を削除"
              className="p-1.5 bg-white rounded-md shadow text-gray-500 hover:text-red-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-teal-300 hover:bg-teal-50/30 transition-colors"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
          {isPending ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">アップロード中...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6 text-gray-300" />
              <span className="text-xs text-gray-400">クリック or ドラッグ&ドロップ</span>
              <span className="text-[10px] text-gray-300">JPEG / PNG / WebP / GIF / SVG（10MB以下）</span>
            </div>
          )}
        </div>
      )}

      {url && (
        <input
          type="text"
          value={url}
          readOnly
          className="w-full px-2 py-1 text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded truncate"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function ImageUploaderInline({
  onSelect,
  folder = 'misc',
}: {
  onSelect: (url: string) => void
  folder?: MediaFolder
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', folder)

    startTransition(async () => {
      const res = await uploadCmsImage(fd)
      if ('error' in res) {
        setError(res.error)
        return
      }
      onSelect(res.url)
    })
  }

  return (
    <span className="inline-flex items-center gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />
      <button
        type="button"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-teal-600 border border-gray-200 rounded hover:border-teal-300 transition-colors disabled:opacity-50"
      >
        {isPending ? (
          <div className="w-3 h-3 border border-teal-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <ImageIcon className="w-3 h-3" />
        )}
        {isPending ? '...' : 'Upload'}
      </button>
      {error && <span className="text-[10px] text-red-500">{error}</span>}
    </span>
  )
}
