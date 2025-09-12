"use client"

import { useEffect, useRef } from "react"

interface UseParallaxOptions {
  speed?: number
  direction?: "up" | "down"
}

export function useParallax({ speed = 0.5, direction = "up" }: UseParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed
      const yPos = direction === "up" ? rate : -rate

      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    }

    // Throttle scroll events
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
    }
  }, [speed, direction])

  return ref
}
