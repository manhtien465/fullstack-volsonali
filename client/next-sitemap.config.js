const fs = require("fs")
const path = require("path")

module.exports = {
  siteUrl: "https://volsonali.com",
  generateRobotsTxt: true,
  async additionalPaths(config) {
    const slugsGameFile = path.join(process.cwd(), "public", "game.json")
    const slugsToolFile = path.join(process.cwd(), "public", "tool.json")
    const slugsPostFile = path.join(process.cwd(), "public", "post.json")

    const slugsGame = JSON.parse(fs.readFileSync(slugsGameFile, "utf-8"))
    // const slugsTool = JSON.parse(fs.readFileSync(slugsToolFile, "utf-8"))
    // const slugsPost = JSON.parse(fs.readFileSync(slugsPostFile, "utf-8"))

    const sitemapGame = slugsGame.map((slug) => ({
      loc: `/games/${slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }))
   
    return [...sitemapGame]
  },
}
