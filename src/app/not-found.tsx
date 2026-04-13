import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-cream">
      <p className="text-sm tracking-[0.3em] text-vermillion font-medium mb-4">404</p>
      <h1 className="text-5xl md:text-7xl font-black text-ink tracking-tight">
        お品切れです。
      </h1>
      <p className="mt-6 text-ink-light text-center max-w-md">
        お探しのページは見つかりませんでした。
        メニューが変わったか、お皿が下げられたようです。
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center px-7 py-3 text-sm font-medium bg-ink text-white hover:bg-vermillion transition-colors"
      >
        トップに戻る
      </Link>
    </div>
  )
}
