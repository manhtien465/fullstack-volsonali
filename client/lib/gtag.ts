export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"

// Check if gtag is available
const isGtagAvailable = () => {
  return typeof window !== "undefined" && typeof window.gtag === "function"
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (isGtagAvailable()) {
    window.gtag("config", GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (isGtagAvailable()) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Gaming-specific events
export const trackGamePlay = (gameName: string, gameCategory: string) => {
  event({
    action: "play_game",
    category: "Games",
    label: `${gameName} - ${gameCategory}`,
  })
}

export const trackGameComplete = (gameName: string, score?: number) => {
  event({
    action: "complete_game",
    category: "Games",
    label: gameName,
    value: score,
  })
}

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: "search",
    category: "Site Search",
    label: searchTerm,
    value: resultsCount,
  })
}

export const trackDownload = (fileName: string) => {
  event({
    action: "download",
    category: "Downloads",
    label: fileName,
  })
}

export const trackShare = (contentType: string, contentName: string, method: string) => {
  event({
    action: "share",
    category: "Social",
    label: `${contentType}: ${contentName} via ${method}`,
  })
}

export const trackEngagement = (action: string, element: string) => {
  event({
    action: action,
    category: "Engagement",
    label: element,
  })
}

// E-commerce events (for future monetization)
export const trackPurchase = (transactionId: string, value: number, currency = "USD") => {
  if (isGtagAvailable()) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    })
  }
}

// Custom dimensions for gaming analytics
export const setUserProperties = (properties: Record<string, any>) => {
  if (isGtagAvailable()) {
    window.gtag("config", GA_TRACKING_ID, {
      custom_map: properties,
    })
  }
}
