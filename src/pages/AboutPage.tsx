import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, Eye, Users, Heart, Target, Handshake } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import InsuranceLogos from "@/components/InsuranceLogos";
import FAQSection from "@/components/FAQSection";
import SectionDivider from "@/components/SectionDivider";
import TeamCarousel from "@/components/TeamCarousel";

const values = [
  { icon: <Eye className="w-7 h-7" />, title: "שקיפות מלאה", desc: "אנחנו מסבירים בפשטות מה יש בתיק, מה חסר, ומה כדאי לשנות — ולמה." },
  { icon: <Target className="w-7 h-7" />, title: "החלטות מבוססות נתונים", desc: "לא לחץ, לא מניפולציות. קודם בודקים — אחר כך מחליטים." },
  { icon: <Shield className="w-7 h-7" />, title: "תמונה רחבה", desc: "ביטוח + פנסיה + פיננסים + פרישה — הכול תחת מעטפת אחת." },
  { icon: <Handshake className="w-7 h-7" />, title: "ליווי לאורך זמן", desc: "החיים משתנים, והתיק צריך להתאים. אנחנו כאן לכל שלב." },
];

const differentiators = [
  "לא עובדים בשביל חברת ביטוח אחת — מתאימים פתרון לפי צורך",
  "בודקים קודם, ממליצים אחר כך — בלי לחץ לסגור",
  "מסבירים בשפה פשוטה, בלי מונחים מסובכים",
  "מלווים גם אחרי הרכישה — כי התיק חי ומשתנה",
  "מביאים ניסיון מהשטח בתחומי ביטוח, פנסיה ופיננסים",
  "זמינים כשצריך — באמת",
];

const whatWeDo = [
  { icon: <Shield className="w-8 h-8" />, title: "ביטוח למשפחה", desc: "בריאות, חיים, משכנתא, מחלות קשות ונסיעות — כיסוי מותאם למצב שלכם." },
  { icon: <Heart className="w-8 h-8" />, title: "פנסיה ופרישה", desc: "תכנון פרישה, קרנות השתלמות ובדיקת מצב פנסיוני." },
  { icon: <Users className="w-8 h-8" />, title: "פיננסי וזכויות", desc: "תכנון פיננסי, הלוואות ומיצוי זכויות — הכול תחת קורת גג אחת." },
];

const faqs = [
  { question: "מה ההבדל בינכם לבין סוכן ביטוח רגיל?", answer: "אנחנו מסתכלים על התמונה הכוללת — לא רק פוליסה אחת. הגישה שלנו משלבת ביטוח, פנסיה, פיננסים ופרישה, כדי שהתיק שלכם יהיה מאוזן ומעודכן." },
  { question: "האם יש עלות לשיחת ההיכרות?", answer: "לא. שיחת ההיכרות היא ללא עלות וללא התחייבות. מטרתה להבין מה המצב הקיים ולבדוק אם יש מקום לשיפור." },
  { question: "עם אילו חברות ביטוח אתם עובדים?", answer: "אנחנו עובדים מול מגוון חברות ביטוח ובתי השקעות — הראל, מגדל, כלל, הפניקס, מנורה, איילון, הכשרה, מיטב ועוד. המטרה: להתאים לפי צורך, לא לפי חברה." },
  { question: "כמה זמן לוקח תהליך של בדיקת תיק?", answer: "בדרך כלל שיחת היכרות ראשונית לוקחת כ-15 דקות. בדיקת תיק מקיפה יותר יכולה לקחת מספר ימי עסקים, תלוי בהיקף." },
  { question: "האם אתם מטפלים גם בתביעות?", answer: "כן. אנחנו מלווים את הלקוחות שלנו גם בתהליכי תביעה מול חברות הביטוח ומוודאים שהזכויות שלהם ממומשות." },
];

const AboutPage = () => {
  return (
    <main id="main-content" className="pt-20">
      <SEOHead
        title="אודות ליבה ביטוח ופנסיוני | סוכנות ביטוח ופנסיה מקצועית"
        description="ליבה ביטוח ופנסיוני — סוכנות ביטוח עצמאית שעובדת מול כל החברות. שקיפות, מקצועיות וליווי אישי לאורך זמן. הכירו אותנו →"
        canonical="/about"
        keywords={["סוכנות ביטוח", "ליבה ביטוח", "סוכן ביטוח פנסיוני", "ייעוץ ביטוחי", "ליווי ביטוחי פיננסי"]}
        breadcrumbs={[
          { name: "דף הבית", url: "/" },
          { name: "אודות", url: "/about" },
        ]}
        faqItems={faqs}
      />

      {/* Hero with background image */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80" alt="צוות ליבה ביטוח" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.95)] via-[hsl(205,65%,15%,0.9)] to-[hsl(205,65%,18%,0.8)]" />
        </div>
        <div className="container mx-auto max-w-4xl relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-black mb-6 text-primary-foreground">אודות ליבה ביטוח ופנסיוני</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-3xl">
              ליבה ביטוח ופנסיוני היא חברת ליווי ביטוחי-פיננסי שמטרתה אחת: לגרום לתיק שלכם להיות ברור, מותאם ומבוקר.
            </p>
            <p className="text-primary-foreground/70 mt-4 text-base">
              הגישה שלנו: קודם להבין → אחר כך להמליץ → ואז ליישם בצורה נקייה ושקופה.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1 -mb-1" />

      <TeamCarousel />

      {/* What We Do */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl font-bold mb-10 text-center">מה אנחנו עושים?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whatWeDo.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-premium p-8 text-center hover:glow-teal transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different - with background image */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80" alt="ייעוץ ביטוחי ופיננסי" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto max-w-4xl relative">
          <h2 className="font-heading text-3xl font-bold mb-8 text-center">למה לבחור בנו?</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {differentiators.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-premium p-5 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-background" />

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl font-bold mb-10 text-center">הערכים שמנחים אותנו</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-premium p-6 text-center hover:glow-accent transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 text-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InsuranceLogos />

      {/* Scanner Teaser */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-brand-teal/15 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-dark p-10 border border-primary-foreground/10">
            <h2 className="font-heading text-2xl font-bold mb-3 text-primary-foreground">רוצים לדעת מה המצב שלכם?</h2>
            <p className="text-primary-foreground/70 mb-6">הסורק הביטוחי שלנו יעזור לכם להבין בדיוק איפה אתם עומדים.</p>
            <Link to="/insurance-check" className="inline-block bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg animate-pulse-glow">
              לסורק הביטוחי →
            </Link>
          </motion.div>
        </div>
      </section>

      <FAQSection items={faqs} />

      {/* CTA */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80" alt="קבעו שיחת היכרות" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.95)] via-[hsl(205,65%,15%,0.9)] to-[hsl(205,65%,18%,0.85)]" />
        </div>
        <div className="container mx-auto max-w-2xl text-center relative">
          <h2 className="font-heading text-3xl font-bold mb-4 text-primary-foreground">רוצים לדבר?</h2>
          <p className="text-primary-foreground/80 mb-8">שיחת היכרות קצרה, בלי התחייבות — כדי להבין מה יש ומה כדאי לבדוק.</p>
          <Link to="/contact" className="inline-block bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg animate-pulse-glow">
            קבעו שיחת היכרות
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
