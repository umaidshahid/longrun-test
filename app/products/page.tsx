'use client';

import { useState } from 'react';
import { useProducts } from '@/lib/hooks/useProducts';
import { ProductFilters, SortConfig } from '@/lib/types';
import { ProductFiltersComponent } from '@/components/product-filters';
import { SortControls } from '@/components/sort-controls';
import { PaginationControls } from '@/components/pagination-controls';
import { ProductsTable } from '@/components/products-table';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const initialFilters: ProductFilters = {
  search: '',
  category: 'all',
  minPrice: '',
  maxPrice: '',
  stockStatus: 'all',
};

const initialSort: SortConfig = {
  field: 'created_at',
  direction: 'desc',
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [sort, setSort] = useState<SortConfig>(initialSort);
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error, pagination, categories } = useProducts(
    filters,
    sort,
    currentPage
  );

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (newSort: SortConfig) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Product Inventory</h1>
                <p className="text-sm text-muted-foreground">
                  Manage and browse your product catalog
                </p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <ProductFiltersComponent
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Sort Controls and Results Count */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <SortControls sort={sort} onSortChange={handleSortChange} />
          <div className="text-sm text-muted-foreground">
            {!loading && `${pagination.totalCount} products found`}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="p-12 border-destructive">
            <div className="flex flex-col items-center justify-center gap-4 text-destructive">
              <AlertCircle className="h-12 w-12" />
              <div className="text-center">
                <p className="font-semibold mb-2">Error Loading Products</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Products Table */}
        {!loading && !error && <ProductsTable products={products} />}

        {/* Pagination */}
        {!loading && !error && products.length > 0 && (
          <div className="mt-6">
            <PaginationControls
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}
