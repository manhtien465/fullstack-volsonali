import type { PaginationInfo, PaginatedResponse } from "@/types/pagination"

export function paginateArray<T>(items: T[], page = 1, limit = 10): PaginatedResponse<T> {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / limit)
  const currentPage = Math.max(1, Math.min(page, totalPages))

  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit
  const data = items.slice(startIndex, endIndex)

  const pagination: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  }

  return { data, pagination }
}

export function generatePageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = []
  const maxVisiblePages = 7

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (currentPage > 4) {
      pages.push("...")
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 3) {
      pages.push("...")
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }
  }

  return pages
}

export function getPageInfo(page: number, totalItems: number, itemsPerPage: number) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return {
    currentPage,
    totalPages,
    startItem,
    endItem,
    totalItems,
  }
}
