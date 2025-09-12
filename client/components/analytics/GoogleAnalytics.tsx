"use client"

import Script from "next/script"
import { GA_TRACKING_ID } from "@/lib/gtag"

export default function GoogleAnalytics() {
  if (!GA_TRACKING_ID || GA_TRACKING_ID === "G-XXXXXXXXXX") {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          // Initialize gtag after script loads
          window.dataLayer = window.dataLayer || []
          function gtag(...args: any[]) {
            window.dataLayer.push(args)
          }
          window.gtag = gtag

          gtag("js", new Date())
          gtag("config", GA_TRACKING_ID, {
            page_location: window.location.href,
            page_title: document.title,
            // Enhanced measurement settings
            enhanced_measurement_settings: {
              scrolls: true,
              outbound_clicks: true,
              site_search: true,
              video_engagement: true,
              file_downloads: true,
            },
            // Custom parameters for gaming site
            custom_map: {
              game_category: "custom_game_category",
              user_engagement_level: "custom_engagement_level",
            },
          })
        }}
      />
      <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
            `,
          }}
        />
    </>
  )
}
