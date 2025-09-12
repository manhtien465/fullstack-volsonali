"use client"

import GoogleAdSense from "./GoogleAdSense"

interface BannerAdProps {
  adSlot: string
  size?: "leaderboard" | "banner" | "large-banner" | "medium-rectangle" | "large-rectangle"
  className?: string
}

const adSizes = {
  leaderboard: { width: 728, height: 90 },
  banner: { width: 468, height: 60 },
  "large-banner": { width: 970, height: 90 },
  "medium-rectangle": { width: 300, height: 250 },
  "large-rectangle": { width: 336, height: 280 },
}

export default function BannerAd({ adSlot, size = "leaderboard", className = "" }: BannerAdProps) {
  const dimensions = adSizes[size]

  return (
    <div className={`banner-ad-container ${className} flex justify-center`}>
      <div>
        <div className="text-xs text-gray-400 mb-1 text-center">Advertisement</div>
        <GoogleAdSense
          adSlot={adSlot}
          adFormat="auto"
          responsive={false}
          style={{
            display: "inline-block",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
        />
      </div>
    </div>
  )
}
