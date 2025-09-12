'use client'

import React from 'react'
import { StrapiImage } from '@/components/custom/strapi-image'
import { Gamepad2 } from "lucide-react"

interface ReviewTabProps {
    game: any
}
export const ScreenshotTab = ({ game }: ReviewTabProps) => {
    return (
        <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {game.screenshots?.map((screenshot:any, i:number) => (
                        <div key={i} className="relative group overflow-hidden rounded-lg">
                            <StrapiImage
                                src={screenshot.url || `/placeholder.svg?height=200&width=300&text=Screenshot ${i + 1}`}
                                alt={`Screenshot ${i + 1}`}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    )) || (
                            <div className="col-span-2 text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Gamepad2 className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500">No screenshots available</p>
                            </div>
                        )}
                </div>
          
        </>
    )
}
