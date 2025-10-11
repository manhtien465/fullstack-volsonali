
import React from 'react';
import { StarRating } from './StarRating';
import { StrapiImage } from '../custom/strapi-image';
import { MarkdownText } from '../custom/markdown-text';
import ResponsiveAd from '../ads/ResponsiveAd';
import GoogleAdSense from '../ads/GoogleAdSense';

const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.536 0 3.284L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

interface PageProps {
  data: any
}
export const GameDetails = ({ data }: PageProps) => {
  return (
    <div className="hidden md:block bg-blue-600 p-4 rounded-lg border-2 border-blue-700 text-white">
      <div className="flex items-start gap-4">
        <StrapiImage src={data.image[0] && data.image[0].url} alt={data.name} className="w-20 h-20 rounded-md" width={80} height={80} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <div className="flex items-center">
            <StarRating rating={data.rating} />
            <span className="ml-2 text-lg">{data.rating}</span>
          </div>
        </div>

      </div>
      <div className="mt-4 flex flex-wrap">
				<div className=' md:w-[40%]'>
				<GoogleAdSense
											adSlot={'5951098589'}
											responsive={true}
											style={{
												height:'264px',
												width:'100%',
												display: "block",
												textAlign: "center",
											}}
											className="w-full"
										/>
				</div>
									
				<div className=' w-full md:w-[60%] '>
					<h3 className="font-bold mb-1">Editor's Review:</h3>
					<div className='h-[300px] overflow-scroll-y overflow-x-hidden'>
					<MarkdownText content={data.full_description ?? data.desc} />
					</div>
      	</div>
				<div>
      
				</div>
				</div>
    </div>
  );
};
