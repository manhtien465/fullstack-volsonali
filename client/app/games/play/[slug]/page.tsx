
import {
  headerGames,
} from '@/components/new-layout10/constants';
import { GameIcon } from '@/components/new-layout10/GameIcon';
import { Header } from '@/components/new-layout10/Header';
import { GameGrid } from '@/components/new-layout10/GameGrid';
import { Screenshots } from '@/components/new-layout10/Screenshots';
import { PlayNowBanner } from '@/components/new-layout10/PlayNowBanner';
import { AdditionalInfo } from '@/components/new-layout10/AdditionalInfo';
import { getStrapiMedia } from "@/lib/utils"
import type { Metadata } from "next"
import { draftMode } from "next/headers"
import { getHtmlBySlug, getHtmlGroups, getHtmlsMain } from "@/features/games/service/get-games"

import NotFoundPage from "@/app/not-found"
import { EGroups } from '@/features/games/constants/data';
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
      title: `${game.name} - Learn & Explore | Volsonali`,
      description: game.desc || `Explore ${game.name} on Volsonali. ${game.category_html.name} learning resource.`,
      openGraph: {
        title: `${game.name} - Learn & Explore | Volsonali`,
        description: game.desc || `Explore ${game.name} on Volsonali.`,
        url: `https://volsonali.com/games/${game.slug}`,
        type: "website",
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${game.name} - Learn & Explore | Volsonali`,
        description: game.desc || `Explore ${game.name} on Volsonali.`,
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      alternates: {
        canonical: `https://volsonali.com/games/${game.slug}`,
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

    <div className="min-h-screen font-sans bg-gray-50">
      <Header games={headerGames} />
      <main className="max-w-screen-2xl mx-auto p-4">
        {/* Wrapper */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main content area */}
          <div className="w-full lg:w-5/6 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left sidebar */}
              <aside className="w-full lg:w-1/4">
                <h2 className="text-blue-900 font-bold text-lg mb-3">Best Games</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                  {gameSidebars.map((game, index) => (
                    <GameIcon
                      key={game.id}
                      slug={game.slug}
                      src={game?.image[0]?.url}
                      name={game.name}
                      className={
                        index === 4
                          ? 'col-span-2 row-span-2 aspect-square'
                          : 'aspect-square'
                      }
                    />
                  ))}
                </div>
              </aside>

              {/* Right (Game details + grids) */}
              <div className="w-full lg:w-3/4 flex flex-col gap-4">
                <SafeGameIframe game={game}></SafeGameIframe>
                <GameGrid title="Click to Play, No Download" games={gamesHomepage} />
                {game.screenshots && <Screenshots data={game} />}
                <PlayNowBanner data={game} />
                <AdditionalInfo data={game} />
              </div>
            </div>

            {/* More games */}
            <MoreGame />
          </div>

          {/* Right-side ad (only on desktop) */}
          <aside className="hidden lg:flex w-full lg:w-1/6">
            <div className="bg-blue-600 border-2 border-blue-700 h-96 w-full flex items-center justify-center text-white rounded-lg">
              Ad Space
            </div>
          </aside>
        </div>
      </main>
    </div>




  )
}
