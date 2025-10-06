import React from 'react'
import { GameGrid } from './GameGrid'
import { getHtmlsMain } from '@/features/games/service/get-games'

const MoreGame = async () => {
    let { data: gamesFooters } = await getHtmlsMain(1, '', '', false, 48)
    return (
        <>

            <GameGrid title="More Online Games, No Download" games={gamesFooters} />
            <div className="text-center">
                <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors">
                    Load More Games
                </button>
            </div>
        </>
    )
}
export default MoreGame