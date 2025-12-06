'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Product, ProductFilters, SortConfig, PaginationInfo } from '@/lib/types';

const ITEMS_PER_PAGE = 10;

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  categories: string[];
}

export function useProducts(
  filters: ProductFilters,
  sort: SortConfig,
  currentPage: number
): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    perPage: ITEMS_PER_PAGE,
  });
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .order('category');

        if (error) throw error;

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data?.map((item) => item.category) || [])
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Start building the query
      let query = supabase.from('products').select('*', { count: 'exact' });

      // Apply search filter (case-insensitive)
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      // Apply category filter
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      // Apply price range filters
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice);
        if (!isNaN(minPrice)) {
          query = query.gte('price', minPrice);
        }
      }

      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice);
        if (!isNaN(maxPrice)) {
          query = query.lte('price', maxPrice);
        }
      }

      // Apply stock status filter
      if (filters.stockStatus === 'in-stock') {
        query = query.gt('stock_quantity', 0);
      } else if (filters.stockStatus === 'out-of-stock') {
        query = query.eq('stock_quantity', 0);
      }

      // Apply sorting
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });

      // Apply pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

      // Execute query
      const { data, error, count } = await query;

      if (error) throw error;

      setProducts(data || []);
      
      const totalCount = count || 0;
      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

      setPagination({
        currentPage,
        totalPages,
        totalCount,
        perPage: ITEMS_PER_PAGE,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, sort, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    categories,
  };
}
