// Central cookie-consent module.
// - Stores per-category consent in localStorage under `cookieConsent_v2`.
// - Exposes helpers to read/update consent and to react to changes.
// - Notifies subscribers (e.g. Clarity loader, fbq) when consent changes.

export type ConsentCategories = {
  essential: true; // always true — required for site operation
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  thirdParty: boolean;
};

export type ConsentState = ConsentCategories & {
  timestamp: string;
};

const STORAGE_KEY = "cookieConsent_v2";
const LEGACY_KEY = "cookieConsent"; // older boolean key

const DEFAULT_DENIED: ConsentCategories = {
  essential: true,
  preferences: false,
  analytics: false,
  marketing: false,
  thirdParty: false,
};

const ALL_ACCEPTED: ConsentCategories = {
  essential: true,
  preferences: true,
  analytics: true,
  marketing: true,
  thirdParty: true,
};

type Listener = (state: ConsentState | null) => void;
const listeners = new Set<Listener>();

export const getConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ConsentState;
    // Legacy migration — old key was "accepted" / "declined"
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === "accepted") {
      const migrated: ConsentState = { ...ALL_ACCEPTED, timestamp: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    if (legacy === "declined") {
      const migrated: ConsentState = { ...DEFAULT_DENIED, timestamp: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch { /* ignore */ }
  return null;
};

export const hasDecision = (): boolean => getConsent() !== null;

export const setConsent = (categories: Partial<ConsentCategories>): ConsentState => {
  const merged: ConsentState = {
    ...DEFAULT_DENIED,
    ...categories,
    essential: true,
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch { /* ignore */ }
  listeners.forEach((l) => l(merged));
  return merged;
};

export const acceptAll = () => setConsent(ALL_ACCEPTED);
export const rejectNonEssential = () => setConsent(DEFAULT_DENIED);

export const subscribe = (fn: Listener): (() => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const isAllowed = (cat: keyof ConsentCategories): boolean => {
  if (cat === "essential") return true;
  const s = getConsent();
  return !!(s && s[cat]);
};

// Opens the preferences modal — implemented by CookieConsent component
// which sets `window.openCookieSettings`.
export const openSettings = () => {
  if (typeof window !== "undefined" && typeof (window as any).openCookieSettings === "function") {
    (window as any).openCookieSettings();
  }
};
