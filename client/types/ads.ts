export interface AdConfig {
  id: string
  slotId: string
  size: AdSize
  position: AdPosition
  displayConditions: AdDisplayCondition[]
  priority: number
  enabled: boolean
  format?: "auto" | "rectangle" | "vertical" | "horizontal"
  responsive?: boolean
  keywords?: string[]
  categoryTargeting?: string[]
}

export interface AdSize {
  width: number | "auto"
  height: number | "auto"
  responsive?: boolean
}

export interface AdPosition {
  page: string[] // ['/', '/games', '/games/*']
  location: AdLocation
  trigger?: AdTrigger
  delay?: number // milliseconds
  scrollPercentage?: number // 0-100
}

export type AdLocation =
  | "header"
  | "sidebar"
  | "content-top"
  | "content-middle"
  | "content-bottom"
  | "footer"
  | "floating"
  | "interstitial"
  | "in-game"
  | "between-games"
  | "modal"

export type AdTrigger =
  | "page-load"
  | "button-click"
  | "scroll"
  | "time-delay"
  | "game-start"
  | "game-end"
  | "search"
  | "category-filter"
  | "user-interaction"

export interface AdDisplayCondition {
  type: "device" | "time" | "user-action" | "page-views" | "game-category" | "user-engagement"
  value: string | number | boolean
  operator: "equals" | "greater" | "less" | "contains" | "not"
}

export interface AdPerformance {
  impressions: number
  clicks: number
  ctr: number
  revenue: number
  viewability: number
}
