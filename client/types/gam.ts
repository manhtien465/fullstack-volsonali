export interface GAMConfig {
  networkCode: string
  adUnitPath: string
  size: GAMSize | GAMSize[]
  targeting?: Record<string, string | string[]>
  collapseEmptyDivs?: boolean
  enableSingleRequest?: boolean
  enableAsyncRendering?: boolean
  refreshInterval?: number
}

export interface GAMSize {
  width: number | "fluid"
  height: number | "fluid"
}

export interface GAMSlot {
  id: string
  adUnitPath: string
  size: GAMSize | GAMSize[]
  targeting?: Record<string, string | string[]>
  element?: HTMLElement
  slot?: any // googletag.Slot
}

export interface GAMDisplayCondition {
  type: "device" | "page" | "user" | "time" | "scroll"
  value: string | number | boolean
  operator: "equals" | "greater" | "less" | "contains" | "not"
}

export interface GAMAdUnit {
  id: string
  name: string
  adUnitPath: string
  sizes: GAMSize[]
  type: "banner" | "rectangle" | "leaderboard" | "skyscraper" | "interstitial" | "anchor" | "rewarded"
  position: "header" | "sidebar" | "content" | "footer" | "overlay" | "sticky"
  displayConditions?: GAMDisplayCondition[]
  targeting?: Record<string, string | string[]>
  refreshable?: boolean
  lazyLoad?: boolean
  enabled: boolean
}

export interface GAMPerformance {
  impressions: number
  clicks: number
  ctr: number
  revenue: number
  viewability: number
  fillRate: number
}

// Global GAM types
declare global {
  interface Window {
    googletag: any
    pbjs?: any
  }
}

export interface GAMEvent {
  type: "slotRequested" | "slotResponseReceived" | "slotRenderEnded" | "impressionViewable"
  slot: any
  data?: any
}
