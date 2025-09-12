"use client"

import { useState, useEffect } from "react"

interface UseAdBlockerReturn {
  isAdBlocked: boolean | null
  isLoading: boolean
  retryDetection: () => void
}

export function useAdBlocker(): UseAdBlockerReturn {
  const [isAdBlocked, setIsAdBlocked] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const detectAdBlocker = async () => {
    setIsLoading(true)

    try {
      // Multiple detection methods for accuracy
      const results = await Promise.all([detectByElement(), detectByScript(), detectByFetch(), detectByBait()])

      // If any method detects ad blocker, consider it blocked
      const blocked = results.some((result) => result === true)

      setIsAdBlocked(blocked)

      // Cache result for session
      sessionStorage.setItem("adBlockDetected", blocked.toString())
      sessionStorage.setItem("adBlockDetectedTime", Date.now().toString())
    } catch (error) {
      console.error("Ad blocker detection failed:", error)
      setIsAdBlocked(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Method 1: Element detection
  const detectByElement = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const testElement = document.createElement("div")
      testElement.innerHTML = "&nbsp;"
      testElement.className = "adsbox ad-banner advertisement ads ad-placement"
      testElement.style.position = "absolute"
      testElement.style.left = "-10000px"
      testElement.style.width = "1px"
      testElement.style.height = "1px"

      document.body.appendChild(testElement)

      setTimeout(() => {
        const isBlocked =
          testElement.offsetHeight === 0 ||
          testElement.offsetWidth === 0 ||
          testElement.style.display === "none" ||
          testElement.style.visibility === "hidden"

        document.body.removeChild(testElement)
        resolve(isBlocked)
      }, 100)
    })
  }

  // Method 2: Script detection
  const detectByScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      script.async = true

      script.onload = () => {
        document.head.removeChild(script)
        resolve(false) // Script loaded, no ad blocker
      }

      script.onerror = () => {
        document.head.removeChild(script)
        resolve(true) // Script blocked
      }

      document.head.appendChild(script)

      // Timeout fallback
      setTimeout(() => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
          resolve(true)
        }
      }, 3000)
    })
  }

  // Method 3: Fetch detection
  const detectByFetch = (): Promise<boolean> => {
    return new Promise((resolve) => {
      fetch("https://googleads.g.doubleclick.net/pagead/id", {
        method: "HEAD",
        mode: "no-cors",
      })
        .then(() => resolve(false))
        .catch(() => resolve(true))

      // Timeout
      setTimeout(() => resolve(true), 3000)
    })
  }

  // Method 4: Bait element detection
  const detectByBait = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const bait = document.createElement("div")
      bait.setAttribute(
        "class",
        "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
      )
      bait.setAttribute(
        "style",
        "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
      )

      document.body.appendChild(bait)

      setTimeout(() => {
        const isBlocked =
          bait.offsetHeight === 0 ||
          bait.offsetWidth === 0 ||
          window.getComputedStyle(bait).getPropertyValue("display") === "none"

        document.body.removeChild(bait)
        resolve(isBlocked)
      }, 100)
    })
  }

  const retryDetection = () => {
    // Clear cache and retry
    sessionStorage.removeItem("adBlockDetected")
    sessionStorage.removeItem("adBlockDetectedTime")
    detectAdBlocker()
  }

  useEffect(() => {
    // Check cache first
    const cached = sessionStorage.getItem("adBlockDetected")
    const cacheTime = sessionStorage.getItem("adBlockDetectedTime")

    // Use cache if less than 5 minutes old
    if (cached && cacheTime && Date.now() - Number.parseInt(cacheTime) < 300000) {
      setIsAdBlocked(cached === "true")
      setIsLoading(false)
    } else {
      detectAdBlocker()
    }
  }, [])

  return {
    isAdBlocked,
    isLoading,
    retryDetection,
  }
}
