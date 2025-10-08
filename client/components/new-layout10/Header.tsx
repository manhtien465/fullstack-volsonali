
import React from 'react';
import { Game } from './types';
import { GameIcon } from './GameIcon';
import { getHtmls } from '@/features/games/service/get-games';
import { ETypeHtml } from '@/features/games/constants/data';

interface HeaderProps {
  games: Game[];
}

export const Header: React.FC<HeaderProps> = async () => {
  let { data: game } = await getHtmls(1, '', '', false, 30, ETypeHtml.GAME, true)
  return (
    <header className="bg-blue-900 p-2">
      <div className="max-w-screen-xl mx-auto overflow-hidden">
        <div className="flex gap-2 animate-marquee hover:[animation-play-state:paused]">
          {game.map((game, index) => (
            <GameIcon
              key={`${game.documentId}-${index}`}
              src={game?.image[0]?.url}
              name={game.name}
              slug={game.slug}
              className="w-20 h-20 flex-shrink-0"
            />
          ))}
          {game.map((gameItem, index) => (
            <GameIcon
              key={`${gameItem.documentId}-${index}-2`}
              src={gameItem?.image[0]?.url}
              name={gameItem.name}
              slug={gameItem.slug}
              className="w-20 h-20 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </header>
  );
};
