"use client"

import { useState, useEffect } from "react"
import AdBlockerDetector from "./AdBlockerDetector"
import AdBlockerMessage from "./AdBlockerMessage"

interface AdBlockerBannerProps {
  variant?: "polite" | "informative" | "supportive"
  position?: "top" | "bottom"
  persistent?: boolean
}

export default function AdBlockerBanner({
  variant = "polite",
  position = "top",
  persistent = false,
}: AdBlockerBannerProps) {
  const [isAdBlocked, setIsAdBlocked] = useState<boolean | null>(null)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if banner was previously dismissed
    if (!persistent) {
      const dismissed = sessionStorage.getItem(`adBlockerBanner_${variant}_dismissed`)
      if (dismissed === "true") {
        setIsDismissed(true)
      }
    }
  }, [variant, persistent])

  const handleAdBlockDetection = (blocked: boolean) => {
    setIsAdBlocked(blocked)
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    if (!persistent) {
      sessionStorage.setItem(`adBlockerBanner_${variant}_dismissed`, "true")
    }
  }

  // Don't show if not blocked, not detected yet, or dismissed
  if (!isAdBlocked || isAdBlocked === null || isDismissed) {
    return (
      <AdBlockerDetector onAdBlockDetected={handleAdBlockDetection}>
        <></>
      </AdBlockerDetector>
    )
  }

  return (
    <AdBlockerDetector onAdBlockDetected={handleAdBlockDetection}>
      <div
        className={`
          fixed left-0 right-0 z-[100000] p-4
          ${position === "top" ? "top-0" : "bottom-0"}
        `}
      >
        <div className="max-w-4xl mx-auto">
          <AdBlockerMessage variant={variant} showDismiss={!persistent} onDismiss={handleDismiss} />
        </div>
      </div>
    </AdBlockerDetector>
  )
}
