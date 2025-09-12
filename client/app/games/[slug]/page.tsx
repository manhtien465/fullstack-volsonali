import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Play } from "lucide-react"
import { FadeInSection } from "@/components/animations/FadeInSection"
import { cn, getStrapiMedia } from "@/lib/utils"
import { FloatingElements } from "@/components/animations/FloatingElements"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { getHtmlBySlug } from "@/features/games/service/get-games"
import { TabGames } from "@/features/games/ui/tab"
import { StrapiImage } from "@/components/custom/strapi-image"
import { ContentGame } from "@/features/games/ui/content-game"
import DefaultLayout from "@/components/layout"
import NotFoundPage from "@/app/not-found"
import PopularNow from "@/features/games/ui/popular-now"
import GAMAdUnit from "@/components/ads/GAMAdUnit"

interface PageProps {
  params: Promise<{ slug: string }>
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolveParams = await params
    const slug = await resolveParams?.slug
    const { isEnabled: isDraftMode } = await draftMode()
    const status = isDraftMode ? "draft" : "published"

    const data = await getHtmlBySlug(slug, status)
    if (!data.data || data.data.length === 0) {
      return {
        title: "Resource Not Found",
        description: "The resource you're looking for doesn't exist.",
      }
    }

    const game = data.data[0]
    const imageUrl = game.image?.[0]?.url ? getStrapiMedia(game.image[0].url) : null

    return {
      title: `${game.name} - Learn & Explore | MegaGameFun`,
      description: game.desc || `Explore ${game.name} on MegaGameFun. ${game.category_html.name} learning resource.`,
      openGraph: {
        title: `${game.name} - Learn & Explore | MegaGameFun`,
        description: game.desc || `Explore ${game.name} on MegaGameFun.`,
        url: `https://megagamefun.com/games/${game.slug}`,
        type: "website",
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${game.name} - Learn & Explore | MegaGameFun`,
        description: game.desc || `Explore ${game.name} on MegaGameFun.`,
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      alternates: {
        canonical: `https://megagamefun.com/games/${game.slug}`,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Resource Not Found",
      description: "The resource you're looking for doesn't exist.",
    }
  }
}

export default async function GameDetailPage({ params }: PageProps) {
  const resolveParams = await params
  const slug = await resolveParams?.slug
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? "draft" : "published"
  const data = await getHtmlBySlug(slug, status)
  const game = data?.data[0]

  if (!game) {
    return <NotFoundPage></NotFoundPage>
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FloatingElements count={15} />
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>→</span>
          <Link href="/games" className="hover:text-blue-600">
            {game.category_html.name}
          </Link>
          <span>→</span>
          <span className="text-gray-900">{game.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Game Header */}
            <FadeInSection delay={200}>
              <Card className="mb-8 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="relative group">
                        <StrapiImage
                          src={game.image[0].url || "/placeholder.svg?height=120&width=120&text=Game"}
                          alt={game.image[0].alternativeText}
                          width={120}
                          height={120}
                          className="rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{game.name}</h1>

                      <div className="flex items-center justify-center sm:justify-start space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-5 h-5",
                              i < Math.floor(game.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300",
                            )}
                          />
                        ))}
                        <span className="ml-2 text-gray-600 font-medium">({game.rating})</span>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">All trademarks belong to their respective owners.</p>

                      <div className="flex flex-col sm:flex-row items-center gap-4">

                        <div className="flex items-center space-x-3">
                          {/* <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-pink-50 hover:border-pink-300 bg-transparent"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Save
                          </Button> */}

                          {/* <Share game={game} /> */}
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto ">
                       {game.url ? (
                          <Link
                            href={`/games/play/${game.slug}`}
                            className="w-full sm:w-auto"
                            // target="_blank"
                            // rel="noopener noreferrer"
                          >
                            <Button className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                              <Play className="w-4 h-4 mr-2" />
                              PLAY GAME
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            href={`/games/blog/${game.slug}`}
                            className="w-full sm:w-auto"
                            // target="_blank"
                            // rel="noopener noreferrer"
                          >
                          <Button className="w-full  bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <Play className="w-4 h-4 mr-2" />
                            SEE PROS, CONS & MORE
                          </Button>
                          </Link>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
            <div className="max-w-5xl mx-auto p-4">
              <GAMAdUnit adId="div-gpt-ad-1755424941447-2" style={{ minWidth: 180, minHeight: 60 }}></GAMAdUnit>
             </div>
             <PopularNow></PopularNow>
            {/* Tabs */}
            <TabGames game={game}></TabGames>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeInSection delay={800}>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">Resource Info</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Category:</span>
                      <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200">
                        {game.category_html.name}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{game.rating}/5</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Views:</span>
                      <span className="font-semibold text-gray-900">{game.plays?.toLocaleString()}</span>
                    </div>

                    {game.developer && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Developer:</span>
                        <span className="font-semibold text-gray-900 text-right">{game.developer}</span>
                      </div>
                    )}

                    {game.releaseDate && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Released:</span>
                        <span className="font-semibold text-gray-900">{new Date(game.releaseDate).getFullYear()}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                     <GAMAdUnit adId="div-gpt-ad-1755424941447-3" style={{ minWidth: 250, minHeight: 60 }} />
                    {/* {game.url ? (
                      <Link href={`/games/play/${game.slug}`} className="block">
                        <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                          <Play className="w-4 h-4 mr-2" />
                          PLAY GAME
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/games/blog/${game.slug}`} className="block">
                      <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        <Play className="w-4 h-4 mr-2" />
                        SEE PROS, CONS & MORE
                      </Button>
                       </Link>
                    )} */}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <ContentGame />
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
