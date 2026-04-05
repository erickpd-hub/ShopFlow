-- SQL Schema for AI-Powered SaaS Store Builder
-- To be run in Supabase SQL Editor

-- 1. Profiles (SaaS Owners)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Stores (Multi-tenant)
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subdomain TEXT UNIQUE, -- e.g., storename.tu-saas.com
  custom_domain TEXT UNIQUE,
  config_json JSONB DEFAULT '{}'::jsonb NOT NULL,
  theme_json JSONB DEFAULT null, -- Added for visual theme editor
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  stock INTEGER DEFAULT 0 NOT NULL,
  image_url TEXT,
  embedding VECTOR(1536), -- For AI search (pgvector)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  customer_data JSONB NOT NULL, -- email, name, address
  status TEXT DEFAULT 'pending' NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  tracking_number TEXT,
  carrier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Integrations
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL, -- Meta, Google
  access_token TEXT NOT NULL, -- Should be encrypted in a real app
  config_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Stores: Owners can manage their own stores
CREATE POLICY "Owners can view own stores" ON stores FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners can insert own stores" ON stores FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own stores" ON stores FOR UPDATE USING (auth.uid() = owner_id);

-- Products: Everyone can view products (public storefront), owners can manage
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Owners can manage own products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM stores WHERE id = products.store_id AND owner_id = auth.uid())
);

-- Orders: Owners can see their store's orders
CREATE POLICY "Owners can view own store orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM stores WHERE id = orders.store_id AND owner_id = auth.uid())
);

-- Integrations: Owners can manage their store's integrations
CREATE POLICY "Owners can manage own store integrations" ON integrations FOR ALL USING (
  EXISTS (SELECT 1 FROM stores WHERE id = integrations.store_id AND owner_id = auth.uid())
);
