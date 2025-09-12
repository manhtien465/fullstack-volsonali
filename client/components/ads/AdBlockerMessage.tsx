"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Heart, Coffee, X, RefreshCw } from "lucide-react"

interface AdBlockerMessageProps {
  variant?: "polite" | "informative" | "supportive"
  showDismiss?: boolean
  onDismiss?: () => void
  className?: string
}

export default function AdBlockerMessage({
  variant = "polite",
  showDismiss = true,
  onDismiss,
  className = "",
}: AdBlockerMessageProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
    // Remember dismissal for this session
    sessionStorage.setItem("adBlockerMessageDismissed", "true")
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  if (isDismissed) return null

  const messages = {
    polite: {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "We Notice You're Using an Ad Blocker",
      content: (
        <div className="space-y-3">
          <p className="text-gray-600">
            We totally understand! Ads can be annoying. However, they help us keep Gaming Fun free and maintain our
            servers so you can enjoy unlimited gaming.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Good news:</strong> Our ads are carefully selected to be non-intrusive and gaming-related. No
              pop-ups, no auto-play videos, just clean banner ads.
            </p>
          </div>
        </div>
      ),
      actions: (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleRefresh} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh After Whitelisting
          </Button>
          <Button variant="outline" onClick={handleDismiss}>
            Continue Anyway
          </Button>
        </div>
      ),
    },
    informative: {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Help Us Keep Gaming Fun Free",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Gaming Fun is completely free because of advertising revenue. When you block ads, it directly impacts our
            ability to:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Add new games weekly
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Maintain fast, reliable servers
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Keep the site completely free
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Develop new features
            </li>
          </ul>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Our Promise:</strong> We only show relevant, safe ads. No malware, no inappropriate content.
            </p>
          </div>
        </div>
      ),
      actions: (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleRefresh} className="bg-red-600 hover:bg-red-700">
            <Heart className="w-4 h-4 mr-2" />
            Support Us - Disable Ad Blocker
          </Button>
          <Button variant="outline" onClick={handleDismiss}>
            Maybe Later
          </Button>
        </div>
      ),
    },
    supportive: {
      icon: <Coffee className="w-8 h-8 text-amber-500" />,
      title: "Thanks for Visiting Gaming Fun!",
      content: (
        <div className="space-y-3">
          <p className="text-gray-600">
            We see you're using an ad blocker. That's okay! We respect your choice. If you enjoy our games and want to
            support us, here are some ways you can help:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-green-50 p-3 rounded-lg">
              <strong className="text-green-800">Whitelist our site</strong>
              <p className="text-green-600">Add gamingfun.net to your ad blocker's whitelist</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <strong className="text-blue-800">Share with friends</strong>
              <p className="text-blue-600">Tell others about our awesome games</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <strong className="text-purple-800">Follow us</strong>
              <p className="text-purple-600">Stay updated on social media</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <strong className="text-orange-800">Leave feedback</strong>
              <p className="text-orange-600">Help us improve the gaming experience</p>
            </div>
          </div>
        </div>
      ),
      actions: (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleRefresh} className="bg-amber-600 hover:bg-amber-700">
            <Coffee className="w-4 h-4 mr-2" />
            I'll Whitelist You!
          </Button>
          <Button variant="outline" onClick={handleDismiss}>
            Continue Gaming
          </Button>
        </div>
      ),
    },
  }

  const message = messages[variant]

  return (
    <Card className={`border-l-4 border-l-blue-500 ${className}`}>
      <CardContent className="p-6">
        {showDismiss && (
          <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-6 w-6 p-0" onClick={handleDismiss}>
            <X className="h-3 w-3" />
          </Button>
        )}

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">{message.icon}</div>
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{message.title}</h3>
            {message.content}
            {message.actions}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
