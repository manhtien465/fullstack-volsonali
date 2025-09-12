// Extend window object for googletag
declare global {
  interface Window {
    googletag: {
      cmd: Array<() => void>
      defineSlot: (adUnitPath: string, sizes: any[], divId: string) => any
      pubads: () => any
      enableServices: () => void
      display: (divId: string) => void
      destroySlots: (slots?: any[]) => void
      refresh: (slots?: any[]) => void
    }
  }
}

export const GAM_NETWORK_CODE = process.env.NEXT_PUBLIC_GAM_NETWORK_CODE || "23312725306"
export const GAM_ENABLED = process.env.NEXT_PUBLIC_GAM_ENABLED !== "false" // Default to true

// GAM script loading
export const loadGAMScript = (): Promise<void> => {
  if (typeof window === "undefined" || window.googletag) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve, reject) => {
    // Initialize googletag queue
    window.googletag = window.googletag || { cmd: [] }

    const script = document.createElement("script")
    script.async = true
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js"

    script.onload = () => {
      window.googletag.cmd.push(() => {
        // Enable services
        window.googletag.pubads().enableSingleRequest()
        window.googletag.pubads().enableAsyncRendering()
        window.googletag.pubads().collapseEmptyDivs()

        // Enable services
        window.googletag.enableServices()

        resolve()
      })
    }

    script.onerror = () => reject(new Error("Failed to load GAM script"))

    document.head.appendChild(script)
  })
}

// Initialize GAM
export const initializeGAM = async (): Promise<boolean> => {
  if (!GAM_ENABLED) {
    console.info("GAM is disabled")
    return false
  }

  try {
    await loadGAMScript()
    console.log("GAM initialized successfully")
    return true
  } catch (error) {
    console.error("GAM initialization failed:", error)
    return false
  }
}

// Define ad slot
export const defineGAMSlot = (
  adUnitPath: string,
  size: any,
  divId: string,
  targeting?: Record<string, string | string[]>,
): any | null => {
  if (!window.googletag) return null

  let slot: any | null = null

  window.googletag.cmd.push(() => {
    slot = window.googletag.defineSlot(adUnitPath, size, divId)

    if (slot) {
      slot.addService(window.googletag.pubads())

      // Add targeting
      if (targeting) {
        Object.entries(targeting).forEach(([key, value]) => {
          slot!.setTargeting(key, value)
        })
      }
    }
  })

  return slot
}

// Display ad
export const displayGAMAd = (divId: string): void => {
  if (!window.googletag) return

  window.googletag.cmd.push(() => {
    window.googletag.display(divId)
  })
}

// Refresh ads
export const refreshGAMAds = (slots?: any[]): void => {
  if (!window.googletag) return

  window.googletag.cmd.push(() => {
    if (slots) {
      window.googletag.pubads().refresh(slots)
    } else {
      window.googletag.pubads().refresh()
    }
  })
}

// Set page-level targeting
export const setGAMTargeting = (key: string, value: string | string[]): void => {
  if (!window.googletag) return

  window.googletag.cmd.push(() => {
    window.googletag.pubads().setTargeting(key, value)
  })
}

// Clear targeting
export const clearGAMTargeting = (key?: string): void => {
  if (!window.googletag) return

  window.googletag.cmd.push(() => {
    if (key) {
      window.googletag.pubads().clearTargeting(key)
    } else {
      window.googletag.pubads().clearTargeting()
    }
  })
}

// Track GAM events
export const trackGAMEvent = (event: string, slot: any, data?: any): void => {
  // Integration with analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `gam_${event}`, {
      event_category: "GAM Advertising",
      event_label: slot.getAdUnitPath(),
      custom_map: {
        ad_unit: slot.getAdUnitPath(),
        slot_id: slot.getSlotElementId(),
      },
      ...data,
    })
  }
}

// Helper to create full ad unit path
export function createAdUnitPath(adUnitName: string): string {
  return `/${GAM_NETWORK_CODE}/${adUnitName}`
}
