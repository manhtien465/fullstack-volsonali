"use client"

import { useState, useEffect } from "react"
import type { GameDetail } from "@/types/game"
import { getHtmlBySlug } from "@/features/games/service/get-games"

interface UseGameOptions {
  id?: number
  slug?: string
  enabled?: boolean
  status: "draft" | "published"
}

interface UseGameReturn {

  game: GameDetail | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useGame(options: UseGameOptions): UseGameReturn {
  const [game, setGame] = useState<GameDetail | null>(null)
  const [meta, setMeta] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { id, slug, enabled = true, status } = options

  const fetchGame = async () => {
    if (!enabled || (!slug)) return

    try {
      setLoading(true)
      setError(null)

      const response = await getHtmlBySlug( slug, status)

      if (response) {
        setGame(response.data) 
        setMeta(response.meta)
      } else {
        setError(response.message || "Failed to fetch game")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchGame()
  }

  useEffect(() => {
    fetchGame()
  }, [id, slug, enabled])

  return {
    game,
    loading,
    error,
    refetch,
  }
}
