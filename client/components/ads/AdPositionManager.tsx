"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import AdUnit from "./AdUnit"
import { adManager } from "@/services/adManager"
import type { AdConfig, AdLocation } from "@/types/ads"

interface AdPositionManagerProps {
  location: AdLocation
  className?: string
  context?: any
}

export default function AdPositionManager({ location, className = "", context = {} }: AdPositionManagerProps) {
  const pathname = usePathname()
  const [ads, setAds] = useState<AdConfig[]>([])

  useEffect(() => {
    const availableAds = adManager.getAdsForPosition(location, pathname, {
      ...context,
      isMobile: window.innerWidth < 768,
      pageViews: Number.parseInt(localStorage.getItem("pageViews") || "0"),
      userEngagement: Number.parseInt(localStorage.getItem("userEngagement") || "0"),
    })

    setAds(availableAds)
  }, [location, pathname, context])

  if (ads.length === 0) {
    return null
  }

  return (
    <div className={`ad-position-${location} ${className}`}>
      {ads.map((ad) => (
        <AdUnit key={ad.id} adId={ad.id} context={context} className="mb-4" />
      ))}
    </div>
  )
}
