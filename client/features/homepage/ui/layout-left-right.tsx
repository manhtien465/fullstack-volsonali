import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeInSection } from "@/components/animations/FadeInSection"
import { StrapiImage } from "@/components/custom/strapi-image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface LayoutLeftRightProps {
  title: string
  subtitle:string
  featuredArticle: any
  regularArticles: any[]
}
 const LayoutLeftRight = ({ featuredArticle, regularArticles,title,subtitle }: LayoutLeftRightProps) => {
  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 animate-slide-in-left">
          {title}
        </h2>
        <p
          className="text-gray-600 text-sm sm:text-base animate-slide-in-left"
          style={{ animationDelay: "0.2s" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Main Layout: 1 Big Article Left, 2 Small Articles Right */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Left Side - Big Featured Article */}

        <FadeInSection className=" lg:col-span-2 mb-8 lg:mb-12" delay={600}>
          <Card className="overflow-hidden hover-lift hover-glow group">
            <Link href={`/blog/${featuredArticle?.slug}`} aria-label={`Read more about ${featuredArticle?.title}`}>
              <div className="relative">

                <StrapiImage
                  src={featuredArticle?.image?.url}
                  alt={featuredArticle?.image?.alternativeText}
                  width={800}
                  height={400}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-pink-600 hover:bg-pink-700 text-xs sm:text-sm animate-bounce-in hover-scale">
                  {featuredArticle?.category?.title}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-pink-600 transition-colors duration-300">
                  {featuredArticle?.title}
                </h2>
                <p className="text-gray-500 text-sm animate-fade-in">{formatDate(featuredArticle?.publishedAt)}</p>
              </CardContent>
            </Link>
          </Card>
        </FadeInSection>


        {/* Right Side - 2 Small Articles */}
        <div className="space-y-6">
          {regularArticles.slice(0, 2).map((article, index) => (
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
                    {article?.category?.title}
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
      </div>
      <FadeInSection delay={1000}>
        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {regularArticles.slice(2).map((article, index) => (
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
                    {article?.category?.title}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base leading-tight group-hover:text-pink-600 transition-colors duration-300">
                    {article?.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm animate-fade-in">{formatDate(article?.publishedAt)}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </FadeInSection>
    </div>
  )
}

export default LayoutLeftRight;
