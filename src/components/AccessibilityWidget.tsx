import { useEffect, useState } from "react";
import {
  Eye, X, Plus, Minus, RotateCcw, Sun, Moon, Type, Underline,
  Heading, AlignJustify, MousePointer2, Pause, Contrast,
} from "lucide-react";
import {
  loadA11yPrefs, saveA11yPrefs, applyA11yPrefs, DEFAULT_A11Y, type A11yPrefs,
} from "@/lib/a11y";

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_A11Y);

  // Load + apply persisted prefs once on mount.
  useEffect(() => {
    const loaded = loadA11yPrefs();
    setPrefs(loaded);
    applyA11yPrefs(loaded);
  }, []);

  const update = (patch: Partial<A11yPrefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...patch };
      applyA11yPrefs(next);
      saveA11yPrefs(next);
      return next;
    });
  };

  const reset = () => {
    setPrefs(DEFAULT_A11Y);
    applyA11yPrefs(DEFAULT_A11Y);
    saveA11yPrefs(DEFAULT_A11Y);
  };

  return (
    <>
      {/* Skip-to-content link, visible only when focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        דלג לתוכן המרכזי
      </a>

      <button
        onClick={() => setOpen(!open)}
        aria-label="פתח תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="fixed bottom-20 left-4 z-[55] w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <Eye className="w-5 h-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="a11y-panel"
          role="dialog"
          aria-label="תפריט נגישות"
          className="fixed bottom-36 left-4 z-[55] w-80 max-h-[80vh] overflow-y-auto bg-popover border border-border rounded-2xl shadow-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-base">תפריט נגישות</h3>
            <button onClick={() => setOpen(false)} aria-label="סגור תפריט נגישות">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Text Size */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground mb-2">גודל טקסט ({prefs.textSize}%)</p>
            <div className="flex gap-2">
              <button
                onClick={() => update({ textSize: Math.max(80, prefs.textSize - 10) })}
                className="flex-1 py-1.5 rounded-lg border border-border text-xs hover:bg-muted"
                aria-label="הקטן טקסט"
              >
                <Minus className="w-3 h-3 mx-auto" aria-hidden="true" />
              </button>
              <button
                onClick={() => update({ textSize: 100 })}
                className="flex-1 py-1.5 rounded-lg border border-border text-xs hover:bg-muted"
              >
                איפוס
              </button>
              <button
                onClick={() => update({ textSize: Math.min(200, prefs.textSize + 10) })}
                className="flex-1 py-1.5 rounded-lg border border-border text-xs hover:bg-muted"
                aria-label="הגדל טקסט"
              >
                <Plus className="w-3 h-3 mx-auto" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Contrast */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Contrast className="w-3.5 h-3.5" aria-hidden="true" /> ניגודיות
            </p>
            <div className="flex gap-2">
              {([
                { v: "normal", label: "רגיל" },
                { v: "high", label: "גבוהה" },
                { v: "invert", label: "היפוך" },
              ] as const).map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => update({ contrast: opt.v })}
                  className={`flex-1 py-1.5 rounded-lg border text-xs ${
                    prefs.contrast === opt.v
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground mb-2">מצב תצוגה</p>
            <div className="flex gap-2">
              <button
                onClick={() => update({ theme: "light" })}
                className={`flex-1 py-1.5 rounded-lg border text-xs inline-flex items-center justify-center gap-1 ${
                  prefs.theme === "light" ? "bg-accent text-accent-foreground border-accent" : "border-border hover:bg-muted"
                }`}
              >
                <Sun className="w-3.5 h-3.5" aria-hidden="true" /> בהיר
              </button>
              <button
                onClick={() => update({ theme: "dark" })}
                className={`flex-1 py-1.5 rounded-lg border text-xs inline-flex items-center justify-center gap-1 ${
                  prefs.theme === "dark" ? "bg-accent text-accent-foreground border-accent" : "border-border hover:bg-muted"
                }`}
              >
                <Moon className="w-3.5 h-3.5" aria-hidden="true" /> כהה
              </button>
              <button
                onClick={() => update({ theme: "system" })}
                className={`flex-1 py-1.5 rounded-lg border text-xs ${
                  prefs.theme === "system" ? "bg-accent text-accent-foreground border-accent" : "border-border hover:bg-muted"
                }`}
              >
                מערכת
              </button>
            </div>
          </div>

          {/* Toggle list */}
          <div className="space-y-2.5 mb-4 text-xs">
            {[
              { key: "underlineLinks", icon: Underline, label: "הדגשת קישורים" },
              { key: "emphasizeHeadings", icon: Heading, label: "הדגשת כותרות" },
              { key: "readableFont", icon: Type, label: "גופן קריא יותר" },
              { key: "wideLineHeight", icon: AlignJustify, label: "מרווח בין שורות" },
              { key: "wideLetterSpacing", icon: Type, label: "מרווח בין אותיות" },
              { key: "noAnimations", icon: Pause, label: "עצירת אנימציות" },
              { key: "bigCursor", icon: MousePointer2, label: "סמן עכבר גדול" },
              { key: "focusVisible", icon: Eye, label: "סימון פוקוס מודגש" },
            ].map(({ key, icon: Icon, label }) => (
              <label key={key} className="flex items-center justify-between gap-2 cursor-pointer p-1.5 rounded hover:bg-muted">
                <span className="inline-flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                  {label}
                </span>
                <input
                  type="checkbox"
                  checked={!!prefs[key as keyof A11yPrefs]}
                  onChange={(e) => update({ [key]: e.target.checked } as Partial<A11yPrefs>)}
                  className="w-4 h-4 rounded accent-[hsl(var(--accent))]"
                />
              </label>
            ))}
          </div>

          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs hover:bg-muted font-medium"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" /> איפוס כל ההגדרות
          </button>

          <p className="mt-3 text-[10px] text-muted-foreground text-center">
            ההגדרות נשמרות במכשיר זה ויחולו גם בביקור הבא.
          </p>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
