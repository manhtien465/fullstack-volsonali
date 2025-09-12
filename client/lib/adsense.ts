export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXX"

// AdSense script loading
export const loadAdSenseScript = () => {
  if (typeof window === "undefined" || document.querySelector("[data-ad-client]")) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
    script.crossOrigin = "anonymous"
    script.setAttribute("data-ad-client", ADSENSE_CLIENT_ID)

    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load AdSense script"))

    document.head.appendChild(script)
  })
}

// Initialize AdSense
export const initializeAdSense = async () => {
  try {
    await loadAdSenseScript()

    // Initialize adsbygoogle array if not exists
    if (typeof window !== "undefined") {
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
    }

    return true
  } catch (error) {
    console.error("AdSense initialization failed:", error)
    return false
  }
}

// Push ad to AdSense
export const pushAd = (adConfig?: any) => {
  if (typeof window !== "undefined" && (window as any).adsbygoogle) {
    try {
      ;(window as any).adsbygoogle.push(adConfig || {})
    } catch (error) {
      console.error("Failed to push ad:", error)
    }
  }
}

// Track ad performance
export const trackAdPerformance = (adId: string, event: "impression" | "click") => {
  // Integration with your analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `ad_${event}`, {
      event_category: "Advertising",
      event_label: adId,
      custom_map: {
        ad_unit: adId,
      },
    })
  }
}
