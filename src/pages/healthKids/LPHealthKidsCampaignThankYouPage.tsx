import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Clock, Sparkles, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import { trackLead } from "@/lib/fbq";
import { trackClarityEvent, setClarityTag } from "@/lib/clarity";
import HealthKidsBrandHeader from "@/components/health-kids/HealthKidsBrandHeader";
import { MigdalShell } from "@/components/health-kids/MigdalShell";
import { HEALTH_KIDS_CAMPAIGNS, campaignShellClass, healthKidsHeroOverlayStyle, type HealthKidsCampaignId } from "@/data/healthKidsCampaigns";
import heroBg from "@/assets/hero-bg.jpg";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const LPHealthKidsCampaignThankYouPage = ({ campaignId }: { campaignId: HealthKidsCampaignId }) => {
  const campaign = HEALTH_KIDS_CAMPAIGNS[campaignId];
  const isMigdal = campaign.showMigdal;
  useClarityPageTags({ pageType: "landing-page", lpCampaign: campaign.clarityCampaign, funnelStep: "thank-you" });

  useEffect(() => {
    trackLead();
    setClarityTag("lead_campaign", campaign.clarityCampaign);
    trackClarityEvent("lead_submitted");
  }, [campaign.clarityCampaign]);

  if (isMigdal) {
    return (
      <MigdalShell campaign={campaign}>
        <SEOHead
          title="תודה! הבדיקה בדרך אליכם | מגדל בשיתוף סוכנות ליבה"
          description="קיבלנו את הפרטים שלכם — נחזור אליכם בהקדם עם תוצאות בדיקת הזכאות לכתב שירות התפתחות הילד."
          canonical={`${campaign.basePath}/thank-you`}
          noindex
        />
        <section className="migdal-hero-canvas py-16">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <CheckCircle className="w-16 h-16 text-[#3d9a45] mx-auto mb-4" />
            <h1 className="font-heading text-3xl md:text-4xl font-black text-[#020140] mb-3">תודה! קיבלנו את הפרטים</h1>
            <p className="text-lg text-[#020140] mb-2 font-semibold">
              נציג מטעם סוכנות ליבה ייצור איתכם קשר תוך מספר שעות לגבי כתב השירות של מגדל
            </p>
            <div className="bg-white rounded-2xl p-6 mt-8 text-right space-y-4 shadow-[0_12px_40px_rgba(2,1,64,0.08)]">
              <h2 className="font-heading text-xl font-bold text-center text-[#020140]">מה קורה עכשיו?</h2>
              <p className="text-[#020140]/80">בודקים את הזכאות שלכם מול מגדל</p>
              <p className="text-[#020140]/80">נציג ליבה ייצור קשר תוך מספר שעות</p>
              <p className="text-[#020140]/80">אם יש זכאות — נציג בדיוק מה מגיע ואיך מצטרפים</p>
            </div>
          </div>
        </section>
      </MigdalShell>
    );
  }

  return (
    <main className={`min-h-screen bg-background flex flex-col ${campaignShellClass(isMigdal)}`} dir="rtl">
      <SEOHead
        title={isMigdal ? "תודה! הבדיקה בדרך אליכם | מגדל בשיתוף סוכנות ליבה" : "תודה! הבדיקה בדרך אליכם | ליבה ביטוח ופנסיוני"}
        description="קיבלנו את הפרטים שלכם — נחזור אליכם בהקדם עם תוצאות בדיקת הזכאות לכתב שירות התפתחות הילד."
        canonical={`${campaign.basePath}/thank-you`}
        noindex
      />

      {isMigdal && <HealthKidsBrandHeader campaign={campaign} variant="bar" />}

      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0" style={healthKidsHeroOverlayStyle} />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-60 h-60 rounded-full border-2 border-dashed border-brand-teal/20 animate-spin-slow" />
          <div className="absolute bottom-[10%] right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-accent/15 to-transparent animate-float-slow blur-xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          {!isMigdal && <HealthKidsBrandHeader campaign={campaign} logoClassName="h-12 md:h-16" />}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-4 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            {isMigdal ? "מגדל — הבקשה התקבלה" : "הבקשה התקבלה"}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 md:py-20 max-w-lg text-center flex-1">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-black mb-4">
            תודה! קיבלנו את הפרטים
          </h1>

          <p className="text-foreground text-lg md:text-xl mb-2 font-semibold">
            {isMigdal ? (
              <>נציג מטעם סוכנות ליבה ייצור איתכם קשר <span className="text-accent">תוך מספר שעות</span> לגבי כתב השירות של מגדל</>
            ) : (
              <>נציג מטעם סוכנות ליבה ייצור איתכם קשר <span className="text-accent">תוך מספר שעות</span></>
            )}
          </p>
          <p className="text-muted-foreground text-base mb-8">
            לבדיקת זכאות אישית לכתב שירות ״התפתחות הילד״
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
              { icon: <Shield className="w-6 h-6 text-brand-teal" />, text: isMigdal ? "בודקים את הזכאות שלכם מול מגדל" : "בודקים את הזכאות שלכם מול חברות הביטוח" },
              { icon: <Clock className="w-6 h-6 text-brand-gold" />, text: "נציג מטעם סוכנות ליבה ייצור איתכם קשר תוך מספר שעות" },
              { icon: <CheckCircle className="w-6 h-6 text-accent" />, text: "אם יש זכאות — נציג בדיוק מה מגיע ואיך מצטרפים בעלות זניחה" },
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
          className="text-muted-foreground text-sm flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          בינתיים, אם יש שאלה:{" "}
          <a href={`tel:${siteConfig.phones[0].replace(/-/g, "")}`} className="underline hover:text-foreground" dir="ltr">{siteConfig.phones[0]}</a>
        </motion.p>
      </div>

      <footer className={`relative py-8 overflow-hidden mt-auto ${isMigdal ? "bg-white border-t-4 border-[hsl(var(--primary))]" : ""}`}>
        {!isMigdal && <div className="absolute inset-0 section-dark" />}
        <div className="relative z-10 container mx-auto px-4 text-center space-y-4">
          <HealthKidsBrandHeader
            campaign={campaign}
            className={isMigdal ? "" : "opacity-90"}
            logoClassName="h-10"
            variant={isMigdal ? "footer" : "inline"}
          />
          <div className={`flex items-center justify-center gap-4 text-sm ${isMigdal ? "text-[hsl(var(--primary))]/70" : "text-primary-foreground/50"}`}>
            <Link to="/privacy-policy" className="hover:opacity-80 transition-colors">מדיניות פרטיות</Link>
            <span>|</span>
            <Link to="/terms" className="hover:opacity-80 transition-colors">תנאי שימוש</Link>
            <span>|</span>
            <Link to="/accessibility" className="hover:opacity-80 transition-colors">הצהרת נגישות</Link>
          </div>
          <p className={`text-xs ${isMigdal ? "text-[hsl(var(--primary))]/50" : "text-primary-foreground/40"}`}>
            © {new Date().getFullYear()} {isMigdal ? "מגדל חברה לביטוח · בשיתוף סוכנות ליבה" : `${siteConfig.name}. כל הזכויות שמורות.`}
          </p>
        </div>
      </footer>
    </main>
  );
};

export default LPHealthKidsCampaignThankYouPage;
