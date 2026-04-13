import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getSiteSettings } from '@/lib/queries'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <>
      <Header
        xUrl={settings?.x_url}
        instagramUrl={settings?.instagram_url}
        youtubeUrl={settings?.youtube_url}
        tiktokUrl={settings?.tiktok_url}
      />
      <main className="flex-1">{children}</main>
      <Footer
        tagline={settings?.site_description}
        footerNote={settings?.footer_text}
        xUrl={settings?.x_url}
        instagramUrl={settings?.instagram_url}
        youtubeUrl={settings?.youtube_url}
        tiktokUrl={settings?.tiktok_url}
      />
    </>
  )
}
