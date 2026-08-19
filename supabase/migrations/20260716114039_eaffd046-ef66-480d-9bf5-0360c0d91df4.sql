
ALTER TABLE public.leads
  ADD CONSTRAINT leads_full_name_len CHECK (full_name IS NULL OR char_length(full_name) <= 200),
  ADD CONSTRAINT leads_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT leads_email_len CHECK (email IS NULL OR char_length(email) <= 200),
  ADD CONSTRAINT leads_source_len CHECK (char_length(source) <= 80),
  ADD CONSTRAINT leads_page_url_len CHECK (page_url IS NULL OR char_length(page_url) <= 500),
  ADD CONSTRAINT leads_referrer_len CHECK (referrer IS NULL OR char_length(referrer) <= 500),
  ADD CONSTRAINT leads_user_agent_len CHECK (user_agent IS NULL OR char_length(user_agent) <= 500);
