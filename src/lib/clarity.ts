// Microsoft Clarity helper — loads only when analytics consent is granted.
import { isAllowed, subscribe } from "./consent";

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const CLARITY_PROJECT_ID = "wmehmv0z6r";

let clarityLoaded = false;

export const loadClarity = () => {
  if (typeof window === "undefined") return;
  if (clarityLoaded || window.clarity) return;
  if (!isAllowed("analytics")) return;

  clarityLoaded = true;

  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
};

// Auto-load when analytics consent becomes granted later.
if (typeof window !== "undefined") {
  subscribe((state) => {
    if (state?.analytics) loadClarity();
  });
}

export const setClarityTag = (key: string, value: string | string[]) => {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    window.clarity("set", key, value);
  }
};

export const trackClarityEvent = (name: string) => {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    window.clarity("event", name);
  }
};

export const identifyClarityUser = (id: string) => {
  if (typeof window !== "undefined" && typeof window.clarity === "function") {
    window.clarity("identify", id);
  }
};
