// Accessibility preferences — persisted and applied to <html>.
export type A11yPrefs = {
  textSize: number; // 80-200
  contrast: "normal" | "high" | "invert";
  theme: "system" | "light" | "dark";
  underlineLinks: boolean;
  emphasizeHeadings: boolean;
  readableFont: boolean;
  wideLineHeight: boolean;
  wideLetterSpacing: boolean;
  noAnimations: boolean;
  bigCursor: boolean;
  focusVisible: boolean;
};

export const DEFAULT_A11Y: A11yPrefs = {
  textSize: 100,
  contrast: "normal",
  theme: "system",
  underlineLinks: false,
  emphasizeHeadings: false,
  readableFont: false,
  wideLineHeight: false,
  wideLetterSpacing: false,
  noAnimations: false,
  bigCursor: false,
  focusVisible: false,
};

const KEY = "a11y_prefs";

export const loadA11yPrefs = (): A11yPrefs => {
  if (typeof window === "undefined") return DEFAULT_A11Y;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_A11Y, ...(JSON.parse(raw) as Partial<A11yPrefs>) };
  } catch { /* ignore */ }
  return DEFAULT_A11Y;
};

export const saveA11yPrefs = (p: A11yPrefs) => {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
};

export const applyA11yPrefs = (p: A11yPrefs) => {
  if (typeof document === "undefined") return;
  const html = document.documentElement;

  // Text size
  html.style.fontSize = `${p.textSize}%`;

  // Contrast
  html.classList.remove("high-contrast", "invert-colors");
  if (p.contrast === "high") html.classList.add("high-contrast");
  if (p.contrast === "invert") html.classList.add("invert-colors");

  // Theme
  html.classList.remove("dark");
  if (p.theme === "dark") {
    html.classList.add("dark");
  } else if (p.theme === "system") {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      // leave default — many tokens already adjust via .dark, but we only opt-in explicitly
    }
  }

  // Toggles
  html.classList.toggle("underline-links", p.underlineLinks);
  html.classList.toggle("emphasize-headings", p.emphasizeHeadings);
  html.classList.toggle("readable-font", p.readableFont);
  html.classList.toggle("wide-line-height", p.wideLineHeight);
  html.classList.toggle("wide-letter-spacing", p.wideLetterSpacing);
  html.classList.toggle("no-animations", p.noAnimations);
  html.classList.toggle("big-cursor", p.bigCursor);
  html.classList.toggle("focus-visible-strong", p.focusVisible);
};
