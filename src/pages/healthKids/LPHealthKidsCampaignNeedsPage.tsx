import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Brain, MessageCircle, Heart, Activity, Users, HelpCircle, Sparkles, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import HealthKidsBrandHeader from "@/components/health-kids/HealthKidsBrandHeader";
import {
  HEALTH_KIDS_CAMPAIGNS,
  healthKidsNeedStorageKey,
  type HealthKidsCampaignId,
} from "@/data/healthKidsCampaigns";
import heroBg from "@/assets/hero-bg.jpg";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const NEEDS = [
  { id: "אבחון קשב וריכוז / דידקטי", icon: Brain, color: "text-brand-teal", bg: "from-brand-teal/30 to-brand-teal/5" },
  { id: "קלינאית תקשורת", icon: MessageCircle, color: "text-accent", bg: "from-accent/30 to-accent/5" },
  { id: "טיפול רגשי", icon: Heart, color: "text-brand-gold", bg: "from-brand-gold/30 to-brand-gold/5" },
  { id: "רכיבה / שחייה טיפולית", icon: Activity, color: "text-brand-teal", bg: "from-brand-teal/30 to-brand-teal/5" },
  { id: "הדרכת הורים", icon: Users, color: "text-accent", bg: "from-accent/30 to-accent/5" },
  { id: "אין משהו ספציפי / רוצה לבדוק", icon: HelpCircle, color: "text-brand-gold", bg: "from-brand-gold/30 to-brand-gold/5" },
];

const LPHealthKidsCampaignNeedsPage = ({ campaignId }: { campaignId: HealthKidsCampaignId }) => {
  const campaign = HEALTH_KIDS_CAMPAIGNS[campaignId];
  useClarityPageTags({ pageType: "landing-page", lpCampaign: campaign.clarityCampaign, funnelStep: "needs" });
  const navigate = useNavigate();

  const select = (need: string) => {
    try {
      sessionStorage.setItem(healthKidsNeedStorageKey(campaignId), need);
    } catch {
      /* ignore */
    }
    navigate(`${campaign.basePath}/check`);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col" dir="rtl">
      <SEOHead
        title="ספרו לנו מה הצורך — בדיקת זכאות התפתחות הילד | ליבה ביטוח ופנסיוני"
        description="בחרו את הצורך הרלוונטי לילד שלכם — ונבדוק עבורכם זכאות מלאה להחזרים."
        canonical={`${campaign.basePath}/needs`}
        noindex
      />

      <section className="relative py-12 md:py-16 overflow-hidden">
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
            שלב 1 מתוך 2
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-black text-primary-foreground mb-3">
            ספרו לנו מה <span className="text-accent">הצורך</span>
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg">
            בחרו את התחום הקרוב ביותר לכם — נבדוק עבורכם זכאות מלאה
          </p>

          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1.5 rounded-full bg-primary-foreground/15 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ duration: 0.7 }}
                className="h-full bg-gradient-to-l from-accent to-brand-gold"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NEEDS.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.button
                  key={n.id}
                  type="button"
                  onClick={() => select(n.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group glass-premium p-5 text-right border-2 border-transparent hover:border-accent/40 transition-all duration-200 cursor-pointer flex items-center gap-4"
                >
                  <span className={`shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${n.bg} ${n.color}`}>
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="flex-1 font-heading font-bold text-base md:text-lg text-foreground">{n.id}</span>
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:-translate-x-1 transition-all" />
                </motion.button>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            בחירה זו אינה מחייבת — היא רק עוזרת לנו להתאים לכם את הבדיקה.
          </p>
        </div>
      </section>

      <footer className="relative py-6 overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-3">
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

export default LPHealthKidsCampaignNeedsPage;
