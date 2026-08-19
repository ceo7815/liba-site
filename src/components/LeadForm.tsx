import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { siteConfig, statusOptions, timeOptions, topicOptions, purposeOptions, servicesMenu } from "@/data/siteConfig";
import { useToast } from "@/hooks/use-toast";
import { isValidIsraeliPhone, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";
import { markLeadPending } from "@/lib/fbq";
import { backupLead, postLeadWebhooks } from "@/lib/leadsBackup";

// Flatten all services from servicesMenu for the dropdown
const allServices = servicesMenu.flatMap((group) =>
  group.items.map((item) => item.label)
);

interface LeadFormProps {
  source: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  showTopic?: boolean;
  showPurpose?: boolean;
  showMessage?: boolean;
  lightTitle?: boolean;
}

const WEBHOOK_URL = "https://hook.eu2.make.com/70ude7z5k7ri14i775jow4u1yomfdk4o";

const LeadForm = ({
  source,
  title = "רוצים שנעשה לכם סדר?",
  subtitle = "השאירו פרטים לשיחת היכרות קצרה — כדי להבין מה יש היום ומה כדאי לבדוק.",
  compact = false,
  showTopic = false,
  showPurpose = false,
  showMessage = false,
  lightTitle = false,
}: LeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const formStartedAt = useRef(Date.now());
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    status: "",
    children: "",
    serviceArea: "",
    topic: "",
    purpose: "",
    time: "",
    message: "",
    website: "", // honeypot
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) return;

    // Timing trap
    if (Date.now() - formStartedAt.current < 3000) return;

    if (!isValidIsraeliPhone(formData.phone)) {
      setPhoneError("מספר טלפון לא תקין. אנא הזינו מספר ישראלי תקין (לדוגמה 050-1234567).");
      return;
    }

    const payload = {
      lead_full_name: formData.name.trim(),
      lead_phone_number: normalizeIsraeliPhone(formData.phone),
      lead_age: formData.age ? Number(formData.age) : null,
      lead_marital_status: formData.status,
      lead_children_status: formData.children,
      inquiry_service_area: formData.serviceArea || "",
      inquiry_purpose: formData.purpose || "",
      inquiry_preferred_callback_time: formData.time || "",
      inquiry_message: formData.message.trim() || "",
      meta_source_page: source,
      meta_marketing_consent: formData.consent,
      meta_locale: "he-IL",
      meta_submitted_at: new Date().toISOString(),
    };

    setSending(true);

    try {
      backupLead(source, payload);
      await postLeadWebhooks(WEBHOOK_URL, payload);

      setSubmitted(true);
      markLeadPending();
      setTimeout(() => navigate("/thank-you"), 500);
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

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "phone" && phoneError) setPhoneError(null);
  };

  const handlePhoneChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d+\-\s]/g, "").slice(0, 15);
    update("phone", cleaned);
  };
  const handlePhoneBlur = () => {
    if (formData.phone && !isValidIsraeliPhone(formData.phone)) {
      setPhoneError("מספר טלפון לא תקין. אנא הזינו מספר ישראלי תקין (לדוגמה 050-1234567).");
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold mb-2">הבקשה נשלחה בהצלחה!</h3>
        <p className="text-muted-foreground">נחזור אליכם בהקדם לתיאום שיחה.</p>
      </motion.div>
    );
  }

  return (
    <div className={compact ? "" : "max-w-xl mx-auto"}>
      {title && <h2 className={`font-heading text-2xl md:text-3xl font-bold mb-2 text-center ${lightTitle ? 'text-primary-foreground' : ''}`}>{title}</h2>}
      {subtitle && <p className={`text-center mb-8 ${lightTitle ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <input type="text" name="website" value={formData.website} onChange={(e) => update("website", e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
          <input type="text" placeholder="שם מלא *" required value={formData.name} onChange={(e) => update("name", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" />
          <div>
            <input type="tel" placeholder="טלפון *" required value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={handlePhoneBlur}
              dir="ltr" inputMode="tel" maxLength={15} autoComplete="tel"
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error-lead" : undefined}
              className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" />
            {phoneError && (
              <p id="phone-error-lead" className="text-destructive text-xs mt-1 px-1">{phoneError}</p>
            )}
          </div>
        </div>

        <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"} gap-4`}>
          <input type="number" placeholder="גיל *" required min={18} max={120} value={formData.age} onChange={(e) => update("age", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50" />
          <select value={formData.status} onChange={(e) => update("status", e.target.value)} required
            className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
            <option value="">סטטוס *</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={formData.children} onChange={(e) => update("children", e.target.value)} required
            className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
            <option value="">ילדים? *</option>
            <option value="כן">כן</option>
            <option value="לא">לא</option>
          </select>
        </div>

        {/* Service Area - always shown */}
        <select value={formData.serviceArea} onChange={(e) => update("serviceArea", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
          <option value="">באיזה תחום מעוניינים?</option>
          {allServices.map((s) => <option key={s} value={s}>{s}</option>)}
          <option value="כללי / לא בטוח">כללי / לא בטוח</option>
        </select>


        {showPurpose && (
          <select value={formData.purpose} onChange={(e) => update("purpose", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
            <option value="">מה מטרת הפנייה?</option>
            {purposeOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        )}

        <select value={formData.time} onChange={(e) => update("time", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50">
          <option value="">זמן נוח לחזרה</option>
          {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        {showMessage && (
          <textarea placeholder="הודעה קצרה (רשות)" value={formData.message} onChange={(e) => update("message", e.target.value)} rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border bg-popover text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
        )}

        {/* Consent */}
        <label className="flex items-start gap-3 text-xs text-muted-foreground cursor-pointer">
          <input type="checkbox" checked={formData.consent} onChange={(e) => update("consent", e.target.checked)}
            className="mt-0.5 rounded border-border" />
          <span>
            אני מאשר/ת קבלת עדכונים והצעות שיווקיות מ״{siteConfig.name}״ בדוא״ל/טלפון. ידוע לי שניתן לבטל בכל עת.
            קראתי ואני מסכים/ה ל<Link to="/privacy-policy" className="underline hover:text-foreground">מדיניות הפרטיות</Link> ול<Link to="/terms" className="underline hover:text-foreground">תנאי השימוש</Link>.
          </span>
        </label>

        <button type="submit" disabled={sending}
          className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60">
          {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {sending ? "שולח..." : "שלחו בקשה לשיחה"}
        </button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-4">אנחנו חוזרים רק לגבי הפנייה שלכם. בלי ספאם.</p>
      <p className="text-[10px] text-muted-foreground/60 text-center mt-1">המידע באתר כללי ואינו מהווה ייעוץ אישי. התאמה נעשית לאחר בדיקה.</p>
    </div>
  );
};

export default LeadForm;
