import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, X, Shield, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import SectionDivider from "@/components/SectionDivider";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/data/siteConfig";
import {
  PENSION_CHECK_PRICE,
  emptyPromises,
  fitFor,
  notFitFor,
  outcomes,
  pensionCheckMeta,
  realQuestions,
  whatYouGet,
} from "@/data/pensionCheck";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import logo from "@/assets/logo-light.png";
import heroBg from "@/assets/hero-bg.jpg";

const LPPensionCheckPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "pension-check", funnelStep: "intro" });

  return (
    <main className="bg-background" dir="rtl">
      <SEOHead
        title={pensionCheckMeta.title}
        description={pensionCheckMeta.description}
        canonical={pensionCheckMeta.canonical}
        keywords={[
          "משיכת פנסיה",
          "בדיקת פנסיה לפני משיכה",
          "מס על משיכת פנסיה",
          "מסלקה פנסיונית",
          "פטור מס פנסיוני",
        ]}
      />

      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="בדיקת פנסיה לפני משיכה" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
        </div>
        <div className="relative container mx-auto px-4 py-28">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <img src={logo} alt={`לוגו ${siteConfig.name}`} className="h-12 md:h-16 mb-8 mx-auto" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-6 text-sm font-medium">
              בדיקה מקצועית · לפני החלטה
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-black text-primary-foreground leading-tight mb-6">
              אל תמשכו פנסיה לפני שראיתם <span className="text-accent">מספרים מדויקים</span>
            </h1>
            <p className="text-lg text-primary-foreground/85 mb-3 leading-relaxed">
              רוצים למשוך כספי פנסיה, קופות ישנות או כספים ממעסיקים קודמים?
            </p>
            <p className="text-primary-foreground/75 mb-4 leading-relaxed">
              לפני שאתם חותמים, שולחים מסמכים או מאמינים למישהו שמבטיח «כסף מהר» — יש משהו שחייבים לבדוק:
            </p>
            <p className="text-xl font-bold text-primary-foreground mb-4">
              כמה כסף באמת יש לכם, כמה מס אתם צפויים לשלם, והאם בכלל כדאי למשוך עכשיו.
            </p>
            <p className="text-brand-gold font-semibold mb-8">
              בתחום הזה טעות אחת יכולה לעלות עשרות — ולפעמים מאות — אלפי שקלים.
            </p>
            <p className="text-sm text-primary-foreground/70 mb-6">
              עלות היכרות חד־פעמית: {PENSION_CHECK_PRICE} בלבד · נסביר בשיחה איך מתחילים
            </p>
            <a
              href="#start-check"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg"
            >
              לחצו עכשיו להתחלת הבדיקה
              <ArrowLeft className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl md:text-3xl font-black text-center mb-10">
            כולם מציעים «בדיקה». <span className="text-gradient-accent">השאלה מה באמת בודקים.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-premium p-6">
              <p className="text-sm font-bold text-muted-foreground mb-4">הרבה גורמים בשוק יגידו לכם:</p>
              <ul className="space-y-2 mb-4">
                {emptyPromises.map((item) => (
                  <li key={item} className="text-muted-foreground line-through decoration-destructive/50">{item}</li>
                ))}
              </ul>
              <p className="font-bold">«בערך» זה לא מספיק כשמדובר בפנסיה שלכם.</p>
            </div>
            <div className="glass-premium p-6 border border-brand-teal/20">
              <p className="font-black mb-4">השאלה היא:</p>
              <ul className="space-y-3">
                {realQuestions.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-black text-center text-primary-foreground mb-3">
            מה מקבלים בבדיקה?
          </h2>
          <p className="text-center text-primary-foreground/80 mb-8">
            בעלות היכרות חד־פעמית של {PENSION_CHECK_PRICE} בלבד, תקבלו בדיקת פנסיה מקצועית הכוללת:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {whatYouGet.map((item) => (
              <div key={item} className="glass-dark p-4 flex items-start gap-2 border border-primary-foreground/10">
                <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <span className="text-primary-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-brand-gold font-bold mt-8">שלא תקבלו החלטה על הפנסיה בעיניים עצומות.</p>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl text-center space-y-4">
          <p className="text-lg">אנשים מוכנים לשלם מאות שקלים על בדיקה לרכב לפני קנייה, ואלפי שקלים לעורך דין לפני חוזה.</p>
          <p className="text-muted-foreground">אבל כשזה מגיע לפנסיה — לפעמים מחליטים לפי הבטחה בטלפון. וזו בדיוק הטעות.</p>
          <p className="text-xl font-black">לפני שמושכים — בודקים.</p>
        </div>
      </section>

      <section className="section-padding section-gradient-mesh">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          <div className="glass-premium p-6">
            <h2 className="font-heading text-xl font-black mb-4">למי הבדיקה מתאימה?</h2>
            <ul className="space-y-2">
              {fitFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-premium p-6">
            <h2 className="font-heading text-xl font-black mb-4">למי זה לא מתאים?</h2>
            <ul className="space-y-2 mb-6">
              {notFitFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-sm">אם אפשר לעזור — נגיד איך. אם לא כדאי למשוך — נגיד גם את זה. לא נמכור חלום.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl font-black text-center mb-8">מה תדעו בסוף הבדיקה?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {outcomes.map((item) => (
              <div key={item} className="glass-premium p-4 text-sm font-semibold text-center">{item}</div>
            ))}
          </div>
          <p className="text-center mt-6 font-bold text-brand-teal">לא ניחוש. לא בערך. בדיקה מסודרת על בסיס נתונים.</p>
        </div>
      </section>

      <section id="start-check" className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="relative z-10 container mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-2 text-brand-gold mb-4">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">עלות היכרות חד־פעמית: {PENSION_CHECK_PRICE}</span>
          </div>
          <div className="glass-dark p-8 md:p-10 border border-primary-foreground/10">
            <LeadForm
              source="lp-pension-check"
              title="לחצו עכשיו להתחלת הבדיקה"
              subtitle="השאירו פרטים. מומחה יחזור אליכם לתיאום הבדיקה. עלות היכרות חד־פעמית: 80₪."
              lightTitle
              thankYouHref="/lp/pension-check/thank-you"
            />
          </div>
        </div>
      </section>

      <section className="py-6 bg-muted/30 border-t border-border">
        <p className="text-xs text-muted-foreground text-center px-4">
          בדיקת פנסיה מקצועית לפני משיכה — מידע כללי ואינו מהווה ייעוץ מס או ייעוץ פנסיוני אישי. שירותי משיכות ופטורי מס ניתנים במסגרת {siteConfig.name}.
        </p>
      </section>

      <footer className="relative py-8 overflow-hidden">
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
          <p className="text-primary-foreground/40 text-xs">© {new Date().getFullYear()} {siteConfig.name}. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </main>
  );
};

export default LPPensionCheckPage;
