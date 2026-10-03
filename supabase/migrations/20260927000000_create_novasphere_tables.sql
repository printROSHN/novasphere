-- ============================================================================
-- NovaSphere Exim Database Schema & Security Policies
-- International Trading & Market Development Platform
-- ============================================================================

-- 1. Create inquiries table if not exists, or alter columns for full compatibility
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

-- Ensure columns exist in case table was created with legacy schema
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

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Anonymous users can insert commercial inquiries/RFQs
DROP POLICY IF EXISTS "Allow public insert to inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "allow_anonymous_inquiry_insert" ON public.inquiries;
DROP POLICY IF EXISTS "inquiries_insert_for_anon" ON public.inquiries;

CREATE POLICY "Allow public insert to inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Authenticated users / trade desk admins can view, update and delete
DROP POLICY IF EXISTS "inquiries_select_for_admin" ON public.inquiries;
CREATE POLICY "inquiries_select_for_admin"
ON public.inquiries
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "inquiries_update_for_admin" ON public.inquiries;
CREATE POLICY "inquiries_update_for_admin"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "inquiries_delete_for_admin" ON public.inquiries;
CREATE POLICY "inquiries_delete_for_admin"
ON public.inquiries
FOR DELETE
TO authenticated
USING (true);

GRANT INSERT ON public.inquiries TO anon;
GRANT ALL ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
