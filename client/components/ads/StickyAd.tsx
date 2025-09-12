"use client"

import { useState, useEffect } from "react"
import GoogleAdSense from "./GoogleAdSense"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickyAdProps {
  adSlot: string
  position?: "top" | "bottom"
  className?: string
  closeable?: boolean
}

export default function StickyAd({ adSlot, position = "bottom", className = "", closeable = true }: StickyAdProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isVisible || !isMobile) {
    return null
  }

  return (
    <div
      className={`
        fixed left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg
        ${position === "top" ? "top-0" : "bottom-0"}
        ${className}
      `}
    >
      <div className="relative">
        {closeable && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 z-10 h-6 w-6 p-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        <div className="p-2">
          <GoogleAdSense
            adSlot={adSlot}
            adFormat="auto"
            responsive={true}
            style={{
              display: "block",
              width: "100%",
              height: "50px",
            }}
          />
        </div>
      </div>
    </div>
  )
}
