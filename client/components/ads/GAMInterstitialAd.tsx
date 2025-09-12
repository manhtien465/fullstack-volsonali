"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GAMInterstitialAdProps {
  adUnitId: string
  onClose?: () => void
  trigger?: "manual" | "scroll" | "time"
  scrollPercentage?: number
  delay?: number
}

export default function GAMInterstitialAd({
  adUnitId,
  onClose,
  trigger = "manual",
  scrollPercentage = 75,
  delay = 5000,
}: GAMInterstitialAdProps) {
  const [isVisible, setIsVisible] = useState(trigger === "manual")
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    if (trigger === "scroll") {
      const handleScroll = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrolled >= scrollPercentage) {
          setIsVisible(true)
          window.removeEventListener("scroll", handleScroll)
        }
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }

    if (trigger === "time") {
      const timer = setTimeout(() => setIsVisible(true), delay)
      return () => clearTimeout(timer)
    }
  }, [trigger, scrollPercentage, delay])

  useEffect(() => {
    if (isVisible && !adLoaded) {
      // Initialize GAM interstitial ad
      if (window.googletag) {
        window.googletag.cmd.push(() => {
          // Define interstitial slot
          const slot = window.googletag.defineOutOfPageSlot(
            `/23312725306/${adUnitId}`,
            window.googletag.enums.OutOfPageFormat.INTERSTITIAL,
          )
          if (slot) {
            slot.addService(window.googletag.pubads())
            window.googletag.display(slot)
            setAdLoaded(true)
          }
        })
      }
    }
  }, [isVisible, adLoaded, adUnitId])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <Button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
          size="sm"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Ad Content */}
        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quảng cáo</h3>
            <p className="text-sm text-gray-600">Đóng sau 5 giây</p>
          </div>

          {/* GAM Ad Container */}
          <div
            id={`interstitial-${adUnitId}`}
            className="min-h-[400px] bg-gray-100 rounded flex items-center justify-center"
          >
            {!adLoaded && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
