-- ============================================================================
-- NovaSphere Exim - Dynamic CMS Migration for Supabase
-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor)
-- 100% Compatible with Free Tier
-- ============================================================================

-- 1. Create site_content table for dynamic CMS
CREATE TABLE IF NOT EXISTS public.site_content (
    key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Read policy: Public website visitors can read content
DROP POLICY IF EXISTS "site_content_read_all" ON public.site_content;
CREATE POLICY "site_content_read_all"
ON public.site_content FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Write policy: Admin management (upsert, update, delete)
DROP POLICY IF EXISTS "site_content_write_all" ON public.site_content;
CREATE POLICY "site_content_write_all"
ON public.site_content FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 5. Inquiries Table: Ensure admin can update status and delete leads
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "inquiries_update_for_admin" ON public.inquiries;
DROP POLICY IF EXISTS "inquiries_update_all" ON public.inquiries;
CREATE POLICY "inquiries_update_all"
ON public.inquiries FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "inquiries_delete_for_admin" ON public.inquiries;
DROP POLICY IF EXISTS "inquiries_delete_all" ON public.inquiries;
CREATE POLICY "inquiries_delete_all"
ON public.inquiries FOR DELETE
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "inquiries_select_all" ON public.inquiries;
CREATE POLICY "inquiries_select_all"
ON public.inquiries FOR SELECT
TO anon, authenticated
USING (true);

-- 6. Schema Grants
GRANT ALL ON public.site_content TO anon, authenticated, service_role;
GRANT ALL ON public.inquiries TO anon, authenticated, service_role;
