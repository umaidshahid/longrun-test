'use client';

import { SortConfig } from '@/lib/types';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortControlsProps {
  sort: SortConfig;
  onSortChange: (sort: SortConfig) => void;
}

export function SortControls({ sort, onSortChange }: SortControlsProps) {
  const sortOptions: { value: SortConfig['field']; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'stock_quantity', label: 'Stock' },
    { value: 'created_at', label: 'Date' },
  ];

  const toggleSort = (field: SortConfig['field']) => {
    if (sort.field === field) {
      // Toggle direction
      onSortChange({
        field,
        direction: sort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      // Set new field with default ascending
      onSortChange({ field, direction: 'asc' });
    }
  };

  const getSortIcon = (field: SortConfig['field']) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sort.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium">Sort by:</span>
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          variant={sort.field === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => toggleSort(option.value)}
          className="gap-2"
        >
          {option.label}
          {getSortIcon(option.value)}
        </Button>
      ))}
    </div>
  );
}
