"use client"

import { useCookieConsent } from "@/hooks/useCookieConsent"
import { Button } from "@/components/ui/button"
import { X, Cookie } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const { showBanner, acceptCookies, isLoading } = useCookieConsent()

  if (isLoading || !showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 shadow-2xl animate-slide-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Cookie Icon and Message */}
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <Cookie className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-sm text-gray-300 leading-relaxed">
              <span>
                We use unpersonalized cookies to keep our site working and collect statistics for marketing purposes.
              </span>
              <span className="text-gray-400 ml-1">
                See the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                >
                  Privacy and Cookie Policy
                </Link>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={acceptCookies}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Accept Cookies
            </Button>
            <Button
              onClick={acceptCookies}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-300 p-2"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar Animation */}
        <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  )
}
