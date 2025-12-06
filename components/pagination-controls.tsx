'use client';

import { PaginationInfo } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  pagination,
  onPageChange,
}: PaginationControlsProps) {
  const { currentPage, totalPages, totalCount, perPage } = pagination;

  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalCount} products
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // Show first page, last page, current page, and pages around current
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, index, array) => {
              // Add ellipsis if there's a gap
              const showEllipsis = index > 0 && page - array[index - 1] > 1;

              return (
                <div key={page} className="flex items-center">
                  {showEllipsis && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  <Button
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                </div>
              );
            })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
