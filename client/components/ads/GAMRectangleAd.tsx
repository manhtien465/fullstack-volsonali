"use client"

import GAMBannerAd from "./GAMBannerAd"
import { cn } from "@/lib/utils"

interface GAMRectangleAdProps {
  adUnitName: string
  size?: "medium" | "large" | "square"
  className?: string
  context?: Record<string, any>
}

export default function GAMRectangleAd({ adUnitName, size = "medium", className, context }: GAMRectangleAdProps) {
  const sizeConfigs = {
    medium: {
      sizes: [[300, 250]],
      className: "w-[300px] h-[250px]",
    },
    large: {
      sizes: [[336, 280]],
      className: "w-[336px] h-[280px]",
    },
    square: {
      sizes: [[250, 250]],
      className: "w-[250px] h-[250px]",
    },
  }

  const config = sizeConfigs[size]

  return (
    <div className={cn("flex justify-center", className)}>
      <GAMBannerAd
        adUnitName={adUnitName}
        sizes={config.sizes}
        className={config.className}
        context={{ ...context, adType: "rectangle", size }}
      />
    </div>
  )
}
