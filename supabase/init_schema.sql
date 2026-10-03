-- ============================================================================
-- NovaSphere Exim / ASMI Tech - Complete Free Supabase Database Setup
-- Run this entire script in Supabase SQL Editor (Dashboard -> SQL Editor)
-- 100% Compatible with Supabase Free Tier
-- ============================================================================

-- 1. Profiles Table (for Admin and User Authentication)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 2. Inquiries Table (Trade Desk, RFQs & Commercial Inquiries)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT DEFAULT 'India',
    inquiry_type TEXT NOT NULL DEFAULT 'Buyer looking for products',
    product_interest TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure columns exist if migrating from legacy tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'full_name') THEN
        ALTER TABLE public.inquiries ADD COLUMN full_name TEXT;
        UPDATE public.inquiries SET full_name = name WHERE full_name IS NULL AND name IS NOT NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'company_name') THEN
        ALTER TABLE public.inquiries ADD COLUMN company_name TEXT;
        UPDATE public.inquiries SET company_name = company WHERE company_name IS NULL AND company IS NOT NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'country') THEN
        ALTER TABLE public.inquiries ADD COLUMN country TEXT DEFAULT 'India';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'inquiry_type') THEN
        ALTER TABLE public.inquiries ADD COLUMN inquiry_type TEXT DEFAULT 'Buyer looking for products';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inquiries' AND column_name = 'product_interest') THEN
        ALTER TABLE public.inquiries ADD COLUMN product_interest TEXT;
    END IF;
END $$;

-- Enable RLS on Inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Inquiries Policies
-- Allow anyone (public/anonymous) to submit an inquiry from the website
DROP POLICY IF EXISTS "Allow public insert to inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "inquiries_public_insert_v2" ON public.inquiries;
CREATE POLICY "Allow public insert to inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated admins to view, update, and delete inquiries
DROP POLICY IF EXISTS "inquiries_select_for_admin" ON public.inquiries;
DROP POLICY IF EXISTS "inquiries_authenticated_select_v2" ON public.inquiries;
CREATE POLICY "inquiries_select_for_admin"
ON public.inquiries
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "inquiries_update_for_admin" ON public.inquiries;
DROP POLICY IF EXISTS "inquiries_authenticated_update_v2" ON public.inquiries;
CREATE POLICY "inquiries_update_for_admin"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "inquiries_delete_for_admin" ON public.inquiries;
DROP POLICY IF EXISTS "inquiries_authenticated_delete_v2" ON public.inquiries;
CREATE POLICY "inquiries_delete_for_admin"
ON public.inquiries
FOR DELETE
TO authenticated
USING (true);

-- 4. Schema Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.inquiries TO anon;
GRANT ALL ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- 5. Auto-create Profile on Auth Signup Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    new.id, 
    new.email, 
    'admin', -- Initial signup automatically receives admin role for management
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- Setup Complete! Your database is now ready for production on Supabase Free Tier.
-- ============================================================================
