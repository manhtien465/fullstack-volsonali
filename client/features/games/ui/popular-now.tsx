import React from "react";
import { getHtmlPopularLayout } from "../service/get-games";
import { StrapiImage } from "@/components/custom/strapi-image";
import Link from "next/link";

const PopularNow =async () => {
        const { data } = await getHtmlPopularLayout(1, undefined, true);
    
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Now</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((game, index) => (
          <Link
            href={`/games/${game.slug}`}
            key={index}
            className="flex items-center gap-2 bg-white border rounded-lg shadow-sm p-2 hover:shadow-md transition cursor-pointer"
          >
            <StrapiImage
              src={game.image[0].url}
              alt={game.image[0].alternativeText}
              width={40}
              height={40}
              className="w-10 h-10 rounded object-cover"
            />
            <span className="text-sm font-medium text-gray-800">{game.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularNow;
