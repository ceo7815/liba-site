// Meta Pixel helper — supports multiple pixel IDs initialized in index.html.
// - PageView fires on initial load (index.html) and on every SPA route change.
// - Lead fires once per campaign/session (deduped by eventID stored
//   in sessionStorage). Meta also dedupes by eventID server-side.
// Fire Lead on successful form submit (with Advanced Matching), not only
// on thank-you. Thank-you is a fallback if submit never reached Pixel.
// Active pixels: 2065359334053610 and 1514737380266105.
// Consent is NOT enforced here — the pixels are treated as essential analytics
// so events show up in Meta Events Manager for testing/QA.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const LEAD_PREFIX = "lead_event_id::";
const PV_KEY = "__last_pv_path";

/** Must match fbq('init', ...) in index.html so AM attaches to both pixels. */
const PIXEL_IDS = ["2065359334053610", "1514737380266105"] as const;

export type LeadUserData = {
  ph?: string;
  fn?: string;
  ln?: string;
  country?: string;
};

const safeUuid = (): string => {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    /* ignore */
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

/** Split "שם מלא" so CRM last_name is never a copy of first_name. */
export const splitFullName = (full: string): { fn: string; ln: string } => {
  const parts = (full || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return { fn: "", ln: "" };
  if (parts.length === 1) return { fn: parts[0], ln: "" };
  return { fn: parts[0], ln: parts.slice(1).join(" ") };
};

/** Meta Advanced Matching: digits with country code, no + / leading 0. */
export const toMetaPhone = (raw: string): string => {
  let d = (raw || "").replace(/\D/g, "");
  if (d.startsWith("972")) return d;
  if (d.startsWith("0")) return `972${d.slice(1)}`;
  return d;
};

const normalizeUserData = (user?: LeadUserData): Record<string, string> => {
  const out: Record<string, string> = { country: (user?.country || "il").toLowerCase() };
  if (user?.ph) {
    const ph = toMetaPhone(user.ph);
    if (ph) out.ph = ph;
  }
  if (user?.fn?.trim()) out.fn = user.fn.trim().toLowerCase();
  if (user?.ln?.trim()) out.ln = user.ln.trim().toLowerCase();
  return out;
};

/** Kept for backwards compatibility; Lead now fires at submit with user data. */
export const markLeadPending = (): string => "";

/** Kept for backwards compatibility; consent is no longer enforced for the pixel. */
export const applyPixelConsent = () => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("consent", "grant");
};

/** Fires PageView for SPA route changes. The initial PageView is fired by index.html. */
export const trackPageView = (path?: string): void => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const p = path ?? (typeof location !== "undefined" ? location.pathname + location.search : "");
  const store = window as unknown as Record<string, string>;
  if (store[PV_KEY] === p) return; // dedupe (initial load, StrictMode double-invoke, identical nav)
  store[PV_KEY] = p;
  window.fbq("track", "PageView");
};

const readStoredId = (keys: string[]): string | null => {
  for (const key of keys) {
    try {
      const v = sessionStorage.getItem(key);
      if (v) return v;
    } catch {
      /* ignore */
    }
  }
  return null;
};

const storeId = (keys: string[], eventId: string): void => {
  for (const key of keys) {
    try {
      sessionStorage.setItem(key, eventId);
    } catch {
      /* ignore */
    }
  }
};

const fireOnce = (
  eventName: string,
  storagePrefix: string,
  user?: LeadUserData,
  extraDedupeKeys?: string[],
): void => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const path = (typeof location !== "undefined" && location.pathname) || "ty";
  const suffixes = extraDedupeKeys?.length ? extraDedupeKeys : [path];
  const keys = suffixes.map((s) => `${storagePrefix}${s}`);

  if (readStoredId(keys)) return;

  const eventId = safeUuid();
  storeId(keys, eventId);

  const params = eventName === "Lead" ? normalizeUserData(user) : {};
  if (eventName === "Lead" && (params.ph || params.fn || params.ln)) {
    for (const id of PIXEL_IDS) {
      window.fbq("init", id, params);
    }
  }

  window.fbq("track", eventName, params, { eventID: eventId });
};

/**
 * Fires `Lead` once per campaign/session.
 * Pass user data + landing/thank-you paths from the form so thank-you does not double-fire
 * and Meta Advanced Matching gets phone + name even if the thank-you page never mounts.
 */
export const trackLead = (user?: LeadUserData, dedupeKeys?: string[]): void => {
  fireOnce("Lead", LEAD_PREFIX, user, dedupeKeys);
};

const REG_PREFIX = "reg_event_id::";

/** Fires `CompleteRegistration` once per thank-you path per session. */
export const trackCompleteRegistration = (): void => {
  fireOnce("CompleteRegistration", REG_PREFIX);
};
