"use client"

import { useEffect, useState } from "react"
import GoogleAdSense from "./GoogleAdSense"

interface MobileAdProps {
  adSlot: string
  className?: string
}

export default function MobileAd({ adSlot, className = "" }: MobileAdProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMobile) {
    return null
  }

  return (
    <div className={`mobile-ad-container ${className}`}>
      <div className="text-xs text-gray-400 mb-1 text-center">Advertisement</div>
      <GoogleAdSense
        adSlot={adSlot}
        adFormat="auto"
        responsive={true}
        style={{
          display: "block",
          width: "100%",
          minHeight: "250px",
        }}
        className="w-full"
      />
    </div>
  )
}
