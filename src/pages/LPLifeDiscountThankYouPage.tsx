import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import {
  LIFE_DISCOUNT_LP,
  LIFE_DISCOUNT_SUBMITTED_KEY,
  lifeDiscountPhoneDisplay,
  lifeDiscountTelHref,
  lifeDiscountWhatsAppHref,
} from "@/data/lifeDiscountLp";
import { trackClarityEvent, setClarityTag } from "@/lib/clarity";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import logo from "@/assets/logo-liba-sm.webp";
import logoLight from "@/assets/logo-liba-light-sm.webp";

const CLARITY_FIRED_KEY = "liba_life_discount_clarity_fired";

const LPLifeDiscountThankYouPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: LIFE_DISCOUNT_LP.campaign, funnelStep: "thank-you" });

  useEffect(() => {
    // Lead pixel fires once in the form, only after delivery. Do not fire it here.
    try {
      if (sessionStorage.getItem(LIFE_DISCOUNT_SUBMITTED_KEY) !== "1") return;
      if (sessionStorage.getItem(CLARITY_FIRED_KEY) === "1") return;
      sessionStorage.setItem(CLARITY_FIRED_KEY, "1");
    } catch {
      return;
    }
    setClarityTag("lead_campaign", LIFE_DISCOUNT_LP.campaign);
    trackClarityEvent("lead_submitted");
  }, []);

  return (
    <main id="main-content" className="min-h-screen bg-background flex flex-col" dir="rtl">
      <SEOHead
        title="קיבלנו את הפרטים | ליבה ביטוח ופנסיוני"
        description="קיבלנו את הפרטים. נציג מליבה יחזור כדי לבדוק אילו אפשרויות רלוונטיות."
        canonical={LIFE_DISCOUNT_LP.thankYouPath}
        noindex
      />

      <header className="border-b border-border bg-card/70">
        <div className="container mx-auto px-4 h-14 flex items-center justify-center">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-8 w-auto" />
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-14 md:py-20 max-w-lg text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-teal/15 text-brand-teal mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-black text-primary mb-4">
            קיבלנו את הפרטים.
          </h1>
          <p className="text-foreground/80 text-base md:text-lg mb-8 leading-relaxed">
            נציג מליבה יחזור כדי לבדוק אילו אפשרויות רלוונטיות.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href={lifeDiscountWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full border border-border bg-card font-semibold text-sm hover:border-brand-teal/40 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-brand-teal" />
            וואטסאפ
          </a>
          <a
            href={lifeDiscountTelHref}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full border border-border bg-card font-semibold text-sm hover:border-brand-teal/40 transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-teal" />
            התקשרו · <span dir="ltr">{lifeDiscountPhoneDisplay}</span>
          </a>
        </div>
      </div>

      <footer className="relative py-8 overflow-hidden mt-auto">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-3">
          <img src={logoLight} alt={`לוגו ${siteConfig.name}`} className="h-9 mx-auto opacity-80" loading="lazy" />
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
          <p className="text-primary-foreground/45 text-[11px] max-w-xl mx-auto leading-relaxed">
            המידע כללי ואינו ייעוץ אישי. הפרסום אינו מציג טיוטה רגולטורית כאילו נכנסה לתוקף. אין הבטחת הנחה באחוזים לפני בדיקה.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default LPLifeDiscountThankYouPage;
