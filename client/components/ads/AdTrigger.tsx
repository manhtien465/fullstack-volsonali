"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AdUnit from "./AdUnit"
import { Gift, X } from "lucide-react"

interface AdTriggerProps {
  adId: string
  triggerText?: string
  rewardText?: string
  context?: any
  onRewardClaimed?: () => void
}

export default function AdTrigger({
  adId,
  triggerText = "Watch Ad for Reward",
  rewardText = "Claim your reward!",
  context = {},
  onRewardClaimed,
}: AdTriggerProps) {
  const [showAd, setShowAd] = useState(false)
  const [adWatched, setAdWatched] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleTriggerClick = () => {
    setShowAd(true)
    setCountdown(5) // 5 second countdown before reward
  }

  const handleAdLoad = () => {
    // Ad loaded successfully
  }

  const handleAdError = (error: Error) => {
    console.error("Ad loading error:", error)
    setShowAd(false)
  }

  const handleClaimReward = () => {
    setAdWatched(true)
    setShowAd(false)
    onRewardClaimed?.()
  }

  return (
    <>
      <Button onClick={handleTriggerClick} className="bg-green-600 hover:bg-green-700" disabled={adWatched}>
        <Gift className="w-4 h-4 mr-2" />
        {adWatched ? "Reward Claimed!" : triggerText}
      </Button>

      <Dialog open={showAd} onOpenChange={setShowAd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Watch Advertisement
              <Button variant="ghost" size="sm" onClick={() => setShowAd(false)}>
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <AdUnit
              adId={adId}
              context={context}
              onAdLoad={handleAdLoad}
              onAdError={handleAdError}
              className="text-center"
            />

            {countdown > 0 ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Please wait {countdown} seconds...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <Button onClick={handleClaimReward} className="w-full bg-green-600 hover:bg-green-700">
                {rewardText}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
