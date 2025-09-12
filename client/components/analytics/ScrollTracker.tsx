"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useAnalytics } from "@/hooks/useAnalytics"

export default function ScrollTracker() {
  const pathname = usePathname()
  const { trackPageScroll } = useAnalytics()
  const scrollThresholds = useRef(new Set<number>())

  useEffect(() => {
    // Only initialize if gtag is available
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return
    }

    // Reset thresholds for new page
    scrollThresholds.current.clear()

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      )

      // Track at 25%, 50%, 75%, and 100% scroll
      const thresholds = [25, 50, 75, 100]

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !scrollThresholds.current.has(threshold)) {
          scrollThresholds.current.add(threshold)
          trackPageScroll(threshold, pathname)
        }
      })
    }

    const throttledScroll = throttle(handleScroll, 1000) // Throttle to once per second
    window.addEventListener("scroll", throttledScroll)

    return () => {
      window.removeEventListener("scroll", throttledScroll)
    }
  }, [pathname, trackPageScroll])

  return null
}

// Throttle function to limit scroll event frequency
function throttle(func: Function, limit: number) {
  let inThrottle: boolean
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
