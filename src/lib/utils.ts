import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(dateString: string | null): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  live: 'ライブ',
  release: 'リリース',
  goods: 'グッズ',
  media: 'メディア',
  audition: 'オーディション',
  important: '重要',
  other: 'その他',
}

export const CONTENT_CATEGORY_LABELS: Record<string, string> = {
  interview: 'インタビュー',
  column: 'コラム',
  talk: '対談',
  behind: '密着',
  project: '企画記事',
  backstage: '裏側',
  other: 'その他',
}

export const WORK_TYPE_LABELS: Record<string, string> = {
  appearance: '出演',
  hosted: '主催',
  production: '制作',
  tieup: 'タイアップ',
  media: 'メディア掲載',
  other: 'その他',
}

export const CONTACT_CATEGORY_LABELS: Record<string, string> = {
  appearance: '出演依頼',
  media: '取材 / メディア',
  collaboration: 'コラボ / 制作相談',
  audition: 'オーディション応募',
  other: 'その他',
}

export const SPECIAL_TEMPLATE_LABELS: Record<string, string> = {
  standard: '標準',
  lp: 'LP風',
  feature: '特集',
  campaign: 'キャンペーン',
}

export const AUDITION_STATUS_LABELS: Record<string, string> = {
  draft: '下書き',
  active: '募集中',
  closed: '終了',
}
