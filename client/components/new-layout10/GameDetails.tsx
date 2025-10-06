
import React from 'react';
import { StarRating } from './StarRating';
import { StrapiImage } from '../custom/strapi-image';
import { MarkdownText } from '../custom/markdown-text';

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
    <div className="bg-blue-600 p-4 rounded-lg border-2 border-blue-700 text-white">
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
      <div className="mt-4">
        <h3 className="font-bold mb-1">Editor's Review:</h3>
        {/* <p className="text-sm text-blue-200">
          Moto X3M is an exhilarating time trial obstacle course bike racing game that tests your skills and reflexes. With 22 increasingly challenging levels, the game offers endless opportunities for thrill-seekers to perform wild stunts and race against the clock. Get ready to equip your helmet, crank your engine, and push your limits to reach the finish line!
        </p>
        <p className="text-sm text-blue-200 mt-2">
          In Moto X3M, you are tasked with navigating through intricate courses filled with a variety of obstacles, jumps, and loops. Each level presents unique challenges that require precise control and timing to overcome. The game's dynamic physics engine adds to the excitement, making every jump, flip, and crash feel incredibly realistic.
        </p> */}
        <MarkdownText content={data.full_description ?? data.desc} />
      </div>
    </div>
  );
};
