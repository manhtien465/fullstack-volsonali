"use client"

import { useState, useCallback } from "react"
import { adManager } from "@/services/adManager"

export function useAdTrigger() {
  const [activeAd, setActiveAd] = useState<string | null>(null)

  const triggerAd = useCallback((adId: string, context: any = {}) => {
    if (adManager.shouldDisplayAd(adId, context)) {
      setActiveAd(adId)
      return true
    }
    return false
  }, [])

  const closeAd = useCallback(() => {
    setActiveAd(null)
  }, [])

  const triggerGameEndAd = useCallback(
    (gameName: string, score: number) => {
      const context = {
        gameName,
        score,
        userEngagement: score > 100 ? "high" : "low",
      }
      return triggerAd("game-interstitial", context)
    },
    [triggerAd],
  )

  const triggerRewardAd = useCallback(() => {
    return triggerAd("click-reward-ad")
  }, [triggerAd])

  return {
    activeAd,
    triggerAd,
    closeAd,
    triggerGameEndAd,
    triggerRewardAd,
  }
}
