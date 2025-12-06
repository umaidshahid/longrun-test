Technical Assessment Task: Product Inventory Management with Filtering, Sorting &
Pagination
Objective
Build a fully functional product inventory dashboard using ReactJS and Supabase that
allows users to browse, filter , sort, and paginate through a list of products with smooth
user experience and optimized database queries.
Tech Stack
Frontend:
● ReactJS (with Hooks)
● CSS framework of choice (Tailwind CSS, Material-UI, or plain CSS)
● React Router (optional, for URL-based pagination)
Backend/Database:
● Supabase (PostgreSQL database)
● Supabase JavaScript Client library
Optional:
● State management library (Redux/Recoil) if needed
Task Description
Create a product inventory application that displays a paginated list of products with the
following capabilities.
Core Features

1. Database Setup: Create a Supabase table called products with the following
schema:
● id (uuid, primary key)
● name (text)
● category (text)
● price (numeric)
● stock_quantity (integer)
● created_at (timestamp)

Data Seeding: Populate the table with at least 50 sample products across
multiple categories (Electronics, Clothing, Home & Garden, Sports, Books, etc.).
Pagination Implementation:
● Display 10 products per page
● Implement server-side pagination using Supabase's .range() method
● Show current page number and total number of pages
● Include Previous/Next navigation buttons
● Display total count of products matching current filters
Filtering Capabilities:
● Add a search input to filter products by name (case-insensitive)
● Implement category filter dropdown with all available categories
● Add price range filter (min/max inputs)
● Implement stock availability filter (In Stock / Out of Stock)
● Apply filters on the server-side using Supabase query methods (.eq(),
.ilike(), .gte(), .lte())
Sorting Functionality:
● Allow sorting by: Name, Price, Stock Quantity, Created Date
● Support both ascending and descending order
● Use Supabase's .order() method for server-side sorting
● Maintain sort state when paginating or filtering
User Interface:
● Display products in a table or card grid layout
● Show loading states during data fetching
● Display appropriate messages for empty results
● Ensure responsive design for mobile and desktop views
● Clear all filters button
Technical Requirements
Query Optimization:
● All filtering, sorting, and pagination must happen on the server-side
(Supabase)
● Use a single Supabase query that combines all filters, sorting, and
pagination
● Fetch only the required page of data, not the entire dataset
State Management:
● Manage filter , sort, and pagination state appropriately
● Optionally sync state with URL query parameters for shareable links (if
needed)
● Handle race conditions when multiple requests are in flight (if needed)
Error Handling:
● Display user-friendly error messages for failed queries
● Implement proper error boundaries
● Handle edge cases (empty database, network failures)
Code Quality:
● Write clean, modular, and reusable code
● Use proper React hooks (useState, useEffect, useMemo, useCallback)
● Implement proper TypeScript types (if using TypeScript)
● Add helpful code comments where necessary
Deliverables
Source Code: Complete ReactJS application with all components and utility
functions
Database Schema: SQL script or Supabase migration file for table creation
README.md
Live Demo (bonus): Deploy to Vercel/Netlify with Supabase connection
Evaluation Criteria
Candidates will be assessed on their ability to implement functional filtering, sorting,
and pagination that work seamlessly together, write clean and well-organized code with
proper React patterns, optimize performance through efficient server-side Supabase
queries without over-fetching data, create an intuitive and responsive user interface with
appropriate loading and error states, and demonstrate best practices including proper
error handling, security considerations, and professional code documentation.
Time Allocation
Recommended: 2 Days
Thank you for taking the time to complete this task, and best of luck!