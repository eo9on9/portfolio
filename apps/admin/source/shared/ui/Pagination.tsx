import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from './Button'

interface PaginationProps {
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
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="md"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(firstPage)}
        >
          <ChevronFirst className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          disabled={!hasPrevGroup}
          onClick={() => onPageChange?.(prevGroupLastPage)}
        >
          <ChevronLeft className="w-4 h-4" />
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
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange?.(lastPage)}
        >
          <ChevronLast className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
