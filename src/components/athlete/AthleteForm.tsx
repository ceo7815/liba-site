import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Send } from "lucide-react";
import { isValidIsraeliMobile, MOBILE_PHONE_ERROR, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";
import { captureUtmFromUrl, getStoredUtm } from "@/lib/utm";
import { useToast } from "@/hooks/use-toast";
import { markLeadPending } from "@/lib/fbq";
import { backupLead, postLeadWebhooks } from "@/lib/leadsBackup";
import { usePhoneOtp } from "@/hooks/usePhoneOtp";

export const ATHLETE_WEBHOOK_URL = "https://hook.eu2.make.com/xiuzt4eufe8bru8k070xtkye4na21w38";

const SPORT_OPTIONS = [
  "חדר כושר / אימוני כוח",
  "קרוספיט / פונקציונלי",
  "ריצה",
  "רכיבה",
  "כדורגל / כדורסל / טניס",
  "אומנויות לחימה",
  "ספורט תחרותי",
  "בני נוער שמתאמנים ברצינות",
  "מאמן / מדריך / איש תנועה",
  "אחר",
];

interface AthleteFormProps {
  variant?: "default" | "compact";
  formId?: string;
}

// Simple per-browser rate limit: max 3 submissions / 10 minutes
const RL_KEY = "athlete_form_submissions";
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 3;

const checkRateLimit = (): boolean => {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RL_KEY);
    const arr: number[] = raw ? JSON.parse(raw) : [];
    const recent = arr.filter((t) => now - t < RL_WINDOW_MS);
    if (recent.length >= RL_MAX) return false;
    recent.push(now);
    localStorage.setItem(RL_KEY, JSON.stringify(recent));
    return true;
  } catch {
    return true;
  }
};

