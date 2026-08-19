import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDown, Loader2, Lock, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import knessetArticle from "@/assets/knesset-duplicate-insurance.png";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";
import { backupLead, postLeadWebhooks } from "@/lib/leadsBackup";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const WEBHOOK_URLS = [
  "https://hook.eu2.make.com/81rtlujijnlwes3ean9qy8b1q4bdxbch",
  "https://hook.eu2.make.com/w5el6qmhgt9mlkc1ewc4gsehxwbus8bi",
];

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

const collectUtm = (): Record<string, string> => {
  const out: Record<string, string> = {};
  let params: URLSearchParams | null = null;
  try {
    params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  } catch {
    params = null;
  }
  UTM_KEYS.forEach((k) => {
    out[k] = params?.get(k) ?? "";
  });
  return out;
};

const TOTAL_STEPS = 8;

const STATUS_OPTIONS = ["נשוי", "רווק", "גרוש", "אלמן"];
const CHILDREN_OPTIONS = ["אין ילדים", "1", "2", "3+"];
const RAISE_OPTIONS = ["כן", "לא", "לא בטוח", "לא שמתי לב"];
const INSURANCE_OPTIONS = ["בריאות", "חיים", "משכנתא"];
const PAYMENT_OPTIONS = ["50-200", "200-400", "400-600", "600 ומעלה"];

interface Answers {
  age: string;
  fullName: string;
  status: string;
  children: string;
  paymentRaised: string;
  insuranceTypes: string[];
  monthlyPayment: string;
  phone: string;
}

const LPInsuranceCheckPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "insurance-check", funnelStep: "quiz" });

  const navigate = useNavigate();
  const { toast } = useToast();
  const formStartedAt = useRef(Date.now());
  const honeypot = useRef("");
  const questionsRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({
    age: "",
    fullName: "",
    status: "",
    children: "",
    paymentRaised: "",
    insuranceTypes: [],
    monthlyPayment: "",
    phone: "",
  });

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const scrollToQuiz = () => {
    questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleInsurance = (opt: string) =>
    setAnswers((prev) => ({
      ...prev,
      insuranceTypes: prev.insuranceTypes.includes(opt)
        ? prev.insuranceTypes.filter((t) => t !== opt)
        : [...prev.insuranceTypes, opt],
    }));

  const ageValid = /^\d{1,3}$/.test(answers.age) && Number(answers.age) >= 18 && Number(answers.age) <= 99;

  const handleSubmit = async () => {
    if (honeypot.current) return;
    if (Date.now() - formStartedAt.current < 3000) return;

    if (!isValidIsraeliPhone(answers.phone)) {
      setPhoneError("מספר טלפון לא תקין. אנא הזינו מספר ישראלי תקין (לדוגמה 050-1234567).");
      return;
    }

    const payload = {
      lead_full_name: answers.fullName.trim(),
      lead_phone_number: normalizeIsraeliPhone(answers.phone),
      lead_age: answers.age,
      lead_family_status: answers.status,
      lead_children_count: answers.children,
      lead_payment_increased: answers.paymentRaised,
      lead_insurance_types: answers.insuranceTypes.join(", "),
      lead_insurance_health: answers.insuranceTypes.includes("בריאות"),
      lead_insurance_life: answers.insuranceTypes.includes("חיים"),
      lead_insurance_mortgage: answers.insuranceTypes.includes("משכנתא"),
      lead_monthly_payment: answers.monthlyPayment,
      meta_source_page: "insurance-check",
      meta_campaign_type: "facebook-instagram",
      meta_locale: "he-IL",
      meta_page_url: typeof window !== "undefined" ? window.location.href : "",
      meta_submitted_at: new Date().toISOString(),
      ...collectUtm(),
    };

    setSending(true);
    try {
      backupLead("insurance-check", payload);
      await postLeadWebhooks(WEBHOOK_URLS, payload);
      navigate("/insurance-check/thankyou");
    } catch (error) {
      console.error("Webhook error:", error);
      toast({ title: "שגיאה", description: "אירעה שגיאה בשליחת הטופס. אנא נסו שוב.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const optionClass = (selected: boolean) =>
    `w-full text-right px-5 py-4 rounded-xl border transition-all text-base md:text-lg font-medium ${
      selected
        ? "border-accent bg-accent/10 text-foreground shadow-sm"
        : "border-border bg-card hover:border-accent/50 text-foreground/85"
    }`;

  return (
    <main className="min-h-screen bg-background flex flex-col" dir="rtl">
      <SEOHead
        title="בדיקת כפל ביטוחי — כמה אפשר להוזיל את הביטוח שלך?"
        description="שאלון קצר לבדיקה האם ניתן להוזיל את ביטוח הבריאות והחיים שלך ולמנוע כפל ביטוחי."
        canonical="/insurance-check"
        noindex
      />

      {/* Masthead — editorial */}
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-9 md:h-10 w-auto" />
        </div>
      </header>

      <div className="flex-1">
        <div className="container mx-auto px-4 max-w-3xl py-10 md:py-16">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-2">
              <span className="tracking-widest uppercase">שאלון בדיקה</span>
              <span>
                שלב {step} מתוך {TOTAL_STEPS}
              </span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.section
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {step === 1 && (
                <div>
                  <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-accent mb-4">
                    נתוני הכנסת
                  </p>
                  <h1 className="font-heading text-3xl md:text-5xl font-black leading-tight mb-3">
                    לפי נתונים שפורסמו בכנסת כ41% מהישראלים משלמים על כפל ביטוחי
                  </h1>
                  <figure className="mb-6 rounded-xl overflow-hidden border border-border bg-card">
                    <img
                      src={knessetArticle}
                      alt="כתבה מאתר חדשות הכנסת: נתוני כפל הביטוח נחשפים — 41% מהישראלים משלמים על ביטוח יתר וכפל ביטוחי"
                      className="w-full h-auto max-h-[38vh] md:max-h-[42vh] object-contain object-top"
                      loading="eager"
                    />
                  </figure>

                  <button
                    type="button"
                    onClick={scrollToQuiz}
                    className="group mx-auto mb-8 flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:shadow-accent/40"
                  >
                    מעבר לבדיקת הוזלה
                    <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
                  </button>

                  <div className="border-y border-border py-4 space-y-3 text-base md:text-lg text-foreground/90 leading-relaxed">
                    <p className="font-semibold text-foreground">כמעט כל ישראלי שני עלול לשלם יותר ממה שצריך על ביטוחים.</p>
                    <p>ענו על שאלון קצר וקבלו מיד תשובה האם גם אצלכם יש פוטנציאל להוזלה בביטוחי הבריאות והחיים ובכמה ניתן להוזיל (ללא התחייבות)</p>
                    <p>&nbsp;</p>
                  </div>

                  <div ref={questionsRef} className="mt-4 scroll-mt-28">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">מה הגיל שלך?</h2>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={18}
                      max={99}
                      value={answers.age}
                      onChange={(e) => set("age", e.target.value.replace(/[^\d]/g, "").slice(0, 3))}
                      placeholder="לדוגמה 42"
                      aria-label="הגיל שלך"
                      className="w-full md:w-56 px-5 py-4 rounded-xl border border-border bg-card text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6">מה השם המלא שלך?</h2>
                  <input
                    type="text"
                    value={answers.fullName}
                    onChange={(e) => set("fullName", e.target.value.slice(0, 60))}
                    placeholder="שם פרטי ושם משפחה"
                    aria-label="שם מלא"
                    className="w-full px-5 py-4 rounded-xl border border-border bg-card text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              )}

              {step === 3 && (
                <StepBlock title="מה הסטטוס המשפחתי שלך?">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        set("status", opt);
                        next();
                      }}
                      className={optionClass(answers.status === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </StepBlock>
              )}

              {step === 4 && (
                <StepBlock title="האם יש ילדים?">
                  {CHILDREN_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        set("children", opt);
                        next();
                      }}
                      className={optionClass(answers.children === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </StepBlock>
              )}

              {step === 5 && (
                <StepBlock title="האם התשלום החודשי עלה?">
                  {RAISE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        set("paymentRaised", opt);
                        next();
                      }}
                      className={optionClass(answers.paymentRaised === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </StepBlock>
              )}

              {step === 6 && (
                <StepBlock title="איזה ביטוחים יש לך?" subtitle="אפשר לבחור יותר מאפשרות אחת">
                  {INSURANCE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInsurance(opt)}
                      className={optionClass(answers.insuranceTypes.includes(opt))}
                    >
                      {opt}
                    </button>
                  ))}
                </StepBlock>
              )}

              {step === 7 && (
                <StepBlock title="מה התשלום החודשי על הביטוח?">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        set("monthlyPayment", opt);
                        next();
                      }}
                      className={optionClass(answers.monthlyPayment === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </StepBlock>
              )}

              {step === 8 && (
                <div>
                  <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6">מה המספר טלפון?</h2>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={answers.phone}
                    onChange={(e) => {
                      set("phone", e.target.value.replace(/[^\d+\-\s]/g, "").slice(0, 15));
                      if (phoneError) setPhoneError(null);
                    }}
                    placeholder="050-1234567"
                    aria-label="מספר טלפון"
                    className="w-full px-5 py-4 rounded-xl border border-border bg-card text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  {phoneError && <p className="text-destructive text-sm mt-2">{phoneError}</p>}

                  {/* honeypot */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    onChange={(e) => (honeypot.current = e.target.value)}
                    className="absolute opacity-0 w-0 h-0 -z-10 pointer-events-none"
                  />

                  <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    הפרטים נשמרים באופן מאובטח ומשמשים לבדיקה בלבד
                  </p>
                </div>
              )}
            </motion.section>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-foreground/80 hover:bg-muted transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                חזרה
              </button>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={next}
                disabled={!ageValid}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                מתחילים בבדיקה
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={next}
                disabled={answers.fullName.trim().length < 2}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                המשך
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}


            {step === 6 && (
              <button
                type="button"
                onClick={next}
                disabled={answers.insuranceTypes.length === 0}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                המשך
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {step === 8 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={sending || !answers.phone}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                {sending ? "שולח..." : "לצפייה בתוצאות"}
              </button>
            )}
          </div>
        </div>
      </div>

      <LPFooter />
    </main>
  );
};

const StepBlock = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="font-heading text-2xl md:text-4xl font-bold mb-2">{title}</h2>
    {subtitle && <p className="text-muted-foreground mb-6">{subtitle}</p>}
    <div className={`grid sm:grid-cols-2 gap-3 ${subtitle ? "" : "mt-6"}`}>{children}</div>
  </div>
);

export const LPFooter = () => (
  <footer className="border-t border-border bg-card/60 mt-auto">
    <div className="container mx-auto px-4 py-8 text-center space-y-3">
      <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <Link to="/privacy-policy" className="hover:text-foreground underline-offset-4 hover:underline">
          מדיניות פרטיות
        </Link>
        <Link to="/terms" className="hover:text-foreground underline-offset-4 hover:underline">
          תנאי שימוש
        </Link>
        <Link to="/accessibility" className="hover:text-foreground underline-offset-4 hover:underline">
          הצהרת נגישות
        </Link>
      </nav>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. כל הזכויות שמורות.
      </p>
    </div>
  </footer>
);

export default LPInsuranceCheckPage;
