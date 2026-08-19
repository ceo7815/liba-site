-- Applied on liba-os (cuqaftpkcdxtjogiyqtu). Isolated from OS tables.
-- Anon: INSERT only. Authenticated staff with active profile: SELECT.
-- No SELECT/UPDATE/DELETE for the public site key.

CREATE TABLE IF NOT EXISTS public.website_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL,
  full_name text,
  phone text,
  email text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  page_url text,
  referrer text,
  user_agent text,
  utm jsonb
);

COMMENT ON TABLE public.website_leads IS 'Marketing-site lead backup. Anon INSERT only. Isolated from OS tables.';

CREATE INDEX IF NOT EXISTS idx_website_leads_created_at ON public.website_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_leads_source ON public.website_leads (source);

ALTER TABLE public.website_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_leads FORCE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.website_leads FROM PUBLIC;
REVOKE ALL ON TABLE public.website_leads FROM anon;
REVOKE ALL ON TABLE public.website_leads FROM authenticated;

GRANT INSERT (source, full_name, phone, email, payload, page_url, referrer, user_agent, utm)
  ON TABLE public.website_leads TO anon, authenticated;
GRANT INSERT ON TABLE public.website_leads TO anon, authenticated;
GRANT SELECT ON TABLE public.website_leads TO authenticated;

DROP POLICY IF EXISTS website_leads_public_insert ON public.website_leads;
CREATE POLICY website_leads_public_insert
  ON public.website_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    source IS NOT NULL
    AND length(source) BETWEEN 1 AND 80
    AND (full_name IS NULL OR length(full_name) <= 200)
    AND (phone IS NULL OR length(phone) <= 40)
    AND (email IS NULL OR length(email) <= 200)
    AND (page_url IS NULL OR length(page_url) <= 500)
    AND (referrer IS NULL OR length(referrer) <= 500)
    AND (user_agent IS NULL OR length(user_agent) <= 500)
    AND pg_column_size(payload) <= 16384
    AND (utm IS NULL OR pg_column_size(utm) <= 4096)
  );

DROP POLICY IF EXISTS website_leads_staff_select ON public.website_leads;
CREATE POLICY website_leads_staff_select
  ON public.website_leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.is_active = true
    )
  );
