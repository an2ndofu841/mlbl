import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-surface-base">
      <span className="text-[11px] font-bold tracking-[0.4em] text-secondary uppercase mb-6">404</span>
      <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tight">
        お品切れです。
      </h1>
      <p className="mt-6 text-on-surface-variant text-center max-w-md leading-relaxed">
        お探しのページは見つかりませんでした。
        メニューが変わったか、お皿が下げられたようです。
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-full hover:scale-105 transition-all shadow-ambient"
      >
        トップに戻る
      </Link>
    </div>
  )
}
