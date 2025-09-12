"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { pageview } from "@/lib/gtag"

export default function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      // Wait for gtag to be available before tracking
      const trackPageView = () => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          pageview(url)
        } else {
          // Retry after a short delay if gtag isn't ready
          setTimeout(trackPageView, 100)
        }
      }

      // Small delay to ensure gtag script has loaded
      setTimeout(trackPageView, 100)
    }
  }, [pathname, searchParams])

  return null
}
