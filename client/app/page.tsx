import { StructuredData } from "@/components/seo/StructuredData"
import { getHtmlsMain } from "@/features/games/service/get-games"
import { ETypeHtml } from "@/features/games/constants/data"
import DefaultLayout from "@/components/layout"
import type { Metadata } from "next"
import { generateMetadata } from "@/utils/seo"
import GAMAdUnit from "@/components/ads/GAMAdUnit"
import Link from "next/link"
import { StrapiImage } from "@/components/custom/strapi-image"
import About from "@/components/new-layout10/About"
import ResponsiveAd from "@/components/ads/ResponsiveAd"

export const revalidate = 3600

export const metadata: Metadata = generateMetadata({
  title: "Read Game Reviews and play - Volsonali",
  description:
    "Your Fun Zone with HTML5 Game.  Play H5 games online on your browsers!",
  keywords: ["h5 game", "Volsonali", "fun game"],
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
    name: "Read Game Reviews and play - Volsonali",
    description:
      "Your Fun Zone with HTML5 Game.  Play H5 games online on your browsers!",
    url: "https://volsonali.com/games",
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
    <>
      <StructuredData data={gamesPageSchema} />

      <div className="max-w-[1860px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Banner Ad */}

        {/* <div className="hidden md:block mb-6 lg:mb-8">
          <GAMAdUnit adId="div-gpt-ad-1755424941447-6" style={{ minWidth: 180, minHeight: 60 }}></GAMAdUnit>
        </div> */}





        {/* Mobile Ad */}
        {/* <div className="flex md:hidden">
          <GAMAdUnit adId="div-gpt-ad-1755424941447-7" style={{ minWidth: 180, minHeight: 60, marginBottom: "16px" }}></GAMAdUnit>
        </div> */}



        {/* Games Grid */}
        <div className="mb-8">
          {/* <GameGrid games={data} loading={false} /> */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8  xl:grid-cols-10 2xl:grid-cols-10 gap-3 grid-flow-dense">
            {data.map((game, index) => (
							<>
              <div
                key={`${game.documentId}-${index}`}
                className={`
              ${game.is_editor_choice ? "col-span-2 row-span-2" : ""}
            `}
              >
                <Link href={`/games/${game.slug}`} className="block overflow-hidden rounded-xl group relative aspect-square">
                  {/* Game image */}
                  <StrapiImage
                    src={game.image?.[0]?.url || "/placeholder.svg?height=120&width=120&text=Game"}
                    alt={game.image?.[0]?.alternativeText || game.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold text-center px-2">{game.name}</span>
                  </div>
                </Link>
              </div>
							{
								index === 10  && <ResponsiveAd adSlot="5951098589" className="col-span-2 row-span-2 w-[300px] h-[250px]" />
							}
							</>
            ))}
          </div>
        </div>
				<About></About>


        {/* Mid-Content Ad */}
        {/* <ResponsiveAd adSlot="YOUR_MID_CONTENT_AD_SLOT_ID" className="my-8 sm:my-12" /> */}
        <GAMAdUnit adId="div-gpt-ad-1755424941447-8" style={{ minWidth: 180, minHeight: 60, marginBottom: "16px" }}></GAMAdUnit>

        {/* Interstitial Ad - Triggered by scroll */}
        {/* <GAMInterstitialAd adUnitId="interstitial" trigger="scroll" scrollPercentage={75} /> */}
      </div>
    </>
  )
}
