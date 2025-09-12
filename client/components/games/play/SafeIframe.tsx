'use client'

import Share from "@/features/games/ui/share"
import { Button } from "@/components/ui/button"
import { Play, Maximize } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { StrapiImage } from "@/components/custom/strapi-image"
import { FloatingElements } from "@/components/animations/FloatingElements"

function SafeGameIframe({ game }: { game: any }) {
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [hasStarted, setHasStarted] = useState(false)

  const handleFullscreen = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen()
      } else if ((iframe as any).mozRequestFullScreen) {
        (iframe as any).mozRequestFullScreen()
      } else if ((iframe as any).webkitRequestFullscreen) {
        (iframe as any).webkitRequestFullscreen()
      } else if ((iframe as any).msRequestFullscreen) {
        (iframe as any).msRequestFullscreen()
      }
    }
  }

  function detectDevTools() {
    let devToolsOpen = false
    const threshold = 160
    const element = new Image()
    Object.defineProperty(element, "id", {
      get: function () {
        devToolsOpen = true
      },
    })
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold
    if (widthThreshold || heightThreshold) {
      devToolsOpen = true
    }
    return devToolsOpen
  }

  function isBadUA() {
    const disallowed = ["HeadlessChrome", "PhantomJS", "Node.js"]
    const ua = navigator.userAgent
    return disallowed.some((name) => ua.includes(name))
  }

  const handlePlay = () => {
    setIframeSrc(game.url)
    setHasStarted(true)
  }

  return (
    <>
      {/* Game Container */}
      <div className="relative particles-bg w-full h-[60vh] sm:aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        <FloatingElements count={15} />

        {!hasStarted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent px-4">
            <StrapiImage
              src={game.image[0]?.url}
              alt={game.image[0]?.alternativeText}
              width={100}
              height={100}
              className="w-1/3 sm:w-1/5 max-w-xs rounded-3xl shadow-lg mb-6"
            />

            {/* Play Button */}
            <Button
              onClick={handlePlay}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg shadow hover:from-pink-700 hover:to-purple-700 transition-all flex items-center"
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Play Game
            </Button>

            {/* Message */}
            <p className="mt-4 sm:mt-6 text-gray-500 text-sm sm:text-base text-center px-2">
              Game will start after a short ad. Thank you for your support.
            </p>
          </div>
        )}

        {/* Iframe */}
        {iframeSrc && (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={game.name}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        )}
      </div>

      {/* Buttons under game */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 w-full px-4">
        <Button
          onClick={() => router.refresh()}
          className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Play className="w-4 h-4 mr-2" />
          Load Again
        </Button>

        <Button
          onClick={handleFullscreen}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto hover:bg-pink-50 hover:border-pink-300 bg-transparent"
        >
          <Maximize className="w-4 h-4 mr-2" />
          Fullscreen
        </Button>

        <div className="w-full sm:w-auto">
          <Share game={game} />
        </div>
      </div>
    </>
  )
}

export default SafeGameIframe
