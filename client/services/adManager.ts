import type { AdConfig, AdDisplayCondition } from "@/types/ads"

class AdManager {
  private ads: Map<string, AdConfig> = new Map()
  private displayedAds: Set<string> = new Set()
  private adPerformance: Map<string, any> = new Map()

  // Register ad configuration
  registerAd(config: AdConfig) {
    this.ads.set(config.id, config)
  }

  // Check if ad should be displayed based on conditions
  shouldDisplayAd(adId: string, context: any = {}): boolean {
    const ad = this.ads.get(adId)
    if (!ad || !ad.enabled) return false

    // Check if already displayed (for one-time ads)
    if (this.displayedAds.has(adId) && ad.position.trigger === "page-load") {
      return false
    }

    // Check display conditions
    return ad.displayConditions.every((condition) => this.evaluateCondition(condition, context))
  }

  // Evaluate individual display condition
  private evaluateCondition(condition: AdDisplayCondition, context: any): boolean {
    const { type, value, operator } = condition

    switch (type) {
      case "device":
        const isMobile = context.isMobile || false
        return operator === "equals" ? (value === "mobile") === isMobile : (value === "mobile") !== isMobile

      case "time":
        const currentHour = new Date().getHours()
        return this.compareValues(currentHour, value, operator)

      case "page-views":
        const pageViews = context.pageViews || 0
        return this.compareValues(pageViews, value, operator)

      case "game-category":
        const category = context.gameCategory || ""
        return operator === "equals" ? category === value : category !== value

      case "user-engagement":
        const engagement = context.userEngagement || 0
        return this.compareValues(engagement, value, operator)

      default:
        return true
    }
  }

  private compareValues(actual: any, expected: any, operator: string): boolean {
    switch (operator) {
      case "equals":
        return actual === expected
      case "greater":
        return actual > expected
      case "less":
        return actual < expected
      case "contains":
        return String(actual).includes(String(expected))
      case "not":
        return actual !== expected
      default:
        return true
    }
  }

  // Get ads for specific position
  getAdsForPosition(location: string, page: string, context: any = {}): AdConfig[] {
    return Array.from(this.ads.values())
      .filter(
        (ad) =>
          ad.position.location === location &&
          ad.position.page.some((p) => this.matchesPage(p, page)) &&
          this.shouldDisplayAd(ad.id, context),
      )
      .sort((a, b) => b.priority - a.priority)
  }

  private matchesPage(pattern: string, page: string): boolean {
    if (pattern === page) return true
    if (pattern.endsWith("/*")) {
      const basePath = pattern.slice(0, -2)
      return page.startsWith(basePath)
    }
    return false
  }

  // Mark ad as displayed
  markAsDisplayed(adId: string) {
    this.displayedAds.add(adId)
  }

  // Get ad configuration
  getAdConfig(adId: string): AdConfig | undefined {
    return this.ads.get(adId)
  }

  // Update ad performance
  updatePerformance(adId: string, metric: string, value: number) {
    const current = this.adPerformance.get(adId) || {}
    this.adPerformance.set(adId, { ...current, [metric]: value })
  }
}

export const adManager = new AdManager()

// Default ad configurations
export const initializeDefaultAds = () => {
  // Header banner ad
  adManager.registerAd({
    id: "header-banner",
    slotId: "1234567890",
    size: { width: 728, height: 90 },
    position: {
      page: ["/", "/games", "/games/*"],
      location: "header",
      trigger: "page-load",
    },
    displayConditions: [{ type: "device", value: "desktop", operator: "equals" }],
    priority: 1,
    enabled: true,
    format: "horizontal",
    responsive: true,
  })

  // Sidebar ad
  adManager.registerAd({
    id: "sidebar-rectangle",
    slotId: "1234567891",
    size: { width: 300, height: 250 },
    position: {
      page: ["/games", "/games/*"],
      location: "sidebar",
      trigger: "page-load",
    },
    displayConditions: [],
    priority: 2,
    enabled: true,
    format: "rectangle",
  })

  // In-game interstitial
  adManager.registerAd({
    id: "game-interstitial",
    slotId: "1234567892",
    size: { width: 320, height: 480 },
    position: {
      page: ["/games/*"],
      location: "interstitial",
      trigger: "game-end",
    },
    displayConditions: [{ type: "user-engagement", value: 30, operator: "greater" }],
    priority: 3,
    enabled: true,
    format: "auto",
  })

  // Click-triggered ad
  adManager.registerAd({
    id: "click-reward-ad",
    slotId: "1234567893",
    size: { width: 300, height: 250 },
    position: {
      page: ["/games/*"],
      location: "modal",
      trigger: "button-click",
    },
    displayConditions: [],
    priority: 4,
    enabled: true,
    format: "rectangle",
  })
}
