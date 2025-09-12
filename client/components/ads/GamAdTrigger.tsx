"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Gift, Maximize } from "lucide-react"
import GAMInterstitialAd from "./GAMInterstitialAd"
import GAMAnchorAd from "./GAMAnchorAd"
import GAMRewardedAd from "./GAMRewardedAd"

interface GAMAdTriggerProps {
  type: "interstitial" | "anchor" | "rewarded"
  adUnitId: string
  children?: React.ReactNode
  className?: string
  buttonText?: string
  position?: "top" | "bottom"
  reward?: { type: string; amount: number }
  onReward?: (reward: any) => void
  onClose?: () => void
}

export default function GAMAdTrigger({
  type,
  adUnitId,
  children,
  className = "",
  buttonText,
  position = "bottom",
  reward = { type: "xu", amount: 100 },
  onReward,
  onClose,
}: GAMAdTriggerProps) {
  const [showAd, setShowAd] = useState(false)

  const defaultButtonTexts = {
    interstitial: "Xem quảng cáo toàn màn hình",
    anchor: "Hiện quảng cáo dính",
    rewarded: `Xem quảng cáo nhận ${reward.amount} ${reward.type}`,
  }

  const defaultIcons = {
    interstitial: <Maximize className="w-4 h-4 mr-2" />,
    anchor: <Play className="w-4 h-4 mr-2" />,
    rewarded: <Gift className="w-4 h-4 mr-2" />,
  }

  const handleTriggerClick = () => {
    setShowAd(true)
  }

  const handleClose = () => {
    setShowAd(false)
    onClose?.()
  }

  const handleReward = (rewardData: any) => {
    onReward?.(rewardData)
    setShowAd(false)
  }

  const renderTrigger = () => {
    if (children) {
      return (
        <div onClick={handleTriggerClick} className="cursor-pointer">
          {children}
        </div>
      )
    }

    return (
      <Button
        onClick={handleTriggerClick}
        className={`bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      >
        {defaultIcons[type]}
        {buttonText || defaultButtonTexts[type]}
      </Button>
    )
  }

  const renderAd = () => {
    if (!showAd) return null

    switch (type) {
      case "interstitial":
        return <GAMInterstitialAd adUnitId={adUnitId} onClose={handleClose} />

      case "anchor":
        return <GAMAnchorAd adUnitId={adUnitId} position={position} onClose={handleClose} />

      case "rewarded":
        return <GAMRewardedAd adUnitId={adUnitId} reward={reward} onReward={handleReward} onClose={handleClose} />

      default:
        return null
    }
  }

  return (
    <>
      {renderTrigger()}
      {renderAd()}
    </>
  )
}
