"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, ExternalLink } from "lucide-react"
import Logo from "@/components/layout/logo"

export default function AccessRestrictedPage() {
  const searchParams = useSearchParams()
  const [gameName, setGameName] = useState("This Game")
  const [playLink, setPlayLink] = useState("https://yourdomain.com/games")
  const [reason, setReason] = useState("domain")

  useEffect(() => {
    const gameParam = searchParams.get("game")
    const linkParam = searchParams.get("link")
    const reasonParam = searchParams.get("reason")

    if (gameParam) {
      setGameName(decodeURIComponent(gameParam))
    }
    if (linkParam) {
      setPlayLink(decodeURIComponent(linkParam))
    }
    if (reasonParam) {
      setReason(reasonParam)
    }
  }, [searchParams])

  const getReasonMessage = () => {
    switch (reason) {
      case "devtools":
        return {
          title: "Developer Tools Detected!",
          message: "Unauthorized access attempt detected. For security reasons, access has been restricted.",
          icon: "⚠️",
          color: "text-red-500",
        }
      case "domain":
        return {
          title: "Access Restricted",
          message: `${gameName} is not available on this domain.`,
          icon: "🛡️",
          color: "text-red-500",
        }
      case "iframe": // NEW: Handle iframe restriction
        return {
          title: "Embedding Not Allowed",
          message: `${gameName} cannot be embedded on this website. Please play on the official site.`,
          icon: "🔗", // Icon for embedding restriction (e.g., broken link)
          color: "text-blue-500", // A distinct color for iframe restriction
        }
      default:
        return {
          title: "Access Denied",
          message: "This content is not available here.",
          icon: "🚫",
          color: "text-red-500",
        }
    }
  }

  const reasonInfo = getReasonMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <Card className="relative w-full max-w-md bg-gray-900/90 border-gray-700 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div
            className={`flex w-full justify-center`}
          >
             <Logo/>
          </div>

          {/* Title */}
          <div>
            <h1 className={`text-2xl font-bold ${reasonInfo.color} mb-2`}>{reasonInfo.title}</h1>
            <p className="text-gray-300 text-sm leading-relaxed">{reasonInfo.message}</p>
          </div>

          {/* Game Info */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Protected Content</span>
            </div>
            <p className="text-white font-medium">{gameName}</p>
          </div>

          {/* Message */}
          <div className="text-gray-300 text-sm space-y-2">
            <p>
              If you want to play <strong className="text-white">{gameName}</strong>,
            </p>
            <p>click below to access the official version.</p>
          </div>

          {/* Action Button */}
          <Button
            asChild
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <a href={playLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Click here to Play
            </a>
          </Button>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">This content is protected by Gaming fun</p>
          </div>
        </CardContent>
      </Card>

      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
    </div>
  )
}
