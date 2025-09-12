"use client"

import GoogleAdSense from "./GoogleAdSense"

interface InArticleAdProps {
  adSlot: string
  className?: string
}

export default function InArticleAd({ adSlot, className = "" }: InArticleAdProps) {
  return (
    <div className={`in-article-ad-container my-6 ${className}`}>
      <div className="text-xs text-gray-400 mb-2 text-center">Advertisement</div>
      <GoogleAdSense
        adSlot={adSlot}
        adFormat="fluid"
        adLayout="in-article"
        responsive={true}
        style={{
          display: "block",
          textAlign: "center",
        }}
        className="w-full"
      />
    </div>
  )
}
