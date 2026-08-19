import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { loadClarity } from "./lib/clarity";
import { applyPixelConsent } from "./lib/fbq";
import { loadA11yPrefs, applyA11yPrefs } from "./lib/a11y";

// Apply persisted accessibility prefs as early as possible (avoids FOUC).
applyA11yPrefs(loadA11yPrefs());

// Seed the SPA PageView dedupe so index.html's initial PageView isn't repeated.
(window as unknown as Record<string, string>).__last_pv_path =
  window.location.pathname + window.location.search;

// Initialize consent-gated trackers.
applyPixelConsent();
loadClarity();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
