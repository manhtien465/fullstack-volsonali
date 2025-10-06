
import React from 'react';
import { StrapiImage } from '../custom/strapi-image';
import Link from 'next/link';

interface GameIconProps {
  src: string;
  tag?: string;
  name?: string;
  className?: string;
  slug: string;
}

export const GameIcon: React.FC<GameIconProps> = ({ src, tag, name, className, slug }) => {
  return (
    <Link href={`/games/${slug}`} className={`relative rounded-md overflow-hidden cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-110 ${className || ''}`}>
      <StrapiImage src={src} alt={name || 'Game Icon'} className="w-full h-full object-cover" width={100} height={100} />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>

      {name && (
        <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-center text-xs font-semibold truncate">{name}</p>
        </div>
      )}

      {tag && (
        <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
          {tag}
        </span>
      )}
    </Link>
  );
};
