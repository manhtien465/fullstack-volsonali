"use client"
import Link from "next/link"
import type { Game } from "@/types/game"
import { StrapiImage } from "@/components/custom/strapi-image"

interface GameCardProps {
  game: Game
  className?: string
  onClick?: (game: Game) => void
  index?: number
}

export function GameCardSmall({ game, className = "", onClick, index = 0 }: GameCardProps) {
  const cardContent = (
    <Link key={game.id} href={`/games/${game.slug}`} className="block ">
      <div className="flex gap-2 items-center p-3 bg-gray-50 rounded-xl hover:shadow transition-shadow cursor-pointer">
        <div className="relative w-24 h-24 border-gray-900 rounded-lg overflow-hidden mr-4 shrink-0 group">
          {/* Image with scale on hover */}
          <div className="w-full h-full transition-transform duration-300 group-hover:scale-110 shadow-[0px_4px_10px_0px_#737885]">
            <StrapiImage
              src={game?.image?.[0]?.url || "/placeholder.png"}
              alt={game?.image?.[0]?.alternativeText || game.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-semibold text-center px-2">
              {game.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )

  if (onClick) {
    return cardContent
  }

  return <>{cardContent}</>
}
