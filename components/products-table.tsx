'use client';

import { Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  if (products.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">No products found</p>
          <p className="text-sm">Try adjusting your filters to see more results</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-semibold">Product Name</th>
              <th className="text-left p-4 font-semibold">Category</th>
              <th className="text-right p-4 font-semibold">Price</th>
              <th className="text-right p-4 font-semibold">Stock</th>
              <th className="text-left p-4 font-semibold">Created</th>
            </tr>
          </thead>
          <tbody className="bg-card">
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">
                  <Badge variant="secondary">{product.category}</Badge>
                </td>
                <td className="p-4 text-right font-semibold">
                  {formatPrice(product.price)}
                </td>
                <td className="p-4 text-right">
                  <Badge
                    variant={product.stock_quantity > 0 ? 'default' : 'destructive'}
                  >
                    {product.stock_quantity > 0
                      ? `${product.stock_quantity} in stock`
                      : 'Out of stock'}
                  </Badge>
                </td>
                <td className="p-4 text-muted-foreground text-sm">
                  {formatDate(product.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <Badge
                  variant={product.stock_quantity > 0 ? 'default' : 'destructive'}
                  className="shrink-0"
                >
                  {product.stock_quantity > 0 ? 'In Stock' : 'Out'}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Stock: {product.stock_quantity}
                </div>
                <div className="text-xl font-bold">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-2 border-t">
                Added {formatDate(product.created_at)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
