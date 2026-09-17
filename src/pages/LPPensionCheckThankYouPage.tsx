import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield, Sparkles } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import { thankYouPrepare } from "@/data/pensionCheck";
import { trackLead } from "@/lib/fbq";
import { trackClarityEvent, setClarityTag } from "@/lib/clarity";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import logo from "@/assets/logo-light.png";
import heroBg from "@/assets/hero-bg.jpg";

const LPPensionCheckThankYouPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "pension-check", funnelStep: "thank-you" });

  useEffect(() => {
    trackLead();
    setClarityTag("lead_campaign", "pension-check");
    trackClarityEvent("lead_submitted");
  }, []);

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <SEOHead
        title="תודה | בדיקת פנסיה לפני משיכה — ליבה ביטוח ופנסיוני"
        description="קיבלנו את הפנייה. מומחה יחזור אליכם בקרוב עם הנתונים לקראת בדיקת הפנסיה."
        canonical="/lp/pension-check/thank-you"
        noindex
      />

      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-12 md:h-16 mx-auto mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-4 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            הבקשה התקבלה
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-20 max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black mb-4">
            תודה — קיבלנו את הפנייה לבדיקת הפנסיה
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            מומחה יחזור אליכם בקרוב מאוד עם הנתונים שצריך לדעת לפני משיכה — כדי שתקבלו החלטה על בסיס מספרים, לא הבטחות.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-premium p-8 text-right space-y-5 mb-8"
        >
          <h2 className="font-heading text-xl font-bold text-center">מה כדאי לעשות עד השיחה?</h2>
          {[
            { icon: <Clock className="w-6 h-6 text-brand-gold" />, text: thankYouPrepare[0] },
            { icon: <Shield className="w-6 h-6 text-brand-teal" />, text: thankYouPrepare[1] },
            { icon: <CheckCircle className="w-6 h-6 text-accent" />, text: thankYouPrepare[2] },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5">{item.icon}</span>
              <p>{item.text}</p>
            </div>
          ))}
          <p className="font-bold pt-2">
            חשוב: אל תחתמו ואל תשלחו מסמכים לאף גורם עד שתקבלו את התמונה המלאה בשיחה.
          </p>
        </motion.div>

        <p className="text-muted-foreground text-sm mb-8">
          דחוף?{" "}
          <a href={`tel:${siteConfig.phones[0].replace(/-/g, "")}`} className="underline" dir="ltr">
            {siteConfig.phones[0]}
          </a>
        </p>

        <Link to="/lp/pension-check" className="text-accent font-medium hover:underline">
          חזרה לעמוד הבדיקה ←
        </Link>
      </div>

      <footer className="relative py-8 overflow-hidden mt-auto">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-4">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-10 mx-auto opacity-70" loading="lazy" />
          <div className="flex items-center justify-center gap-4 text-primary-foreground/50 text-sm">
            <Link to="/privacy-policy" className="hover:text-primary-foreground/80">מדיניות פרטיות</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-primary-foreground/80">תנאי שימוש</Link>
            <span>|</span>
            <Link to="/accessibility" className="hover:text-primary-foreground/80">הצהרת נגישות</Link>
          </div>
          <p className="text-primary-foreground/40 text-xs">
            בדיקת פנסיה לפני משיכה — מידע כללי ואינו ייעוץ מס או ייעוץ פנסיוני אישי.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default LPPensionCheckThankYouPage;
