import { GameGrid } from "@/components/games/GameGrid"
import BannerAd from "@/components/ads/BannerAd"
import ResponsiveAd from "@/components/ads/ResponsiveAd"
import MobileAd from "@/components/ads/MobileAd"
import { StructuredData } from "@/components/seo/StructuredData"
import { getHtmls, getHtmlsMain } from "@/features/games/service/get-games"
import { ETypeHtml } from "@/features/games/constants/data"
import DefaultLayout from "@/components/layout"
import type { Metadata } from "next"
import { generateMetadata } from "@/utils/seo"
import GAMRectangleAd from "@/components/ads/GAMRectangleAd"
import GAMAdUnit from "@/components/ads/GAMAdUnit"

export const revalidate = 3600

export const metadata: Metadata = generateMetadata({
  title: "Read Game Reviews and play - MegaGameFun",
  description:
    "Your Fun Zone with HTML5 Game.  Play H5 games online on your browsers!",
  keywords: ["h5 game", "MegaGameFun", "fun game"],
  url: "/games",
})

interface GamesPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}
export default async function GamesPage({ searchParams }: GamesPageProps) {
  const params = await searchParams
  const page = Number.parseInt(params.page ?? "1")
  const queryString = params.keyword ?? ""
  const category = params.category ?? ""
  const { data, meta } = await getHtmlsMain(page, queryString, category, undefined, undefined, ETypeHtml.GAME)
  const total = Number(meta?.pagination?.pageCount)

  const gamesPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Read Game Reviews and play - MegaGameFun",
    description:
      "Your Fun Zone with HTML5 Game.  Play H5 games online on your browsers!",
    url: "https://megagamefun.com/games",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.length,
      itemListElement: data.map((game, index) => ({
        "@type": "LearningResource",
        position: index + 1,
        name: game.name,
        description: game.desc,
        url: `${game.url}`,
        genre: game.category_html?.name,
        gamePlatform: "Web Browser",
      })),
    },
  }
  return (
    <DefaultLayout>
      <StructuredData data={gamesPageSchema} />

      <div className="max-w-[1860px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Banner Ad */}

        <div className="hidden md:block mb-6 lg:mb-8">
          {/* <BannerAd adSlot="YOUR_GAMES_HEADER_AD_SLOT_ID" size="leaderboard" className="text-center" /> */}
          {/* <GAMBannerAd adUnitName="Display" className="text-center"  divId="div-gpt-ad-1755424941447-0" /> */}
          <GAMAdUnit adId="div-gpt-ad-1755424941447-6" style={{ minWidth: 180, minHeight: 60 }}></GAMAdUnit>

        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 px-4">
            H5 Games
          </h1>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Explore categories like girls’ games, 3D games, racing, sports, shooters, and many more. !
          </p>
        </div>

        {/* Filters and Page Size */}

        {/* <div className="mb-6 sm:mb-8 space-y-4">
          <GameFilters  totalResults={meta.pagination?.total} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600">{data.length} games found</div>
          </div>
        </div> */}

        {/* <PageSizeSelector pageSize={pageSize} onPageSizeChange={setPageSize} options={[12, 24, 48, 96]} /> */}
        {/* Mobile Ad */}
        <div className="flex md:hidden">
          <GAMAdUnit adId="div-gpt-ad-1755424941447-7" style={{ minWidth: 180, minHeight: 60, marginBottom: "16px" }}></GAMAdUnit>
        </div>


        {/* <GAMBannerAd adUnitName="Display"  divId="div-gpt-ad-1755424941447-0" /> */}
        {/* Games Grid */}
        <div className="mb-8">
          <GameGrid games={data} loading={false} />
        </div>

        {/* Pagination */}
        <div className="mb-8">{/* <PaginationComponent pageCount={total} /> */}</div>

        {/* Mid-Content Ad */}
        {/* <ResponsiveAd adSlot="YOUR_MID_CONTENT_AD_SLOT_ID" className="my-8 sm:my-12" /> */}
        <GAMAdUnit adId="div-gpt-ad-1755424941447-8" style={{ minWidth: 180, minHeight: 60, marginBottom: "16px" }}></GAMAdUnit>

        {/* Interstitial Ad - Triggered by scroll */}
        {/* <GAMInterstitialAd adUnitId="interstitial" trigger="scroll" scrollPercentage={75} /> */}
      </div>
    </DefaultLayout>
  )
}
