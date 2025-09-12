import Link from 'next/link'
import React from 'react'
import {  Star } from "lucide-react"
import { Button } from '../ui/button'
import { getHtmls } from '@/features/games/service/get-games'
import { Card, CardContent } from '../ui/card'

export let revalidate = 60 * 60 * 24


export const ContentGame = async () => {
    const { data } = await getHtmls(1, '', '', true, 5);
    return (
        <Card className={`bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 mb-8`}>
            <CardContent className="p-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">🎮 Discover More Games</h3>
                    <div className="space-y-3">
                        {data.map((game: any, index: number) => (
                            <Link key={game.documentId} href={`games/${game.slug}`}>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{game.name}</h4>
                                        <p className="text-sm text-gray-600">{game.category_html.name}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium ml-1">{game.rating}</span>
                                        </div>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            See Review
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
