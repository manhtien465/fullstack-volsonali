"use client"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import type { ReactNode } from "react"

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
}

export function FadeInSection({ children, className = "", delay = 0, direction = "up" }: FadeInSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getAnimationClass = () => {
    if (!isIntersecting) return "opacity-0"

    switch (direction) {
      case "up":
        return "animate-slide-in-up"
      case "down":
        return "animate-slide-in-down"
      case "left":
        return "animate-slide-in-left"
      case "right":
        return "animate-slide-in-right"
      case "scale":
        return "animate-scale-in"
      case "fade":
        return "animate-fade-in"
      default:
        return "animate-fade-in"
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${getAnimationClass()} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  )
}
