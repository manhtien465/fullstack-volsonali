import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/sidebar"
// import AdWithFallback from "@/components/ads/AdWithFallback"
import { StructuredData } from "@/components/seo/StructuredData"
import { generateMetadata } from "@/utils/seo"
import { FadeInSection } from "@/components/animations/FadeInSection"
import { ParallaxSection } from "@/components/animations/ParallaxSection"
import { FloatingElements } from "@/components/animations/FloatingElements"
import { getBlogPosts } from "@/services/postService"
import { ESort } from "@/constants/sort"
import { ETypePosts } from "@/features/post/constants/data"
import { StrapiImage } from "@/components/custom/strapi-image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { ContentGame } from "@/components/ads/ContentGame"
import dynamic from "next/dynamic"
import { LazyLoadSection } from "@/components/custom/lazy-load-section"
import DefaultLayout from "@/components/layout"
import GAMAdUnit from "@/components/ads/GAMAdUnit"

const LayoutLeftRight = dynamic(() => import("@/features/homepage/ui/layout-left-right"))
const LayoutRightLeft = dynamic(() => import("@/features/homepage/ui/layout-right-left"))

export const revalidate = 60

export const metadata: Metadata = generateMetadata({
  title: "MegaGameFun Games & Apps - Find new free games, read reviews",
  description:
    "MegaGameFun - Gaming news, reviews, and updates to enhance your digital experience. Play the best HTML5 games instantly in your browser",
  keywords: ["Wiki game", "review games", "game guides", "game tips", "game news", "megagamefun"],
  url: "/",
})

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://megagamefun.com",
    },
  ],
}

