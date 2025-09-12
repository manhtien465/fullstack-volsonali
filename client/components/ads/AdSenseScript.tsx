"use client"

import Script from "next/script"
import { useEffect } from "react"

export default function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    // Initialize adsbygoogle array
    if (typeof window !== "undefined") {
      window.adsbygoogle = window.adsbygoogle || []
    }
  }, [])

  // Only load script if properly configured
  if (!clientId || clientId === "ca-pub-XXXXXXXXXX" || !clientId.startsWith("ca-pub-")) {
    console.info("AdSense not configured - skipping script load")
    return null
  }

  return (
    <>
      <Script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("AdSense script loaded successfully")
        }}
        onError={(e) => {
          console.error("AdSense script failed to load:", e)
        }}
      />
    </>
  )
}
