import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, Shield, Lock, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig, statusOptions } from "@/data/siteConfig";
import { useToast } from "@/hooks/use-toast";
import { isValidIsraeliId, normalizeIsraeliId } from "@/lib/validators/israeliId";
import { isValidIsraeliMobile, MOBILE_PHONE_ERROR, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";
import { markLeadPending } from "@/lib/fbq";
import { backupLead, postLeadWebhooks } from "@/lib/leadsBackup";
import logo from "@/assets/logo-light.png";
import heroBg from "@/assets/hero-bg.jpg";

import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import { PHONE_OTP_ENABLED, usePhoneOtp } from "@/hooks/usePhoneOtp";

const WEBHOOK_URL = "https://hook.eu2.make.com/s4lcejgbe7mk90dkuwtughehok7x972c";

const ageGroups = ["18-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60", "60+"];
const paymentRanges = ["200-400 ₪", "400-600 ₪", "600-800 ₪", "800-1,000 ₪", "1,000-1,200 ₪", "1,200-1,400 ₪", "1,400+ ₪", "לא יודע/ת"];
const mortgageDateRanges = ["שנה עד 3 שנים", "3 עד 5 שנים", "5 עד 10 שנים", "מעל 10 שנים"];

const LPGovBenefitsCheckPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "government-benefits", funnelStep: "check" });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [idError, setIdError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const formStartedAt = useRef(Date.now());
  const navigate = useNavigate();
  const { toast } = useToast();
  const { confirmPhone, otpDialog } = usePhoneOtp();

  const [formData, setFormData] = useState({
    name: "", phone: "", idNumber: "", ageGroup: "", birthDate: "",
    status: "", mortgageDateRange: "", monthlyPayment: "", website: "", consent: false,
  });

  const update = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleIdChange = (raw: string) => {
    update("idNumber", normalizeIsraeliId(raw));
    if (idError) setIdError(null);
  };
  const handleIdBlur = () => {
    if (formData.idNumber && !isValidIsraeliId(formData.idNumber)) {
      setIdError("תעודת זהות אינה תקינה. אנא בדקו ונסו שוב.");
    }
  };

  const handlePhoneChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d+\-\s]/g, "").slice(0, 15);
    update("phone", cleaned);
    if (phoneError) setPhoneError(null);
  };
  const handlePhoneBlur = () => {
    if (formData.phone && !isValidIsraeliMobile(formData.phone)) {
      setPhoneError(MOBILE_PHONE_ERROR);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return;
    if (Date.now() - formStartedAt.current < 3000) return;
    if (!isValidIsraeliMobile(formData.phone)) {
      setPhoneError(MOBILE_PHONE_ERROR);
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
      lead_age_group: formData.ageGroup,
      lead_birth_date: formData.birthDate,
      lead_marital_status: formData.status,
      inquiry_mortgage_period: formData.mortgageDateRange,
      inquiry_monthly_payment: formData.monthlyPayment,
      meta_source_page: "lp-government-benefits",
      meta_campaign_type: "facebook-instagram",
      meta_marketing_consent: formData.consent,
      meta_locale: "he-IL",
      meta_submitted_at: new Date().toISOString(),
    };

    setSending(true);
    try {
      const verified = await confirmPhone(formData.phone);
      if (!verified) return;
      const verifiedPayload = { ...payload, meta_phone_otp_verified: PHONE_OTP_ENABLED };
      await backupLead("lp-government-benefits", verifiedPayload);
      await postLeadWebhooks(WEBHOOK_URL, verifiedPayload);
      setSubmitted(true);
      markLeadPending();
      setTimeout(() => navigate("/lp/government-benefits/thank-you"), 500);
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
        title="בדיקת זכאות להטבות ביטוח משכנתא | ליבה ביטוח ופנסיוני"
        description="מלאו את הפרטים ונבדוק אם אתם זכאים להטבות חסרות תקדים בביטוח משכנתא. בדיקה חינמית וללא התחייבות."
        canonical="/lp/government-benefits/check"
        noindex
      />

      {/* Hero header */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="בדיקת זכאות להטבות ביטוח" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-60 h-60 rounded-full border-2 border-dashed border-brand-teal/20 animate-spin-slow" />
          <div className="absolute bottom-[10%] right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-accent/15 to-transparent animate-float-slow blur-xl" />
          <div className="absolute top-[40%] right-[3%] w-24 h-24 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary-foreground) / 0.3) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-12 md:h-16 mx-auto mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-4 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            בדיקת זכאות
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-black text-primary-foreground mb-3">
            בדיקה תוך <span className="text-accent">60 שניות</span>
          </h1>
          <p className="text-primary-foreground/70">מלאו את הפרטים ונבדוק אם אתם זכאים להטבות</p>
        </div>
      </section>

      {/* Form */}
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-lg">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <input type="text" name="website" value={formData.website} onChange={(e) => update("website", e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <input type="text" placeholder="שם מלא *" required value={formData.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
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
              aria-describedby={phoneError ? "phone-error-gov" : undefined}
              className={inputClass}
            />
            {phoneError && (
              <p id="phone-error-gov" className="text-destructive text-xs mt-1 px-1">{phoneError}</p>
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
              aria-describedby={idError ? "id-error-gov" : undefined}
              className={inputClass}
            />
            {idError && (
              <p id="id-error-gov" className="text-destructive text-xs mt-1 px-1">{idError}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select value={formData.ageGroup} onChange={(e) => update("ageGroup", e.target.value)} required className={selectClass}>
              <option value="">קבוצת גיל *</option>
              {ageGroups.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <div className="relative">
              <label className="absolute -top-2.5 right-3 bg-popover px-1 text-xs text-muted-foreground">תאריך לידה *</label>
              <input type="date" required value={formData.birthDate} onChange={(e) => update("birthDate", e.target.value)} className={inputClass} />
            </div>
          </div>

          <select value={formData.status} onChange={(e) => update("status", e.target.value)} required className={selectClass}>
            <option value="">סטטוס משפחתי *</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <select value={formData.mortgageDateRange} onChange={(e) => update("mortgageDateRange", e.target.value)} required className={selectClass}>
            <option value="">מתי נלקחה המשכנתא? *</option>
            {mortgageDateRanges.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <select value={formData.monthlyPayment} onChange={(e) => update("monthlyPayment", e.target.value)} required className={selectClass}>
            <option value="">כמה אתה משלם על ביטוח משכנתא בחודש? *</option>
            {paymentRanges.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <label className="flex items-start gap-3 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={formData.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-0.5 rounded border-border" />
            <span>
              אני מאשר/ת קבלת עדכונים והצעות שיווקיות מ״{siteConfig.name}״ בדוא״ל/טלפון. ידוע לי שניתן לבטל בכל עת.
              קראתי ואני מסכים/ה ל<Link to="/privacy-policy" className="underline hover:text-foreground">מדיניות הפרטיות</Link> ול<Link to="/terms" className="underline hover:text-foreground">תנאי השימוש</Link>.
            </span>
          </label>

          <button type="submit" disabled={sending}
            className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg animate-pulse-glow disabled:opacity-60">
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {sending ? "שולח..." : "בדוק זכאות עכשיו"}
          </button>
        </motion.form>

        <div className="flex items-center justify-center gap-6 mt-6 text-muted-foreground text-xs">
          <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-brand-teal" /> ללא עלות</span>
          <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-brand-teal" /> ללא התחייבות</span>
          <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-brand-teal" /> מאובטח</span>
        </div>

        <p className="text-[10px] text-muted-foreground/60 text-center mt-4">
          הטבות ותנאים משתנים בהתאם לשוק ולנתונים האישיים. התאמה נעשית לאחר בדיקה.
        </p>
      </div>

      {/* Footer */}
      <footer className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-4">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-10 mx-auto opacity-70" loading="lazy" />
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
      {otpDialog}
    </main>
  );
};

export default LPGovBenefitsCheckPage;