const AthleteForm = ({ variant = "default", formId = "athlete-form" }: AthleteFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { confirmPhone, otpDialog } = usePhoneOtp();
  const formStartedAt = useRef(Date.now());
  const [sending, setSending] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [data, setData] = useState({
    fullName: "",
    phone: "",
    age: "",
    sportType: "",
    website: "", // honeypot
  });

  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  const update = (field: string, value: string) => {
    setData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handlePhoneChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d+\-\s]/g, "").slice(0, 15);
    update("phone", cleaned);
    if (phoneError) setPhoneError(null);
  };

  const handlePhoneBlur = () => {
    if (data.phone && !isValidIsraeliMobile(data.phone)) {
      setPhoneError(MOBILE_PHONE_ERROR);
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    const name = data.fullName.trim();
    if (!name || name.length < 2) e.fullName = "צריך למלא שם מלא כדי שנדע למי לחזור.";
    if (!/[א-תA-Za-z]/.test(name)) e.fullName = "השם חייב להכיל אותיות בלבד.";

    if (!isValidIsraeliMobile(data.phone)) {
      setPhoneError(MOBILE_PHONE_ERROR);
      e.phone = "phone";
    }
    const ageNum = parseInt(data.age, 10);
    if (!data.age || isNaN(ageNum) || ageNum < 10 || ageNum > 99) {
      e.age = "צריך גיל תקין (10-99) כדי לבדוק התאמה.";
    }
    if (!data.sportType) e.sportType = "בחר את סוג הפעילות המרכזי שלך.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (data.website) return; // honeypot tripped
    if (Date.now() - formStartedAt.current < 3000) return; // time trap
    if (!validate()) return;

    const utm = getStoredUtm();
    const payload = {
      lead_full_name: data.fullName.trim(),
      lead_phone_number: normalizeIsraeliPhone(data.phone),
      lead_age: parseInt(data.age, 10),
      lead_sport_type: data.sportType,
      utm_source: utm.utm_source || "",
      utm_medium: utm.utm_medium || "",
      utm_campaign: utm.utm_campaign || "",
      utm_ad: utm.utm_ad || "",
      utm_adset: utm.utm_adset || "",
      utm_placement: utm.utm_placement || "",
      meta_source_page: "/athlete-pack",
      meta_landing_page: "https://liba-fs.co.il/athlete-pack",
      meta_thank_you_page: "https://liba-fs.co.il/athlete-thankyou",
      meta_locale: "he-IL",
      meta_submitted_at: new Date().toISOString(),
    };

    setSending(true);
    try {
      const otp = await confirmPhone(data.phone);
      if (!otp.ok) return;
      if (!checkRateLimit()) {
        toast({
          title: "יותר מדי ניסיונות",
          description: "נסה שוב בעוד מספר דקות.",
          variant: "destructive",
        });
        return;
      }
      const verifiedPayload = { ...payload, meta_phone_otp_verified: otp.verified };
      await backupLead("athlete-pack", verifiedPayload);
      await postLeadWebhooks(ATHLETE_WEBHOOK_URL, verifiedPayload);
      markLeadPending();
      navigate("/athlete-thankyou");
    } catch (err) {
      console.error("ATHLETE webhook error:", err);
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אירעה שגיאה. אנא נסו שוב בעוד רגע.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <form id={formId} onSubmit={handleSubmit} className="space-y-3" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={data.website}
        onChange={(e) => update("website", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor={`${formId}-name`} className="sr-only">שם מלא</label>
        <input
          id={`${formId}-name`}
          type="text"
          placeholder="שם מלא *"
          required
          maxLength={60}
          value={data.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className="athlete-input"
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && <p className="text-[hsl(var(--athlete-accent-glow))] text-xs mt-1 px-1">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className="sr-only">טלפון</label>
        <input
          id={`${formId}-phone`}
          type="tel"
          dir="ltr"
          placeholder="טלפון *"
          required
          inputMode="tel"
          maxLength={15}
          autoComplete="tel"
          pattern="[0-9+\-\s]{9,15}"
          value={data.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={handlePhoneBlur}
          className="athlete-input"
          aria-invalid={!!phoneError}
        />
        {phoneError && <p className="text-[hsl(var(--athlete-accent-glow))] text-xs mt-1 px-1">{phoneError}</p>}
      </div>

      <div className={variant === "compact" ? "" : "grid grid-cols-1 md:grid-cols-2 gap-3"}>
        <div>
          <label htmlFor={`${formId}-age`} className="sr-only">גיל</label>
          <input
            id={`${formId}-age`}
            type="number"
            inputMode="numeric"
            min={10}
            max={99}
            placeholder="גיל *"
            required
            value={data.age}
            onChange={(e) => update("age", e.target.value.replace(/\D/g, "").slice(0, 2))}
            className="athlete-input"
            aria-invalid={!!errors.age}
          />
          {errors.age && <p className="text-[hsl(var(--athlete-accent-glow))] text-xs mt-1 px-1">{errors.age}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-sport`} className="sr-only">סוג ספורט</label>
          <select
            id={`${formId}-sport`}
            required
            value={data.sportType}
            onChange={(e) => update("sportType", e.target.value)}
            className="athlete-input"
            aria-invalid={!!errors.sportType}
          >
            <option value="">באיזה ספורט אתה פעיל? *</option>
            {SPORT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.sportType && <p className="text-[hsl(var(--athlete-accent-glow))] text-xs mt-1 px-1">{errors.sportType}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="athlete-cta-gradient w-full flex items-center justify-center gap-2 text-base md:text-lg disabled:opacity-60"
      >
        {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        {sending ? "שולח את הפרטים..." : "בדוק התאמה עכשיו"}
      </button>

      <p className="text-[11px] text-[hsl(var(--athlete-muted))] text-center leading-relaxed">
        השארת פרטים אינה מחייבת רכישה. הבדיקה כפופה להתאמה אישית ותנאי הפוליסה.
      </p>
    </form>
    {otpDialog}
    </>
  );
};

export default AthleteForm;
