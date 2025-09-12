import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Star } from 'lucide-react';
import { getHtmls } from '@/features/games/service/get-games';
import { Card, CardContent } from '@/components/ui/card';
import { StrapiImage } from '@/components/custom/strapi-image';
import { cn } from '@/lib/utils';
import { ETypeHtml } from '../constants/data';

export let revalidate = 60 * 60 * 24;

export const ContentGame = async () => {
    const { data } = await getHtmls(1, '', '', true, 5, ETypeHtml.GAME, true);

    return (
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-8">
            <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular</h3>
                <div className="space-y-4">
                    {data.map((game: any) => (
                        <Link key={game.documentId} href={`/games/${game.slug}`} className="block">
                            <div className="flex gap-2 items-center p-3 bg-gray-50 rounded-xl hover:shadow transition-shadow cursor-pointer">
                                <div className="relative w-16 h-16 border-gray-900 rounded-lg overflow-hidden mr-4 shrink-0">
                                    <StrapiImage
                                        src={game?.image[0]?.url || '/placeholder.png'}
                                        alt={game.image[0]?.alternativeText}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 truncate">
                                        {game.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 truncate">
                                        {game.description || 'This article provides a comprehensive overview...'}
                                    </p>
                                    <div className="flex mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "w-2 h-2",
                                                    i < Math.floor(game.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300",
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
