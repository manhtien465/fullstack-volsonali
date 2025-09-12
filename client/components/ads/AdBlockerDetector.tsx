"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface AdBlockerDetectorProps {
  onAdBlockDetected: (isBlocked: boolean) => void
  children?: React.ReactNode
}

export default function AdBlockerDetector({ onAdBlockDetected, children }: AdBlockerDetectorProps) {
  const [isAdBlockDetected, setIsAdBlockDetected] = useState<boolean | null>(null)

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // Method 1: Try to create a fake ad element
        const testAd = document.createElement("div")
        testAd.innerHTML = "&nbsp;"
        testAd.className = "adsbox ad-banner advertisement ads"
        testAd.style.position = "absolute"
        testAd.style.left = "-10000px"
        testAd.style.width = "1px"
        testAd.style.height = "1px"

        document.body.appendChild(testAd)

        // Wait a bit for ad blockers to process
        await new Promise((resolve) => setTimeout(resolve, 100))

        const isBlocked =
          testAd.offsetHeight === 0 ||
          testAd.offsetWidth === 0 ||
          testAd.style.display === "none" ||
          testAd.style.visibility === "hidden"

        document.body.removeChild(testAd)

        // Method 2: Check for common ad blocker properties
        const hasAdBlockerProperties =
          (window.getComputedStyle && (window as any).uBlock !== undefined) ||
          (window as any).adblockDetector !== undefined

        // Method 3: Try to fetch a common ad script
        let scriptBlocked = false
        try {
          await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
            method: "HEAD",
            mode: "no-cors",
          })
        } catch {
          scriptBlocked = true
        }

        const adBlockDetected = isBlocked || hasAdBlockerProperties || scriptBlocked

        setIsAdBlockDetected(adBlockDetected)
        onAdBlockDetected(adBlockDetected)

        // Store detection result
        localStorage.setItem("adBlockDetected", adBlockDetected.toString())
      } catch (error) {
        console.error("Ad blocker detection failed:", error)
        setIsAdBlockDetected(false)
        onAdBlockDetected(false)
      }
    }

    // Check if we already detected ad blocker
    const cachedResult = localStorage.getItem("adBlockDetected")
    if (cachedResult !== null) {
      const isBlocked = cachedResult === "true"
      setIsAdBlockDetected(isBlocked)
      onAdBlockDetected(isBlocked)
    } else {
      detectAdBlocker()
    }
  }, [onAdBlockDetected])

  return <>{children}</>
}
