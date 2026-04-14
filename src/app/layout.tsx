import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP, Inter } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['700', '900'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'めしあがレーベル | 作品を、召し上がれ。',
    template: '%s | めしあがレーベル',
  },
  description: '熱量と愛嬌で、エンタメを届けるレーベル。めしあがレーベル公式サイト。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'めしあがレーベル',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-sans-jp)] antialiased">
        {children}
      </body>
    </html>
  )
}
