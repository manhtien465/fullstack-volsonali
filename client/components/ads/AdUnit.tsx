"use client"

import { useEffect, useRef, useState } from "react"
import { adManager } from "@/services/adManager"
import { initializeAdSense, pushAd, trackAdPerformance } from "@/lib/adsense"
import type { AdConfig } from "@/types/ads"

interface AdUnitProps {
  adId: string
  className?: string
  context?: any
  onAdLoad?: () => void
  onAdError?: (error: Error) => void
}

export default function AdUnit({ adId, className = "", context = {}, onAdLoad, onAdError }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adConfig, setAdConfig] = useState<AdConfig | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const config = adManager.getAdConfig(adId)
    if (!config) {
      setError("Ad configuration not found")
      return
    }

    if (!adManager.shouldDisplayAd(adId, context)) {
      return
    }

    setAdConfig(config)
    loadAd(config)
  }, [adId, context])

  const loadAd = async (config: AdConfig) => {
    try {
      // Initialize AdSense if not already done
      const initialized = await initializeAdSense()
      if (!initialized) {
        throw new Error("AdSense initialization failed")
      }

      // Mark as displayed
      adManager.markAsDisplayed(config.id)

      // Track impression
      trackAdPerformance(config.id, "impression")

      // Push ad to AdSense
      pushAd()

      setIsLoaded(true)
      onAdLoad?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown ad loading error")
      setError(error.message)
      onAdError?.(error)
    }
  }

  const handleAdClick = () => {
    if (adConfig) {
      trackAdPerformance(adConfig.id, "click")
    }
  }

  if (error) {
    return (
      <div className={`ad-error ${className}`}>
        <p className="text-sm text-gray-500">Advertisement unavailable</p>
      </div>
    )
  }

  if (!adConfig) {
    return null
  }

  return (
    <div className={`ad-container ${className}`} data-ad-id={adId} onClick={handleAdClick}>
      <div className="ad-label text-xs text-gray-400 mb-1">Advertisement</div>
      <div
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: adConfig.size.width === "auto" ? "100%" : `${adConfig.size.width}px`,
          height: adConfig.size.height === "auto" ? "auto" : `${adConfig.size.height}px`,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adConfig.slotId}
        data-ad-format={adConfig.format || "auto"}
        data-full-width-responsive={adConfig.responsive ? "true" : "false"}
      />
    </div>
  )
}
