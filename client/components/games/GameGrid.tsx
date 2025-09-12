"use client"

import { GameCard } from "./GameCard"
import { LoadingSpinner } from "@/components/animations/LoadingSpinner"
import { StaggeredGrid } from "@/components/animations/StaggeredGrid"
import type { Game } from "@/types/game"

interface GameGridProps {
  games: any[]
  loading?: boolean
  onGameClick?: (game: Game) => void
  className?: string
}

export function GameGrid({ games, loading, onGameClick, className = "" }: GameGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <LoadingSpinner size="lg" type="spinner" />
        <p className="text-gray-500 animate-pulse">Loading amazing games...</p>

        {/* Skeleton Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 w-full ${className}`}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="animate-shimmer h-20 sm:h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce">🎮</div>
        <p className="text-gray-500 text-base sm:text-lg animate-slide-in-up">No games found</p>
        <p className="text-gray-400 text-sm mt-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <StaggeredGrid
    //  lg:[grid-template-columns:repeat(12,calc((100%_-_180px)/12))]
    className={`
      grid gap-[15px]
      2xl:[grid-template-columns:repeat(8,1fr)]
      1800:[grid-template-columns:repeat(10,1fr)]

      xl:[grid-template-columns:repeat(8,1fr)]
      lg:[grid-template-columns:repeat(6,1fr)]
      md:[grid-template-columns:repeat(4,1fr)]
      [grid-template-columns:repeat(3,1fr)]
      ${className}
    `}
      staggerDelay={50}
      animationType="scale"
    >
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} onClick={onGameClick} index={index} />
      ))}
    </StaggeredGrid>
  )
}
