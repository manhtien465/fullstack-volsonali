"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid"
  adLayout?: string
  adLayoutKey?: string
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
  onAdLoad?: () => void
  onAdError?: (error: Error) => void
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function GoogleAdSense({
  adSlot,
  adFormat = "auto",
  adLayout,
  adLayoutKey,
  style,
  className = "",
  responsive = true,
  onAdLoad,
  onAdError,
}: GoogleAdSenseProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isAdPushed = useRef(false)

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

    // Validate configuration
    if (!clientId || clientId === "ca-pub-XXXXXXXXXX" || !clientId.startsWith("ca-pub-")) {
      console.warn("AdSense client ID not properly configured")
      onAdError?.(new Error("AdSense client ID not configured"))
      return
    }

    if (!adSlot || adSlot.includes("YOUR_") || adSlot.includes("SLOT_ID")) {
      console.warn("AdSense ad slot not properly configured")
      onAdError?.(new Error("AdSense ad slot not configured"))
      return
    }

    const pushAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle && !isAdPushed.current) {
          window.adsbygoogle.push({})
          isAdPushed.current = true
          onAdLoad?.()
        }
      } catch (error) {
        console.error("AdSense error:", error)
        onAdError?.(error instanceof Error ? error : new Error("AdSense loading failed"))
      }
    }

    // Wait for AdSense script to load
    if (window.adsbygoogle) {
      pushAd()
    } else {
      // Retry after a short delay
      const timer = setTimeout(pushAd, 100)
      return () => clearTimeout(timer)
    }
  }, [adSlot, onAdLoad, onAdError])

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  // Don't render if not properly configured
  if (
    !clientId ||
    clientId === "ca-pub-XXXXXXXXXX" ||
    !clientId.startsWith("ca-pub-") ||
    !adSlot ||
    adSlot.includes("YOUR_") ||
    adSlot.includes("SLOT_ID")
  ) {
    return null
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  )
}
