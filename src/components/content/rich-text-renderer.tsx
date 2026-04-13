/**
 * 本文はプレーンテキスト（改行）を前提。将来 Markdown/HTML に差し替えやすいラッパー。
 */
export function RichTextRenderer({ body, className }: { body: string; className?: string }) {
  return <div className={className}>{body}</div>
}
