import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Home, Loader2, Search, Shield } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/data/siteConfig";
import { LIFE_DISCOUNT_LP, lifeDiscountFaqs } from "@/data/lifeDiscountLp";
import { useToast } from "@/hooks/use-toast";
import { isValidIsraeliMobile, MOBILE_PHONE_ERROR, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";
import { backupLead, postLeadWebhooks } from "@/lib/leadsBackup";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import logo from "@/assets/logo.png";
import logoLight from "@/assets/logo-light.png";

const WEBHOOK_URL = "https://hook.eu2.make.com/5qyxhvaox1jtucgeyfv3wdwtc9zqqy8g";

const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

const ATTR_STORAGE = "liba_life_discount_attr";

const collectAttribution = (): Record<string, string> => {
  const empty = Object.fromEntries(ATTR_KEYS.map((k) => [k, ""])) as Record<string, string>;
  if (typeof window === "undefined") return empty;
  try {
    const params = new URLSearchParams(window.location.search);
    const current: Record<string, string> = { ...empty };
    let hasAny = false;
    ATTR_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) {
        current[k] = v;
        hasAny = true;
      }
    });
    if (hasAny) {
      sessionStorage.setItem(ATTR_STORAGE, JSON.stringify(current));
      return current;
    }
    const saved = sessionStorage.getItem(ATTR_STORAGE);
    if (saved) return { ...empty, ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return empty;
};

const LIFE_OPTIONS = ["כן", "לא", "לא בטוח"] as const;
const MORTGAGE_OPTIONS = ["כן", "לא"] as const;

type LifeOption = (typeof LIFE_OPTIONS)[number];
type MortgageOption = (typeof MORTGAGE_OPTIONS)[number];

const ChoiceRow = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <fieldset className="min-w-0">
    <legend className="text-[11px] md:text-xs font-semibold text-foreground mb-0.5 md:mb-1">{label} *</legend>
    <div className="flex gap-1.5">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 min-h-[32px] md:min-h-[42px] px-2 rounded-xl text-xs md:text-sm font-semibold border transition-colors ${
              selected
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-popover text-foreground border-border hover:border-primary/40"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </fieldset>
);

const LPLifeDiscountPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: LIFE_DISCOUNT_LP.campaign, funnelStep: "intro" });

  const navigate = useNavigate();
  const { toast } = useToast();
  const formStartedAt = useRef(Date.now());
  const [sending, setSending] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [choiceError, setChoiceError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    hasLife: "" as "" | LifeOption,
    hasMortgage: "" as "" | MortgageOption,
    website: "",
    consent: false,
  });

  useEffect(() => {
    collectAttribution();
  }, []);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "phone" && phoneError) setPhoneError(null);
    if ((key === "hasLife" || key === "hasMortgage") && choiceError) setChoiceError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.website) return;
    if (Date.now() - formStartedAt.current < 800) return;

    if (!isValidIsraeliMobile(form.phone)) {
      setPhoneError(MOBILE_PHONE_ERROR);
      return;
    }
    if (!form.hasLife || !form.hasMortgage) {
      setChoiceError("נא לבחור תשובה לשתי השאלות.");
      return;
    }
    if (!form.consent) return;

    const attr = collectAttribution();
    const payload = {
      name: form.name.trim(),
      phone: normalizeIsraeliPhone(form.phone),
      age: form.age ? Number(form.age) : null,
      has_life_insurance: form.hasLife,
      has_mortgage: form.hasMortgage,
      lead_full_name: form.name.trim(),
      lead_phone_number: normalizeIsraeliPhone(form.phone),
      lead_age: form.age ? Number(form.age) : null,
      lead_has_life_insurance: form.hasLife,
      lead_has_mortgage: form.hasMortgage,
      inquiry_service_area: "ביטוח חיים",
      inquiry_message: `ביטוח חיים: ${form.hasLife} | משכנתא: ${form.hasMortgage}`,
      meta_source_page: LIFE_DISCOUNT_LP.source,
      meta_campaign_type: "facebook-instagram",
      meta_campaign: LIFE_DISCOUNT_LP.campaign,
      meta_marketing_consent: false,
      meta_contact_consent: true,
      meta_locale: "he-IL",
      meta_page_url: typeof window !== "undefined" ? window.location.href : "",
      meta_submitted_at: new Date().toISOString(),
      ...attr,
    };

    setSending(true);
    try {
      await backupLead(LIFE_DISCOUNT_LP.source, payload);
      await postLeadWebhooks(WEBHOOK_URL, payload);
      navigate(LIFE_DISCOUNT_LP.thankYouPath);
    } catch (error) {
      console.error("Webhook error:", error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשליחת הטופס. אנא נסו שוב.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full min-h-[34px] md:min-h-[46px] px-3 py-1.5 md:py-2 rounded-xl border border-border bg-popover text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal/50";

  return (
    <main id="main-content" className="bg-background" dir="rtl">
      <SEOHead
        title={LIFE_DISCOUNT_LP.title}
        description={LIFE_DISCOUNT_LP.description}
        canonical={LIFE_DISCOUNT_LP.path}
        keywords={["ביטוח חיים", "הנחה בביטוח חיים", "ביטוח חיים למשכנתא", "בדיקת ביטוח חיים"]}
        faqItems={lifeDiscountFaqs}
      />

      {/* Above the fold: logo, H1, one sentence, form, button */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={LIFE_DISCOUNT_LP.heroImage}
            alt=""
            className="w-full h-full object-cover object-[center_35%]"
            fetchPriority="high"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[hsl(210,20%,98%,0.88)] md:bg-gradient-to-l md:from-[hsl(210,20%,98%,0.96)] md:via-[hsl(210,20%,98%,0.9)] md:to-[hsl(210,20%,98%,0.55)]" />
        </div>

        <div className="relative container mx-auto px-3 md:px-4 pt-1.5 pb-2 md:py-10 max-w-xl md:max-w-lg">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-6 md:h-10 w-auto mb-1 md:mb-5" />

          <h1 className="font-heading text-[1.05rem] leading-[1.2] sm:text-xl md:text-4xl font-black text-primary mb-0.5 md:mb-3">
            יש לכם ביטוח חיים?
            <br />
            בדקו אם ההנחה שלכם זמנית — ומה אפשר לקבל היום.
          </h1>
          <p className="text-[12px] md:text-base text-foreground/80 mb-1.5 md:mb-5 leading-snug">
            בדיקה ללא עלות וללא התחייבות. נציג מליבה חוזר אליכם.
          </p>

          <form onSubmit={handleSubmit} className="space-y-1 md:space-y-3 bg-card/90 backdrop-blur-sm border border-border rounded-2xl p-2 md:p-5 shadow-sm">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <input
              type="text"
              placeholder="שם מלא *"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />

            <div className="grid grid-cols-5 gap-1.5 md:gap-3">
              <div className="col-span-3">
                <input
                  type="tel"
                  placeholder="טלפון נייד *"
                  required
                  value={form.phone}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^\d+\-\s]/g, "").slice(0, 15);
                    update("phone", cleaned);
                  }}
                  onBlur={() => {
                    if (form.phone && !isValidIsraeliMobile(form.phone)) setPhoneError(MOBILE_PHONE_ERROR);
                  }}
                  dir="ltr"
                  inputMode="tel"
                  maxLength={15}
                  autoComplete="tel"
                  aria-invalid={!!phoneError}
                  className={inputClass}
                />
                {phoneError && <p className="text-destructive text-[11px] mt-0.5 px-1">{phoneError}</p>}
              </div>
              <input
                type="number"
                placeholder="גיל *"
                required
                min={18}
                max={120}
                inputMode="numeric"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                className={`${inputClass} col-span-2`}
              />
            </div>

            <ChoiceRow
              label="יש לך היום ביטוח חיים?"
              options={LIFE_OPTIONS}
              value={form.hasLife}
              onChange={(v) => update("hasLife", v as LifeOption)}
            />
            <ChoiceRow
              label="יש לך משכנתא?"
              options={MORTGAGE_OPTIONS}
              value={form.hasMortgage}
              onChange={(v) => update("hasMortgage", v as MortgageOption)}
            />
            {choiceError && <p className="text-destructive text-[11px]">{choiceError}</p>}

            <label className="flex items-start gap-2 text-[11px] md:text-xs text-muted-foreground cursor-pointer leading-snug">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 rounded border-border shrink-0"
              />
              <span>
                קראתי את{" "}
                <Link to="/privacy-policy" className="underline hover:text-foreground">
                  מדיניות הפרטיות
                </Link>{" "}
                ואני מסכים/ה שתחזרו אליי לגבי הפנייה.
              </span>
            </label>

            <button
              type="submit"
              disabled={sending}
              className="w-full min-h-[42px] md:min-h-[52px] flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-full font-bold text-[15px] md:text-lg hover:opacity-90 transition-opacity shadow-md disabled:opacity-60"
            >
              {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {sending ? "שולח..." : "בדקו לי את האפשרויות"}
            </button>
          </form>

          <p className="text-[11px] md:text-xs text-muted-foreground text-center mt-1 md:mt-3">
            נחזור בשעות פעילות. בלי ספאם.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14 bg-background">
        <div className="container mx-auto max-w-2xl space-y-10 md:space-y-12">
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-black text-primary mb-3">למה לבדוק דווקא עכשיו</h2>
            <div className="space-y-3 text-sm md:text-base text-foreground/85 leading-relaxed">
              <p>
                רשות שוק ההון פרסמה טיוטה לשינוי כללי ההנחות בביטוחי חיים למקרה מוות. לפי הפרסומים, אם חברה נותנת הנחה — היא תידרש לשמור אותה לכל תקופת הפוליסה, ולא רק לכמה שנים בהתחלה.
              </p>
              <p className="font-semibold text-primary">
                חשוב: זו טיוטה. היא עדיין לא נכנסה לתוקף. אנחנו לא מציגים אותה כחוק שכבר חל.
              </p>
              <p>
                בינתיים השוק עדיין עובד במודל הישן: הנחות פתיחה לכמה שנים, ואחר כך המחיר יכול לקפוץ. לכן שווה לבדוק מה יש לכם היום, ולכמה זמן.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl md:text-2xl font-black text-primary mb-3">איך הנחות עובדות היום</h2>
            <ul className="space-y-2.5 text-sm md:text-base text-foreground/85 leading-relaxed">
              {[
                "חברות ביטוח מציעות לא פעם הנחה משמעותית בשנות ההצטרפות.",
                "ההנחה לרוב מוגבלת בזמן. אחרי שהיא נגמרת, התשלום עולה.",
                "בגיל מבוגר או אחרי שינוי בריאותי קשה יותר לעבור חברה.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm md:text-base text-foreground/85 leading-relaxed">
              אנחנו לא מבטיחים אחוז הנחה באתר. בודקים מול השוק לפי גיל, עישון, סכום כיסוי ומצב קיים — ומסבירים בשיחה מה אפשרי.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl md:text-2xl font-black text-primary mb-2">מה ליבה בודקת עבורכם</h2>
            <p className="text-sm md:text-base text-foreground/85 mb-4">
              ליבה ביטוח ופנסיוני — ליווי, לא «מבצע של חברה אחת».
            </p>
            <p className="text-sm font-semibold mb-2">בודקים:</p>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <span>ביטוח חיים למקרה מוות (ריסק) — הגנה על המשפחה</span>
              </li>
              <li className="flex items-start gap-3">
                <Home className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <span>ביטוח חיים ליד משכנתא — אם יש הלוואת דירה</span>
              </li>
              <li className="flex items-start gap-3">
                <Search className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <span>האם יש כפילות, חוסר, או הנחה שעומדת להיגמר</span>
              </li>
            </ul>
            <p className="mt-4 text-sm md:text-base text-foreground/85">
              לא מוכרים באתר פוליסה. קודם בדיקה, אחר כך המלצה אם רלוונטי. בלי לחץ.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl md:text-2xl font-black text-primary mb-4">איך זה עובד</h2>
            <ol className="grid gap-3">
              {[
                "משאירים פרטים בטופס",
                "נציג חוזר ומבין מה יש היום",
                "מקבלים תמונה ברורה: מה ההנחה, לכמה זמן, ומה אפשר לבדוק",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-heading font-bold flex items-center justify-center shrink-0 text-sm">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm md:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <FAQSection title="שאלות נפוצות" items={lifeDiscountFaqs} />

      <footer className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-3">
          <img src={logoLight} alt={`לוגו ${siteConfig.name}`} className="h-9 mx-auto opacity-80" loading="lazy" />
          <p className="text-primary-foreground/70 text-sm">
            {siteConfig.name} ·{" "}
            <a href={`tel:${siteConfig.phones[0].replace(/-/g, "")}`} className="hover:text-primary-foreground" dir="ltr">
              {siteConfig.phones[0]}
            </a>
          </p>
          <div className="flex items-center justify-center gap-4 text-primary-foreground/50 text-sm">
            <Link to="/privacy-policy" className="hover:text-primary-foreground/80">מדיניות פרטיות</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-primary-foreground/80">תנאי שימוש</Link>
          </div>
          <p className="text-primary-foreground/45 text-[11px] md:text-xs max-w-xl mx-auto leading-relaxed">
            המידע כללי ואינו ייעוץ אישי. הפרסום אינו מציג טיוטה רגולטורית כאילו נכנסה לתוקף. אין הבטחת הנחה באחוזים לפני בדיקה.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default LPLifeDiscountPage;
