"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GamepadIcon, Star, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { ContentGame } from "./ContentGame"

interface AlternativeContentProps {
  type?: "games" | "newsletter" | "social" | "features"
  className?: string
}

export default function AlternativeContent({ type = "games", className = "" }: AlternativeContentProps) {
  const content = {
    games: {
      title: "🎮 Discover More Games",
      items: [
        { name: "Snake Game", category: "Arcade", rating: 4.8, href: "/games/snake" },
        { name: "2048", category: "Puzzle", rating: 4.7, href: "/games/2048" },
        { name: "Tetris", category: "Classic", rating: 4.9, href: "/games/tetris" },
      ],
      cta: "Play Now",
    },
    newsletter: {
      title: "📧 Stay Updated",
      description: "Get weekly updates on new games, tips, and gaming news!",
      benefits: ["New game releases", "Gaming tips & tricks", "Exclusive content", "No spam, unsubscribe anytime"],
    },
    social: {
      title: "🌟 Join Our Community",
      platforms: [
        { name: "Discord", users: "5.2K", description: "Chat with gamers" },
        { name: "Twitter", users: "12K", description: "Latest updates" },
        { name: "YouTube", users: "8.5K", description: "Game tutorials" },
      ],
    },
    features: {
      title: "✨ Why Choose Gaming Fun?",
      features: [
        { icon: <GamepadIcon className="w-5 h-5" />, title: "500+ Free Games", desc: "No downloads required" },
        { icon: <Star className="w-5 h-5" />, title: "High Quality", desc: "Curated game collection" },
        { icon: <TrendingUp className="w-5 h-5" />, title: "Regular Updates", desc: "New games weekly" },
        { icon: <Users className="w-5 h-5" />, title: "Community", desc: "Join thousands of players" },
      ],
    },
  }

  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 ${className}`}>
      <CardContent className="p-6">
        {type === "games" && (
          <></>
        )}

        {type === "newsletter" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{content.newsletter.title}</h3>
            <p className="text-gray-600">{content.newsletter.description}</p>
            <ul className="space-y-2">
              {content.newsletter.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
            </div>
          </div>
        )}

        {type === "social" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{content.social.title}</h3>
            <div className="space-y-3">
              {content.social.platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{platform.name}</h4>
                    <p className="text-sm text-gray-600">{platform.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">{platform.users}</div>
                    <Button size="sm" variant="outline">
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === "features" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{content.features.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.features.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                  <div className="text-blue-600 mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
