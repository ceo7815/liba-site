
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
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
