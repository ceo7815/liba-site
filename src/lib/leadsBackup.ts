// Backup every lead submission to liba-os `website_leads`.
// Isolated from OS tables: the public site key can INSERT only.
// Runs alongside the existing Make webhook so nothing is lost if the webhook/automation fails.
// In local `npm run dev`, neither Make nor the live leads table is touched.

type UnknownRecord = Record<string, unknown>;

const isLivePipeline = import.meta.env.PROD;

export type WebhookDelivery = { ok: boolean };

/**
 * Dispatch lead payloads to Make.
 * `ok` means the browser accepted the request. The webhook is `no-cors`,
 * so an HTTP error from Make cannot be read — only a network failure is `ok: false`.
 * Local `npm run dev` never calls Make and returns `ok: true` so the UI can be tested.
 */
export const postLeadWebhooks = async (
  urls: string | string[],
  payload: unknown,
): Promise<WebhookDelivery> => {
  const list = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
  if (!isLivePipeline) {
    console.info("[local] skipped Make webhooks to protect live automations:", list);
    return { ok: true };
  }
  if (list.length === 0) return { ok: false };
  const body = JSON.stringify(payload);
  const results = await Promise.allSettled(
    list.map((url) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body,
      }),
    ),
  );
  return { ok: results.some((result) => result.status === "fulfilled") };
};

const pickString = (obj: UnknownRecord, keys: string[]): string | undefined => {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
};

const extractUtm = (): UnknownRecord | null => {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: UnknownRecord = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"].forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    });
    return Object.keys(utm).length ? utm : null;
  } catch {
    return null;
  }
};

/**
 * Persist a lead to `website_leads` before the Make webhook.
 * Callers must await this so a route change does not cancel the insert.
 * Never throws — failures are logged and swallowed so form flow isn't blocked.
 */
export const backupLead = async (
  source: string,
  payload: UnknownRecord,
): Promise<void> => {
  try {
    if (!isLivePipeline) {
      console.info("[local] skipped leads backup to protect the live database");
      return;
    }

    const full_name = pickString(payload, [
      "fullName",
      "full_name",
      "name",
      "childName",
      "child_name",
      "lead_full_name",
      "lead_name",
    ]);
    const phone = pickString(payload, [
      "phone",
      "phoneNumber",
      "phone_number",
      "tel",
      "lead_phone_number",
      "lead_phone",
    ]);
    const email = pickString(payload, ["email", "mail", "lead_email"]);

    const page_url = typeof window !== "undefined" ? window.location.href.slice(0, 500) : null;
    const referrer = typeof document !== "undefined" && document.referrer ? document.referrer.slice(0, 500) : null;
    const user_agent = typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null;

    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("website_leads").insert({
      source: source.slice(0, 80),
      full_name: full_name?.slice(0, 200) ?? null,
      phone: phone?.slice(0, 40) ?? null,
      email: email?.slice(0, 200) ?? null,
      payload: payload as never,
      page_url,
      referrer,
      user_agent,
      utm: extractUtm() as never,
    });
    if (error) console.warn("[leadsBackup] insert failed:", error.message);
  } catch (e) {
    console.warn("[leadsBackup] unexpected error:", e);
  }
};
