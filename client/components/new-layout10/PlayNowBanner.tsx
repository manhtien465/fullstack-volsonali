
import React from 'react';
import { StrapiImage } from '../custom/strapi-image';
import Link from 'next/link';

const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.536 0 3.284L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const MobileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5h-2.25m-3.75 0V3h3.75V1.5m-3.75 0h3.75m-3.75 18h3.75v-1.5h-3.75v1.5z" />
    </svg>
);


interface PageProps {
    data: any
}

export const PlayNowBanner = ({ data }: PageProps) => {
    return (
        <div className="bg-blue-600 p-4 rounded-lg border-2 border-blue-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <StrapiImage src={data.image && data.image[0] && data.image[0].url} alt={data.name} className="w-16 h-16 rounded-md" width={64} height={64} />
                    <span className="text-white font-bold text-lg">{data.name}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <Link href={`/games/play/${data.slug}`} className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-yellow-600 transition-colors text-sm">
                        <PlayIcon />
                        PLAY NOW
                    </Link>
                    <button className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-white hover:text-blue-600 transition-colors text-sm">
                        <MobileIcon />
                        Download from Mobile
                    </button>
                </div>
            </div>
        </div>
    );
};
