
import React from 'react';
import { gameTags } from './constants';

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-1 border-b border-blue-700 last:border-b-0">
    <span className="text-blue-200">{label}:</span>
    <span className="text-white font-semibold">{value}</span>
  </div>
);

const PlatformIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);


interface PageProps {
  data: any
}

export const AdditionalInfo = ({ data }: PageProps) => {
  return (
    <div className="bg-blue-600 p-4 rounded-lg border-2 border-blue-700">
      <h2 className="text-white font-bold mb-2">Additional Information:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <InfoItem label="Platform" value={<div className="flex items-center gap-1"><PlatformIcon /> Web</div>} />
        <InfoItem label="Control" value={data.control} />
        <InfoItem label="Graph Sound" value={data.graph_sound} />
        <InfoItem label="Developer" value={data.developer} />
        <InfoItem label="Lasting Appeal" value={data.lasting_appeal} />
        <InfoItem label="Game Play" value={data.gamplay} />
      </div>
      <div className="mt-4">
        <p className="text-sm text-blue-200 mb-2">Tags:</p>
        <div className="flex flex-wrap gap-2">
          {gameTags.map(tag => (
            <button key={tag.id} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md hover:bg-blue-700 transition-colors">
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
