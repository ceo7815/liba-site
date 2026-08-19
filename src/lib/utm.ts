// UTM helpers — read query params, persist to sessionStorage, retrieve later.

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_ad",
  "utm_adset",
  "utm_placement",
] as const;

export type UtmParams = Record<(typeof UTM_KEYS)[number], string>;

const STORAGE_KEY = "athlete_utm";

const emptyUtm = (): UtmParams =>
  UTM_KEYS.reduce((acc, k) => ({ ...acc, [k]: "" }), {} as UtmParams);

export const captureUtmFromUrl = (): UtmParams => {
  if (typeof window === "undefined") return emptyUtm();
  const sp = new URLSearchParams(window.location.search);
  const current = emptyUtm();
  let hasAny = false;
  for (const k of UTM_KEYS) {
    const v = sp.get(k);
    if (v) {
      current[k] = v;
      hasAny = true;
    }
  }
  if (hasAny) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      /* ignore */
    }
    return current;
  }
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return { ...emptyUtm(), ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return current;
};

export const getStoredUtm = (): UtmParams => {
  if (typeof window === "undefined") return emptyUtm();
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return { ...emptyUtm(), ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return emptyUtm();
};
