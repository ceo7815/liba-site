import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity, Dumbbell, Bike, Footprints, Trophy, Users,
  ShieldCheck, HeartPulse, Zap, AlertTriangle, ArrowLeft,
  Stethoscope, Hospital, ClipboardList, Wallet, TrendingDown,
  XCircle, CheckCircle2,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import AthleteForm from "@/components/athlete/AthleteForm";
import AthleteStickyMobileCTA from "@/components/athlete/AthleteStickyMobileCTA";
import AthleteMarquee from "@/components/athlete/AthleteMarquee";
import AthleteEKG from "@/components/athlete/AthleteEKG";
import { captureUtmFromUrl } from "@/lib/utm";
import { useClarityPageTags } from "@/hooks/useClarityPageTags";
import libaLogo from "@/assets/logo-light.png";

const TARGET_FORM_ID = "athlete-form-primary";

const scrollToForm = (id = TARGET_FORM_ID) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

/* ------------------------------- Sections ------------------------------- */

const TopBar = () => (
  <div className="relative z-20 border-b border-[hsl(var(--athlete-border))] bg-[hsl(var(--athlete-bg)/0.8)] backdrop-blur-md">
    <div className="container mx-auto px-4 max-w-6xl py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 select-none" aria-label="ליבה ביטוח ופנסיוני">
        <img
          src={libaLogo}
          alt="ליבה ביטוח ופנסיוני"
          className="h-9 md:h-10 w-auto"
        />
        <span className="hidden sm:block text-[11px] md:text-xs text-[hsl(var(--athlete-muted))] leading-tight border-r border-[hsl(var(--athlete-border))] pr-3">
          סוכנות ביטוח <br />
          <span className="text-[hsl(var(--athlete-text))] font-semibold">ליבה ביטוח ופנסיוני</span>
        </span>
      </div>
      <div className="flex items-center gap-1.5 font-heading font-black tracking-[0.08em] text-sm md:text-lg whitespace-nowrap">
        <Zap className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--athlete-accent))]" />
        <span className="athlete-text-gradient">LIBA-ATHLETE</span>
      </div>
    </div>
    <div className="athlete-chevron-strip" />
  </div>
);

