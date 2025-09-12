"use client"

import { useEffect, useState } from "react"
import GAMAdUnit from "./GAMAdUnit"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface GAMAnchorAdProps {
  adUnitId: string
  position?: "top" | "bottom"
  className?: string
  closeable?: boolean
  onClose?: () => void
}

export default function GAMAnchorAd({
  adUnitId,
  position = "bottom",
  className = "",
  closeable = true,
  onClose,
}: GAMAnchorAdProps) {
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

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible || !isMobile) {
    return null
  }

  return (
    <div
      className={`
        fixed left-0 right-0 z-40 bg-white border shadow-lg
        ${position === "top" ? "top-0 border-b" : "bottom-0 border-t"}
        ${className}
      `}
    >
      <div className="relative">
        {closeable && (
          <Button variant="ghost" size="sm" className="absolute top-1 right-1 z-10 h-6 w-6 p-0" onClick={handleClose}>
            <X className="h-3 w-3" />
          </Button>
        )}
        <div className="p-2">
          <GAMAdUnit adUnitId={adUnitId} context={{ device: "mobile", position: position }} className="w-full" />
        </div>
      </div>
    </div>
  )
}
