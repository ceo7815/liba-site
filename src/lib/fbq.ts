// Meta Pixel helper — supports multiple pixel IDs initialized in index.html.
// - PageView fires on initial load (index.html) and on every SPA route change.
// - Lead fires once per thank-you path per session (deduped by eventID stored
//   in sessionStorage). Meta also dedupes by eventID server-side.
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

const safeUuid = (): string => {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch { /* ignore */ }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

/** Backwards-compat no-op — Lead fires on thank-you page arrival. */
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

/** Fires `Lead` once per thank-you path per session. */
export const trackLead = (): void => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const path = (typeof location !== "undefined" && location.pathname) || "ty";
  const key = `${LEAD_PREFIX}${path}`;

  let existing: string | null = null;
  try { existing = sessionStorage.getItem(key); } catch { /* ignore */ }
  if (existing) return;

  const eventId = safeUuid();
  try { sessionStorage.setItem(key, eventId); } catch { /* ignore */ }

  window.fbq("track", "Lead", {}, { eventID: eventId });
};
