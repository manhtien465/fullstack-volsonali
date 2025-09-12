"use client"

import GoogleAdSense from "./GoogleAdSense"

interface ResponsiveAdProps {
  adSlot: string
  className?: string
  minHeight?: number
}

export default function ResponsiveAd({ adSlot, className = "", minHeight = 250 }: ResponsiveAdProps) {
  return (
    <div className={`responsive-ad-container ${className}`}>
      <div className="text-xs text-gray-400 mb-1 text-center">Advertisement</div>
      <GoogleAdSense
        adSlot={adSlot}
        adFormat="auto"
        responsive={true}
        style={{
          display: "block",
          minHeight: `${minHeight}px`,
          width: "100%",
        }}
        className="w-full"
      />
    </div>
  )
}