export default async function HomePage() {
  const { data: lastestNews } = await getBlogPosts(1, "", "", 12, ESort.NEWEST, ETypePosts.NEWS)
  const featuredArticle = lastestNews[0]
  const regularArticles = lastestNews.slice(1)

  const [{ data: lastestTopApps }, { data: lastestTopGames }, { data: lastestTipGuides }, { data: lastestHowTo }] =
    await Promise.all([
      getBlogPosts(1, "", "", 12, ESort.NEWEST, ETypePosts.TOP_APPS),
      getBlogPosts(1, "", "", 12, ESort.NEWEST, ETypePosts.TOP_GAMES),
      getBlogPosts(1, "", "", 12, ESort.NEWEST, ETypePosts.TIP_GUIDES),
      getBlogPosts(1, "", "", 12, ESort.NEWEST, ETypePosts.HOW_TO),
    ])

  const featuredTopApp = lastestTopApps?.[0] ?? null
  const regularTopApps = lastestTopApps?.slice(1) ?? []

  const featuredTopGame = lastestTopGames?.[0] ?? null
  const regularTopGames = lastestTopGames?.slice(1) ?? []

  const featuredTopGuides = lastestTipGuides?.[0] ?? null
  const regularTopGuides = lastestTipGuides?.slice(1) ?? []

  const featuredHowToArticle = lastestHowTo?.[0] ?? null
  const regularHowToArticles = lastestHowTo?.slice(1) ?? []

  return (
    <DefaultLayout>
      <StructuredData data={breadcrumbSchema} />

      {/* Animated Background */}
      <div className="particles-bg">
        <FloatingElements count={15} />

        {/* Header Banner Ad with Fallback */}
        <FadeInSection className="px-4 sm:px-6 lg:px-8" delay={200}>
          {/* <AdWithFallback adSlot="6130871221" fallbackType="features" className="my-4" /> */}
          <GAMAdUnit adId="div-gpt-ad-1755424941447-0" style={{ minWidth: 250, minHeight: 60 }}></GAMAdUnit>
        </FadeInSection>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Section with Animated Text */}
              <FadeInSection className="text-center mb-8 lg:mb-12" delay={300}>
                <div className="relative">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    <h1 className="animate-gradient bg-clip-text text-transparent" />
                    MegaGameFun – Discover Free Games & Apps!
                  </div>
                  <p className="text-lg text-gray-600 animate-fade-in" style={{ animationDelay: "2s" }}>
                    Find new free games, explore apps, read reviews, and choose your next favorite.
                  </p>
                </div>
              </FadeInSection>

              {/* Featured Article */}
              <FadeInSection className="mb-8 lg:mb-12" delay={600}>
                <Card className="overflow-hidden hover-lift hover-glow group">
                  <Link
                    href={`/blog/${featuredArticle?.slug}`}
                    aria-label={`Read more about ${featuredArticle?.title}`}
                  >
                    <div className="relative">
                      <ParallaxSection speed={0.3}>
                        <StrapiImage
                          src={featuredArticle?.image?.url}
                          alt={featuredArticle?.image?.alternativeText}
                          width={800}
                          height={400}
                          className="w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </ParallaxSection>
                      <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-pink-600 hover:bg-pink-700 text-xs sm:text-sm animate-bounce-in hover-scale">
                        {featuredArticle?.category?.title}
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-pink-600 transition-colors duration-300">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-500 text-sm animate-fade-in">
                        {formatDate(featuredArticle?.publishedAt)}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              </FadeInSection>

              {/* In-Content Ad with Newsletter Fallback */}
              <FadeInSection delay={800}>
                {/* <AdWithFallback adSlot="6130871221" fallbackType="newsletter" className="mb-6 sm:mb-8" /> */}
                {/* <GAMBannerAd adUnitId="header-leaderboard" className="text-center" /> */}
                <GAMAdUnit adId="div-gpt-ad-1755424941447-0" style={{ minWidth: 250, minHeight: 60 }} />
              </FadeInSection>

              {/* News Section */}
              <FadeInSection delay={1000}>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 animate-slide-in-left">
                    Latest News & Updates
                  </h2>
                  <p
                    className="text-gray-600 text-sm sm:text-base animate-slide-in-left"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Fresh content and insights from our editors
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 stagger-animation">
                  {regularArticles.map((article, index) => (
                    <Card
                      key={article.id}
                      className="overflow-hidden hover-lift hover-glow transition-all duration-500 group"
                      style={{ animationDelay: `${1200 + index * 200}ms` }}
                    >
                      <Link href={`/blog/${article?.slug}`} aria-label={`Read more about ${article?.title}`}>
                        <div className="relative">
                          <StrapiImage
                            src={article?.image?.url}
                            alt={article?.image?.alternativeText}
                            width={300}
                            height={200}
                            className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-pink-600 hover:bg-pink-700 text-xs animate-bounce-in hover-scale">
                            {article.category?.title}
                          </Badge>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardContent className="p-3 sm:p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base leading-tight group-hover:text-pink-600 transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-gray-500 text-xs sm:text-sm animate-fade-in">{article.date}</p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-first lg:order-last">
              {/* Sidebar Ad with Games Fallback */}
              <FadeInSection delay={400} direction="right">
                <ContentGame></ContentGame>
                {/* <AdWithFallback adSlot="YOUR_SIDEBAR_AD_SLOT_ID" fallbackType="games" className="mb-4 sm:mb-6" /> */}
              </FadeInSection>

              <FadeInSection delay={600} direction="right">
                <Sidebar />
              </FadeInSection>

              {/* Additional Sidebar Ad with Social Fallback */}
              <FadeInSection delay={800} direction="right">
                {/* <AdWithFallback adSlot="6130871221a" fallbackType="social" className="mt-4 sm:mt-6" /> */}
                <GAMAdUnit adId="div-gpt-ad-1755424941447-1" style={{ minWidth: 250, minHeight: 60 }} />
              </FadeInSection>
            </div>
          </div>
          {/* Top Game Section */}
          <LazyLoadSection fallback={null}>
            <LayoutLeftRight
              featuredArticle={featuredTopGame}
              regularArticles={regularTopGames}
              title="Top Game"
              subtitle="Fresh game news from our editors"
            />
          </LazyLoadSection>
          {/* Top App Section */}
          <LazyLoadSection fallback={null}>
            <LayoutRightLeft
              featuredArticle={featuredTopApp}
              regularArticles={regularTopApps}
              title="Top App"
              subtitle="Discover the best apps across different categories"
            />
          </LazyLoadSection>

          {/* Guide Section */}
          <LazyLoadSection fallback={null}>
            <LayoutLeftRight
              featuredArticle={featuredTopGuides}
              regularArticles={regularTopGuides}
              title="Tips & Guides"
              subtitle="Expert tips and comprehensive guides to level up your gaming"
            />
          </LazyLoadSection>

          {/* How to Section */}
          <LazyLoadSection fallback={null}>
            <LayoutRightLeft
              featuredArticle={featuredHowToArticle}
              regularArticles={regularHowToArticles}
              title="How to"
              subtitle="Step-by-step guides to improve your gaming skills"
            />
          </LazyLoadSection>
        </div>
      </div>
    </DefaultLayout>
  )
}
