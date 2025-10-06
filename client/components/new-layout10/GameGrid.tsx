
import React from 'react';
import { GameIcon } from './GameIcon';
import { Game } from './types';

interface GameGridProps {
  title: string;
  games: any[];
}

export const GameGrid: React.FC<GameGridProps> = ({ title, games }) => {
  return (
    <div className="bg-blue-600 p-4 rounded-lg border-2 border-blue-700">
      <h2 className="text-white font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
        {games.map((game) => (
          <GameIcon
            key={game.id}
            src={game?.image && game?.image[0]?.url}
            tag={'H5'}
            name={game.name}
            slug={game.slug}
            className="aspect-[4/3]"
          />
        ))}
      </div>
    </div>
  );
};
