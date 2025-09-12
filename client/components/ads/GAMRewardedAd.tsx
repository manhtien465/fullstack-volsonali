"use client"

import { useEffect, useState } from "react"
import { X, Play, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GAMRewardedAdProps {
  adUnitId: string
  reward?: { type: string; amount: number }
  onReward?: (reward: any) => void
  onClose?: () => void
}

export default function GAMRewardedAd({
  adUnitId,
  reward = { type: "xu", amount: 100 },
  onReward,
  onClose,
}: GAMRewardedAdProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [adState, setAdState] = useState<"preview" | "watching" | "completed">("preview")
  const [countdown, setCountdown] = useState(30)
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (adState === "watching" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (adState === "watching" && countdown === 0) {
      setAdState("completed")
    }
    return () => clearTimeout(timer)
  }, [adState, countdown])

  const handleStartWatching = () => {
    setAdState("watching")
    setCountdown(30)

    // Initialize GAM rewarded ad
    if (window.googletag) {
      window.googletag.cmd.push(() => {
        // Define rewarded slot
        const slot = window.googletag.defineOutOfPageSlot(
          `/23312725306/${adUnitId}`,
          window.googletag.enums.OutOfPageFormat.REWARDED,
        )
        if (slot) {
          slot.addService(window.googletag.pubads())
          window.googletag.display(slot)
          setAdLoaded(true)
        }
      })
    }
  }

  const handleClaimReward = () => {
    onReward?.(reward)
    setIsVisible(false)
    onClose?.()
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
        {/* Close Button */}
        <Button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-2"
          size="sm"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="p-6">
          {adState === "preview" && (
            <div className="text-center">
              <Gift className="w-16 h-16 mx-auto mb-4 text-pink-600" />
              <h3 className="text-xl font-bold mb-2">Nhận thưởng miễn phí!</h3>
              <p className="text-gray-600 mb-4">
                Xem quảng cáo 30 giây để nhận {reward.amount} {reward.type}
              </p>
              <Button
                onClick={handleStartWatching}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Bắt đầu xem
              </Button>
            </div>
          )}

          {adState === "watching" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="text-2xl font-bold text-pink-600">{countdown}</div>
                <p className="text-sm text-gray-600">giây còn lại</p>
              </div>

              {/* GAM Ad Container */}
              <div
                id={`rewarded-${adUnitId}`}
                className="min-h-[250px] bg-gray-100 rounded flex items-center justify-center mb-4"
              >
                {!adLoaded && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>}
              </div>

              <p className="text-sm text-gray-500">Đang phát quảng cáo...</p>
            </div>
          )}

          {adState === "completed" && (
            <div className="text-center">
              <Gift className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2 text-green-600">Chúc mừng!</h3>
              <p className="text-gray-600 mb-4">
                Bạn đã nhận được {reward.amount} {reward.type}
              </p>
              <Button
                onClick={handleClaimReward}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                <Gift className="w-4 h-4 mr-2" />
                Nhận thưởng
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
