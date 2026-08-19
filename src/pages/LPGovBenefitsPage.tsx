import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, TrendingUp, ArrowLeft, Lock, Sparkles, AlertTriangle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import SectionDivider from "@/components/SectionDivider";
import { siteConfig } from "@/data/siteConfig";
import logo from "@/assets/logo-light.png";
import misradLogo from "@/assets/misrad-haotsar-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const LPGovBenefitsPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "government-benefits", funnelStep: "intro" });

  return (
    <main className="bg-background" dir="rtl">
      <SEOHead
        title="הנחיית הממשלה להוזלת ביטוח משכנתא — חלון הזדמנות נדיר | ליבה ביטוח ופנסיוני"
        description="בעקבות המצב הביטחוני חברות הביטוח משחררות הטבות חסרות תקדים. בדיקה חינמית תוך 60 שניות תגלה אם אתה זכאי לחיסכון של עשרות אלפי שקלים."
        canonical="/lp/government-benefits"
        keywords={[
          "הנחיית ממשלה ביטוח", "הוזלת ביטוח משכנתא", "הטבות ביטוח מלחמה",
          "חיסכון ביטוח משכנתא", "הנחות ביטוח", "ביטוח משכנתא מחיר",
        ]}
        noindex
      />

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="הנחיית הממשלה להוזלת מחירי ביטוח" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[3%] w-80 h-80 rounded-full border-2 border-dashed border-brand-teal/20 animate-spin-slow" />
          <div className="absolute top-[10%] left-[3%] w-80 h-80 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
          <div className="absolute top-[20%] left-[8%] w-40 h-40 rounded-full bg-gradient-to-br from-brand-teal/20 to-transparent animate-float blur-xl" />
          <div className="absolute bottom-[15%] right-[5%] w-56 h-56 rounded-full bg-gradient-to-br from-accent/15 to-transparent animate-float-slow blur-xl" />
          <div className="absolute top-[55%] left-[20%] w-24 h-24 rounded-full bg-brand-gold/10 animate-float blur-lg" />
          <div className="absolute top-[30%] right-[12%] w-16 h-16 border-2 border-primary-foreground/10 rotate-45 animate-float-slow" />
          <div className="absolute bottom-[30%] left-[15%] w-12 h-12 border-2 border-brand-teal/15 rotate-12 animate-float" />
          <div className="absolute top-[40%] right-[3%] w-32 h-32 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary-foreground) / 0.3) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }} />
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto text-center">
            <motion.img
              src={logo}
              alt={`לוגו ${siteConfig.name}`}
              className="h-12 md:h-16 mb-8 mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-6 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              הנחיית הממשלה לחברות הביטוח
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-6">
              בזמן המלחמה — נפתח{" "}
              <span className="relative">
                <span className="text-accent">חלון הזדמנות נדיר</span>
                <svg className="absolute -bottom-2 left-0 right-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 0 100 8 200 4" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>{" "}
              בביטוחי בריאות, חיים ומשכנתא
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-4 leading-relaxed">
              ומי שלא בודק עכשיו — פשוט מפסיד כסף
            </p>

            <div className="flex items-center justify-center gap-3 mb-8">
              <img
                src={misradLogo}
                alt="לוגו משרד האוצר"
                className="h-12 md:h-14 rounded-lg bg-white p-2 shadow-md"
                loading="eager"
              />
              <span className="text-primary-foreground/60 text-sm">בפיקוח משרד האוצר</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-primary-foreground/60 mb-8">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />ללא עלות</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />ללא התחייבות</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />תשובה ברורה</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/lp/government-benefits/check"
                className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30 animate-pulse-glow"
              >
                בדוק זכאות עכשיו
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ H2 + OPENER — combined ═══════ */}
      <section className="py-10 md:py-14 bg-background relative">
        <div className="container mx-auto px-4 max-w-3xl relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-3xl font-black">
              חברות ביטוח משחררות הטבות ותנאים
              <br />
              <span className="text-gradient-accent">שלא היו זמינים בשנים האחרונות</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground">רק למי שבודק דרך גורם מורשה</motion.p>
            <motion.div variants={fadeUp} custom={2} className="glass-premium p-5 md:p-6 text-center">
              <p className="text-base text-foreground leading-relaxed">
                בתקופות רגילות — מחירי ביטוח כמעט לא זזים.
                <br />
                אבל בתקופות של חוסר יציבות כלכלית — <strong>חברות ביטוח משנות תנאים, נותנות הנחות, ומנסות למשוך לקוחות.</strong>
              </p>
              <p className="text-accent font-bold text-lg mt-2">👉 וזה בדיוק מה שקורה עכשיו.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* ═══════ PAIN BLOCK ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="חוסר מודעות לשינויים בשוק הביטוח"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-brand-teal/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.p variants={fadeUp} custom={0} className="text-xl md:text-2xl text-primary-foreground font-bold leading-relaxed">
              רוב האנשים לא מודעים לזה בכלל.
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/70 text-lg leading-relaxed">
              הם ממשיכים לשלם את אותו ביטוח מהבנק —
              <br />
              בזמן שבשוק כבר קיימים תנאים טובים יותר.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* ═══════ MARKET REALITY ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553729459-uj8ax09dUGF?w=1600&q=80"
            alt="מה קורה בשוק הביטוח"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center space-y-8">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-black">
              מה קורה <span className="text-gradient-accent">בפועל בשוק?</span>
            </motion.h2>

            <motion.div variants={fadeUp} custom={1} className="space-y-4">
              {[
                "מחירי ביטוח משתנים בין חברות — גם עבור אותו לקוח",
                "חברות ביטוח מציעות הנחות ומבצעים משתנים בהתאם לתקופה",
                "רק מי שבודק בפועל — נחשף לתנאים החדשים",
              ].map((item) => (
                <div key={item} className="glass-premium p-5 flex items-center gap-3 text-right hover:glow-teal transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal/15 text-brand-teal flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="glass-premium p-6 flex items-center gap-4 justify-center">
              <img
                src={misradLogo}
                alt="לוגו משרד האוצר"
                className="h-12 rounded-lg bg-white p-1.5 shadow-sm"
                loading="lazy"
              />
              <p className="text-foreground text-right">
                לפי נתוני רשות שוק ההון, קיימת תחרות גבוהה בין חברות הביטוח
                <br />
                <strong>והמחירים אינם אחידים — אלא משתנים לפי תנאי שוק ולקוח</strong>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ TRANSLATION ═══════ */}
      <section className="py-12 md:py-16 section-gradient-mesh relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="container mx-auto px-4 max-w-2xl text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            <motion.p variants={fadeUp} custom={0} className="text-foreground text-xl font-bold leading-relaxed">
              מי שלא בודק עכשיו —
              <br />
              <span className="text-muted-foreground">נשאר עם התנאים הישנים</span>
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="text-accent font-bold text-xl">
              ומי שבודק —
              <br />
              יכול לנצל תנאים שלא בטוח יהיו זמינים בהמשך
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="curve" className="text-primary -mb-1" />

      {/* ═══════ URGENCY BLOCK ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
            alt="חלון הזדמנות מוגבל"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[5%] w-64 h-64 rounded-full bg-brand-gold/10 blur-[100px]" />
          <div className="absolute bottom-[20%] left-[10%] w-56 h-56 rounded-full bg-brand-teal/10 blur-[120px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-gold/30 to-brand-teal/20 text-brand-gold mb-4">
              <AlertTriangle className="w-10 h-10" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-2xl md:text-4xl font-black text-primary-foreground">
              אין לדעת מתי זה ייגמר
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-primary-foreground/90 text-xl leading-relaxed max-w-xl mx-auto">
              הטבות כאלה לא נשארות לנצח.
              <br />
              ברגע שהשוק מתייצב — הן נעלמות.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="space-y-2">
              <p className="text-primary-foreground/80 text-lg">👉 מי שפועל עכשיו — מרוויח</p>
              <p className="text-brand-gold text-2xl font-black">👉 מי שמחכה — נשאר מאחור</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={4} className="glass-premium p-5 md:p-6 border border-brand-gold/30 mt-4">
              <p className="text-primary-foreground/90 text-lg leading-relaxed">
                ⚠️ אין לדעת מתי המלחמה תסתיים — <strong className="text-brand-gold">וכשהיא תיגמר, ההטבות ייעלמו.</strong>
                <br />
                <span className="text-primary-foreground/70">זה הזמן לפעול, לפני שחלון ההזדמנות נסגר.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1 rotate-180" />

      {/* ═══════ MONEY REINFORCEMENT ═══════ */}
      <section className="section-padding section-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="container mx-auto px-4 max-w-3xl text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-3xl font-black">
              גם פער של <span className="text-gradient-accent">150–300₪ בחודש</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">
              יכול להגיע לעשרות אלפי שקלים לאורך השנים
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { monthly: "150₪", total: "65,000₪" },
                { monthly: "200₪", total: "96,000₪" },
                { monthly: "300₪", total: "140,000₪" },
              ].map((item) => (
                <div key={item.monthly} className="glass-premium p-6 text-center border-2 border-accent/20 hover:border-accent/50 hover:glow-accent transition-all duration-300">
                  <p className="text-accent font-bold text-3xl mb-2">{item.monthly}</p>
                  <p className="text-muted-foreground text-sm">בחודש</p>
                  <div className="w-12 h-0.5 bg-accent/30 mx-auto my-3" />
                  <p className="text-foreground font-black text-2xl">מעל {item.total}</p>
                  <p className="text-muted-foreground text-sm">לאורך חיי המשכנתא</p>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} custom={3} className="text-accent font-bold text-lg">
              ובתקופות כאלה — הפערים לפעמים אפילו גדולים יותר
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* ═══════ PROMISE BLOCK ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80"
            alt="הבטחה לבדיקה אישית"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-48 h-48 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-gold/30 to-brand-teal/20 text-brand-gold mb-4">
              <Shield className="w-10 h-10" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-2xl md:text-4xl font-black text-primary-foreground">
              אם קיימת עבורך הטבה או אפשרות להוזלה —
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-primary-foreground/90 text-xl leading-relaxed max-w-xl mx-auto">
              אנחנו נמצא אותה ונראה לך בדיוק כמה אתה יכול לחסוך
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="text-primary-foreground/70 text-lg mt-8">
              בדיקה של פחות מדקה תגלה אם גם אתה יכול לנצל את ההזדמנות הזאת 👇
            </motion.p>

            <motion.div variants={fadeUp} custom={4}>
              <Link
                to="/lp/government-benefits/check"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all shadow-2xl hover:shadow-accent/30 animate-pulse-glow"
              >
                <ArrowLeft className="w-6 h-6" />
                בדוק זכאות עכשיו
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* ═══════ WHAT YOU GET ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80"
            alt="מה תקבל בבדיקה"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-3xl font-black">
              מה תקבל <span className="text-gradient-teal">בבדיקה</span>
            </motion.h2>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "בדיקה אם קיימות הטבות עדכניות עבורך",
                "השוואה מול תנאי השוק עכשיו",
                "זיהוי אפשרות להוזלה",
                "התאמה אישית לפי הנתונים שלך",
              ].map((item) => (
                <div key={item} className="glass-premium p-5 flex items-center gap-3 text-right hover:glow-teal transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal/15 text-brand-teal flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ IMPORTANT TO UNDERSTAND ═══════ */}
      <section className="py-12 md:py-16 section-gradient-mesh relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="container mx-auto px-4 max-w-2xl text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            <motion.h3 variants={fadeUp} custom={0} className="font-heading text-xl md:text-2xl font-bold">
              חשוב להבין
            </motion.h3>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">זה לא מתאים לכל אחד.</motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-foreground text-lg font-semibold">
              אבל בתקופה כזאת —
              <br />
              <span className="text-accent font-bold">מי שלא בודק, פשוט מפסיד.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* ═══════ BEFORE SENDING ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1600&q=80"
            alt="הזדמנויות בביטוח משכנתא"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-48 h-48 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.p variants={fadeUp} custom={0} className="text-primary-foreground/80 text-lg">
              הזדמנויות כאלה לא מגיעות הרבה פעמים.
              <br />
              וברגע שהן נעלמות — אי אפשר לחזור אליהן.
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="text-brand-gold text-2xl font-black">
              אל תחכה.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* ═══════ TRUST BADGES ═══════ */}
      <section className="section-padding section-gradient-mesh relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="container mx-auto px-4 max-w-2xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <CheckCircle className="w-8 h-8" />, text: "ללא עלות" },
              { icon: <Lock className="w-8 h-8" />, text: "ללא התחייבות" },
              { icon: <TrendingUp className="w-8 h-8" />, text: "בדיקה לפי נתונים אישיים" },
              { icon: <Shield className="w-8 h-8" />, text: "תשובה ברורה" },
            ].map((item) => (
              <motion.div key={item.text} variants={fadeUp} custom={0} className="glass-premium p-4 flex flex-col items-center gap-2 hover:glow-teal transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-foreground font-semibold text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="curve" className="text-primary -mb-1" />

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
            alt="בדיקת זכאות"
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] right-[10%] w-72 h-72 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full bg-brand-teal/10 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-3xl font-black text-primary-foreground">
              בדוק עכשיו לפני שהתנאים משתנים 👇
            </motion.h2>
            <motion.div variants={fadeUp} custom={1}>
              <Link
                to="/lp/government-benefits/check"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all shadow-2xl hover:shadow-accent/30 animate-pulse-glow"
              >
                <ArrowLeft className="w-6 h-6" />
                בדוק זכאות עכשיו
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <section className="py-6 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            הטבות ותנאים משתנים בהתאם לשוק ולנתונים האישיים, ואינם קבועים לאורך זמן
          </p>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative py-8 overflow-hidden">
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

export default LPGovBenefitsPage;
