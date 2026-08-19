import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Dumbbell, Activity, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { trackLead } from "@/lib/fbq";
import { trackClarityEvent, setClarityTag } from "@/lib/clarity";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const LPAthleteThankYouPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "athlete", funnelStep: "thank-you" });

  // Lead conversion event — ONLY on this page, ONLY when pathname matches.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/athlete-thankyou") {
      trackLead();
      setClarityTag("lead_campaign", "athlete");
      trackClarityEvent("lead_submitted");
    }
  }, []);

  return (
    <main className="athlete-scope min-h-screen flex flex-col" dir="rtl">
      <SEOHead
        title="הפרטים התקבלו | LIBA-ATHLETE"
        description="תודה שהשארת פרטים לבדיקת התאמה ל־LIBA-ATHLETE."
        canonical="/athlete-thankyou"
        noindex
      />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 athlete-grid-bg opacity-30" aria-hidden="true" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] athlete-glow-orange opacity-60" aria-hidden="true" />

        <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[hsl(var(--athlete-accent)/0.15)] border border-[hsl(var(--athlete-accent)/0.5)] text-[hsl(var(--athlete-accent-glow))] mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-black leading-tight mb-4">
              הפרטים התקבלו.<br />
              <span className="text-[hsl(var(--athlete-accent))]">עכשיו בודקים אם LIBA-ATHLETE מתאים לך.</span>
            </h1>
            <p className="text-[hsl(var(--athlete-muted))] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              השארת הפרטים היא הצעד הראשון לבדוק אם ההגנה הביטוחית שלך באמת מתאימה לאורח החיים הספורטיבי שלך.
            </p>
            <p className="text-[hsl(var(--athlete-text))] mt-4 max-w-2xl mx-auto">
              נציג מטעמנו יחזור אליך כדי להבין את סוג הפעילות שלך, תדירות האימונים, הגיל והכיסויים הקיימים — ולבדוק התאמה ראשונית לחבילת LIBA-ATHLETE.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl pb-12">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Activity, t: "נבדוק את סוג הפעילות שלך" },
            { icon: ShieldCheck, t: "נבין מה כבר קיים לך היום" },
            { icon: Dumbbell, t: "נראה אם יש פערים שכדאי לטפל בהם" },
          ].map(({ icon: Icon, t }, i) => (
            <div key={i} className="athlete-card p-6 text-center">
              <Icon className="w-8 h-8 text-[hsl(var(--athlete-accent))] mx-auto mb-3" />
              <p className="font-semibold">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl pb-16">
        <div className="athlete-card p-6 md:p-8">
          <h2 className="font-heading text-xl md:text-2xl font-extrabold mb-4">
            כדי שהשיחה תהיה מדויקת יותר, כדאי להכין מראש:
          </h2>
          <ul className="space-y-2 text-[hsl(var(--athlete-text))]">
            {[
              "גיל ותדירות אימונים",
              "סוג הספורט המרכזי שלך",
              "האם יש לך כיום ביטוח בריאות / תאונות / אובדן כושר",
              "האם היו פציעות משמעותיות בעבר",
              "מה הכי חשוב לך להגן עליו: עבודה, שגרה, הכנסה, משפחה או שיקום",
            ].map((it) => (
              <li key={it} className="flex gap-2">
                <span className="text-[hsl(var(--athlete-accent))] font-bold mt-0.5">•</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-10">
          <Link to="/athlete-pack" className="athlete-cta-ghost inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            חזרה לדף LIBA-ATHLETE
          </Link>
        </div>
      </section>

      <footer className="mt-auto border-t border-[hsl(var(--athlete-border))]">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-[hsl(var(--athlete-muted))] space-y-3">
          <p className="text-xs leading-relaxed max-w-3xl mx-auto">
            המידע באתר אינו מהווה ייעוץ ביטוחי אישי או התחייבות לכיסוי. הכיסויים כפופים לתנאי הפוליסה, הצהרת בריאות, חיתום והתאמה אישית.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/privacy-policy" className="hover:text-[hsl(var(--athlete-text))]">מדיניות פרטיות</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-[hsl(var(--athlete-text))]">תנאי שימוש</Link>
            <span>|</span>
            <Link to="/accessibility" className="hover:text-[hsl(var(--athlete-text))]">הצהרת נגישות</Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LPAthleteThankYouPage;
