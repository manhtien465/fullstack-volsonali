"use client"

import { useState, useEffect } from "react"

const COOKIE_CONSENT_KEY = "cookie-consent"

export function useCookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    setShowBanner(!hasConsent)
    setIsLoading(false)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setShowBanner(false)

    // Trigger analytics and ads initialization
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookiesAccepted"))
    }
  }

  const rejectCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected")
    setShowBanner(false)
  }

  return {
    showBanner,
    acceptCookies,
    rejectCookies,
    isLoading,
  }
}
