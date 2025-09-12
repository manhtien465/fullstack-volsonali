"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useAnalytics } from "@/hooks/useAnalytics"
import { FadeInSection } from "@/components/animations/FadeInSection"
import type { Game } from "@/types/game"
import { StrapiImage } from "../custom/strapi-image"

interface GameCardProps {
  game: Game
  className?: string
  onClick?: (game: Game) => void
  index?: number
}

export function GameCard({ game, className = "", onClick, index = 0 }: GameCardProps) {
  const { trackGameStart, trackButtonClick } = useAnalytics()

  const handleClick = () => {
    // Track game card click
    trackButtonClick(`Play ${game.name}`, "Game Grid")

    // Track game start
    trackGameStart(game.name, game.category_html?.name)

    if (onClick) {
      onClick(game)
    }
  }

  const cardContent = (
    
      <Card
        className={`
          relative overflow-hidden hover-lift cursor-pointer group  rounded-[15%] transform shadow-[0px_4px_10px_0px_#737885]
          ${game.is_editor_choice ? "col-span-2 row-span-2 hover:scale-[1.08]" : "hover:scale-[1.15]"}
          ${className}
        `}
       
        onClick={handleClick}
      >
        <Link href={`/games/${game.slug}`}>
       
       
        <div className="relative">
          <div
            className={`
              ${game.is_editor_choice ? "md:h-[424px] md:w-[424px] xl:h-[371px] xl:w-[371px] 2xl:h-[371px] 2xl:w-[371px] lg:h-[375px] lg:w-[375px]  h-[230px] w-[230px]" : "md:h-[205px] md:w-[205px] 2xl:h-[180px] 2xl:w-[180px] xl:h-[180px] xl:w-[180px] lg:h-[180px] lg:w-[180px] w-[103px] h-[103px]"}
              flex items-center justify-center text-white font-bold text-sm mx-auto
              overflow-hidden
            `}
          >
            <StrapiImage
              src={game.image[0].url}
              alt={game.image[0].alternativeText}
              width={game.is_editor_choice ? 560: 560}
              height={game.is_editor_choice ? 560 : 560}
              // className="w-full h-full object-cover rounded-[15%] transition-transform duration-700 group-hover:scale-110"
               className="w-full h-full object-contain rounded-[15%]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />

            {/* Play Button Overlay */}
            <div className="absolute left-0 right-0 bottom-0 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             
             <div className="flex items-end justify-center w-full h-full">
              <div className="bg-gray-700 text-white w-full py-2 text-center">
                {game.name}
              </div>
              
              </div>
              
            </div>
          </div>
        </div>
         
           </Link>
      </Card>
     
   
  )

  if (onClick) {
    return cardContent
  }

  return <>{cardContent}</>
}
