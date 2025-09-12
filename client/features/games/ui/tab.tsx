'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { useGameState } from '../hooks/use-game-state'
import { FadeInSection } from '@/components/animations/FadeInSection'
import { Card, CardContent } from '@/components/ui/card'
import { ReviewTab } from './review-tab'
import { ScreenshotTab } from './screenshot-tab'
interface TabGamesProps {
    game: any
}
export const TabGames = ({ game }: TabGamesProps) => {
    const { activeTab, setActiveTab } = useGameState()

    return (
        <>
            <FadeInSection delay={400}>
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8 overflow-x-auto">
                        {["Review", "Screenshots"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200",
                                    activeTab === tab
                                        ? "border-pink-500 text-pink-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </FadeInSection>
            <FadeInSection delay={600}>
                <Card>
                    <CardContent className="p-6">
                        {
                            activeTab === "Review" && <ReviewTab game={game}></ReviewTab>
                        }
                        {
                            activeTab === "Screenshots" && <ScreenshotTab game={game}></ScreenshotTab>
                        }

                    </CardContent>
                </Card>
            </FadeInSection>
        </>
    )
}
