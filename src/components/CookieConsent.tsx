import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, Settings, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  acceptAll,
  getConsent,
  hasDecision,
  rejectNonEssential,
  setConsent,
  type ConsentCategories,
} from "@/lib/consent";
import { applyPixelConsent } from "@/lib/fbq";
import { loadClarity } from "@/lib/clarity";

const CATEGORY_INFO: Array<{
  key: keyof ConsentCategories;
  title: string;
  desc: string;
  locked?: boolean;
}> = [
  {
    key: "essential",
    title: "חיוניים",
    desc: "קוקיז הנדרשים לתפעול תקין של האתר, אבטחה, שמירת בחירות בסיסיות ושליחת טפסים. לא ניתן לכבות אותם.",
    locked: true,
  },
  {
    key: "preferences",
    title: "העדפות",
    desc: "קוקיז שעוזרים לשמור בחירות משתמש כמו שפה, תצוגה או הגדרות נגישות.",
  },
  {
    key: "analytics",
    title: "אנליטיקה",
    desc: "קוקיז וכלי מדידה שעוזרים לנו להבין כיצד משתמשים באתר ולשפר את חוויית השימוש (Microsoft Clarity).",
  },
  {
    key: "marketing",
    title: "שיווק",
    desc: "קוקיז המשמשים למדידה, פרסום, רימרקטינג והתאמת מסרים שיווקיים (Meta Pixel).",
  },
  {
    key: "thirdParty",
    title: "צדדים שלישיים",
    desc: "שירותים חיצוניים שעשויים לפעול באתר, כמו כלי מדידה, מפות, הטמעות או מערכות פרסום.",
  },
];

const CookieConsent = () => {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentCategories>({
    essential: true,
    preferences: false,
    analytics: false,
    marketing: false,
    thirdParty: false,
  });

  useEffect(() => {
    // Expose global opener for footer button
    (window as any).openCookieSettings = () => {
      const current = getConsent();
      if (current) {
        setDraft({
          essential: true,
          preferences: !!current.preferences,
          analytics: !!current.analytics,
          marketing: !!current.marketing,
          thirdParty: !!current.thirdParty,
        });
      }
      setModalOpen(true);
    };

    // Apply existing pixel/clarity state on mount.
    applyPixelConsent();
    loadClarity();

    if (!hasDecision()) {
      const t = setTimeout(() => setBannerVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const finish = (cats: ConsentCategories) => {
    setConsent(cats);
    applyPixelConsent();
    loadClarity();
    setBannerVisible(false);
    setModalOpen(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    applyPixelConsent();
    loadClarity();
    setBannerVisible(false);
    setModalOpen(false);
  };

  const handleRejectAll = () => {
    rejectNonEssential();
    applyPixelConsent();
    setBannerVisible(false);
    setModalOpen(false);
  };

  const openPreferences = () => {
    const current = getConsent();
    if (current) {
      setDraft({
        essential: true,
        preferences: !!current.preferences,
        analytics: !!current.analytics,
        marketing: !!current.marketing,
        thirdParty: !!current.thirdParty,
      });
    }
    setModalOpen(true);
  };

  return (
    <>
      {bannerVisible && (
        <div
          role="region"
          aria-label="הודעת קוקיז"
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-popover/95 backdrop-blur-lg border-t border-border shadow-2xl"
        >
          <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-foreground leading-relaxed">
                האתר משתמש בקובצי Cookies וטכנולוגיות דומות לצורך תפעול תקין, אבטחה, שיפור חוויית המשתמש, מדידה ושיווק.
                ניתן לאשר את כל הקוקיז, לדחות קוקיז שאינם חיוניים או לנהל העדפות לפי קטגוריות.
                ניתן לשנות את הבחירה בכל עת דרך{" "}
                <button
                  type="button"
                  onClick={openPreferences}
                  className="underline hover:text-accent"
                >
                  הגדרות פרטיות וקוקיז
                </button>
                {" "}באתר.{" "}
                <Link to="/privacy-policy" className="underline hover:text-accent">
                  מדיניות פרטיות
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              <button
                onClick={handleAcceptAll}
                className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                אשר הכל
              </button>
              <button
                onClick={handleRejectAll}
                className="border border-border px-5 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors"
              >
                דחה לא חיוניים
              </button>
              <button
                onClick={openPreferences}
                className="border border-border px-5 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors inline-flex items-center gap-1.5"
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
                ניהול העדפות
              </button>
            </div>
            <button
              onClick={handleRejectAll}
              aria-label="סגור הודעת קוקיז"
              className="absolute top-2 left-2 lg:hidden"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-xl font-heading">ניהול העדפות קוקיז</DialogTitle>
            <DialogDescription className="text-right">
              ניתן לבחור אילו קטגוריות של קוקיז להפעיל. בחירתך תישמר ותוחל מיידית.
              ניתן לשנות אותה בכל עת דרך "הגדרות פרטיות וקוקיז" בפוטר.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {CATEGORY_INFO.map((cat) => (
              <div
                key={cat.key}
                className="border border-border rounded-lg p-4 flex items-start gap-4"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                    {cat.title}
                    {cat.locked && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        תמיד פעיל
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                </div>
                <div dir="ltr" className="flex-shrink-0">
                  <Switch
                    checked={cat.locked ? true : !!draft[cat.key]}
                    disabled={cat.locked}
                    onCheckedChange={(v) =>
                      setDraft((d) => ({ ...d, [cat.key]: v }))
                    }
                    aria-label={cat.title}
                  />
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
            <button
              onClick={handleRejectAll}
              className="border border-border px-5 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors"
            >
              דחה לא חיוניים
            </button>
            <button
              onClick={() => finish(draft)}
              className="border border-accent text-accent px-5 py-2 rounded-full text-sm font-bold hover:bg-accent/10 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              שמור העדפות
            </button>
            <button
              onClick={handleAcceptAll}
              className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              אשר הכל
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
