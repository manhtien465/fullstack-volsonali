"use client"

import { useParallax } from "@/hooks/useParallax"
import type { ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down"
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, direction = "up", className = "" }: ParallaxSectionProps) {
  const parallaxRef = useParallax({ speed, direction })

  return (
    <div ref={parallaxRef} className={`parallax ${className}`}>
      {children}
    </div>
  )
}
