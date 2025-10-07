'use client'
import React, { useEffect, useState } from 'react'
import { GameGrid } from './GameGrid'
import { getHtmlsMain } from '@/features/games/service/get-games'

const MoreGame = () => {
    const [games, setGames] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const fetchGames = async (pageNum: number) => {
        setLoading(true)
        const { data } = await getHtmlsMain(pageNum, '', '', false, 48)
        if (data.length === 0) setHasMore(false)
        setGames((prev) => [...prev, ...data])
        setLoading(false)
    }

    useEffect(() => {
        fetchGames(1)
    }, [])

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchGames(nextPage)
        }
    }

    return (
        <>
            <GameGrid title="More Online Games, No Download" games={games} />
            <div className="text-center mt-4">
                {hasMore ? (
                    <button
                        onClick={handleLoadMore}
                        className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Load More Games'}
                    </button>
                ) : (
                    <p className="text-gray-400 mt-2">No more games</p>
                )}
            </div>
        </>
    )
}

export default MoreGame
