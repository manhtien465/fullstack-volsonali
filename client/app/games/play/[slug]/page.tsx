
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
import ResponsiveAd from '@/components/ads/ResponsiveAd';
import About from '@/components/new-layout10/About';
import GoogleAdSense from '@/components/ads/GoogleAdSense';

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
      <main className="max-w-screen-xl mx-auto p-4">
        {/* Wrapper */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main content area */}
          <div className="w-full lg:w-9/12 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left sidebar */}
              <aside className="hidden lg:w-1/4">
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
              <div className="w-full flex flex-col gap-4">
                <SafeGameIframe game={game}></SafeGameIframe>
                <GameGrid title="Click to Play, No Download" games={gamesHomepage} />
								<GoogleAdSense
									adSlot={'5677062264'}
									responsive={true}
									style={{
										display: 'inline-block',
										width: "100%",
										height: 90,
									}}
									className="w-full"
								/>
                {game.screenshots && <Screenshots data={game} />}
								<GoogleAdSense
									adSlot={'5677062264'}
									responsive={true}
									style={{
										display: 'inline-block',
										width: "100%",
										height: 250,
									}}
									className="w-full"
								/>
                <PlayNowBanner data={game} />
                <AdditionalInfo data={game} />
              </div>
            </div>

            {/* More games */}
            <MoreGame />
						<About></About>
          </div>

          {/* Right-side ad (only on desktop) */}
          <aside className="hidden lg:block w-full lg:w-3/12">
					<div className='w-full'>
						<GoogleAdSense
									adSlot={'5677062264'}
									responsive={true}
									style={{
										display: 'inline-block',
										minWidth: 0,
										maxWidth: 300,
										width: 300,
										height: 250,
							
									}}
									className="w-full"
								/>
							</div>
							<div className='w-full'>
								<GoogleAdSense
									adSlot={'5677062264'}
									responsive={true}
									style={{
										display: 'inline-block',
										minWidth: 0,
										maxWidth: 300,
										width: 300,
										height: 600,
									}}
									className="w-full"
								/>
								</div>
            
          </aside>
        </div>
      </main>
    </div>




  )
}