const Hero = () => (
  <section className="relative overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24">
    <div className="absolute inset-0 athlete-grid-bg opacity-40" aria-hidden="true" />
    <div className="absolute inset-0 athlete-diagonal opacity-50" aria-hidden="true" />
    <div className="absolute -top-32 -right-20 w-[520px] h-[520px] athlete-glow-orange" aria-hidden="true" />
    <div className="absolute bottom-0 left-0 w-[380px] h-[380px] athlete-glow-orange opacity-50" style={{ background: "radial-gradient(circle, hsl(188 100% 50% / 0.45), transparent 70%)", filter: "blur(60px)" }} aria-hidden="true" />
    <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px]" style={{ background: "radial-gradient(circle, hsl(320 100% 60% / 0.35), transparent 70%)", filter: "blur(70px)" }} aria-hidden="true" />

    {/* Giant outlined display word */}
    <div className="pointer-events-none absolute -top-4 md:-top-8 left-0 right-0 text-center select-none" aria-hidden="true">
      <div className="athlete-stroke-text text-[14vw] md:text-[11vw] leading-none whitespace-nowrap tracking-tighter opacity-40">
        LIBA-ATHLETE
      </div>
    </div>

    <div className="relative z-10 container mx-auto px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-10">
        <span className="athlete-chip athlete-chip-accent text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--athlete-accent-2))] animate-pulse" />
          מעטפת ביטוח לספורטאים
        </span>
        <div className="hidden md:flex items-center gap-2 text-xs text-[hsl(var(--athlete-muted))]">
          <span>powered by</span>
          <span className="text-[hsl(var(--athlete-text))] font-semibold">ליבה ביטוח ופנסיוני</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <h1 className="sr-only">ביטוח לספורטאים ומתאמנים קבועים — LIBA-ATHLETE</h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="font-heading text-[2.4rem] md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
          >
            אתה מתאמן <br className="hidden md:inline" />
            <span className="text-[hsl(var(--athlete-text))]">כמו ספורטאי.</span>
            <br />
            אבל מבוטח כמו <br className="md:hidden" />
            <span className="athlete-text-gradient">בן אדם רגיל.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-[hsl(var(--athlete-text))] font-semibold"
          >
            אם האימונים הם חלק מהחיים שלך, הביטוח שלך לא יכול להישאר גנרי.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-base md:text-lg text-[hsl(var(--athlete-muted))] leading-relaxed max-w-xl"
          >
            LIBA-ATHLETE היא מעטפת ביטוח שנבנתה במיוחד לאנשים שחיים בתנועה, מעמיסים על הגוף ורוצים לדעת שגם אם פציעה עוצרת אותם — הם לא נשארים לבד.
          </motion.p>

          {/* EKG heartbeat line */}
          <div className="mt-6 max-w-md">
            <AthleteEKG className="h-12 opacity-90" />
            <div className="athlete-pulse-bar mt-2 opacity-80" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button onClick={() => scrollToForm()} className="athlete-cta-gradient text-base md:text-lg">
              בדוק התאמה ל־LIBA-ATHLETE
            </button>
            <a href="#who" className="athlete-cta-ghost text-sm md:text-base">למי זה מתאים?</a>
          </motion.div>

          <p className="mt-4 text-xs text-[hsl(var(--athlete-muted))]">
            בדיקה ראשונית ללא התחייבות &nbsp;|&nbsp; התאמה לפי גיל, סוג פעילות ותדירות אימונים
          </p>
        </div>

        {/* Floating stat cards */}
        <div className="relative h-[420px] md:h-[460px] hidden lg:block">
          {[
            { t: "3-5 אימונים בשבוע?", i: Activity, top: "0%", right: "10%", delay: "" },
            { t: "ריצה / קרוספיט / חדר כושר / רכיבה", i: Dumbbell, top: "26%", right: "55%", delay: "athlete-float-delay-1" },
            { t: "פציעה אחת יכולה לעצור שגרה שלמה", i: AlertTriangle, top: "55%", right: "5%", delay: "athlete-float-delay-2" },
            { t: "לא ביטוח גנרי. מעטפת לספורטאים.", i: ShieldCheck, top: "78%", right: "40%", delay: "athlete-float-delay-3" },
          ].map((c, i) => (
            <div
              key={i}
              className={`athlete-card athlete-float ${c.delay} absolute p-4 max-w-[260px] backdrop-blur-md`}
              style={{ top: c.top, right: c.right }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--athlete-accent)/0.15)] border border-[hsl(var(--athlete-accent)/0.45)] flex items-center justify-center text-[hsl(var(--athlete-accent-glow))]">
                  <c.i className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold">{c.t}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stat strip */}
      <div className="lg:hidden mt-10 grid grid-cols-2 gap-3">
        {[
          { t: "3-5 אימונים בשבוע?", i: Activity },
          { t: "ריצה / קרוספיט / רכיבה", i: Dumbbell },
          { t: "פציעה עוצרת שגרה שלמה", i: AlertTriangle },
          { t: "מעטפת לספורטאים", i: ShieldCheck },
        ].map((c, i) => (
          <div key={i} className="athlete-card p-3">
            <div className="flex items-center gap-2">
              <c.i className="w-4 h-4 text-[hsl(var(--athlete-accent))]" />
              <p className="text-xs font-semibold">{c.t}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const IdentitySection = () => {
  const tags = ["זמן", "כסף", "ציוד", "מאמנים", "תזונה", "שגרה", "משמעת"];
  const sideWords = ["עומס", "שגרה", "סיכון", "זהות", "הכנסה", "שיקום"];

  return (
    <section className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black leading-tight max-w-4xl">
          אם אתה מתאמן כמה פעמים בשבוע, אתה כבר{" "}
          <span className="text-[hsl(var(--athlete-accent))]">לא ״סתם עושה ספורט״</span>
        </motion.h2>

        <div className="grid md:grid-cols-[1fr_auto] gap-10 mt-10 items-start">
          <motion.div {...fadeUp} className="space-y-5 text-lg leading-relaxed text-[hsl(var(--athlete-text))]">
            <p>אתה אולי לא מתפרנס מזה. אולי אין לך חוזה בקבוצה. אולי אתה לא עולה לתחרות עם ספונסרים על החולצה.</p>
            <p>אבל אם אתה מתאמן כמה פעמים בשבוע, מעלה עומסים, רץ, רוכב, משחק, נלחם, מתחרה או דוחף את הגוף קדימה — אתה כבר לא נמצא באותו סיכון כמו אדם שלא זז מהכיסא.</p>
            <p className="text-[hsl(var(--athlete-muted))]">אתה משקיע בגוף שלך:</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => <span key={t} className="athlete-chip">{t}</span>)}
            </div>
            <p>אבל ברוב המקרים, הביטוח שלך עדיין מתייחס אליך כמו לכל אדם רגיל. ופה מתחילה הבעיה.</p>
            <p className="font-semibold">
              כי פציעה אחת לא עוצרת רק אימון. היא יכולה לעצור עבודה, הכנסה, שגרה, ביטחון, תוכניות — ואת כל מה שבנית סביב הגוף שלך.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="hidden md:flex flex-col gap-2 items-end">
            {sideWords.map((w, i) => (
              <span
                key={w}
                className="font-heading font-black text-3xl md:text-4xl"
                style={{
                  color: i % 2 === 0 ? "hsl(var(--athlete-accent))" : "hsl(var(--athlete-text))",
                  opacity: i % 2 === 0 ? 0.95 : 0.25,
                }}
              >
                {w}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PainSection = () => {
  const timeline = [
    { t: "כאב, נפיחות, חשד לפציעה", i: AlertTriangle },
    { t: "רופא / אורתופד", i: Stethoscope },
    { t: "MRI / בדיקות", i: ClipboardList },
    { t: "פיזיותרפיה / שיקום", i: HeartPulse },
    { t: "השבתה מאימונים", i: XCircle },
    { t: "פגיעה בעבודה / שגרה", i: TrendingDown },
    { t: "לחץ כלכלי", i: Wallet },
  ];
  const injuries = [
    "שבר ביד", "נקע חמור בקרסול", "קרע ברצועה", "קרע במיניסקוס",
    "פריקת כתף", "פציעת גב", "שברי מאמץ", "קרע בשריר",
    "נפילה מרכיבה", "חבלה ממשחק", "פציעה שמובילה לשיקום",
  ];

  return (
    <section className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))]">
      <div className="absolute inset-0 athlete-diagonal opacity-40" aria-hidden="true" />
      <div className="relative container mx-auto px-4 max-w-6xl">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black leading-tight max-w-4xl">
          הבעיה היא לא רק הפציעה.<br />
          <span className="text-[hsl(var(--athlete-accent))]">הבעיה היא מה שהיא עוצרת.</span>
        </motion.h2>

        <h3 className="sr-only">פציעות ספורט ושיקום</h3>

        <div className="mt-12 grid md:grid-cols-7 gap-3 md:gap-4 relative">
          {timeline.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="athlete-card p-4 text-center"
            >
              <div className="w-9 h-9 mx-auto mb-2 rounded-full bg-[hsl(var(--athlete-accent)/0.15)] border border-[hsl(var(--athlete-accent)/0.5)] flex items-center justify-center text-[hsl(var(--athlete-accent-glow))]">
                <s.i className="w-4 h-4" />
              </div>
              <p className="text-xs md:text-sm font-semibold leading-snug">{s.t}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-14">
          <h3 className="font-heading text-xl md:text-2xl font-extrabold mb-4">פציעות שכיחות באימונים:</h3>
          <div className="flex flex-wrap gap-2">
            {injuries.map((inj, i) => (
              <span
                key={inj}
                className={`athlete-chip ${i % 3 === 0 ? "athlete-chip-accent" : ""}`}
              >
                {inj}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CaseStudySection = () => (
  <section className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))]">
    <div className="absolute inset-0 athlete-grid-bg opacity-20" aria-hidden="true" />
    <div className="relative container mx-auto px-4 max-w-6xl">
      <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black leading-tight">
        תנועה אחת לא טובה.<br />
        <span className="text-[hsl(var(--athlete-accent))]">חודשים של השלכות.</span>
      </motion.h2>
      <p className="mt-3 text-[hsl(var(--athlete-muted))] text-lg">
        דוגמה: קרע ברצועה או פציעת ברך באימון רגיל
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <motion.div {...fadeUp} className="athlete-card p-6 md:p-8">
          <h3 className="font-heading text-xl font-extrabold mb-4 text-[hsl(var(--athlete-accent))]">מה קרה?</h3>
          <ol className="space-y-3 text-[hsl(var(--athlete-text))]">
            {[
              "אימון רגיל",
              "סיבוב חד",
              "נחיתה לא מדויקת",
              "כאב חד בברך",
              "נפיחות וקושי לדרוך",
              "חשד לקרע ברצועה / מיניסקוס",
            ].map((s, i) => (
              <li key={s} className="flex gap-3 items-start">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[hsl(var(--athlete-accent)/0.15)] border border-[hsl(var(--athlete-accent)/0.5)] text-[hsl(var(--athlete-accent-glow))] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div {...fadeUp} className="athlete-card p-6 md:p-8">
          <h3 className="font-heading text-xl font-extrabold mb-4 text-[hsl(var(--athlete-accent))]">מה זה יכול לגרור?</h3>
          <ul className="space-y-3 text-[hsl(var(--athlete-text))]">
            {[
              "בדיקות פרטיות יכולות להגיע למאות עד אלפי שקלים",
              "שיקום ופיזיותרפיה יכולים להימשך שבועות או חודשים",
              "המתנה לתורים יכולה לעכב חזרה לשגרה",
              "עצמאים ומאמנים עלולים להיפגע גם בהכנסה",
              "הפציעה עצמה היא רק תחילת המסלול",
            ].map((s) => (
              <li key={s} className="flex gap-3 items-start">
                <ArrowLeft className="w-4 h-4 mt-1 text-[hsl(var(--athlete-accent))] shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-[hsl(var(--athlete-text))] mb-3">רוצה לבדוק אם אתה מכוסה למצב כזה?</p>
        <button onClick={() => scrollToForm()} className="athlete-cta-gradient">בדוק התאמה</button>
      </div>
    </div>
  </section>
);

const WhoSection = () => {
  const cards = [
    { t: "מתאמני חדר כושר קבועים", d: "מתאמנים 3 פעמים בשבוע ומעלה, מעלים עומסים ומתייחסים לאימון כחלק מהחיים.", i: Dumbbell },
    { t: "קרוספיט ופונקציונלי", d: "אימונים עצימים, קפיצות, הנפות ותנועות מורכבות — בדיוק המקומות שבהם פציעה עוצרת שגרה.", i: Zap },
    { t: "רצים ורצות", d: "מ־5 ק״מ ועד מרתון וטריאתלון. עומסים חוזרים, ברכיים, קרסוליים ושברי מאמץ.", i: Footprints },
    { t: "רוכבי אופניים", d: "כביש, שטח, קבוצות וסופי שבוע. נפילה אחת יכולה להפוך לאירוע משמעותי.", i: Bike },
    { t: "כדורגל / כדורסל / טניס", d: "משחק קבוע, שינוי כיוון חד, נחיתה לא טובה — והגוף משלם את המחיר.", i: Trophy },
    { t: "ספורטאים תחרותיים", d: "אנשים שמתאמנים לתוצאה, משתתפים בתחרויות ורוצים מעטפת רצינית.", i: Activity },
    { t: "בני נוער שמתאמנים ברצינות", d: "להורים שמשקיעים באימונים, ציוד, נסיעות ותחרויות ורוצים לחשוב צעד קדימה.", i: Users },
    { t: "מאמנים ואנשי תנועה", d: "מאמני כושר, מדריכי סטודיו ומדריכי רכיבה — הגוף הוא חלק מהעבודה.", i: ShieldCheck },
  ];
  return (
    <section id="who" className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black mb-3">
          למי LIBA-ATHLETE מתאים?
        </motion.h2>
        <h3 className="sr-only">ביטוח לספורטאים חובבים ומקצועיים</h3>
        <p className="text-[hsl(var(--athlete-muted))] text-lg mb-10 max-w-3xl">
          ביטוח לחדר כושר, קרוספיט, ריצה, רכיבה, משחקי כדור ובני נוער שמתאמנים — מעטפת אחת לסגנון חיים פעיל.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <motion.article
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="athlete-card p-6"
            >
              <c.i className="w-7 h-7 text-[hsl(var(--athlete-accent))] mb-3" />
              <h4 className="font-heading text-lg font-extrabold mb-1.5">{c.t}</h4>
              <p className="text-sm text-[hsl(var(--athlete-muted))] leading-relaxed">{c.d}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhatYouGetSection = () => {
  const items = [
    "כיסוי ייעודי לתאונות ופציעות ספורט",
    "פיצוי במקרים של שברים ופציעות, בהתאם לתנאי החבילה",
    "מענה למצבים של השבתה ופגיעה בשגרה",
    "אפשרויות הרחבה לרוכבים וספורט מוטורי",
    "התאמה לחובבנים רציניים, ספורטאים תחרותיים ובני נוער פעילים",
    "בדיקת התאמה לפי גיל, סוג פעילות ותדירות אימונים",
    "בחינה של הביטוחים הקיימים שלך מול אורח החיים שלך בפועל",
  ];
  return (
    <section className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))] bg-[hsl(var(--athlete-surface)/0.4)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black mb-3">
          מה מקבלים ב־<span className="text-[hsl(var(--athlete-accent))]">LIBA-ATHLETE</span>?
        </motion.h2>
        <p className="text-[hsl(var(--athlete-muted))] text-lg mb-10 max-w-3xl">
          מעטפת ביטוח שנבנתה סביב הצרכים של אנשים פעילים — לא סביב אדם שיושב כל היום ולא זז.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="athlete-card p-5 flex gap-3 items-start"
            >
              <CheckCircle2 className="w-6 h-6 text-[hsl(var(--athlete-accent))] shrink-0 mt-0.5" />
              <p className="font-medium">{t}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-[hsl(var(--athlete-muted))] mt-6 text-center">
          הכיסויים כפופים לתנאי הפוליסה, חיתום והתאמה אישית.
        </p>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  const rows = [
    ["מגלה בדיעבד שאתה לא יודע מה מכוסה", "מגיע עם מעטפת שנבנתה מראש לסיכוני ספורט"],
    ["מתחיל לרדוף אחרי תשובות לבד", "יודע מה לבדוק ולמי לפנות"],
    ["כל בדיקה או טיפול מרגישים כמו הוצאה מפתיעה", "יש כיסוי או פיצוי בהתאם לתנאי החבילה"],
    ["הפציעה הופכת ללחץ כלכלי", "יש רשת ביטחון שמפחיתה לחץ"],
    ["מתמודד עם השבתה בלי הכנה", "יש תכנון מראש לרגע שהגוף צריך לעצור"],
    ["מגיב רק אחרי שזה קורה", "מתכונן לפני"],
  ];
  return (
    <section className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black mb-10">
          אותה פציעה.<br />
          <span className="text-[hsl(var(--athlete-accent))]">שתי מציאויות שונות.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="athlete-card p-6 opacity-80">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-[hsl(var(--athlete-muted))]" />
              <h3 className="font-heading text-lg font-extrabold">בלי LIBA-ATHLETE</h3>
            </div>
            <ul className="space-y-3">
              {rows.map(([l]) => (
                <li key={l} className="text-sm text-[hsl(var(--athlete-muted))] border-b border-[hsl(var(--athlete-border))] pb-3 last:border-0">{l}</li>
              ))}
            </ul>
          </div>

          <div
            className="athlete-card p-6"
            style={{
              borderColor: "hsl(var(--athlete-accent) / 0.7)",
              boxShadow: "0 0 0 1px hsl(var(--athlete-accent) / 0.35), 0 20px 60px -20px hsl(var(--athlete-accent) / 0.35)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--athlete-accent))]" />
              <h3 className="font-heading text-lg font-extrabold text-[hsl(var(--athlete-accent))]">עם LIBA-ATHLETE</h3>
            </div>
            <ul className="space-y-3">
              {rows.map(([, r]) => (
                <li key={r} className="text-sm font-medium border-b border-[hsl(var(--athlete-border))] pb-3 last:border-0">{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center mt-10 text-lg md:text-xl font-semibold">
          בלי LIBA-ATHLETE אתה מגלה את הפער <span className="text-[hsl(var(--athlete-muted))]">אחרי</span> הפציעה.<br />
          עם LIBA-ATHLETE אתה בודק אותו <span className="text-[hsl(var(--athlete-accent))]">לפני</span>.
        </p>
      </div>
    </section>
  );
};

const WhyNotGenericSection = () => (
  <section className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))] bg-[hsl(var(--athlete-surface)/0.4)]">
    <div className="container mx-auto px-4 max-w-6xl">
      <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black mb-10">
        זה לא עוד ביטוח.<br />
        <span className="text-[hsl(var(--athlete-accent))]">זו מעטפת לאנשים שהגוף שלהם עובד קשה.</span>
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="athlete-card p-6">
          <h3 className="font-heading text-xl font-extrabold mb-4 text-[hsl(var(--athlete-muted))]">ביטוח גנרי</h3>
          <ul className="space-y-2 text-[hsl(var(--athlete-muted))]">
            <li>• מדבר בשפה כללית</li>
            <li>• לא מתייחס לספורט</li>
            <li>• לא שואל איך אתה חי</li>
            <li>• לא בוחן עומסים ותדירות אימונים</li>
          </ul>
        </div>
        <div className="athlete-card p-6" style={{ borderColor: "hsl(var(--athlete-accent) / 0.6)" }}>
          <h3 className="font-heading text-xl font-extrabold mb-4 text-[hsl(var(--athlete-accent))]">LIBA-ATHLETE</h3>
          <ul className="space-y-2">
            <li>• נבנה סביב אורח חיים פעיל</li>
            <li>• מדבר על פציעות ספורט</li>
            <li>• מתייחס לשיקום והשבתה</li>
            <li>• בודק התאמה לפי סוג פעילות</li>
            <li>• עוזר להבין אם ההגנה שלך מתאימה לחיים שלך היום</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const PrimaryFormSection = () => (
  <section id={TARGET_FORM_ID} className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))]">
    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] athlete-glow-orange opacity-50" aria-hidden="true" />
    <div className="relative container mx-auto px-4 max-w-2xl">
      <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black text-center mb-3">
        בדוק אם <span className="text-[hsl(var(--athlete-accent))]">LIBA-ATHLETE</span> מתאים לך
      </motion.h2>
      <p className="text-center text-[hsl(var(--athlete-muted))] mb-8">
        השאר פרטים ונחזור אליך לבדיקה ראשונית לפי סוג הפעילות, הגיל ותדירות האימונים שלך.
      </p>
      <div className="athlete-card p-6 md:p-8">
        <AthleteForm formId="athlete-form-primary-inner" />
      </div>
    </div>
  </section>
);

const FAQ_ITEMS = [
  { question: "אני לא ספורטאי מקצועי. זה עדיין רלוונטי אליי?", answer: "כן. דווקא חובבנים רציניים הם חלק גדול מהקהל של LIBA-ATHLETE. אם אתה מתאמן כמה פעמים בשבוע, משתתף במשחקים, רץ, רוכב, מרים משקלים או חי אורח חיים פעיל — אתה חשוף לפציעות ספורט גם אם אתה לא מתפרנס מזה." },
  { question: "יש לי כבר ביטוח בריאות. למה אני צריך את זה?", answer: "יכול להיות שיש לך כיסוי טוב, ויכול להיות שיש לך פערים שאתה לא מודע אליהם. המטרה היא לבדוק האם הביטוח הקיים באמת מתאים לאורח חיים ספורטיבי, לפציעות, להשבתה ולצרכים שלך בפועל." },
  { question: "זה מתאים גם להורים לילדים שמתאמנים?", answer: "כן. אם הילד או הילדה מתאמנים בצורה רצינית, משתתפים בחוגים, קבוצות, תחרויות או אימונים קבועים — שווה לבדוק התאמה. במיוחד כשהמשפחה כבר משקיעה זמן וכסף בספורט." },
  { question: "זה מתאים לרוכבי אופניים?", answer: "כן, בכפוף להתאמה ולתנאי החבילה. רוכבים הם קהל מאוד רלוונטי כי הסיכון לנפילות, שברים והשבתה גבוה יותר מאדם רגיל." },
  { question: "מה קורה אם כבר נפצעתי בעבר?", answer: "זה תלוי במקרה, בהצהרת הבריאות, בתנאי הפוליסה ובחיתום. לכן לא מבטיחים באוויר. בודקים התאמה בצורה מסודרת." },
  { question: "כמה זה עולה?", answer: "המחיר משתנה לפי גיל, מצב בריאותי, סוג פעילות, היקף כיסוי והתאמות נוספות. אחרי השארת פרטים נבדוק התאמה ונציג אפשרויות רלוונטיות." },
];

const FinalCTASection = () => (
  <section className="relative py-20 md:py-28 border-t border-[hsl(var(--athlete-border))]">
    <div className="absolute inset-0 athlete-diagonal opacity-40" aria-hidden="true" />
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] athlete-glow-orange opacity-50" aria-hidden="true" />
    <div className="relative container mx-auto px-4 max-w-3xl text-center">
      <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-5xl font-black leading-tight">
        הגוף שלך כבר עובד קשה.<br />
        <span className="text-[hsl(var(--athlete-accent))]">הגיע הזמן שגם הביטוח שלך יעבוד בשבילך.</span>
      </motion.h2>
      <p className="mt-5 text-[hsl(var(--athlete-muted))] text-lg max-w-2xl mx-auto">
        אם אתה מתאמן ברצינות, אל תחכה לפציעה כדי לגלות שההגנה שלך לא נבנתה בשבילך.
      </p>

      <div className="mt-10 athlete-card p-6 md:p-8 text-right">
        <AthleteForm formId="athlete-form-final" />
      </div>
    </div>
  </section>
);

const AthleteFooter = () => (
  <footer className="border-t border-[hsl(var(--athlete-border))]">
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <div className="flex items-center gap-2 font-heading font-black tracking-widest text-lg">
            <Zap className="w-5 h-5 text-[hsl(var(--athlete-accent))]" />
            LIBA-ATHLETE
          </div>
          <p className="text-sm text-[hsl(var(--athlete-muted))] mt-2">מעטפת ביטוח לאנשים שחיים בתנועה.</p>
        </div>
        <div className="text-sm text-[hsl(var(--athlete-muted))] md:text-left">
          <div className="flex md:justify-end items-center gap-4 mb-3">
            <Link to="/privacy-policy" className="hover:text-[hsl(var(--athlete-text))]">מדיניות פרטיות</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-[hsl(var(--athlete-text))]">תנאי שימוש</Link>
            <span>|</span>
            <Link to="/accessibility" className="hover:text-[hsl(var(--athlete-text))]">הצהרת נגישות</Link>
          </div>
          <p className="text-xs leading-relaxed">
            המידע באתר אינו מהווה ייעוץ ביטוחי אישי או התחייבות לכיסוי. הכיסויים כפופים לתנאי הפוליסה, הצהרת בריאות, חיתום והתאמה אישית.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

/* ------------------------------- Page ----------------------------------- */

const LPAthletePage = () => {
  useClarityPageTags({ pageType: "landing-page", lpCampaign: "athlete", funnelStep: "landing" });

  useEffect(() => {
    captureUtmFromUrl();
    // IMPORTANT: do NOT call trackLead here. Lead event fires only on /athlete-thankyou.
  }, []);

  return (
    <main className="athlete-scope min-h-screen overflow-x-hidden" dir="rtl">
      <SEOHead
        title="LIBA-ATHLETE | ביטוח לספורטאים ומתאמנים קבועים"
        description="מעטפת ביטוח ייחודית לספורטאים, מתאמנים קבועים, רוכבים, רצים, קרוספיט וחדר כושר. בדיקת התאמה לפי גיל, סוג פעילות ותדירות אימונים."
        canonical="/athlete-pack"
        keywords={[
          "ביטוח לספורטאים", "ביטוח תאונות ספורט", "ביטוח פציעות ספורט",
          "ביטוח למתאמנים", "ביטוח חדר כושר", "ביטוח קרוספיט", "ביטוח ריצה",
          "ביטוח לרוכבי אופניים", "ביטוח לבני נוער בספורט", "פציעות ספורט",
          "ביטוח למאמני כושר",
        ]}
        faqItems={FAQ_ITEMS}
        serviceSchema={{
          name: "LIBA-ATHLETE — ביטוח לספורטאים ומתאמנים",
          description: "מעטפת ביטוח לספורטאים חובבים ותחרותיים, רוכבי אופניים, רצים, קרוספיט וחדר כושר.",
        }}
      />

      <TopBar />
      <Hero />
      <AthleteMarquee />
      <IdentitySection />
      <PainSection />
      <div className="athlete-chevron-strip" />
      <CaseStudySection />
      <WhoSection />
      <AthleteMarquee items={["NO EXCUSES", "NO LIMITS", "LIBA-ATHLETE", "ביטוח שעובד בקצב שלך", "TRAIN HARD", "STAY COVERED"]} />
      <WhatYouGetSection />
      <ComparisonSection />
      <WhyNotGenericSection />
      <PrimaryFormSection />

      <section className="border-t border-[hsl(var(--athlete-border))] bg-[hsl(var(--athlete-surface)/0.3)]">
        <FAQSection title="שאלות נפוצות" items={FAQ_ITEMS} />
      </section>

      <FinalCTASection />
      <AthleteFooter />

      <AthleteStickyMobileCTA targetId={TARGET_FORM_ID} label="בדוק התאמה ל־LIBA-ATHLETE" />
    </main>
  );
};

export default LPAthletePage;
