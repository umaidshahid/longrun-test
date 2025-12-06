export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  created_at: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  stockStatus: 'all' | 'in-stock' | 'out-of-stock';
}

export interface SortConfig {
  field: 'name' | 'price' | 'stock_quantity' | 'created_at';
  direction: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
}
