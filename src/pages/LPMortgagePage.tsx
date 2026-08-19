// react hooks not needed here
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, TrendingUp, ArrowLeft, Lock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import SectionDivider from "@/components/SectionDivider";
import { siteConfig } from "@/data/siteConfig";

import logo from "@/assets/logo-light.png";
import heroBg from "@/assets/hero-bg.jpg";

import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const LPMortgagePage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "mortgage", funnelStep: "intro" });

  


  return (
    <main className="bg-background" dir="rtl">
      <SEOHead
        title="ביטוח משכנתא דרך הבנק? כנראה שאתה משלם יותר מדי | ליבה ביטוח ופנסיוני"
        description="בדיקה חינמית תוך 60 שניות תגלה כמה כסף אתה מפסיד על ביטוח משכנתא דרך הבנק. חיסכון של עשרות עד מאות אלפי שקלים. בהתחייבות."
        canonical="/lp/mortgage-insurance"
        keywords={[
          "ביטוח משכנתא", "ביטוח משכנתא דרך הבנק", "חיסכון ביטוח משכנתא",
          "השוואת ביטוח משכנתא", "הוזלת ביטוח משכנתא", "ביטוח משכנתא מחיר",
          "ביטוח חיים למשכנתא", "ביטוח מבנה משכנתא",
        ]}
        noindex
      />

      {/* ═══════ HERO — matching HomePage style ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="ביטוח משכנתא – בדיקת זכאות להוזלה" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
        </div>

        {/* Floating decorative elements — same as HomePage */}
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
            {/* Logo */}
            <motion.img
              src={logo}
              alt={`לוגו ${siteConfig.name}`}
              className="h-12 md:h-16 mb-6 mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            />

            {/* Check list — between logo and H1 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-primary-foreground/80 mb-6"
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />בדיקה חינמית</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />ללא התחייבות</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />התחייבות להוזלה לזכאים</span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-6">
              עשית ביטוח משכנתא דרך הבנק?{" "}
              <span className="relative">
                <span className="text-accent">אתה כנראה משלם עד 60% יותר</span>
                <svg className="absolute -bottom-2 left-0 right-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 0 100 8 200 4" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-3 leading-relaxed">
              לפי נתוני משרד האוצר — מדובר בעשרות ואף מאות אלפי שקלים לאורך חיי המשכנתא
            </p>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed font-semibold">
              מבוסס על נתוני משרד האוצר
            </p>

            {/* Premium rationale block — integrated, high contrast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative mb-8 max-w-xl mx-auto"
            >
              <div
                className="relative rounded-2xl p-6 md:p-7 text-center border border-primary-foreground/15 shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--brand-navy) / 0.85), hsl(var(--primary) / 0.75))",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="absolute -top-3 right-1/2 translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-bold tracking-wide uppercase shadow-lg">
                  למה זה קורה?
                </div>
                <ul className="space-y-3 mt-2">
                  <li className="flex items-start gap-3 text-right">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <p className="text-base md:text-lg text-primary-foreground font-semibold leading-relaxed flex-1 text-center">
                      הבנק <span className="text-accent">לא דואג לאינטרס שלך</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3 text-right">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <p className="text-base md:text-lg text-primary-foreground font-semibold leading-relaxed flex-1 text-center">
                      מחויב לעבוד רק עם <span className="text-accent">חברת ביטוח אחת</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3 text-right">
                    <CheckCircle className="w-5 h-5 text-brand-gold shrink-0 mt-1" />
                    <p className="text-base md:text-lg text-primary-foreground font-bold leading-relaxed flex-1 text-center">
                      וכשזה המצב — <span className="text-brand-gold">אין יכולת מיקוח!</span>
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/lp/mortgage-insurance/check"
                className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30 animate-pulse-glow"
              >
                השאר פרטים ב-60 שניות לבדיקת זכאות
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ OPENER ═══════ */}
      <section className="py-10 md:py-14 bg-background relative">
        <div className="container mx-auto px-4 max-w-3xl relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            <motion.p variants={fadeUp} custom={2} className="text-base md:text-lg text-foreground leading-relaxed pt-2">
              רוב בעלי המשכנתאות בישראל עשו את ביטוח המשכנתא דרך הבנק.
              <br />
              <span className="text-muted-foreground">לא כי זה הכי משתלם. כי זה הכי קל.</span>
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="glass-premium p-5 md:p-6 text-right border border-accent/20">
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-3 text-center">
                <strong>למה ביטוח דרך הבנק הוא הכי גרוע?</strong>
              </p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span><span>הבנק מחויב לעבוד רק עם <strong>חברת ביטוח אחת בלבד</strong> — אין השוואה ואין תחרות.</span></li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span><span>בלי תחרות בין חברות — <strong>אין שום יכולת מיקוח על המחיר</strong>.</span></li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">•</span><span>לבנק <strong>אין שום אינטרס להוזיל לך</strong> — הביטוח נועד להגן עליו, לא עליך.</span></li>
              </ul>
              <p className="text-accent font-bold text-lg mt-4 text-center">והתוצאה? אתה זה שמשלם.</p>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={4} className="font-heading text-2xl md:text-3xl font-black pt-4">
              השאירו פרטים ונציג יחזור אליכם לשיחה אישית
              <br />
              <span className="text-gradient-accent">לבדיקת זכאות להוזלת ביטוח המשכנתא</span>
            </motion.h2>
            <motion.div variants={fadeUp} custom={5} className="pt-4 flex justify-center">
              <Link
                to="/lp/mortgage-insurance/check"
                className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30 animate-pulse-glow"
              >
                השאר פרטים ב-60 שניות לבדיקת זכאות
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* ═══════ PAIN BLOCK — dark section like HomePage services ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="עלויות ביטוח משכנתא"
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
            <motion.p variants={fadeUp} custom={1} className="text-xl md:text-2xl text-primary-foreground font-bold leading-relaxed">
              אם לא בדקת את הביטוח שלך מאז שלקחת משכנתא —
              <br />
              <span className="text-brand-gold">בהתחייבות</span> אתה משלם הרבה יותר ממה שצריך.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="space-y-2">
              <p className="text-primary-foreground/70 text-lg">לא אלפי שקלים</p>
              <p className="text-primary-foreground/70 text-lg">לא עשרות אלפי שקלים</p>
              <p className="text-brand-gold text-2xl font-black">מאות אלפי שקלים לאורך חיי המשכנתא.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* ═══════ SAVINGS TABLE ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553729459-uj8ax09dUGF?w=1600&q=80"
            alt="חיסכון בביטוח משכנתא"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center space-y-8">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-black">
              כמה זה באמת <span className="text-gradient-accent">עולה לך?</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">
              רוב האנשים אומרים לעצמם: ״זה רק עוד כמה עשרות שקלים״
              <br />
              <strong className="text-foreground">אבל הנה האמת:</strong>
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="glass-premium p-6 text-center">
              <p className="text-foreground">
                לפי נתונים מבוססי מחשבון משרד האוצר:
                <br />
                <strong>חיסכון של כ־53₪ בלבד בחודש = כ־24,000₪ לאורך חיי המשכנתא</strong>
              </p>
            </motion.div>

            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground font-semibold text-lg">
              ועכשיו תסתכל על המציאות:
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </motion.div>
        </div>
      </section>

      {/* ═══════ NOT RARE ═══════ */}
      <section className="py-12 md:py-16 section-gradient-mesh relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="container mx-auto px-4 max-w-2xl text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            <motion.h3 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold">וזה לא נדיר</motion.h3>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">פערים כאלה קיימים כל הזמן.</motion.p>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col items-center gap-2 text-foreground font-semibold text-lg">
              <span>אותו אדם</span>
              <span>אותו ביטוח</span>
              <span className="text-accent font-bold">מחיר שונה לחלוטין</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="curve" className="text-primary -mb-1" />

      {/* ═══════ COMMITMENT BLOCK — dark section with image ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
            alt="התחייבות להוזלת ביטוח משכנתא"
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
              <Shield className="w-10 h-10" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-2xl md:text-4xl font-black text-primary-foreground">
              אנחנו מתחייבים:
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-primary-foreground/90 text-xl leading-relaxed max-w-xl mx-auto">
              אם אתה זכאי להוזלה —
              <br />
              אנחנו נמצא לך חיסכון של עשרות עד מאות אלפי שקלים לאורך חיי המשכנתא.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-brand-gold text-2xl font-black">בהתחייבות.</motion.p>

            <motion.div variants={fadeUp} custom={5}>
              <Link
                to="/lp/mortgage-insurance/check"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all shadow-2xl hover:shadow-accent/30 animate-pulse-glow mt-8"
              >
                <ArrowLeft className="w-6 h-6" />
                השאר פרטים ב-60 שניות לבדיקת זכאות
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1 rotate-180" />

      {/* ═══════ WHY WE CAN COMMIT ═══════ */}
      <section className="section-padding section-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="container mx-auto px-4 max-w-3xl text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-3xl font-black">
              למה אנחנו יכולים <span className="text-gradient-accent">להתחייב?</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              כי כבר ביצענו אלפי בדיקות אמיתיות
              <br />
              לאחר ניסיון של 15 שנה בתחום הביטוחים —
              <br />
              וגילינו שוב ושוב את אותו הדבר:
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-foreground text-xl font-bold">
              אנשים משלמים יותר —
              <br />
              רק כי אף אחד לא בדק להם.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PROOF ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80"
            alt="הוכחות מהשטח – חיסכון בביטוח משכנתא"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8 text-center">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-black">
              הוכחות <span className="text-gradient-accent">מהשטח</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">
              לקוחות שהגיעו אלינו אחרי ביטוח דרך הבנק:
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="space-y-4">
              {[
                { monthly: "180₪", total: "מעל 75,000₪" },
                { monthly: "240₪", total: "מעל 100,000₪" },
                { monthly: "90₪", total: "מעל 40,000₪" },
              ].map((item) => (
                <div key={item.monthly} className="glass-premium p-5 flex items-center gap-4 text-right hover:glow-teal transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-foreground text-lg">
                    חיסכון של <strong className="text-accent">{item.monthly}</strong> בחודש → <strong>{item.total}</strong> לאורך השנים
                  </p>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ═══════ FAQ SECTION ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80"
            alt="שאלות נפוצות על ביטוח משכנתא"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 text-center">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-3xl font-black">
              שאלות <span className="text-gradient-teal">נפוצות</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">
              יש לכם שאלות? יש לנו תשובות
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="space-y-3 text-right">
              {[
                {
                  q: "האם השירות באמת בחינם?",
                  a: "כן, לחלוטין. אנחנו מקבלים עמלה מחברת הביטוח שנבחרה – בדיוק כמו כל סוכן ביטוח. עבורכם זה 100% חינם ללא שום תשלום נסתר."
                },
                {
                  q: "האם אפשר לעבור ביטוח גם אם לקחתי משכנתא לפני שנים?",
                  a: "בהחלט! אפשר לעבור לביטוח זול יותר בכל עת – ללא קנסות וללא אישור מהבנק. אנחנו מטפלים בכל ההעברה."
                },
                {
                  q: "כמה זמן לוקח התהליך?",
                  a: "השלב הראשון – בדיקה והצעת מחיר – לוקח עד 24 שעות. ההחלפה הפיזית עצמה בדרך כלל אורכת עד שבוע."
                },
                {
                  q: "האם המעבר יכול לפגוע בכיסויים הקיימים?",
                  a: "לא! אנחנו בודקים גם את הכיסוי ולא רק את המחיר. לא נמליץ על מעבר אם הכיסוי החדש נחות מהקיים."
                },
                {
                  q: "מה אם כבר יש לי סוכן ביטוח?",
                  a: "אנחנו יכולים לבדוק עבורכם אם הסוכן הנוכחי שלכם נותן לכם את התנאים הטובים ביותר – ללא שום התחייבות."
                },
              ].map((item, i) => (
                <details key={i} className="glass-premium p-5 group cursor-pointer">
                  <summary className="font-heading font-semibold text-base md:text-lg text-foreground flex items-center justify-between gap-3 list-none">
                    <span>{item.q}</span>
                    <span className="text-accent text-2xl group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{item.a}</p>
                </details>
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
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">זה לא מתאים לכולם.</motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-foreground text-lg font-semibold">
              אבל אם עשית ביטוח דרך הבנק —
              <br />
              <span className="text-accent font-bold">אתה חייב לבדוק את זה עכשיו.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* ═══════ BEFORE SENDING — dark section ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1600&q=80"
            alt="משפחה ישראלית – חיסכון בביטוח משכנתא"
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
              רוב האנשים מגלים את זה
              <br />
              רק אחרי שנים של תשלומים מיותרים.
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="text-brand-gold text-2xl font-black">
              אל תהיה אחד מהם.
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
              { icon: <CheckCircle className="w-8 h-8" />, text: "בדיקה חינמית" },
              { icon: <Lock className="w-8 h-8" />, text: "ללא התחייבות" },
              { icon: <TrendingUp className="w-8 h-8" />, text: "תשובה ברורה" },
              { icon: <Shield className="w-8 h-8" />, text: "התחייבות להוזלה לזכאים" },
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

      {/* ═══════ FINAL CTA — dark ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
            alt="בדיקת זכאות לביטוח משכנתא"
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
              בדוק עכשיו אם אתה זכאי לחיסכון של עשרות אלפי שקלים
            </motion.h2>
            <motion.div variants={fadeUp} custom={1}>
              <Link
                to="/lp/mortgage-insurance/check"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all shadow-2xl hover:shadow-accent/30 animate-pulse-glow"
              >
                <ArrowLeft className="w-6 h-6" />
                השאר פרטים ב-60 שניות לבדיקת זכאות
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <section className="py-6 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            החישובים להמחשה בלבד, מבוססים על נתוני שוק ופריסת משכנתא ממוצעת
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

export default LPMortgagePage;
