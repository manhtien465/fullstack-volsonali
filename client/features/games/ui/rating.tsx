import React from "react";

interface ReviewTabProps {
    game: any
}
const Rating = ({ game }: ReviewTabProps) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating</h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
            {/* Label */}
            <span className="w-44 text-sm text-gray-800">Graphics and Sound</span>

            {/* Progress Bar */}
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-indigo-700 rounded-full"
                style={{ width: `${(game.graph_sound / 5) * 100}%` }}
              />
            </div>

            {/* Score */}
            <span className="w-6 text-sm font-medium text-gray-800 text-right">
              {game.graph_sound ?? 0}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Label */}
            <span className="w-44 text-sm text-gray-800">Controls</span>

            {/* Progress Bar */}
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-indigo-700 rounded-full"
                style={{ width: `${(game.control / 5) * 100}%` }}
              />
            </div>

            {/* Score */}
            <span className="w-6 text-sm font-medium text-gray-800 text-right">
              {game.control ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Label */}
            <span className="w-44 text-sm text-gray-800">Gameplay</span>

            {/* Progress Bar */}
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-indigo-700 rounded-full"
                style={{ width: `${(game.gamplay / 5) * 100}%` }}
              />
            </div>

            {/* Score */}
            <span className="w-6 text-sm font-medium text-gray-800 text-right">
              {game.gamplay ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Label */}
            <span className="w-44 text-sm text-gray-800">Lasting Appeal</span>

            {/* Progress Bar */}
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-indigo-700 rounded-full"
                style={{ width: `${(game.lasting_appeal / 5) * 100}%` }}
              />
            </div>

            {/* Score */}
            <span className="w-6 text-sm font-medium text-gray-800 text-right">
              {game.lasting_appeal ?? 0}
            </span>
          </div>

      </div>
    </div>
  );
};

export default Rating;
