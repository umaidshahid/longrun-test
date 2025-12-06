'use client';

import { ProductFilters } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFilters;
  categories: string[];
  onFilterChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
}

export function ProductFiltersComponent({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const updateFilter = (key: keyof ProductFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'all' ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.stockStatus !== 'all';

  return (
    <div className="bg-card border rounded-lg p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 sm:gap-2"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Clear All</span>
            <span className="sm:hidden">Clear</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search by Name</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min Price</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0.00"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        {/* Max Price */}
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="999999"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        {/* Stock Status */}
        <div className="space-y-2">
          <Label htmlFor="stockStatus">Stock Status</Label>
          <select
            id="stockStatus"
            value={filters.stockStatus}
            onChange={(e) =>
              updateFilter('stockStatus', e.target.value as ProductFilters['stockStatus'])
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>
  );
}
