import type { GAMAdUnit, GAMDisplayCondition, GAMSlot } from "@/types/gam"
import { defineGAMSlot, displayGAMAd, refreshGAMAds, setGAMTargeting, trackGAMEvent } from "@/lib/gam"

class GAMManager {
  private adUnits: Map<string, GAMAdUnit> = new Map()
  private activeSlots: Map<string, GAMSlot> = new Map()
  private displayedAds: Set<string> = new Set()
  private refreshIntervals: Map<string, NodeJS.Timeout> = new Map()

  // Register ad unit
  registerAdUnit(adUnit: GAMAdUnit) {
    this.adUnits.set(adUnit.id, adUnit)
  }

  // Check if ad should be displayed
  shouldDisplayAd(adUnitId: string, context: any = {}): boolean {
    const adUnit = this.adUnits.get(adUnitId)
    if (!adUnit || !adUnit.enabled) return false

    // Check display conditions
    if (adUnit.displayConditions) {
      return adUnit.displayConditions.every((condition) => this.evaluateCondition(condition, context))
    }

    return true
  }

  // Evaluate display condition
  private evaluateCondition(condition: GAMDisplayCondition, context: any): boolean {
    const { type, value, operator } = condition

    switch (type) {
      case "device":
        const isMobile = context.isMobile || (typeof window !== "undefined" && window.innerWidth < 768)
        return operator === "equals" ? (value === "mobile") === isMobile : (value === "mobile") !== isMobile

      case "page":
        const currentPage = context.page || (typeof window !== "undefined" ? window.location.pathname : "")
        return operator === "equals" ? currentPage === value : currentPage !== value

      case "scroll":
        const scrollPercentage = context.scrollPercentage || 0
        return this.compareValues(scrollPercentage, value, operator)

      case "time":
        const currentHour = new Date().getHours()
        return this.compareValues(currentHour, value, operator)

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

  // Define and display ad
  defineAndDisplayAd(adUnitId: string, divId: string, context: any = {}): GAMSlot | null {
    const adUnit = this.adUnits.get(adUnitId)
    if (!adUnit || !this.shouldDisplayAd(adUnitId, context)) {
      return null
    }

    // Convert sizes to GAM format
    const gamSizes = adUnit.sizes.map((size) => [size.width, size.height])

    // Define slot
    const slot = defineGAMSlot(adUnit.adUnitPath, gamSizes, divId, adUnit.targeting)

    if (slot) {
      const gamSlot: GAMSlot = {
        id: adUnitId,
        adUnitPath: adUnit.adUnitPath,
        size: adUnit.sizes,
        targeting: adUnit.targeting,
        slot,
      }

      this.activeSlots.set(divId, gamSlot)

      // Display ad
      displayGAMAd(divId)

      // Mark as displayed
      this.displayedAds.add(adUnitId)

      // Set up refresh interval if specified
      if (adUnit.refreshable) {
        this.setupRefreshInterval(divId, 30000) // 30 seconds default
      }

      // Track event
      trackGAMEvent("slot_defined", slot)

      return gamSlot
    }

    return null
  }

  // Setup refresh interval
  private setupRefreshInterval(divId: string, interval: number) {
    const existingInterval = this.refreshIntervals.get(divId)
    if (existingInterval) {
      clearInterval(existingInterval)
    }

    const refreshInterval = setInterval(() => {
      const slot = this.activeSlots.get(divId)
      if (slot && slot.slot) {
        refreshGAMAds([slot.slot])
        trackGAMEvent("slot_refreshed", slot.slot)
      }
    }, interval)

    this.refreshIntervals.set(divId, refreshInterval)
  }

  // Refresh specific ad
  refreshAd(divId: string) {
    const slot = this.activeSlots.get(divId)
    if (slot && slot.slot) {
      refreshGAMAds([slot.slot])
      trackGAMEvent("slot_refreshed", slot.slot)
    }
  }

  // Refresh all ads
  refreshAllAds() {
    refreshGAMAds()
    this.activeSlots.forEach((slot) => {
      if (slot.slot) {
        trackGAMEvent("slot_refreshed", slot.slot)
      }
    })
  }

  // Destroy ad
  destroyAd(divId: string) {
    const slot = this.activeSlots.get(divId)
    if (slot && slot.slot && typeof window !== "undefined" && window.googletag) {
      window.googletag.cmd.push(() => {
        window.googletag.destroySlots([slot.slot!])
      })
    }

    // Clear refresh interval
    const interval = this.refreshIntervals.get(divId)
    if (interval) {
      clearInterval(interval)
      this.refreshIntervals.delete(divId)
    }

    this.activeSlots.delete(divId)
  }

  // Set targeting for all ads
  setGlobalTargeting(targeting: Record<string, string | string[]>) {
    Object.entries(targeting).forEach(([key, value]) => {
      setGAMTargeting(key, value)
    })
  }

  // Get ad unit
  getAdUnit(adUnitId: string): GAMAdUnit | undefined {
    return this.adUnits.get(adUnitId)
  }

  // Get active slot
  getActiveSlot(divId: string): GAMSlot | undefined {
    return this.activeSlots.get(divId)
  }
}

export const gamManager = new GAMManager()

// Initialize default GAM ad units
export const initializeDefaultGAMUnits = () => {
  const networkCode = process.env.NEXT_PUBLIC_GAM_NETWORK_CODE || "123456789"

  // Header Leaderboard
  gamManager.registerAdUnit({
    id: "header-leaderboard",
    name: "Header Leaderboard",
    adUnitPath: `/${networkCode}/gaming-fun/header-leaderboard`,
    sizes: [
      { width: 728, height: 90 },
      { width: 970, height: 90 },
    ],
    type: "leaderboard",
    position: "header",
    displayConditions: [{ type: "device", value: "desktop", operator: "equals" }],
    targeting: { position: "header", format: "leaderboard" },
    refreshable: true,
    enabled: true,
  })

  // Sidebar Rectangle
  gamManager.registerAdUnit({
    id: "sidebar-rectangle",
    name: "Sidebar Rectangle",
    adUnitPath: `/${networkCode}/gaming-fun/sidebar-rectangle`,
    sizes: [
      { width: 300, height: 250 },
      { width: 336, height: 280 },
    ],
    type: "rectangle",
    position: "sidebar",
    targeting: { position: "sidebar", format: "rectangle" },
    refreshable: true,
    enabled: true,
  })

  // Mobile Banner
  gamManager.registerAdUnit({
    id: "mobile-banner",
    name: "Mobile Banner",
    adUnitPath: `/${networkCode}/gaming-fun/mobile-banner`,
    sizes: [
      { width: 320, height: 50 },
      { width: 320, height: 100 },
    ],
    type: "banner",
    position: "header",
    displayConditions: [{ type: "device", value: "mobile", operator: "equals" }],
    targeting: { position: "mobile", format: "banner" },
    enabled: true,
  })

  // In-Content Rectangle
  gamManager.registerAdUnit({
    id: "content-rectangle",
    name: "In-Content Rectangle",
    adUnitPath: `/${networkCode}/gaming-fun/content-rectangle`,
    sizes: [{ width: 300, height: 250 }],
    type: "rectangle",
    position: "content",
    targeting: { position: "content", format: "rectangle" },
    enabled: true,
  })

  // Interstitial
  gamManager.registerAdUnit({
    id: "interstitial",
    name: "Interstitial",
    adUnitPath: `/${networkCode}/gaming-fun/interstitial`,
    sizes: [{ width: 1, height: 1 }], // Out-of-page
    type: "interstitial",
    position: "overlay",
    displayConditions: [{ type: "scroll", value: 50, operator: "greater" }],
    targeting: { format: "interstitial" },
    enabled: true,
  })

  // Anchor/Sticky
  gamManager.registerAdUnit({
    id: "anchor-bottom",
    name: "Bottom Anchor",
    adUnitPath: `/${networkCode}/gaming-fun/anchor-bottom`,
    sizes: [{ width: 320, height: 50 }],
    type: "anchor",
    position: "sticky",
    displayConditions: [{ type: "device", value: "mobile", operator: "equals" }],
    targeting: { position: "bottom", format: "anchor" },
    enabled: true,
  })

  // Rewarded Video
  gamManager.registerAdUnit({
    id: "rewarded-video",
    name: "Rewarded Video",
    adUnitPath: `/${networkCode}/gaming-fun/rewarded-video`,
    sizes: [{ width: 1, height: 1 }], // Out-of-page
    type: "rewarded",
    position: "overlay",
    targeting: { format: "rewarded" },
    enabled: true,
  })
}
