import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '../Button'

export interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange?: (page: number) => void
}

const SIZE = 5

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const currentGroupFirstPage = Math.floor((currentPage - 1) / SIZE) * SIZE + 1
  const currentGroupLastPage = Math.min(
    currentGroupFirstPage + SIZE - 1,
    totalPages,
  )

  const hasPrevGroup = currentGroupFirstPage > 1
  const hasNextGroup = currentGroupFirstPage + SIZE <= totalPages

  const firstPage = 1
  const prevGroupLastPage = currentGroupFirstPage - 1
  const nextGroupFirstPage = currentGroupFirstPage + SIZE
  const lastPage = totalPages

  return (
    <div
      className="flex items-center justify-center gap-2"
      aria-label="pagination"
    >
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="md"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(firstPage)}
          aria-label="first page"
        >
          <ChevronFirst className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          disabled={!hasPrevGroup}
          onClick={() => onPageChange?.(prevGroupLastPage)}
          aria-label="last page of previous group"
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-1">
        {Array.from({
          length: currentGroupLastPage - currentGroupFirstPage + 1,
        }).map((_, index) => {
          const page = currentGroupFirstPage + index

          return (
            <Button
              variant={page === currentPage ? 'primary' : 'ghost'}
              size="md"
              key={page}
              onClick={() => onPageChange?.(page)}
              aria-current={page === currentPage}
            >
              {page}
            </Button>
          )
        })}
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="md"
          disabled={!hasNextGroup}
          onClick={() => onPageChange?.(nextGroupFirstPage)}
          aria-label="first page of next group"
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange?.(lastPage)}
          aria-label="last page"
        >
          <ChevronLast className="size-4" />
        </Button>
      </div>
    </div>
  )
}
