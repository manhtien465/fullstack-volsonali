'use client'

import React from 'react'
import { useGameState } from '../hooks/use-game-state'
import { MarkdownText } from '@/components/custom/markdown-text'
interface ReviewTabProps {
    game: any
}
export const ReviewTab = ({ game }: ReviewTabProps) => {
    const { activeTab, setActiveTab } = useGameState()

    return (
        <>
           
                <div className="prose max-w-none">
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        <MarkdownText content={game.full_description} />

                        {/* {game.pros && game.cons && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="font-semibold text-green-700 mb-4 flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        Pros
                                    </h3>
                                    <ul className="space-y-3">
                                        {game.pros.map((pro: string, index: number) => (
                                            <li key={index} className="flex items-start text-sm text-green-700">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                <span>{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-red-50 p-6 rounded-lg">
                                    <h3 className="font-semibold text-red-700 mb-4 flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                        Cons
                                    </h3>
                                    <ul className="space-y-3">
                                        {game.cons.map((con: string, index: number) => (
                                            <li key={index} className="flex items-start text-sm text-red-700">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                <span>{con}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            
        </>
    )
}
