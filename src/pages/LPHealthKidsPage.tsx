import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  MessageCircle,
  Heart,
  Sparkles,
  Users,
  Waves,
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
  Baby,
  Activity,
  HelpCircle,
  TrendingDown,
  HeartCrack,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import SectionDivider from "@/components/SectionDivider";
import FAQSection from "@/components/FAQSection";
import { siteConfig } from "@/data/siteConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/logo-light.png";
import heroBg from "@/assets/hero-bg.jpg";

import { useClarityPageTags } from "@/hooks/useClarityPageTags";

const NEED_OPTIONS = [
  "אבחון קשב וריכוז / דידקטי",
  "קלינאית תקשורת",
  "טיפול רגשי",
  "רכיבה / שחייה טיפולית",
  "הדרכת הורים",
  "אין משהו ספציפי / רוצה לבדוק",
];

const NeedSelectCTA = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  const navigate = useNavigate();
  const onSelect = (val: string) => {
    try {
      sessionStorage.setItem("hk_need", val);
    } catch {
      /* ignore */
    }
    navigate("/lp/health-kids/check");
  };
  const isDark = variant === "dark";
  return (
    <div
      className={`mx-auto max-w-xl rounded-2xl p-5 md:p-6 border shadow-xl ${
        isDark
          ? "border-primary-foreground/15 backdrop-blur-md"
          : "border-border bg-card/80 backdrop-blur-md"
      }`}
      style={
        isDark
          ? { background: "linear-gradient(135deg, hsl(var(--brand-navy) / 0.7), hsl(var(--primary) / 0.55))" }
          : undefined
      }
    >
      <div className={`flex items-center justify-center gap-2 mb-3 text-sm font-semibold ${isDark ? "text-brand-gold" : "text-accent"}`}>
        <HelpCircle className="w-4 h-4" />
        ספרו לנו מה הצורך — ונבדוק זכאות
      </div>
      <h3 className={`font-heading font-bold text-lg md:text-xl mb-4 text-center ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
        איזה תחום הכי רלוונטי לילד שלכם?
      </h3>
      <Select onValueChange={onSelect}>
        <SelectTrigger
          className={`h-12 text-base rounded-full font-semibold ${
            isDark
              ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15"
              : "bg-background"
          }`}
        >
          <SelectValue placeholder="בחרו מהרשימה כדי להמשיך…" />
        </SelectTrigger>
        <SelectContent>
          {NEED_OPTIONS.map((n) => (
            <SelectItem key={n} value={n}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className={`text-xs text-center mt-3 ${isDark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
        בחירה אינה מחייבת — מעבירה אתכם ישירות לבדיקת זכאות.
      </p>
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const treatments = [
  {
    icon: Brain,
    title: "אבחון דידקטי / פסיכו-דידקטי",
    desc: "איתור לקויות למידה, קשב וריכוז ודיסלקציה — מותאם לבית הספר.",
    market: "כ-2,500 ש״ח לאבחון",
    savings: "חיסכון של עד 2,000 ש״ח",
    color: "from-brand-teal/30 to-brand-teal/5",
    iconColor: "text-brand-teal",
  },
  {
    icon: MessageCircle,
    title: "קלינאית תקשורת",
    desc: "טיפולי שפה ודיבור — ילדים שמתקשים בהיגוי, אוצר מילים או שטף.",
    market: "סדרה של 10 טיפולים: כ-3,000–4,500 ש״ח",
    savings: "חיסכון של אלפי ש״ח לסדרה",
    color: "from-accent/30 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Heart,
    title: "טיפול רגשי ופסיכולוגי",
    desc: "מענה רגשי לילדים בתקופות מאתגרות — חרדות, גירושים, התמודדויות.",
    market: "סדרה של 10 טיפולים: כ-3,500–5,000 ש״ח",
    savings: "חיסכון של אלפי ש״ח לסדרה",
    color: "from-brand-gold/30 to-brand-gold/5",
    iconColor: "text-brand-gold",
  },
  {
    icon: Activity,
    title: "רכיבה טיפולית",
    desc: "כלי רב עוצמה לוויסות חושי, ביטחון עצמי וקואורדינציה.",
    market: "סדרה של 10 טיפולים: כ-2,000–3,000 ש״ח",
    savings: "חיסכון של מאות עד אלפי ש״ח",
    color: "from-brand-teal/30 to-brand-teal/5",
    iconColor: "text-brand-teal",
  },
  {
    icon: Waves,
    title: "שחייה טיפולית",
    desc: "תמיכה בהתפתחות מוטורית ורגשית — מצוין לילדים עם קשיים סנסוריים.",
    market: "סדרה של 10 טיפולים: כ-1,800–2,500 ש״ח",
    savings: "חיסכון של מאות עד אלפי ש״ח",
    color: "from-accent/30 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Users,
    title: "הדרכת הורים",
    desc: "ההפתעה הגדולה — כן, גם לכם מגיעים כלים מקצועיים. וזה מכוסה.",
    market: "סדרה של 10 מפגשים: כ-4,000 ש״ח",
    savings: "חיסכון של אלפי ש״ח לסדרה",
    color: "from-brand-gold/30 to-brand-gold/5",
    iconColor: "text-brand-gold",
  },
];

const faqs = [
  {
    question: "כבר יש לי ביטוח בריאות לילד — זה רלוונטי גם לי?",
    answer:
      "בהחלט. ״התפתחות הילד״ הוא כתב שירות נפרד שמתווסף לרוב הפוליסות הקיימות בלי לשנות שום דבר אחר. רוב ההורים שיש להם ביטוח בריאות פשוט לא יודעים שהכיסוי הזה לא נכלל אצלם — ומפסידים החזרים של אלפי שקלים.",
  },
  {
    question: "אין לי כרגע שום ביטוח בריאות לילד — זה עדיין שווה לי?",
    answer:
      "כן, ואולי אפילו יותר. ב-25 ש״ח לחודש לכל ילד זה אחד הכיסויים הכי משתלמים שיש בשוק. אבחון בודד או סדרת טיפולים מחזירים את ההשקעה לשנים קדימה.",
  },
  {
    question: "מה ההבדל בין זה לבין מה שמכוסה בקופת חולים?",
    answer:
      "קופת חולים נותנת מענה חלקי בלבד — תורים ארוכים (חודשים), בחירה מוגבלת של מטפלים, ולעתים בלי מענה כלל לאבחונים פרטיים. הכיסוי הפרטי מאפשר לכם לבחור מומחה, לקבל מענה מהיר, ולקבל החזר משמעותי על העלות.",
  },
  {
    question: "הילד שלי בריא לגמרי — זה לא בזבוז?",
    answer:
      "לקויות למידה, קשב וריכוז וקשיי שפה מתגלים פעמים רבות רק בכיתה א׳-ג׳ — והאבחון הראשון יכול לעלות אלפי שקלים. לא מצטרפים לכיסוי אחרי שצריך — אלא לפני. זה בדיוק כמו ביטוח: שקלים בודדים בחודש שמגנים מהוצאה לא צפויה.",
  },
  {
    question: "המחיר אמיתי? לא יקפצו לי בעוד שנה?",
    answer:
      "המחיר מוצג מראש לכל הפוליסה לפי תעריפון רשמי של חברת הביטוח. אנחנו מציגים בדיוק מה אתם הולכים לשלם — בלי הפתעות.",
  },
  {
    question: "האם זה לא יסבך לי את הביטוח הקיים?",
    answer:
      "ממש לא. אנחנו מטפלים בכל ההצטרפות מול חברת הביטוח שלכם, בלי שתצטרכו לדבר איתה ובלי לשנות פרט בפוליסה הקיימת.",
  },
  {
    question: "מה אם ארצה לבטל בעוד חצי שנה?",
    answer:
      "ניתן לבטל בכל עת ללא קנס, על פי חוק חוזה הביטוח. בלי התחייבות לטווח ארוך.",
  },
  {
    question: "תוך כמה זמן באמת מקבלים החזר אחרי טיפול?",
    answer:
      "לרוב 14–30 יום מרגע הגשת תביעה תקינה. אנחנו מלווים אתכם בהגשה ובטיפול מול חברת הביטוח כדי לוודא שלא תידחו על פרט טכני.",
  },
];

const LPHealthKidsPage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "health-kids", funnelStep: "intro" });

  return (
    <main className="bg-background" dir="rtl">
      <SEOHead
        title="כתב שירות 'התפתחות הילד' — 25 ש״ח לילד, החזרים של אלפי ש״ח | ליבה ביטוח ופנסיוני"
        description="הורים — מגיע לכם החזרים של מאות עד אלפי שקלים על אבחונים וטיפולים לילדים. אבחון דידקטי, קלינאית תקשורת, טיפול רגשי ועוד. בדיקת זכאות חינם."
        canonical="/lp/health-kids"
        keywords={[
          "כתב שירות התפתחות הילד",
          "ביטוח בריאות לילדים",
          "החזר אבחון דידקטי",
          "אבחון פסיכו-דידקטי",
          "קלינאית תקשורת החזר",
          "טיפול רגשי לילד החזר",
          "הדרכת הורים",
          "ביטוח התפתחות הילד",
        ]}
        noindex
      />

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="כתב שירות התפתחות הילד — בדיקת זכאות" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%)] via-[hsl(205,65%,15%,0.92)] to-[hsl(205,65%,18%,0.75)]" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[3%] w-80 h-80 rounded-full border-2 border-dashed border-brand-teal/20 animate-spin-slow" />
          <div className="absolute top-[10%] left-[3%] w-80 h-80 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "45s" }} />
          <div className="absolute top-[20%] left-[8%] w-40 h-40 rounded-full bg-gradient-to-br from-brand-teal/20 to-transparent animate-float blur-xl" />
          <div className="absolute bottom-[15%] right-[5%] w-56 h-56 rounded-full bg-gradient-to-br from-accent/15 to-transparent animate-float-slow blur-xl" />
          <div className="absolute top-[55%] left-[20%] w-24 h-24 rounded-full bg-brand-gold/10 animate-float blur-lg" />
          <div className="absolute top-[40%] right-[3%] w-32 h-32 opacity-20" style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary-foreground) / 0.3) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }} />
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
            <motion.img
              src={logo}
              alt={`לוגו ${siteConfig.name}`}
              className="h-12 md:h-16 mb-6 mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-primary-foreground/80 mb-6"
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />בדיקה חינמית</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />ללא התחייבות</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />החזרים של אלפי ש״ח</span>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/30 text-brand-teal mb-5 text-sm font-medium">
              <Baby className="w-4 h-4" />
              הורים — חייבים לקרוא
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-5">
              מגיע לכם <span className="text-accent">החזרים של אלפי שקלים</span>
              <br className="hidden md:block" /> על אבחונים וטיפולים לילדים
            </h1>

            <p className="text-base md:text-xl text-primary-foreground/85 mb-8 leading-relaxed max-w-2xl mx-auto">
              אבחון קשב וריכוז, טיפול רגשי, קלינאית תקשורת, רכיבה טיפולית, הדרכת הורים — כל אלה מכוסים בכתב שירות
              ״התפתחות הילד״. <span className="text-brand-gold font-bold">רק 25 ש״ח בחודש לכל ילד.</span>
            </p>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto mb-8"
            >
              {[
                { value: "עד 80%", label: "החזר על אבחונים" },
                { value: "25 ש״ח", label: "בחודש לכל ילד" },
                { value: "אלפי ש״ח", label: "חיסכון לכל טיפול" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-3 md:p-4 border border-primary-foreground/15 backdrop-blur-md"
                  style={{ background: "linear-gradient(135deg, hsl(var(--brand-navy) / 0.6), hsl(var(--primary) / 0.45))" }}
                >
                  <p className="text-accent font-black text-lg md:text-2xl leading-none mb-1">{s.value}</p>
                  <p className="text-primary-foreground/75 text-[11px] md:text-sm leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                to="/lp/health-kids/check"
                className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30 animate-pulse-glow inline-flex items-center gap-2"
              >
                בדקו זכאות חינם
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            <NeedSelectCTA variant="dark" />
          </motion.div>
        </div>
        {/* Smooth color bridge keeps the hero dark before the branded diagonal cut */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-[1]"
          style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--brand-navy) / 0.55) 62%, hsl(var(--primary)) 100%)" }}
        />
      </section>

      {/* Diagonal divider matching site style — dark hero into a contrasting warm section */}
      <SectionDivider variant="slant" className="bg-primary text-brand-warm -mt-px -mb-px" />

      {/* ═══════ TREATMENTS GRID ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-warm" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[8%] left-[5%] w-72 h-72 rounded-full bg-brand-teal/10 blur-[120px]" />
          <div className="absolute bottom-[8%] right-[10%] w-64 h-64 rounded-full bg-brand-gold/15 blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12 space-y-4">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-black text-foreground">
              מה <span className="text-brand-gold">באמת מכוסה</span> בכתב השירות?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              עשרות טיפולים ואבחונים שמגיעים לילדים שלכם — מותאם גם למי שיש לו כבר ביטוח בריאות וגם למי שעוד אין.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {treatments.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="relative rounded-2xl p-6 glass-premium shadow-xl hover:shadow-accent/20 transition-all duration-300 group"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} ${t.iconColor} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">{t.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.desc}</p>

                  <div className="border-t border-border/70 pt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">מחיר שוק:</span>
                      <span className="text-foreground font-semibold text-left">{t.market}</span>
                    </div>
                    <div className="rounded-xl bg-gradient-to-l from-brand-gold/25 via-brand-gold/15 to-transparent border border-brand-gold/30 px-3 py-2.5 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-brand-gold shrink-0" />
                      <span className="text-brand-gold font-black text-sm md:text-base leading-tight">{t.savings}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link
              to="/lp/health-kids/check"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all shadow-2xl hover:shadow-accent/30 animate-pulse-glow"
            >
              <ArrowLeft className="w-6 h-6" />
              בדקו אם מגיע לכם
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Soft transition: warm → dark navy */}
      <SectionDivider variant="slant" className="bg-brand-warm text-primary -mt-px -mb-px" />

      {/* ═══════ MATH ═══════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Subtle, premium dark background — same family as the hero squeeze page */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary))] via-[hsl(var(--brand-navy))] to-[hsl(var(--primary))]" />
          <div className="absolute inset-0 opacity-90" style={{
            background: "radial-gradient(ellipse at 30% 20%, hsl(var(--brand-teal) / 0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, hsl(var(--brand-gold) / 0.12) 0%, transparent 55%)"
          }} />
        </div>
        <div className="absolute inset-0 dot-pattern opacity-[0.07]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[12%] left-[6%] w-72 h-72 rounded-full border border-primary-foreground/5 animate-spin-slow" />
          <div className="absolute bottom-[8%] right-[8%] w-56 h-56 rounded-full border border-brand-teal/10 animate-spin-slow" style={{ animationDirection: "reverse" }} />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center space-y-6">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl md:text-4xl font-black text-primary-foreground">
              25 שקלים בחודש. <span className="text-brand-gold">החזרים של אלפים.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/75 text-base md:text-lg">
              המתמטיקה פשוטה — ההפסד של לא להיות מבוטחים הוא המון כסף בכל שנה.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="glass-dark p-6 md:p-7 text-right space-y-3 max-w-xl mx-auto"
            >
              {[
                "25 ש״ח בחודש — לכל ילד במשפחה (לא לכל הילדים יחד)",
                "כיסוי למגוון רחב של אבחונים וטיפולים התפתחותיים",
                "אפשרות להוסיף לביטוח בריאות קיים — בלי לשנות שום דבר",
                "אנחנו מלווים אתכם בכל תהליך הגשת התביעה",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <p className="text-primary-foreground leading-relaxed">{line}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="pt-4">
              <NeedSelectCTA variant="dark" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Soft transition back to warm */}
      <SectionDivider variant="slant" className="bg-primary text-brand-warm -mt-px -mb-px" />

      {/* ═══════ COST BLOCK ═══════ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-warm" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[5%] w-64 h-64 rounded-full bg-brand-gold/20 blur-[100px]" />
          <div className="absolute bottom-[20%] left-[10%] w-56 h-56 rounded-full bg-brand-teal/15 blur-[120px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-gold/30 to-brand-teal/20 text-brand-gold">
              <ShieldCheck className="w-10 h-10" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-2xl md:text-4xl font-black text-foreground">
              עלות הכיסוי
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="flex flex-col items-center">
              <p className="text-brand-gold text-6xl md:text-7xl font-black leading-none">25 ש״ח</p>
              <p className="text-foreground/80 text-lg mt-2">בחודש — לכל ילד</p>
            </motion.div>
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              <strong className="text-foreground">תחזיר את עצמו בטיפול הראשון.</strong>
              <br />
              אבחון פסיכו-דידקטי ממוצע עולה כ-2,500 ש״ח — החזר של 80% = 2,000 ש״ח בידיים שלכם.
            </motion.p>
            <motion.div variants={fadeUp} custom={4}>
              <Link
                to="/lp/health-kids/check"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all shadow-2xl hover:shadow-accent/30 animate-pulse-glow mt-4"
              >
                <ArrowLeft className="w-6 h-6" />
                בדקו זכאות לילד שלכם
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1 rotate-180" />

      {/* ═══════ EMOTIONAL PAIN ═══════ */}
      <section className="relative py-14 md:py-20 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[10%] w-72 h-72 rounded-full bg-brand-red/10 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-64 h-64 rounded-full bg-brand-gold/10 blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-premium p-7 md:p-10 text-center space-y-5 border-2 border-brand-gold/20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-red/20 to-brand-gold/15 text-brand-red mx-auto">
              <HeartCrack className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl md:text-4xl font-black leading-tight">
              לחסוך מהילד משהו שהוא <span className="text-gradient-accent">באמת צריך</span> —
              <br className="hidden md:block" />
              רק בגלל המחיר?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              דמיינו את עצמכם יושבים מול המטפלת ושואלים את עצמכם
              <span className="text-foreground font-bold"> "כמה טיפולים אנחנו יכולים להרשות לעצמנו החודש?" </span>
              במקום לשאול את השאלה היחידה שצריכה להישאל —
              <span className="text-brand-gold font-black"> כמה טיפולים הוא צריך?</span>
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              ההורות הכי קשה היא כשמרגישים שהארנק מקבל החלטות במקום הלב.
              <br />
              <span className="font-bold">25 ש״ח בחודש</span> מורידים את ההתלבטות הזו מעל הכתפיים שלכם — לתמיד.
            </p>
            <div className="pt-2">
              <Link
                to="/lp/health-kids/check"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30 animate-pulse-glow"
              >
                בדקו זכאות עכשיו
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <FAQSection title="שאלות שהורים שואלים אותנו" items={faqs} />

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-14 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-black mb-4">
            הילדים שלכם <span className="text-gradient-accent">שווים את הבדיקה.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-6">
            הבדיקה לוקחת פחות מדקה. אם מגיע לכם — נציג לכם איך להוסיף את הכיסוי בעלות זניחה.
          </p>
          <Link
            to="/lp/health-kids/check"
            className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all shadow-2xl hover:shadow-accent/30 animate-pulse-glow"
          >
            <Sparkles className="w-5 h-5" />
            התחילו בדיקת זכאות חינם
          </Link>
        </div>
      </section>

      {/* Footer */}
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

export default LPHealthKidsPage;
