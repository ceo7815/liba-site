import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, Shield, Lock, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import { useToast } from "@/hooks/use-toast";
import HealthKidsBrandHeader from "@/components/health-kids/HealthKidsBrandHeader";
import {
  HEALTH_KIDS_CAMPAIGNS,
  healthKidsNeedStorageKey,
  type HealthKidsCampaignId,
} from "@/data/healthKidsCampaigns";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";
import { isValidIsraeliId, normalizeIsraeliId } from "@/lib/validators/israeliId";
import { markLeadPending } from "@/lib/fbq";
import { backupLead, postLeadWebhooks } from "@/lib/leadsBackup";
import heroBg from "@/assets/hero-bg.jpg";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const NEED_OPTIONS = [
  "אבחון קשב וריכוז / דידקטי",
  "קלינאית תקשורת",
  "טיפול רגשי",
  "רכיבה / שחייה טיפולית",
  "הדרכת הורים",
  "אין משהו ספציפי / רוצה לבדוק",
];

const CHILDREN_OPTIONS = ["1", "2", "3", "4", "5+"];

const LPHealthKidsCampaignCheckPage = ({ campaignId }: { campaignId: HealthKidsCampaignId }) => {
  const campaign = HEALTH_KIDS_CAMPAIGNS[campaignId];
  useClarityPageTags({ pageType: "landing-page", lpCampaign: campaign.clarityCampaign, funnelStep: "check" });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [idError, setIdError] = useState<string | null>(null);
  const formStartedAt = useRef(Date.now());
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    idNumber: "",
    childrenCount: "",
    need: "",
    website: "",
    consent: false,
  });

  useEffect(() => {
    try {
      const savedNeed = sessionStorage.getItem(healthKidsNeedStorageKey(campaignId));
      if (savedNeed) {
        setFormData((prev) => ({ ...prev, need: savedNeed }));
      }
    } catch {
      /* ignore */
    }
  }, [campaignId]);

  const update = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handlePhoneChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d+\-\s]/g, "").slice(0, 15);
    update("phone", cleaned);
    if (phoneError) setPhoneError(null);
  };
  const handlePhoneBlur = () => {
    if (formData.phone && !isValidIsraeliPhone(formData.phone)) {
      setPhoneError("מספר טלפון לא תקין. אנא הזינו מספר ישראלי תקין (לדוגמה 050-1234567).");
    }
  };

  const handleIdChange = (raw: string) => {
    update("idNumber", normalizeIsraeliId(raw));
    if (idError) setIdError(null);
  };
  const handleIdBlur = () => {
    if (formData.idNumber && !isValidIsraeliId(formData.idNumber)) {
      setIdError("תעודת זהות אינה תקינה. אנא בדקו ונסו שוב.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return;
    if (Date.now() - formStartedAt.current < 3000) return;

    if (!isValidIsraeliPhone(formData.phone)) {
      setPhoneError("מספר טלפון לא תקין. אנא הזינו מספר ישראלי תקין (לדוגמה 050-1234567).");
      return;
    }
    if (!isValidIsraeliId(formData.idNumber)) {
      setIdError("תעודת זהות אינה תקינה. אנא בדקו ונסו שוב.");
      return;
    }

    const payload = {
      lead_full_name: formData.name.trim(),
      lead_phone_number: normalizeIsraeliPhone(formData.phone),
      lead_id_number: formData.idNumber.trim(),
      lead_children_count: formData.childrenCount,
      inquiry_need_type: formData.need?.trim() || "לא צוין",
      meta_source_page: campaign.backupSource,
      meta_campaign_type: "facebook-instagram",
      meta_marketing_consent: formData.consent,
      meta_locale: "he-IL",
      meta_submitted_at: new Date().toISOString(),
    };

    setSending(true);
    try {
      await backupLead(campaign.backupSource, payload);
      await postLeadWebhooks(campaign.webhookUrl, payload);
      setSubmitted(true);
      try { sessionStorage.removeItem(healthKidsNeedStorageKey(campaignId)); } catch { /* ignore */ }
      markLeadPending();
      setTimeout(() => navigate(`${campaign.basePath}/thank-you`), 500);
    } catch (error) {
      console.error("Webhook error:", error);
      toast({ title: "שגיאה", description: "אירעה שגיאה בשליחת הטופס. אנא נסו שוב.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-border bg-popover text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-base";
  const selectClass = "w-full px-4 py-3.5 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 text-base";

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-brand-teal mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">הבקשה נשלחה בהצלחה!</h2>
          <p className="text-muted-foreground">מעבירים אותך...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <SEOHead
        title="בדיקת זכאות — כתב שירות התפתחות הילד | ליבה ביטוח ופנסיוני"
        description="מלאו פרטים קצרים ונבדוק זכאות מלאה להחזרים על אבחונים וטיפולים לילדים."
        canonical={`${campaign.basePath}/check`}
        noindex
      />

      <section className="relative py-14 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-60 h-60 rounded-full border-2 border-dashed border-brand-teal/20 animate-spin-slow" />
          <div className="absolute bottom-[10%] right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-accent/15 to-transparent animate-float-slow blur-xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <HealthKidsBrandHeader campaign={campaign} className="mb-5" logoClassName="h-12 md:h-14" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-3 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            שלב 2 מתוך 2 — כמעט סיימנו
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-black text-primary-foreground mb-2">
            השאירו פרטים <span className="text-accent">לבדיקת הזכאות</span>
          </h1>
          <p className="text-primary-foreground/75">נחזור אליכם תוך מספר שעות עם תוצאות הבדיקה</p>

          <div className="mt-5 max-w-md mx-auto">
            <div className="h-1.5 rounded-full bg-primary-foreground/15 overflow-hidden">
              <motion.div initial={{ width: "50%" }} animate={{ width: "100%" }} transition={{ duration: 0.6 }} className="h-full bg-gradient-to-l from-accent to-brand-gold" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14 max-w-lg">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <input
            type="text"
            name="website"
            value={formData.website}
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
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
          />
          <div>
            <input
              type="tel"
              placeholder="טלפון *"
              required
              dir="ltr"
              inputMode="tel"
              maxLength={15}
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={handlePhoneBlur}
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error-hk-campaign" : undefined}
              className={inputClass}
            />
            {phoneError && (
              <p id="phone-error-hk-campaign" className="text-destructive text-xs mt-1 px-1">{phoneError}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="תעודת זהות *"
              required
              dir="ltr"
              inputMode="numeric"
              pattern="\d*"
              maxLength={9}
              value={formData.idNumber}
              onChange={(e) => handleIdChange(e.target.value)}
              onBlur={handleIdBlur}
              aria-invalid={!!idError}
              aria-describedby={idError ? "id-error-hk-campaign" : undefined}
              className={inputClass}
            />
            {idError && (
              <p id="id-error-hk-campaign" className="text-destructive text-xs mt-1 px-1">{idError}</p>
            )}
          </div>

          <select
            value={formData.childrenCount}
            onChange={(e) => update("childrenCount", e.target.value)}
            required
            className={selectClass}
          >
            <option value="">מספר ילדים *</option>
            {CHILDREN_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={formData.need}
            onChange={(e) => update("need", e.target.value)}
            className={selectClass}
          >
            <option value="">מה הצורך? (לא חובה)</option>
            {NEED_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          <label className="flex items-start gap-3 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-0.5 rounded border-border"
            />
            <span>
              אני מאשר/ת קבלת עדכונים והצעות שיווקיות מ״{siteConfig.name}״ בדוא״ל/טלפון. ידוע לי שניתן לבטל בכל עת.
              קראתי ואני מסכים/ה ל
              <Link to="/privacy-policy" className="underline hover:text-foreground">מדיניות הפרטיות</Link>
              {" "}ול
              <Link to="/terms" className="underline hover:text-foreground">תנאי השימוש</Link>.
            </span>
          </label>

          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg animate-pulse-glow disabled:opacity-60"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {sending ? "שולח..." : "בדקו את הזכאות שלי"}
          </button>
        </motion.form>

        <div className="flex items-center justify-center gap-6 mt-6 text-muted-foreground text-xs">
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-brand-teal" /> בדיקה חינמית</span>
          <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-brand-teal" /> ללא התחייבות</span>
          <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-brand-teal" /> מאובטח</span>
        </div>

        <p className="text-[10px] text-muted-foreground/60 text-center mt-4">
          המידע באתר כללי ואינו מהווה ייעוץ אישי. התאמה נעשית לאחר בדיקה.
        </p>
      </div>

      <footer className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-4">
          <HealthKidsBrandHeader campaign={campaign} className="opacity-90" logoClassName="h-10" />
          <div className="flex items-center justify-center gap-4 text-primary-foreground/50 text-sm">
            <Link to="/privacy-policy" className="hover:text-primary-foreground/80 transition-colors">מדיניות פרטיות</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-primary-foreground/80 transition-colors">תנאי שימוש</Link>
            <span>|</span>
            <Link to="/accessibility" className="hover:text-primary-foreground/80 transition-colors">הצהרת נגישות</Link>
          </div>
          <p className="text-primary-foreground/40 text-xs">© {new Date().getFullYear()} {siteConfig.name}. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </main>
  );
};

export default LPHealthKidsCampaignCheckPage;
