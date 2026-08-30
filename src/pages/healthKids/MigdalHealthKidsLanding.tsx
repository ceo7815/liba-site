import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import {
  Brain,
  MessageCircle,
  Heart,
  Users,
  Waves,
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
  Activity,
  HelpCircle,
  Baby,
  HeartCrack,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { MigdalShell } from "@/components/health-kids/MigdalShell";
import {
  healthKidsNeedStorageKey,
  type HealthKidsCampaign,
} from "@/data/healthKidsCampaigns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NEED_OPTIONS = [
  "אבחון קשב וריכוז / דידקטי",
  "קלינאית תקשורת",
  "טיפול רגשי",
  "רכיבה / שחייה טיפולית",
  "הדרכת הורים",
  "אין משהו ספציפי / רוצה לבדוק",
];

const treatments = [
  { icon: Brain, title: "אבחון דידקטי / פסיכו-דידקטי", desc: "איתור לקויות למידה, קשב וריכוז ודיסלקציה — מותאם לבית הספר.", market: "כ-2,500 ש״ח לאבחון", savings: "חיסכון של עד 2,000 ש״ח" },
  { icon: MessageCircle, title: "קלינאית תקשורת", desc: "טיפולי שפה ודיבור — ילדים שמתקשים בהיגוי, אוצר מילים או שטף.", market: "סדרה של 10 טיפולים: כ-3,000–4,500 ש״ח", savings: "חיסכון של אלפי ש״ח לסדרה" },
  { icon: Heart, title: "טיפול רגשי ופסיכולוגי", desc: "מענה רגשי לילדים בתקופות מאתגרות — חרדות, גירושים, התמודדויות.", market: "סדרה של 10 טיפולים: כ-3,500–5,000 ש״ח", savings: "חיסכון של אלפי ש״ח לסדרה" },
  { icon: Activity, title: "רכיבה טיפולית", desc: "כלי רב עוצמה לוויסות חושי, ביטחון עצמי וקואורדינציה.", market: "סדרה של 10 טיפולים: כ-2,000–3,000 ש״ח", savings: "חיסכון של מאות עד אלפי ש״ח" },
  { icon: Waves, title: "שחייה טיפולית", desc: "תמיכה בהתפתחות מוטורית ורגשית — מצוין לילדים עם קשיים סנסוריים.", market: "סדרה של 10 טיפולים: כ-1,800–2,500 ש״ח", savings: "חיסכון של מאות עד אלפי ש״ח" },
  { icon: Users, title: "הדרכת הורים", desc: "ההפתעה הגדולה — כן, גם לכם מגיעים כלים מקצועיים. וזה מכוסה.", market: "סדרה של 10 מפגשים: כ-4,000 ש״ח", savings: "חיסכון של אלפי ש״ח לסדרה" },
];

const faqs = [
  { question: "כבר יש לי ביטוח בריאות לילד — זה רלוונטי גם לי?", answer: "בהחלט. כתב השירות ״התפתחות הילד״ של מגדל מתווסף לרוב הפוליסות הקיימות בלי לשנות שום דבר אחר." },
  { question: "אין לי כרגע שום ביטוח בריאות לילד — זה עדיין שווה לי?", answer: "כן. ב-30 ש״ח לחודש לכל ילד זה אחד הכיסויים המשתלמים בשוק. אבחון בודד או סדרת טיפולים מחזירים את ההשקעה לשנים קדימה." },
  { question: "מה ההבדל בין זה לבין מה שמכוסה בקופת חולים?", answer: "קופת חולים נותנת מענה חלקי — תורים ארוכים ובחירה מוגבלת. הכיסוי של מגדל מאפשר לבחור מומחה, לקבל מענה מהיר, והחזר משמעותי." },
  { question: "הילד שלי בריא לגמרי — זה לא בזבוז?", answer: "לקויות למידה וקשב מתגלים פעמים רבות רק בכיתה א׳–ג׳. לא מצטרפים אחרי שצריך — אלא לפני." },
  { question: "המחיר אמיתי?", answer: "המחיר מוצג מראש לפי תעריפון רשמי של מגדל. בלי הפתעות." },
  { question: "האם זה יסבך את הביטוח הקיים?", answer: "לא. סוכנות ליבה מטפלת בהצטרפות מול מגדל, בלי לשנות פרט בפוליסה הקיימת." },
  { question: "אפשר לבטל?", answer: "ניתן לבטל בכל עת ללא קנס, על פי חוק חוזה הביטוח." },
  { question: "תוך כמה זמן מקבלים החזר?", answer: "לרוב 14–30 יום מרגע הגשת תביעה תקינה. ליבה מלווים אתכם בהגשה מול מגדל." },
];

const LimeButton = ({ to, children, className = "" }: { to: string; children: ReactNode; className?: string }) => (
  <Link
    to={to}
    className={`migdal-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base md:text-lg shadow-sm ${className}`}
  >
    {children}
    <ArrowLeft className="w-5 h-5" />
  </Link>
);

