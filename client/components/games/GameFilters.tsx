import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { SearchComponent } from "../custom/search"
import { getCategories } from "@/features/games/service/get-games"
import CategoryButton from "@/features/games/ui/category-button"
import { ETypeCategoryHtml } from "@/features/games/constants/data"

interface GameFiltersProps {
  className?: string
  totalResults?: number
}

export async function GameFilters({  className = "" }: GameFiltersProps) {
   const { data, meta } = await getCategories(ETypeCategoryHtml.GAME,false);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <SearchComponent placeholder="Search games..." />
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Categories:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.map((category) => (
            // <Button
            //   key={category.value}
            //   variant={filters.category === category.value ? "default" : "outline"}
            //   size="sm"
            //   onClick={() => handleCategoryChange(category.value)}
            //   className={`text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 ${
            //     filters.category === category.value ? "bg-pink-600 hover:bg-pink-700 text-white" : "hover:bg-gray-50"
            //   }`}
            // >
            //   {category.label}
            // </Button>
             <CategoryButton
              key={category.id}
              value={category.slug}
              // variant={filters.category === category.value ? "default" : "outline"}
              size="sm"
              // onClick={() => handleCategoryChange(category.value)}
            >
              {category.name}
            </CategoryButton>
          ))}

          {/* Show More/Less Button on Mobile */}
          {/* {GAME_CATEGORIES.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            >
              {showAllCategories ? "Show Less" : `+${hiddenCategoriesCount} More`}
            </Button>
          )} */}
        </div>
      </div>

      {/* Results Count */}
      {/* {totalResults > 0 && (
        <div className="text-sm text-gray-600">
          {filters.search || filters.category !== "ALL" ? (
            <span>Found {totalResults} games</span>
          ) : (
            <span>{totalResults} games available</span>
          )}
        </div>
      )} */}
    </div>
  )
}
