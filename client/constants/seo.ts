export const SEO_CONFIG = {
  siteName: "Volsonali",
  siteUrl: "https://volsonali.com",
  defaultTitle: "Volsonali - Play Free HTML5 Games Online",
  defaultDescription:
    "Play the best free HTML5 games online at Volsonali. No downloads required! Enjoy arcade, puzzle, racing, and action games directly in your browser.",
  defaultKeywords: [
    "HTML5 games",
    "free online games",
    "browser games",
    "arcade games",
    "puzzle games",
    "racing games",
    "action games",
    "megagamefun",
    "play games online",
    "no download games",
  ],
  author: "Volsonali Team",
  twitterHandle: "@megagamefun",
  facebookAppId: "your-facebook-app-id",
  themeColor: "#3B82F6",
  backgroundColor: "#FFFFFF",
  locale: "en_US",
  type: "website",
  robots: "index, follow",
  googleSiteVerification: "your-google-site-verification-code",
  bingSiteVerification: "your-bing-site-verification-code",
}

export const GAME_SEO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
  description: SEO_CONFIG.defaultDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SEO_CONFIG.siteUrl}/games?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${SEO_CONFIG.siteUrl}/logo.png`,
    },
  },
}
