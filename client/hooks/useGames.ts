"use client"

import { useState, useEffect } from "react"
import type { Game, GameFilters } from "@/types/game"
import type { PaginationParams, SortParams } from "@/types/api"
import { gameService } from "@/services/gameService"

interface UseGamesOptions {
  filters?: GameFilters
  pagination?: PaginationParams
  sort?: SortParams
  enabled?: boolean
}

interface UseGamesReturn {
  games: Game[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  hasMore: boolean
  loadMore: () => Promise<void>
}

export function useGames(options: UseGamesOptions = {}): UseGamesReturn {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const { filters, pagination, sort, enabled = true } = options

  const fetchGames = async (page = 1, append = false) => {
    if (!enabled) return

    try {
      setLoading(true)
      setError(null)

      const response = await gameService.getGames(filters, { ...pagination, page }, sort)

      if (response.success) {
        if (append) {
          setGames((prev) => [...prev, ...response.data])
        } else {
          setGames(response.data)
        }

        if (response.pagination) {
          setHasMore(page < response.pagination.totalPages)
        }
      } else {
        setError(response.message || "Failed to fetch games")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    setCurrentPage(1)
    await fetchGames(1, false)
  }

  const loadMore = async () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      await fetchGames(nextPage, true)
    }
  }

  useEffect(() => {
    refetch()
  }, [filters, sort, enabled])

  return {
    games,
    loading,
    error,
    refetch,
    hasMore,
    loadMore,
  }
}
