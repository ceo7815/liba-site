import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Clock, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import { trackLead } from "@/lib/fbq";
import { trackClarityEvent, setClarityTag } from "@/lib/clarity";
import logo from "@/assets/logo-light.png";
import heroBg from "@/assets/hero-bg.jpg";

import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const LPMortgageThankYouPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "mortgage", funnelStep: "thank-you" });

  useEffect(() => { trackLead(); setClarityTag("lead_campaign", "mortgage"); trackClarityEvent("lead_submitted"); }, []);
  return (
  <main className="min-h-screen bg-background" dir="rtl">
    <SEOHead
      title="תודה! הבדיקה בדרך אליך | ליבה ביטוח ופנסיוני"
      description="קיבלנו את הפרטים שלך. ניצור איתך קשר בהקדם עם תוצאות בדיקת הזכאות להוזלת ביטוח המשכנתא."
      canonical="/lp/mortgage-insurance/thank-you"
      noindex
    />

    {/* Hero header — matching site style */}
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
      </div>
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-60 h-60 rounded-full border-2 border-dashed border-brand-teal/20 animate-spin-slow" />
        <div className="absolute bottom-[10%] right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-accent/15 to-transparent animate-float-slow blur-xl" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-12 md:h-16 mx-auto mb-6" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-4 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          הבקשה התקבלה
        </div>
      </div>
    </section>

    <div className="container mx-auto px-4 py-16 md:py-24 max-w-lg text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-black mb-4">
          תודה! קיבלנו את הפרטים
        </h1>

        <p className="text-foreground text-lg md:text-xl mb-2 font-semibold">
          סוכן ביטוח מטעם סוכנות ליבה ייצור איתך קשר <span className="text-accent">תוך 3 שעות</span>
        </p>
        <p className="text-muted-foreground text-base mb-8">
          לבדיקת זכאות אישית להוזלת ביטוח המשכנתא שלך
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass-premium p-8 text-right space-y-6 mb-8"
      >
        <h2 className="font-heading text-xl font-bold text-center">מה קורה עכשיו?</h2>
        <div className="space-y-4">
          {[
            { icon: <Shield className="w-6 h-6 text-brand-teal" />, text: "אנחנו בודקים את הנתונים שלך מול חברות הביטוח" },
            { icon: <Clock className="w-6 h-6 text-brand-gold" />, text: "סוכן ביטוח מטעם סוכנות ליבה ייצור איתך קשר תוך 3 שעות" },
            { icon: <CheckCircle className="w-6 h-6 text-accent" />, text: "אם יש זכאות להוזלה — נציג לך את ההצעה ותחליט" },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5">{item.icon}</span>
              <p className="text-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-muted-foreground text-sm"
      >
        בינתיים, אם יש שאלה — ניתן לפנות ישירות:{" "}
        <a href={`tel:${siteConfig.phones[0].replace(/-/g, "")}`} className="underline hover:text-foreground" dir="ltr">{siteConfig.phones[0]}</a>
      </motion.p>
    </div>

    {/* Footer */}
    <footer className="relative py-8 overflow-hidden mt-auto">
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
  </main>
  );
};

export default LPMortgageThankYouPage;
