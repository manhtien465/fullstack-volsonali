import type { GameCategory } from "@/types/game"

export const GAME_CATEGORIES: { value: GameCategory | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Games" },
  { value: "ARCADE", label: "Arcade" },
  { value: "PUZZLE", label: "Puzzle" },
  { value: "RACING", label: "Racing" },
  { value: "SPORTS", label: "Sports" },
  { value: "ACTION", label: "Action" },
  { value: "SIMULATION", label: "Simulation" },
  { value: "BATTLE ROYALE", label: "Battle Royale" },
  { value: "MOBA", label: "MOBA" },
  { value: "SANDBOX", label: "Sandbox" },
  { value: "CASUAL", label: "Casual" },
  { value: "ENDLESS", label: "Endless" },
  { value: "SOCIAL", label: "Social" },
]

export const SORT_OPTIONS = [
  { value: "title", label: "Title" },
  { value: "rating", label: "Rating" },
  { value: "plays", label: "Popularity" },
  { value: "date", label: "Release Date" },
]

export const ITEMS_PER_PAGE = 24
export const FEATURED_GAMES_LIMIT = 6
export const POPULAR_GAMES_LIMIT = 10
