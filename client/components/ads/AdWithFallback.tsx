"use client"

import type React from "react"

import { useState, useEffect } from "react"
import GoogleAdSense from "./GoogleAdSense"
import AdBlockerDetector from "./AdBlockerDetector"
import AlternativeContent from "./AlternativeContent"

interface AdWithFallbackProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid"
  fallbackType?: "games" | "newsletter" | "social" | "features"
  style?: React.CSSProperties
  className?: string
  showAdBlockerMessage?: boolean
  forceShowFallback?: boolean
}

export default function AdWithFallback({
  adSlot,
  adFormat = "auto",
  fallbackType = "games",
  style,
  className = "",
  showAdBlockerMessage = false,
  forceShowFallback = false,
  
}: AdWithFallbackProps) {
  const [isAdBlocked, setIsAdBlocked] = useState<boolean | null>(null)
  const [showAd, setShowAd] = useState(true)
  const [hasAdSenseConfig, setHasAdSenseConfig] = useState(false)

  useEffect(() => {
    // Check if AdSense is properly configured
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
    const isConfigured =
      clientId &&
      clientId !== "ca-pub-XXXXXXXXXX" &&
      clientId.startsWith("ca-pub-") &&
      adSlot &&
      adSlot !== "YOUR_SLOT_ID" &&
      !adSlot.includes("YOUR_") &&
      !adSlot.includes("SLOT_ID")

    setHasAdSenseConfig(!!isConfigured)

    // Check if user previously dismissed ad blocker message
    const dismissed = sessionStorage.getItem("adBlockerMessageDismissed")
    if (dismissed === "true") {
      setShowAd(false)
    }
  }, [adSlot])

  const handleAdBlockDetection = (blocked: boolean) => {
    setIsAdBlocked(blocked)
  }

  // Force show fallback if requested
  if (forceShowFallback) {
    return (
      <div className={`ad-fallback ${className}`} style={style}>
        <AlternativeContent type={fallbackType} />
      </div>
    )
  }

  // Show fallback if AdSense is not configured
  if (!hasAdSenseConfig) {
    return (
      <div className={`ad-fallback ad-not-configured ${className}`} style={style}>
        <AlternativeContent type={fallbackType} />
      </div>
    )
  }

  // Show loading state while detecting ad blocker
  if (isAdBlocked === null) {
    return (
      <AdBlockerDetector onAdBlockDetected={handleAdBlockDetection}>
        <div className={`ad-loading ${className}`} style={style}>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
            <div className="animate-pulse">
              <div className="bg-gray-300 h-4 rounded w-3/4 mx-auto mb-2"></div>
              <div className="bg-gray-300 h-3 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </AdBlockerDetector>
    )
  }

  // Show ad if not blocked and properly configured
  if (!isAdBlocked && hasAdSenseConfig) {
    return (
      <AdBlockerDetector onAdBlockDetected={handleAdBlockDetection}>
        <GoogleAdSense adSlot={adSlot} adFormat={adFormat} style={style} className={className} />
      </AdBlockerDetector>
    )
  }

  // Show alternative content if ad is blocked or not configured
  return (
    <AdBlockerDetector onAdBlockDetected={handleAdBlockDetection}>
      <div className={`ad-fallback ${className}`} style={style}>
        <AlternativeContent type={fallbackType}  />
      </div>
    </AdBlockerDetector>
  )
}
