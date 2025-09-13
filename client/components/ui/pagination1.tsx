"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generatePageNumbers } from "@/utils/pagination"
import { FadeInSection } from "@/components/animations/FadeInSection"
import type { PaginationInfo } from "@/types/pagination"

interface PaginationProps {
  pagination: PaginationInfo
  onPageChange: (page: number) => void
  className?: string
  showInfo?: boolean
}

export function Pagination({ pagination, onPageChange, className = "", showInfo = true }: PaginationProps) {
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination
  const pageNumbers = generatePageNumbers(currentPage, totalPages)

  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <FadeInSection
      className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}
    >
      {/* Page Info */}
      {showInfo && (
        <div className="text-sm text-gray-700 order-2 sm:order-1 animate-fade-in">
          Showing <span className="font-medium animate-pulse">{startItem}</span> to{" "}
          <span className="font-medium animate-pulse">{endItem}</span> of{" "}
          <span className="font-medium animate-pulse">{totalItems}</span> results
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1 order-1 sm:order-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPreviousPage}
          className="flex items-center space-x-1 hover-scale transition-all duration-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <Button variant="ghost" size="sm" disabled className="w-9 h-9">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={`w-9 h-9 hover-scale transition-all duration-300 ${
                    currentPage === page
                      ? "bg-pink-600 hover:bg-pink-700 text-white animate-pulse-glow"
                      : "hover:bg-gray-50 hover-glow"
                  }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className="flex items-center space-x-1 hover-scale transition-all duration-300 disabled:opacity-50"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </FadeInSection>
  )
}
