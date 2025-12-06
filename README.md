<h1 align="center">Product Inventory Management Dashboard</h1>

<p align="center">
 A fully functional product inventory system with filtering, sorting, and pagination
</p>

## 🚀 Features

### Core Functionality
- ✅ **Server-Side Pagination**: Display 10 products per page using Supabase's `.range()` method
- ✅ **Advanced Filtering**:
  - Search by product name (case-insensitive)
  - Filter by category
  - Filter by price range (min/max)
  - Filter by stock status (In Stock / Out of Stock)
- ✅ **Multi-Column Sorting**:
  - Sort by Name, Price, Stock Quantity, or Created Date
  - Ascending and descending order
  - Maintains sort state across pagination and filtering
- ✅ **Responsive Design**: Works seamlessly on mobile and desktop with adaptive layouts
- ✅ **Loading & Error States**: Professional loading indicators and error handling
- ✅ **Clear All Filters**: Quick reset functionality

### Technical Highlights
- 🔥 **Optimized Queries**: All filtering, sorting, and pagination happen server-side with a single Supabase query
- 🎯 **TypeScript**: Full type safety throughout the application
- 🎨 **Tailwind CSS**: Modern, responsive UI with shadcn/ui components
- 📱 **Mobile First**: Adaptive card layout for mobile, table layout for desktop
- ⚡ **Performance**: Efficient data fetching with React hooks and proper memoization

## 📋 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend/Database**: Supabase (PostgreSQL)
- **UI Framework**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback)

## 🗄️ Database Schema

The application uses a `products` table with the following structure:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_stock ON products(stock_quantity);
CREATE INDEX idx_products_created_at ON products(created_at);
```

## 🏗️ Project Structure

```
app/
├── page.tsx                    # Home page with navigation
├── products/
│   └── page.tsx               # Main inventory dashboard
components/
├── product-filters.tsx        # Filter controls component
├── sort-controls.tsx          # Sorting UI component
├── pagination-controls.tsx    # Pagination UI component
├── products-table.tsx         # Product display table/cards
└── ui/                        # shadcn/ui components
lib/
├── types.ts                   # TypeScript type definitions
├── hooks/
│   └── useProducts.ts         # Custom hook for data fetching
└── supabase/
    ├── client.ts              # Supabase client setup
    └── server.ts              # Supabase server utilities
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js 18+ installed
- Supabase account and project created
- Environment variables configured

### 1. Database Setup

Create the `products` table in your Supabase SQL editor:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_stock ON products(stock_quantity);
CREATE INDEX idx_products_created_at ON products(created_at);
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

Both values can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000/products](http://localhost:3000/products) to see the inventory dashboard.

## 📊 Key Implementation Details

### Query Optimization

All data operations are performed server-side using a single optimized Supabase query:

```typescript
// Combining filters, sorting, and pagination in one query
let query = supabase.from('products').select('*', { count: 'exact' });

// Apply filters
if (filters.search) query = query.ilike('name', `%${filters.search}%`);
if (filters.category) query = query.eq('category', filters.category);
if (filters.minPrice) query = query.gte('price', minPrice);
if (filters.maxPrice) query = query.lte('price', maxPrice);
if (filters.stockStatus === 'in-stock') query = query.gt('stock_quantity', 0);

// Apply sorting
query = query.order(sort.field, { ascending: sort.direction === 'asc' });

// Apply pagination (only fetch current page)
query = query.range(from, to);
```

### State Management

- **Filters State**: Reactive updates with automatic page reset
- **Sort State**: Maintains field and direction across operations
- **Pagination State**: Smart reset when filters/sort change
- **Data Fetching**: Custom `useProducts` hook with proper memoization

## 🎨 Features in Action

### Filtering
- **Search**: Real-time name search with case-insensitive matching
- **Category**: Dropdown populated dynamically from database
- **Price Range**: Flexible min/max inputs
- **Stock Status**: Quick toggle between in-stock/out-of-stock
- **Clear All**: One-click filter reset

### Sorting
- Click any sort button to apply
- Click again to toggle ascending/descending
- Visual indicators show active sort state
- Sort persists across pagination

### Pagination
- Shows 10 products per page
- Previous/Next navigation
- Direct page number selection
- Smart ellipsis for large page counts
- Displays current range and total count

## 🚦 Usage

1. Navigate to `/products` from the home page
2. Use the filter controls to narrow down products
3. Click sort buttons to reorder results
4. Navigate through pages using pagination controls
5. Clear all filters with the "Clear All" button

## 📈 Performance Optimizations

- ✅ Only 10 products fetched per request (server-side pagination)
- ✅ Database indexes on frequently queried columns
- ✅ Single combined query instead of multiple requests
- ✅ React hooks optimized with `useCallback` and proper dependencies
- ✅ Responsive design reduces unnecessary DOM elements on mobile

## 🎯 Technical Requirements Met

✅ All filtering, sorting, and pagination on server-side  
✅ Single optimized Supabase query combining all operations  
✅ Proper state management with React hooks  
✅ Error handling with user-friendly messages  
✅ Clean, modular, reusable code  
✅ Full TypeScript types  
✅ Responsive mobile and desktop design  
✅ Loading states during data fetching