const NeedSelect = ({ campaignId, checkPath }: { campaignId: HealthKidsCampaign["id"]; checkPath: string }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-6 md:p-7 shadow-[0_12px_40px_rgba(2,1,64,0.08)] text-center">
      <p className="text-sm font-semibold text-[#020140]/70 mb-2 flex items-center justify-center gap-2">
        <HelpCircle className="w-4 h-4" />
        ספרו לנו מה הצורך — ונבדוק זכאות במגדל
      </p>
      <h3 className="font-heading font-bold text-xl md:text-2xl text-[#020140] mb-4">איזה תחום הכי רלוונטי לילד שלכם?</h3>
      <Select
        onValueChange={(val) => {
          try { sessionStorage.setItem(healthKidsNeedStorageKey(campaignId), val); } catch { /* ignore */ }
          navigate(checkPath);
        }}
      >
        <SelectTrigger className="select-trigger-center h-12 text-base rounded-lg font-semibold bg-[#eef2f6] border-[#020140]/15 text-[#020140]">
          <SelectValue placeholder="בחרו מהרשימה כדי להמשיך…" />
        </SelectTrigger>
        <SelectContent dir="rtl" className="text-right">
          {NEED_OPTIONS.map((n) => (
            <SelectItem key={n} value={n} className="justify-start pl-2 pr-8 text-right [&>span.absolute]:left-auto [&>span.absolute]:right-2">
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-[#020140]/50 mt-3">בחירה אינה מחייבת — מעבירה אתכם ישירות לבדיקת זכאות.</p>
    </div>
  );
};

const MigdalHealthKidsLanding = ({ campaign }: { campaign: HealthKidsCampaign }) => {
  const checkPath = `${campaign.basePath}/check`;

  return (
    <MigdalShell campaign={campaign}>
      <SEOHead
        title="מגדל | כתב שירות התפתחות הילד — 30 ש״ח לילד | בשיתוף סוכנות ליבה"
        description="רק במגדל: כתב שירות התפתחות הילד — החזרים על אבחונים וטיפולים לילדים. 30 ש״ח בחודש. בדיקת זכאות חינם בשיתוף סוכנות ליבה."
        canonical={campaign.basePath}
        keywords={["מגדל", "התפתחות הילד", "כתב שירות מגדל", "החזר אבחון דידקטי"]}
        noindex
      />

      <section className="migdal-hero-canvas relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 right-[12%] w-32 h-32 rounded-[1.5rem] rotate-12 bg-[#c5b8ee]/25" />
          <div className="absolute bottom-[8%] right-[8%] w-14 h-14 rounded-lg bg-[#a2eb9a]/30 rotate-45" />
        </div>

        <div className="relative container mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 md:p-9 shadow-[0_16px_50px_rgba(2,1,64,0.1)]">
              <div className="inline-flex items-center gap-2 text-[#020140] mb-4">
                <Baby className="w-8 h-8" />
                <span className="text-sm font-bold tracking-wide">רק במגדל</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-black text-[#020140] leading-[1.15] mb-4">
                מגיע לכם החזרים של אלפי שקלים
                <span className="block">על אבחונים וטיפולים לילדים</span>
              </h1>
              <p className="text-base md:text-lg text-[#020140]/80 leading-relaxed mb-6">
                אבחון קשב, טיפול רגשי, קלינאית תקשורת, רכיבה טיפולית והדרכת הורים — מכוסים בכתב השירות של מגדל.
                <strong className="block mt-2 text-[#020140]">רק 30 ש״ח בחודש לכל ילד.</strong>
              </p>
              <LimeButton to={checkPath}>בדקו זכאות חינם</LimeButton>
              <p className="text-xs text-[#020140]/50 mt-4">בשיתוף סוכנות ליבה · בדיקה ללא התחייבות</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="bg-white p-1.5 rounded-lg shadow-[0_12px_40px_rgba(2,1,64,0.1)]">
                <img
                  src={heroBg}
                  alt="ייעוץ מקצועי להורים — כתב שירות התפתחות הילד של מגדל"
                  className="w-full h-[280px] md:h-[400px] object-cover object-center rounded-[6px]"
                />
              </div>
              <div className="mt-3 bg-white rounded-lg overflow-hidden shadow-[0_6px_20px_rgba(2,1,64,0.06)] grid grid-cols-3 divide-x divide-x-reverse divide-[#e4eaf2]">
                {[
                  { value: "עד 80%", label: "החזר על אבחונים" },
                  { value: "30 ₪", label: "לחודש לילד" },
                  { value: "אלפי ₪", label: "חיסכון לטיפול" },
                ].map((s) => (
                  <div key={s.label} className="px-2 py-3 text-center">
                    <p className="font-black text-[#020140] text-base md:text-lg leading-none mb-1">{s.value}</p>
                    <p className="text-[#020140]/55 text-[10px] md:text-xs leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-10 max-w-2xl mx-auto">
            <NeedSelect campaignId={campaign.id} checkPath={checkPath} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-[#020140]/55 mb-2">הצטרפות אונליין</p>
            <h2 className="font-heading text-2xl md:text-4xl font-black text-[#020140]">
              מה באמת מכוסה בכתב השירות של מגדל?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {treatments.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="bg-[#eef2f6] rounded-2xl p-6 text-center hover:bg-white hover:shadow-[0_12px_32px_rgba(2,1,64,0.08)] transition-all">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#020140]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#020140] mb-2">{t.title}</h3>
                  <p className="text-sm text-[#020140]/70 leading-relaxed mb-4">{t.desc}</p>
                  <p className="text-xs text-[#020140]/55 mb-2">מחיר שוק: {t.market}</p>
                  <p className="inline-block text-sm font-bold text-[#020140] bg-[#a2eb9a] rounded-md px-3 py-1.5">{t.savings}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <LimeButton to={checkPath}>מעניין, ספרו לי עוד</LimeButton>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#eef2f6]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl p-7 md:p-10 text-center space-y-5 shadow-[0_12px_40px_rgba(2,1,64,0.08)]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#eef2f6] text-[#020140] mx-auto">
              <HeartCrack className="w-7 h-7" />
            </div>
            <h2 className="font-heading text-2xl md:text-4xl font-black text-[#020140] leading-tight">
              לחסוך מהילד משהו שהוא <span className="text-[#3d9a45]">באמת צריך</span> — רק בגלל המחיר?
            </h2>
            <p className="text-[#020140]/75 text-base md:text-lg leading-relaxed">
              דמיינו את עצמכם יושבים מול המטפלת ושואלים את עצמכם
              {" "}
              <span className="text-[#020140] font-bold">"כמה טיפולים אנחנו יכולים להרשות לעצמנו החודש?"</span>
              {" "}
              במקום לשאול את השאלה היחידה שצריכה להישאל —
              {" "}
              <span className="text-[#3d9a45] font-black">כמה טיפולים הוא צריך?</span>
            </p>
            <p className="text-[#020140]/80 text-base md:text-lg leading-relaxed">
              ההורות הכי קשה היא כשמרגישים שהארנק מקבל החלטות במקום הלב.
              {" "}
              <strong className="text-[#020140]">30 ש״ח בחודש</strong>
              {" "}
              מורידים את ההתלבטות הזו מעל הכתפיים שלכם — לתמיד.
            </p>
            <div className="pt-1">
              <LimeButton to={checkPath}>בדקו זכאות עכשיו</LimeButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 migdal-hero-canvas">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-black text-[#020140] mb-4">
            לראות רחוק. גם בהתפתחות הילד.
          </h2>
          <p className="text-[#020140]/70 text-lg mb-8">30 שקלים בחודש במגדל. החזרים של אלפים.</p>
          <div className="bg-white rounded-2xl p-6 md:p-8 text-right space-y-3 shadow-[0_12px_40px_rgba(2,1,64,0.08)] max-w-xl mx-auto mb-8">
            {[
              "30 ש״ח בחודש — לכל ילד במשפחה",
              "כיסוי לאבחונים וטיפולים התפתחותיים במגדל",
              "אפשרות להוסיף לביטוח בריאות קיים",
              "סוכנות ליבה מלווים אתכם מול מגדל בכל תביעה",
            ].map((line) => (
              <div key={line} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#3d9a45] shrink-0 mt-0.5" />
                <p className="text-[#020140]">{line}</p>
              </div>
            ))}
          </div>
          <NeedSelect campaignId={campaign.id} checkPath={checkPath} />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-[#020140]" />
          <h2 className="font-heading text-2xl md:text-4xl font-black text-[#020140] mb-3">עלות הכיסוי במגדל</h2>
          <p className="text-6xl md:text-7xl font-black text-[#020140] leading-none">30 ₪</p>
          <p className="text-[#020140]/70 mt-2 mb-6">בחודש — לכל ילד</p>
          <p className="text-[#020140]/75 leading-relaxed mb-8">
            תחזיר את עצמו בטיפול הראשון. אבחון פסיכו-דידקטי ממוצע עולה כ-2,500 ש״ח — החזר של 80% = 2,000 ש״ח.
          </p>
          <LimeButton to={checkPath}>להצטרפות — בדקו זכאות</LimeButton>
        </div>
      </section>

      <section className="py-16 bg-[#eef2f6]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-black text-[#020140] text-center mb-8">שאלות שהורים שואלים אותנו</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="bg-white rounded-xl px-5 border-none shadow-sm">
                <AccordionTrigger className="text-right font-heading font-semibold text-[#020140] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#020140]/70 leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-black text-[#020140] mb-3">רוצים לראות איתנו רחוק?</h2>
          <p className="text-[#020140]/70 text-lg mb-6">כמה פרטים, אנחנו כבר נדאג להמשך מול מגדל.</p>
          <LimeButton to={checkPath}>צרו איתי קשר — בדיקת זכאות</LimeButton>
        </div>
      </section>
    </MigdalShell>
  );
};

export default MigdalHealthKidsLanding;
