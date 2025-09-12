import type { Game, GameDetail } from "@/types/game"

// Expanded mock data for pagination testing
export const mockGames: Game[] = [
  {
    id: 1,
    title: "FIFA 23",
    description: "The world's most popular football game",
    image: "/placeholder.svg?height=120&width=120",
    category: "SPORTS",
    gameUrl: "/games/fifa-23",
    color: "bg-blue-500",
    rating: 4.5,
    plays: "2.1M",
    featured: false,
  },
  {
    id: 2,
    title: "Fortnite",
    description: "Battle royale game with building mechanics",
    image: "/placeholder.svg?height=240&width=240",
    category: "BATTLE ROYALE",
    gameUrl: "/games/fortnite",
    color: "bg-purple-600",
    featured: true,
    rating: 4.3,
    plays: "5.2M",
  },
  {
    id: 3,
    title: "Snake Game",
    description: "Classic snake game with modern graphics",
    image: "/placeholder.svg?height=120&width=120",
    category: "ARCADE",
    gameUrl: "/games/snake",
    color: "bg-green-500",
    rating: 4.2,
    plays: "1.8M",
  },
  {
    id: 4,
    title: "2048",
    description: "Combine numbered tiles to reach 2048",
    image: "/placeholder.svg?height=120&width=120",
    category: "PUZZLE",
    gameUrl: "/games/2048",
    color: "bg-yellow-600",
    rating: 4.7,
    plays: "3.2M",
  },
  {
    id: 5,
    title: "Tetris",
    description: "The classic block-stacking game",
    image: "/placeholder.svg?height=120&width=120",
    category: "PUZZLE",
    gameUrl: "/games/tetris",
    color: "bg-blue-600",
    rating: 4.8,
    plays: "4.1M",
  },
  // Add more games for pagination testing
  ...Array.from({ length: 45 }, (_, i) => ({
    id: i + 6,
    title: `Game ${i + 6}`,
    description: `Description for game ${i + 6}`,
    image: "/placeholder.svg?height=120&width=120",
    category: ["ARCADE", "PUZZLE", "SPORTS", "ACTION", "RACING"][i % 5] as any,
    gameUrl: `/games/game-${i + 6}`,
    color: ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"][i % 5],
    rating: 3.5 + (i % 15) / 10,
    plays: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}M`,
    featured: i % 10 === 0,
  })),
]

// Expanded news articles for pagination
export const mockNewsArticles = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  title: `Gaming News Article ${i + 1}: Latest Updates and Features`,
  excerpt: `This is the excerpt for news article ${i + 1}. It provides a brief overview of the content.`,
  image: "/placeholder.svg?height=200&width=400",
  category: "NEWS",
  date: new Date(2025, 2, 28 - i).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
}))

// Expanded blog posts
export const mockBlogPosts = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}: Gaming Industry Insights`,
  excerpt: `Detailed analysis and insights about gaming trends and industry developments in post ${i + 1}.`,
  image: "/placeholder.svg?height=200&width=400",
  category: ["TECHNOLOGY", "INDUSTRY", "TUTORIAL", "PSYCHOLOGY"][i % 4],
  date: new Date(2025, 2, 28 - i).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  author: ["Alex Johnson", "Sarah Chen", "Mike Rodriguez", "Dr. Emily Watson"][i % 4],
  comments: Math.floor(Math.random() * 50) + 10,
  readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
}))

// Expanded reviews
export const mockGameReviews = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  title: `Game Review ${i + 1}: Complete Analysis`,
  game: `Game ${i + 1}`,
  rating: 3.5 + (i % 15) / 10,
  excerpt: `Comprehensive review of Game ${i + 1} covering gameplay, graphics, and overall experience.`,
  image: "/placeholder.svg?height=200&width=400",
  category: "REVIEW",
  date: new Date(2025, 2, 28 - i).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  pros: ["Great gameplay", "Excellent graphics", "Good performance"],
  cons: ["Some bugs", "Learning curve", "Limited content"],
}))

export const mockGameDetail: GameDetail = {
  id: 1,
  title: "League of Legends",
  description: "All trademarks belong to their respective owners.",
  fullDescription: `Few games have reshaped the landscape of competitive gaming and global pop culture like League of Legends (LoL). Released by Riot Games in 2009, this free-to-play multiplayer online battle arena (MOBA) took inspiration from the Warcraft III mod "Defense of the Ancients" (DotA) and refined it into a full-fledged esport juggernaut.`,
  image: "/placeholder.svg?height=200&width=200",
  category: "MOBA",
  gameUrl: "/games/league-of-legends",
  rating: 4.5,
  plays: "10M+",
  developer: "Riot Games",
  releaseDate: "2009-10-27",
  screenshots: [
    "/placeholder.svg?height=200&width=300&text=Screenshot 1",
    "/placeholder.svg?height=200&width=300&text=Screenshot 2",
    "/placeholder.svg?height=200&width=300&text=Screenshot 3",
    "/placeholder.svg?height=200&width=300&text=Screenshot 4",
  ],
  pros: ["Great competitive gameplay", "Regular updates", "Free to play"],
  cons: ["Steep learning curve", "Toxic community"],
}
