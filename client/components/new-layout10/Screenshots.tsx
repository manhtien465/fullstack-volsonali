
import React from 'react';
import { StrapiImage } from '../custom/strapi-image';

const ChevronRightIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

interface PageProps {
  data: any
}

export const Screenshots = ({ data }: PageProps) => {
  return (
    <div className="bg-blue-600 p-4 rounded-lg border-2 border-blue-700">
      <h2 className="text-white font-bold mb-3">Screenshots:</h2>
      <div className="flex items-center gap-2">
        <div className="flex-1 grid grid-cols-2 gap-2">
          {
            data.screenshots && data.screenshots.map((el: any) => {
              return <StrapiImage key={el.url} src={el.url} alt={el.alternativeText} className="rounded-md w-full h-auto" width={200} height={200} ></StrapiImage>
            })
          }
          {/* <img src="https://picsum.photos/id/501/250/150" alt="Screenshot 1" className="rounded-md w-full h-auto" />
          <img src="https://picsum.photos/id/502/250/150" alt="Screenshot 2" className="rounded-md w-full h-auto" /> */}
        </div>

      </div>
    </div>
  );
};
