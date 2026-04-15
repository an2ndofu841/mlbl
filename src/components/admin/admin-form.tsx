'use client'

import { cn } from '@/lib/utils'

interface FieldProps {
  label: string
  name: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, name, required, children, className }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClasses = 'w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors'

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClasses, props.className)} />
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClasses, 'resize-y', props.className)} />
}

export function FormSelect({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClasses, props.className)}>{children}</select>
}

export function FormCheckbox({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" {...props} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}

interface FormActionsProps {
  isPending: boolean
  cancelHref: string
  submitLabel?: string
}

export function FormActions({ isPending, cancelHref, submitLabel = '保存' }: FormActionsProps) {
  return (
    <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
      >
        {isPending ? '保存中...' : submitLabel}
      </button>
      <a href={cancelHref} className="px-6 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
        キャンセル
      </a>
    </div>
  )
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  )
}

export function SEOFields({
  seoTitle,
  seoDescription,
  ogImageUrl,
}: {
  seoTitle?: string | null
  seoDescription?: string | null
  ogImageUrl?: string | null
}) {
  return (
    <FormSection title="SEO設定">
      <FormField label="SEO タイトル" name="seo_title">
        <FormInput name="seo_title" defaultValue={seoTitle ?? ''} placeholder="ページタイトル（空欄の場合はデフォルト）" />
      </FormField>
      <FormField label="メタディスクリプション" name="seo_description">
        <FormTextarea name="seo_description" rows={3} defaultValue={seoDescription ?? ''} placeholder="検索結果に表示される説明文" />
      </FormField>
      <FormField label="OGP画像URL" name="og_image_url">
        <FormInput name="og_image_url" defaultValue={ogImageUrl ?? ''} placeholder="https://..." />
      </FormField>
    </FormSection>
  )
}

export function PageAdvancedSeo({
  noindex = false,
  canonicalUrl,
}: {
  noindex?: boolean
  canonicalUrl?: string | null
}) {
  return (
    <FormSection title="インデックス・正規URL">
      <FormCheckbox name="noindex" defaultChecked={noindex} label="検索エンジンにインデックスさせない（noindex）" />
      <FormField label="canonical URL（任意・空欄でサイトURL＋パス）" name="canonical_url">
        <FormInput name="canonical_url" defaultValue={canonicalUrl ?? ''} placeholder="https://example.com/page" />
      </FormField>
    </FormSection>
  )
}
