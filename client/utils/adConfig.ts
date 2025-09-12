/**
 * Utility functions for AdSense configuration validation
 */

export interface AdConfigValidation {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateAdSenseConfig(): AdConfigValidation {
  const errors: string[] = []
  const warnings: string[] = []

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  // Check client ID
  if (!clientId) {
    errors.push("NEXT_PUBLIC_ADSENSE_CLIENT_ID is not set")
  } else if (clientId === "ca-pub-XXXXXXXXXX") {
    errors.push("NEXT_PUBLIC_ADSENSE_CLIENT_ID is still using placeholder value")
  } else if (!clientId.startsWith("ca-pub-")) {
    errors.push("NEXT_PUBLIC_ADSENSE_CLIENT_ID must start with 'ca-pub-'")
  } else if (clientId.length < 15) {
    warnings.push("NEXT_PUBLIC_ADSENSE_CLIENT_ID seems too short")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export function validateAdSlot(adSlot: string): boolean {
  if (!adSlot) return false
  if (adSlot.includes("YOUR_")) return false
  if (adSlot.includes("SLOT_ID")) return false
  if (adSlot.length < 5) return false

  return true
}

export function isAdSenseConfigured(): boolean {
  const validation = validateAdSenseConfig()
  return validation.isValid
}

export function getAdConfigStatus() {
  const validation = validateAdSenseConfig()
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  return {
    configured: validation.isValid,
    clientId: clientId || "Not set",
    errors: validation.errors,
    warnings: validation.warnings,
  }
}

export function logAdConfigStatus() {
  const status = getAdConfigStatus()

  if (status.configured) {
    console.log("✅ AdSense properly configured")
  } else {
    console.warn("⚠️ AdSense configuration issues:")
    status.errors.forEach((error) => console.error(`  ❌ ${error}`))
    status.warnings.forEach((warning) => console.warn(`  ⚠️ ${warning}`))
  }

  return status
}
