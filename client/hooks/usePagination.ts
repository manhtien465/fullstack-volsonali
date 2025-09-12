"use client"

import { useState, useMemo } from "react"
import { paginateArray } from "@/utils/pagination"
import type { PaginatedResponse } from "@/types/pagination"

interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
}

interface UsePaginationReturn<T> {
  currentPage: number
  pageSize: number
  paginatedData: PaginatedResponse<T>
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  goToFirstPage: () => void
  goToLastPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}

export function usePagination<T>(data: T[], options: UsePaginationOptions = {}): UsePaginationReturn<T> {
  const { initialPage = 1, initialPageSize = 10 } = options

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const paginatedData = useMemo(() => {
    return paginateArray(data, currentPage, pageSize)
  }, [data, currentPage, pageSize])

  const setPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, paginatedData.pagination.totalPages)))
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  const goToFirstPage = () => setPage(1)
  const goToLastPage = () => setPage(paginatedData.pagination.totalPages)
  const goToNextPage = () => setPage(currentPage + 1)
  const goToPreviousPage = () => setPage(currentPage - 1)

  return {
    currentPage,
    pageSize,
    paginatedData,
    setPage,
    setPageSize: handlePageSizeChange,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
  }
}
