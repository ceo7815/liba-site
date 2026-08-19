import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, TrendingDown, PhoneCall } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import logo from "@/assets/logo.png";
import { trackLead } from "@/lib/fbq";
import { trackClarityEvent, setClarityTag } from "@/lib/clarity";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import { LPFooter } from "./LPInsuranceCheckPage";

const LPInsuranceCheckThankYouPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "insurance-check", funnelStep: "thank-you" });

  useEffect(() => {
    trackLead();
    setClarityTag("lead_campaign", "insurance-check");
    trackClarityEvent("lead_submitted");
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col" dir="rtl">
      <SEOHead
        title="תוצאות הבדיקה | ליבה ביטוח ופנסיוני"
        description="תוצאות בדיקת כפל ביטוחי — נציג ייצור עמך קשר עם הפרטים המדויקים."
        canonical="/insurance-check/thankyou"
        noindex
      />

      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-9 md:h-10 w-auto" />
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 max-w-3xl py-14 md:py-20">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h1 className="font-heading text-2xl md:text-4xl font-black leading-tight mb-6">
            לפי האבחון שביצענו נראה כי אכן ניתן להוריד את תשלום הביטוח החודשי שלך
          </h1>

          <div className="border-y border-border py-8 space-y-5">
            <p className="flex items-start gap-3 text-lg md:text-xl text-foreground">
              <TrendingDown className="w-6 h-6 text-accent shrink-0 mt-1" />
              אנחנו מעריכים חיסכון של עד 50% בתשלום החודשי (שווה ערך לאלפי שקלים בחודש)
            </p>
            <p className="flex items-start gap-3 text-lg md:text-xl text-foreground">
              <PhoneCall className="w-6 h-6 text-accent shrink-0 mt-1" />
              בקרוב ניצור עמך קשר וניתן לך את כל הפרטים המדויקים
            </p>
          </div>
        </motion.div>
      </div>

      <LPFooter />
    </main>
  );
};

export default LPInsuranceCheckThankYouPage;
