import type { Game, GameCategory } from "@/types/game"

export function filterGames(
  games: Game[],
  filters: {
    category?: GameCategory | "ALL"
    search?: string
    featured?: boolean
  },
): Game[] {
  return games.filter((game) => {
    const matchesCategory = !filters.category || filters.category === "ALL" || game.category === filters.category
    const matchesSearch = !filters.search || game.title.toLowerCase().includes(filters.search.toLowerCase())
    const matchesFeatured = filters.featured === undefined || game.featured === filters.featured

    return matchesCategory && matchesSearch && matchesFeatured
  })
}

export function sortGames(games: Game[], sortBy: string, sortOrder: "asc" | "desc" = "asc"): Game[] {
  const sorted = [...games].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (sortBy) {
      case "title":
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case "rating":
        aValue = a.rating || 0
        bValue = b.rating || 0
        break
      case "plays":
        aValue = Number.parseFloat(a.plays?.replace(/[^\d.]/g, "") || "0")
        bValue = Number.parseFloat(b.plays?.replace(/[^\d.]/g, "") || "0")
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  return sorted
}

export function getGameCategories(games: Game[]): { category: GameCategory | "ALL"; count: number }[] {
  const categoryCounts = games.reduce(
    (acc, game) => {
      acc[game.category] = (acc[game.category] || 0) + 1
      return acc
    },
    {} as Record<GameCategory, number>,
  )

  const categories = Object.entries(categoryCounts).map(([category, count]) => ({
    category: category as GameCategory,
    count,
  }))

  return [{ category: "ALL" as const, count: games.length }, ...categories]
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function formatPlayCount(plays: string): string {
  const num = Number.parseFloat(plays.replace(/[^\d.]/g, ""))
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return plays
}
