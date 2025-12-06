-- Product Inventory Database Schema
-- Run this in your Supabase SQL Editor

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- Optional: Insert sample data for testing
-- You can customize or replace this with your own data

INSERT INTO products (name, category, price, stock_quantity) VALUES
  ('Laptop Pro 15"', 'Electronics', 1299.99, 15),
  ('Wireless Mouse', 'Electronics', 29.99, 150),
  ('USB-C Cable', 'Electronics', 12.99, 200),
  ('Bluetooth Headphones', 'Electronics', 89.99, 45),
  ('Smartphone X', 'Electronics', 799.99, 30),
  ('Tablet 10"', 'Electronics', 499.99, 25),
  ('Smart Watch', 'Electronics', 249.99, 60),
  ('Keyboard Mechanical', 'Electronics', 129.99, 40),
  ('Monitor 27"', 'Electronics', 349.99, 20),
  ('Webcam HD', 'Electronics', 79.99, 55),
  
  ('Cotton T-Shirt', 'Clothing', 19.99, 100),
  ('Denim Jeans', 'Clothing', 49.99, 75),
  ('Running Shoes', 'Clothing', 89.99, 50),
  ('Winter Jacket', 'Clothing', 129.99, 30),
  ('Baseball Cap', 'Clothing', 24.99, 80),
  ('Wool Socks', 'Clothing', 14.99, 120),
  ('Leather Belt', 'Clothing', 34.99, 65),
  ('Sweater', 'Clothing', 44.99, 55),
  ('Dress Shirt', 'Clothing', 39.99, 70),
  ('Sneakers', 'Clothing', 69.99, 45),
  
  ('Garden Hose', 'Home & Garden', 34.99, 40),
  ('Plant Pot Set', 'Home & Garden', 29.99, 90),
  ('LED Light Bulbs', 'Home & Garden', 15.99, 150),
  ('Tool Set', 'Home & Garden', 79.99, 35),
  ('Lawn Mower', 'Home & Garden', 299.99, 12),
  ('Watering Can', 'Home & Garden', 19.99, 60),
  ('Garden Gloves', 'Home & Garden', 12.99, 100),
  ('Fertilizer Bag', 'Home & Garden', 24.99, 75),
  ('Outdoor Furniture Set', 'Home & Garden', 599.99, 8),
  ('BBQ Grill', 'Home & Garden', 249.99, 15),
  
  ('Yoga Mat', 'Sports', 29.99, 80),
  ('Dumbbells Set', 'Sports', 89.99, 35),
  ('Tennis Racket', 'Sports', 129.99, 25),
  ('Basketball', 'Sports', 24.99, 60),
  ('Soccer Ball', 'Sports', 19.99, 70),
  ('Bicycle', 'Sports', 499.99, 10),
  ('Swim Goggles', 'Sports', 14.99, 90),
  ('Running Watch', 'Sports', 179.99, 30),
  ('Protein Powder', 'Sports', 39.99, 100),
  ('Water Bottle', 'Sports', 12.99, 150),
  
  ('Fiction Novel', 'Books', 14.99, 200),
  ('Programming Guide', 'Books', 49.99, 45),
  ('Cookbook', 'Books', 24.99, 80),
  ('History Book', 'Books', 19.99, 65),
  ('Self-Help Book', 'Books', 16.99, 90),
  ('Children Story', 'Books', 9.99, 150),
  ('Science Textbook', 'Books', 89.99, 30),
  ('Biography', 'Books', 21.99, 55),
  ('Poetry Collection', 'Books', 12.99, 70),
  ('Comic Book', 'Books', 7.99, 120),
  
  ('Office Chair', 'Office', 199.99, 25),
  ('Desk Lamp', 'Office', 39.99, 60),
  ('Notebook Set', 'Office', 12.99, 200),
  ('Pen Set', 'Office', 19.99, 150),
  ('Stapler', 'Office', 9.99, 100),
  ('Paper Shredder', 'Office', 79.99, 20),
  ('Filing Cabinet', 'Office', 149.99, 15),
  ('Whiteboard', 'Office', 59.99, 35),
  ('Desk Organizer', 'Office', 24.99, 80),
  ('Ergonomic Keyboard', 'Office', 89.99, 40)
ON CONFLICT (id) DO NOTHING;

-- Verify the data
SELECT 
  category,
  COUNT(*) as product_count,
  AVG(price)::NUMERIC(10,2) as avg_price,
  SUM(stock_quantity) as total_stock
FROM products
GROUP BY category
ORDER BY category;

-- Display success message
SELECT 'Database setup complete! Products table created with sample data.' as status;
