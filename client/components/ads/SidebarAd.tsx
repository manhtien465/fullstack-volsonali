"use client"

import GoogleAdSense from "./GoogleAdSense"

interface SidebarAdProps {
  adSlot: string
  className?: string
}

export default function SidebarAd({ adSlot, className = "" }: SidebarAdProps) {
  return (
    <div className={`sidebar-ad-container ${className}`}>
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
