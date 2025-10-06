
import {
  headerGames,
  sidebarGames,
  clickToPlayGames,
  moreOnlineGames
} from '@/components/new-layout10/constants';
import { GameIcon } from '@/components/new-layout10/GameIcon';
import { Header } from '@/components/new-layout10/Header';
import { GameDetails } from '@/components/new-layout10/GameDetails';
import { GameGrid } from '@/components/new-layout10/GameGrid';
import { Screenshots } from '@/components/new-layout10/Screenshots';
import { PlayNowBanner } from '@/components/new-layout10/PlayNowBanner';
import { AdditionalInfo } from '@/components/new-layout10/AdditionalInfo';
import { cn, getStrapiMedia } from "@/lib/utils"
import { FloatingElements } from "@/components/animations/FloatingElements"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { getHtmlBySlug, getHtmlFooter, getHtmlGroups, getHtmls, getHtmlsMain } from "@/features/games/service/get-games"
import { TabGames } from "@/features/games/ui/tab"
import { StrapiImage } from "@/components/custom/strapi-image"
import { ContentGame } from "@/features/games/ui/content-game"
import DefaultLayout from "@/components/layout"
import NotFoundPage from "@/app/not-found"
import PopularNow from "@/features/games/ui/popular-now"
import GAMAdUnit from "@/components/ads/GAMAdUnit"
import { EGroups, ETypeHtml } from '@/features/games/constants/data';
import SafeGameIframe from '@/components/games/play/SafeIframe';
import MoreGame from '@/components/new-layout10/MoreGame';

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
  let { data: gameSidebars } = await getHtmlGroups(1, 40, EGroups.HOT)
  let { data: gamesHomepage } = await getHtmlsMain(1, '', '', true, 12)
  if (!game) {
    return <NotFoundPage></NotFoundPage>
  }

  return (


    <div className="min-h-screen font-sans">
      <Header games={headerGames} />
      <main className="max-w-screen-2xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className='w-5/6'>
            <div className='w-full flex  gap-4 md:flex-row'>
              <aside className="w-full md:w-1/4">
                <h2 className="text-blue-900 font-bold text-lg mb-2">Best Games</h2>
                <div className="grid grid-cols-2 gap-2">
                  {gameSidebars.map((game, index) => {
                    // The 5th game (index 4) is larger, spanning 2 columns and 2 rows.
                    if (index === 4) {
                      return (
                        <GameIcon
                          slug={game.slug}
                          key={game.id}
                          src={game?.image[0]?.url}
                          name={game.name}
                          className="col-span-2 row-span-2"
                        />
                      );
                    }
                    // All other games in the sidebar are square.
                    return (
                      <GameIcon
                        key={game.id}
                        src={game?.image[0]?.url}
                        name={game.name}
                        slug={game.slug}
                        className="aspect-square"
                      />
                    );
                  })}
                </div>
              </aside>

              <div className="w-full md:w-3/4 flex flex-col gap-4">
                <SafeGameIframe game={game}></SafeGameIframe>
                <GameGrid title="Click to Play, No Download" games={gamesHomepage} />
                {game.screenshots && <Screenshots data={game} />}
                <PlayNowBanner data={game} />
                <AdditionalInfo data={game} />

              </div>
            </div>

            <MoreGame></MoreGame>
          </div>

          <aside className="hidden md:block w-1/6">
            <div className="bg-blue-600 border-2 border-blue-700 h-96 w-full flex items-center justify-center text-white">
              Ad Space
            </div>
          </aside>
        </div>
      </main>
    </div>


  )
}
