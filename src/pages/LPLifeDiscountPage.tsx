import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Home, Loader2, MessageCircle, Phone, Search, Shield } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/data/siteConfig";
import {
  LIFE_DISCOUNT_LP,
  LIFE_DISCOUNT_SUBMITTED_KEY,
  LIFE_DISCOUNT_WEBHOOK_URL,
  lifeDiscountFaqs,
  lifeDiscountPhoneDisplay,
  lifeDiscountTelHref,
  lifeDiscountWhatsAppHref,
} from "@/data/lifeDiscountLp";
import { useToast } from "@/hooks/use-toast";
import { isValidIsraeliMobile, MOBILE_PHONE_ERROR } from "@/lib/validators/israeliPhone";
import { buildLifeDiscountPayload, parseOptionalAge } from "@/lib/lifeDiscountLead";
import { trackLead } from "@/lib/fbq";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import logo from "@/assets/logo-liba-sm.webp";
import logoLight from "@/assets/logo-liba-light-sm.webp";

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
const FORM_ID = "life-discount-form";

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

const scrollToForm = () => {
  document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ContactChoices = ({ compact = false }: { compact?: boolean }) => (
  <div className={`grid grid-cols-2 gap-2 ${compact ? "" : "pt-1"}`}>
    <a
      href={lifeDiscountWhatsAppHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-1.5 min-h-11 rounded-full border border-border bg-popover px-3 text-sm font-semibold text-foreground hover:border-brand-teal/50"
    >
      <MessageCircle className="w-4 h-4 text-brand-teal" aria-hidden="true" />
      וואטסאפ
    </a>
    <a
      href={lifeDiscountTelHref}
      className="inline-flex items-center justify-center gap-1.5 min-h-11 rounded-full border border-border bg-popover px-3 text-sm font-semibold text-foreground hover:border-brand-teal/50"
    >
      <Phone className="w-4 h-4 text-brand-teal" aria-hidden="true" />
      <span dir="ltr">{lifeDiscountPhoneDisplay}</span>
    </a>
  </div>
);

const StickyMobileCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(FORM_ID);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
        <a
          href={lifeDiscountTelHref}
          aria-label={`התקשרו ${lifeDiscountPhoneDisplay}`}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border"
        >
          <Phone className="w-4 h-4 text-brand-teal" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={scrollToForm}
          className="h-11 rounded-full bg-accent text-accent-foreground font-bold text-sm"
        >
          בדקו את ההנחה
        </button>
        <a
          href={lifeDiscountWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="וואטסאפ"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border"
        >
          <MessageCircle className="w-4 h-4 text-brand-teal" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

const LPLifeDiscountPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: LIFE_DISCOUNT_LP.campaign, funnelStep: "intro" });

  const navigate = useNavigate();
  const { toast } = useToast();
  const submitLock = useRef(false);
  const leadSent = useRef(false);
  const [sending, setSending] = useState(false);
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    website: "",
    consent: false,
  });

  useEffect(() => {
    collectAttribution();
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setShowHeroImage(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "phone" && phoneError) setPhoneError(null);
    if (key === "age" && ageError) setAgeError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitLock.current || sending) return;
    if (form.website) return;

    if (!isValidIsraeliMobile(form.phone)) {
      setPhoneError(MOBILE_PHONE_ERROR);
      return;
    }
    const ageResult = parseOptionalAge(form.age);
    if (ageResult.ok === false) {
      setAgeError(ageResult.error);
      return;
    }
    if (!form.consent) return;

    const payload = buildLifeDiscountPayload({
      name: form.name,
      phone: form.phone,
      age: ageResult.age,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      attribution: collectAttribution(),
    });

    submitLock.current = true;
    setSending(true);
    try {
      const { backupLead, postLeadWebhooks } = await import("@/lib/leadsBackup");
      await backupLead(LIFE_DISCOUNT_LP.source, payload);
      const delivery = await postLeadWebhooks(LIFE_DISCOUNT_WEBHOOK_URL, payload);
      if (!delivery.ok) throw new Error("lead delivery failed");
      if (!leadSent.current) {
        leadSent.current = true;
        try {
          trackLead(
            { ph: payload.lead_phone_number, fn: payload.lead_first_name, ln: payload.lead_last_name },
            [LIFE_DISCOUNT_LP.path, LIFE_DISCOUNT_LP.thankYouPath, LIFE_DISCOUNT_LP.campaign],
          );
        } catch (pixelError) {
          console.error("Lead pixel error:", pixelError);
        }
      }
      try {
        sessionStorage.setItem(LIFE_DISCOUNT_SUBMITTED_KEY, "1");
      } catch {
        /* thank-you still renders; pixel already fired once */
      }
      navigate(LIFE_DISCOUNT_LP.thankYouPath);
    } catch (error) {
      console.error("Webhook error:", error);
      if (!leadSent.current) {
        submitLock.current = false;
        toast({
          title: "שגיאה",
          description: "אירעה שגיאה בשליחת הטופס. אנא נסו שוב.",
          variant: "destructive",
        });
      }
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full min-h-12 px-3 py-2 rounded-xl border border-border bg-popover text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal/50";

  return (
    <main id="main-content" className="bg-background pb-24 md:pb-0" dir="rtl">
      <SEOHead
        title={LIFE_DISCOUNT_LP.title}
        description={LIFE_DISCOUNT_LP.description}
        canonical={LIFE_DISCOUNT_LP.path}
        keywords={["ביטוח חיים", "הנחה בביטוח חיים", "ביטוח חיים למשכנתא", "בדיקת ביטוח חיים"]}
        faqItems={lifeDiscountFaqs}
      />

      <section className="relative overflow-hidden bg-[hsl(210,20%,98%)]">
        {showHeroImage && (
          <div className="absolute inset-0 hidden md:block" aria-hidden="true">
            <img
              src={LIFE_DISCOUNT_LP.heroImage}
              alt=""
              width={960}
              height={640}
              className="w-full h-full object-cover object-[center_35%]"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[hsl(210,20%,98%,0.96)] via-[hsl(210,20%,98%,0.9)] to-[hsl(210,20%,98%,0.55)]" />
          </div>
        )}

        <div className="relative container mx-auto px-4 pt-3 pb-4 md:py-10 max-w-xl md:max-w-lg">
          <img
            src={logo}
            alt={`לוגו ${siteConfig.name}`}
            width={219}
            height={96}
            className="h-8 md:h-10 w-auto mb-2 md:mb-5"
            decoding="async"
          />

          {/* TODO(Or): אם מאושר תאריך דצמבר לכניסת הרפורמה — לעדכן את שורת הדחיפות.
              באתר מתועד רק שזו טיוטה של רשות שוק ההון שטרם נכנסה לתוקף, בלי חודש. */}
          {/* TODO(Or): מספר רישיון ושנות ניסיון לא מוצגים. הרישיון קיים כתמונה בתפריט
              (אסף בר און, רשות שוק ההון) בלי מספר בטקסט. "15+ שנות ניסיון" מופיע בדף הבית
              ובעמוד המשכנתא — לא לשכפל לכאן בלי אישור. */}
          <p className="text-[13px] md:text-sm font-bold text-brand-teal mb-1">
            לבני 40–65 · ביטוח חיים או משכנתא
          </p>
          <h1 className="font-heading text-[1.35rem] leading-[1.2] sm:text-2xl md:text-4xl font-black text-primary mb-1.5 md:mb-3">
            הנחת ביטוח החיים שלכם עלולה להיגמר
          </h1>
          <p className="text-sm md:text-base text-foreground/80 mb-2 md:mb-4 leading-snug">
            הנחת הפתיחה ניתנת לרוב רק לכמה שנים — ואז התשלום עולה. בדקו עכשיו, כל עוד הטיוטה של רשות שוק ההון עוד לא בתוקף.
          </p>
          <p className="text-[12px] md:text-xs text-foreground/70 mb-2 md:mb-4 leading-snug">
            רישיון סוכן ביטוח · רשות שוק ההון · ללא עלות וללא התחייבות
          </p>

          <form
            id={FORM_ID}
            onSubmit={handleSubmit}
            className="scroll-mt-3 space-y-2 md:space-y-3 bg-card border border-border rounded-2xl p-3 md:p-5 shadow-sm"
          >
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
              name="name"
              placeholder="שם מלא *"
              aria-label="שם מלא"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="טלפון נייד *"
                aria-label="טלפון נייד"
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
              {phoneError && <p className="text-destructive text-xs mt-1 px-1">{phoneError}</p>}
            </div>

            <div>
              <input
                type="text"
                name="age"
                placeholder="גיל (לא חובה)"
                aria-label="גיל, לא חובה"
                inputMode="numeric"
                value={form.age}
                onChange={(e) => update("age", e.target.value.replace(/\D/g, "").slice(0, 3))}
                aria-invalid={!!ageError}
                className={inputClass}
              />
              {ageError && <p className="text-destructive text-xs mt-1 px-1">{ageError}</p>}
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer leading-snug">
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
              className="w-full min-h-12 flex items-center justify-center gap-2 bg-accent text-accent-foreground rounded-full font-bold text-base hover:opacity-90 transition-opacity shadow-md disabled:opacity-60"
            >
              {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {sending ? "שולח..." : "בדקו את ההנחה שלי"}
            </button>

            <p className="text-xs text-muted-foreground text-center">או דברו איתנו ישירות</p>
            <ContactChoices compact />
          </form>

          <p className="text-xs text-muted-foreground text-center mt-2">
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
                "משאירים שם וטלפון בטופס",
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
          <img src={logoLight} alt={`לוגו ${siteConfig.name}`} width={219} height={96} className="h-9 mx-auto opacity-80" loading="lazy" decoding="async" />
          <p className="text-primary-foreground/70 text-sm">
            {siteConfig.name} ·{" "}
            <a href={lifeDiscountTelHref} className="hover:text-primary-foreground" dir="ltr">
              {lifeDiscountPhoneDisplay}
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

      <StickyMobileCta />
    </main>
  );
};

export default LPLifeDiscountPage;
