"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle, Settings } from "lucide-react"

interface AdConfigStatus {
  hasClientId: boolean
  clientIdValid: boolean
  hasValidSlots: boolean
  scriptLoaded: boolean
}

export default function AdConfigChecker() {
  const [configStatus, setConfigStatus] = useState<AdConfigStatus | null>(null)
  const [showChecker, setShowChecker] = useState(false)

  useEffect(() => {
    // Only show in development or when explicitly enabled
    const isDev = process.env.NODE_ENV === "development"
    const showDebug = localStorage.getItem("showAdDebug") === "true"

    if (isDev || showDebug) {
      setShowChecker(true)
      checkAdConfiguration()
    }
  }, [])

  const checkAdConfiguration = () => {
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

    const status: AdConfigStatus = {
      hasClientId: !!clientId,
      clientIdValid: !!(clientId && clientId !== "ca-pub-XXXXXXXXXX" && clientId.startsWith("ca-pub-")),
      hasValidSlots: checkForValidSlots(),
      scriptLoaded: !!(typeof window !== "undefined" && window.adsbygoogle),
    }

    setConfigStatus(status)
  }

  const checkForValidSlots = () => {
    // Check if any ad slots are properly configured
    const adElements = document.querySelectorAll("[data-ad-slot]")
    let hasValidSlots = false

    adElements.forEach((element) => {
      const slot = element.getAttribute("data-ad-slot")
      if (slot && !slot.includes("YOUR_") && !slot.includes("SLOT_ID") && slot.length > 5) {
        hasValidSlots = true
      }
    })

    return hasValidSlots
  }

  if (!showChecker || !configStatus) {
    return null
  }

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />
  }

  const allConfigured = Object.values(configStatus).every(Boolean)

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Settings className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-orange-900">AdSense Configuration</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Client ID Present:</span>
            {getStatusIcon(configStatus.hasClientId)}
          </div>

          <div className="flex items-center justify-between">
            <span>Client ID Valid:</span>
            {getStatusIcon(configStatus.clientIdValid)}
          </div>

          <div className="flex items-center justify-between">
            <span>Valid Ad Slots:</span>
            {getStatusIcon(configStatus.hasValidSlots)}
          </div>

          <div className="flex items-center justify-between">
            <span>Script Loaded:</span>
            {getStatusIcon(configStatus.scriptLoaded)}
          </div>
        </div>

        {!allConfigured && (
          <div className="mt-3 p-2 bg-orange-100 rounded text-xs text-orange-800">
            <div className="flex items-start space-x-1">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Setup Required:</strong>
                <ul className="mt-1 space-y-1">
                  {!configStatus.clientIdValid && <li>• Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env.local</li>}
                  {!configStatus.hasValidSlots && <li>• Replace placeholder ad slot IDs</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {allConfigured && (
          <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>
                <strong>All configured!</strong> Ads should display properly.
              </span>
            </div>
          </div>
        )}

        <button onClick={() => setShowChecker(false)} className="mt-2 text-xs text-orange-600 hover:text-orange-800">
          Hide checker
        </button>
      </CardContent>
    </Card>
  )
}
