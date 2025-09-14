import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import PageViewTracker from "@/components/analytics/PageViewTracker"
import ScrollTracker from "@/components/analytics/ScrollTracker"
import AdSenseScript from "@/components/ads/AdSenseScript"
import AdBlockerBanner from "@/components/ads/AdBlockerBanner"
import AdConfigChecker from "@/components/ads/AdConfigChecker"
import StickyAd from "@/components/ads/StickyAd"
import { StructuredData } from "@/components/seo/StructuredData"
import { generateMetadata } from "@/utils/seo"
import { GAME_SEO_SCHEMA } from "@/constants/seo"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import GAMAnchorAd from "@/components/ads/GAMAnchorAd"
import { CookieConsent } from "@/components/cookies/CookieConsent"

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})
export const metadata: Metadata = generateMetadata({
  title: "MegaGameFun - Your Knowledge Experience Platform",
  description:
    "Discover comprehensive guides, tips, and knowledge at MegaGameFun. Your go-to platform for expert insights and detailed information across various topics.",
  keywords: ["megagamefun", "knowledge base", "guides", "tips", "information", "megagamefun"],
  url: "/",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={GAME_SEO_SCHEMA} />
        <link rel="canonical" href="https://megagamefun.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossOrigin="anonymous"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
 (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');
            `,
          }}
          
        />
       
        
        
        {/* <GAMScript /> */}
      </head>
      <body className={fontSans.variable}>
        {/* Google Tag manager */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
        height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Google AdSense */}
        <AdSenseScript />

        {/* Ad Blocker Detection Banner */}
        <AdBlockerBanner variant="polite" position="top" />

        <Suspense fallback={null}>
          <PageViewTracker />
          <ScrollTracker />
        </Suspense>

        {/* <Header />
        <Navigation /> */}

        <main className="min-h-screen bg-gray-50">{children}</main>

        {/* <Footer /> */}
        

        {/* Sticky Mobile Ad */}
        <StickyAd adSlot="YOUR_STICKY_AD_SLOT_ID" position="bottom" closeable={true} />
        <GAMAnchorAd adUnitId="anchor-bottom" position="bottom" closeable={true} />
        {/* Ad Configuration Checker (Development only) */}
        <AdConfigChecker />
        <Analytics />
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  )
}
