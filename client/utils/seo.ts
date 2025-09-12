import { SEO_CONFIG } from "@/constants/seo"
import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "game"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SEOProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle
  const metaDescription = description || SEO_CONFIG.defaultDescription
  const metaKeywords = [...SEO_CONFIG.defaultKeywords, ...keywords].join(", ")
  const metaImage = image || `${SEO_CONFIG.siteUrl}/homepage.png`
  const metaUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: author || SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
    robots: SEO_CONFIG.robots,

    // Open Graph
    openGraph: {
      type: type as any,
      locale: SEO_CONFIG.locale,
      url: metaUrl,
      siteName: SEO_CONFIG.siteName,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },

    // Additional meta tags
    other: {
      "theme-color": SEO_CONFIG.themeColor,
      "msapplication-TileColor": SEO_CONFIG.themeColor,
      "msapplication-config": "/browserconfig.xml",
      "google-site-verification": SEO_CONFIG.googleSiteVerification,
      "msvalidate.01": SEO_CONFIG.bingSiteVerification,
    },

    // Verification
    verification: {
      google: SEO_CONFIG.googleSiteVerification,
      other: {
        "msvalidate.01": SEO_CONFIG.bingSiteVerification,
      },
    },

    // Icons
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: SEO_CONFIG.themeColor }],
    },

    // Manifest
    manifest: "/site.webmanifest",
  }
}

export function generateGameSchema(game: {
  title: string
  description: string
  image: string
  url: string
  rating?: number
  category: string
  developer?: string
  datePublished?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.title,
    description: game.description,
    image: game.image,
    url: `${SEO_CONFIG.siteUrl}${game.url}`,
    genre: game.category,
    gamePlatform: "Web Browser",
    operatingSystem: "Any",
    applicationCategory: "Game",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    ...(game.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: game.rating,
        ratingCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
    }),
    ...(game.developer && {
      author: {
        "@type": "Organization",
        name: game.developer,
      },
    }),
    ...(game.datePublished && { datePublished: game.datePublished }),
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
  }
}

export function shareGame(game: any) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://megagamefun.com"
  const url = `${baseUrl}/games/${game.slug}`

  const title = `${game.name} - Play Online for Free`
  const text = game.desc || `Play ${game.name} online for free. ${game.category_html?.name} game.`

  return {
    url,
    title,
    text,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  }
}
