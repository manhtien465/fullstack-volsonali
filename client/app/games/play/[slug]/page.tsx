import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {  Gamepad2, Play } from "lucide-react"
import { FadeInSection } from "@/components/animations/FadeInSection"
import { GameCard } from "@/components/games/GameCard"
import { getHtmlBySlug, getHtmls } from "@/features/games/service/get-games"
import { draftMode } from "next/headers"
import NotFoundPage from "@/app/not-found"
import { TabGames } from "@/features/games/ui/tab"
import Share from "@/features/games/ui/share"
import SafeGameIframe from "@/components/games/play/SafeIframe"
import { GameCardSmall } from "@/components/games/play/GameCardSmall"


interface PageProps {
  params: Promise<{ slug: string }>;
}

 async function PlayGamePage({ params }: PageProps) {
 const resolveParams = await params;
   const slug = await resolveParams?.slug;
   const { isEnabled: isDraftMode } = await draftMode();
   const status = isDraftMode ? "draft" : "published";
   const data = await getHtmlBySlug(slug, status);
   const game = data?.data[0];
   const { data: otherGames } = await getHtmls(1, '', '', true, 5);
    
    if (!game) {
      return <NotFoundPage></NotFoundPage>
    }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <FadeInSection>
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 overflow-x-auto">
            <Link href="/" className="hover:text-pink-600 transition-colors whitespace-nowrap">
              {/* <Home className="w-4 h-4" /> */}
              Home
            </Link>
            <span>→</span>
            <Link href="/games" className="hover:text-pink-600 transition-colors whitespace-nowrap">
               {game.category_html.name}
            </Link>
            <span>→</span>
            <Link
              href={`/games/${game.slug}`}
              className="hover:text-pink-600 transition-colors whitespace-nowrap"
            >
              {game.name}
            </Link>
            <span>→</span>
            <span className="text-gray-900 truncate">Play</span>
          </nav>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Game Content */}
          <div className="lg:col-span-3">
            <FadeInSection delay={200}>
              <Card className="mb-8 overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">{game.title}</h1>
                 <SafeGameIframe game={game}></SafeGameIframe>
                  
                  <div className="mt-6 text-gray-700 leading-relaxed text-center sm:text-left">
                    <h2 className="text-xl font-semibold mb-2">About {game.title}</h2>
                    <TabGames game={game}></TabGames>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>

          {/* Sidebar - Other Games */}
          <div className="lg:col-span-1">
            <FadeInSection delay={400}>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">More Games You Might Like</h3>
                  {otherGames.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                      {otherGames.map((otherGame, index) => (
                        <GameCardSmall key={otherGame.id} game={otherGame as any} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Gamepad2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No other games to display.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PlayGamePage
