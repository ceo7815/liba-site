import { motion } from "framer-motion";
import { Star, Quote, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import InsuranceLogos from "@/components/InsuranceLogos";
import SectionDivider from "@/components/SectionDivider";
import { testimonials } from "@/data/testimonials";

const whyItMatters = [
  { title: "בלי לחץ", desc: "אנחנו לא דוחפים למכור. המלצות הלקוחות שלנו מדברות על תהליך שקט, ברור ושקוף." },
  { title: "מבינים את התמונה", desc: "לקוחות מספרים שלראשונה הם הבינו מה יש להם בתיק — ולמה." },
  { title: "חוסכים כסף", desc: "כפילויות, כיסויים מיותרים, חוסר עדכון — הלקוחות שלנו חסכו כסף בלי לוותר על כיסוי." },
];

const ReviewsPage = () => {
  return (
    <main id="main-content" className="pt-20">
      <SEOHead
        title="המלצות וביקורות לקוחות | ליבה ביטוח ופנסיוני"
        description="מה הלקוחות שלנו אומרים? ביקורות אמיתיות על ליווי ביטוחי שקוף ומקצועי. קראו חוויות של משפחות שחסכו כסף ועשו סדר בתיק."
        canonical="/reviews"
        keywords={["ביקורות ביטוח", "המלצות סוכן ביטוח", "חוות דעת ליבה ביטוח", "המלצות ביטוח פנסיוני"]}
        breadcrumbs={[{ name: "דף הבית", url: "/" }, { name: "לקוחות והמלצות", url: "/reviews" }]}
      />

      {/* Hero with background */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80" alt="המלצות לקוחות על ליבה ביטוח" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.95)] via-[hsl(205,65%,15%,0.9)] to-[hsl(205,65%,18%,0.8)]" />
        </div>
        <div className="container mx-auto max-w-4xl relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-black mb-4 text-primary-foreground">לקוחות מספרים</h1>
            <p className="text-lg text-primary-foreground/80">
              המלצות על סוכן ביטוח — מה הלקוחות שלנו אומרים על התהליך, השירות והתוצאות.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      <InsuranceLogos title="עובדים מול המובילים בשוק" subtitle="אנחנו עובדים מול מגוון חברות ביטוח ובתי השקעות כדי להתאים את הפתרון הנכון לכל לקוח." />

      {/* Why It Matters - with bg image */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80" alt="למה הלקוחות ממליצים" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto max-w-5xl relative">
          <h2 className="font-heading text-3xl font-bold mb-10 text-center">למה הלקוחות שלנו ממליצים?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItMatters.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-premium p-8 text-center hover:glow-teal transition-all duration-300 group">
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* Testimonials Grid */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-brand-teal/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full bg-accent/8 blur-[100px]" />
        </div>
        <div className="container mx-auto max-w-5xl relative">
          <h2 className="font-heading text-3xl font-bold mb-10 text-center text-primary-foreground">מה אומרים עלינו</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-dark p-8 relative border border-primary-foreground/10 hover:border-brand-teal/30 transition-all duration-300 group">
                <Quote className="w-8 h-8 text-brand-teal/20 absolute top-4 left-4 group-hover:text-brand-teal/40 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
                </div>
                <p className="text-primary-foreground/80 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="border-t border-primary-foreground/10 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-teal to-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-primary-foreground">{t.name}</div>
                    {t.area && <div className="text-xs text-brand-teal">{t.area}</div>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* CTA */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80" alt="קבעו שיחת היכרות" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.95)] via-[hsl(205,65%,15%,0.9)] to-[hsl(205,65%,18%,0.85)]" />
        </div>
        <div className="container mx-auto max-w-2xl text-center relative">
          <h2 className="font-heading text-3xl font-bold mb-4 text-primary-foreground">רוצים לבדוק גם את התיק שלכם?</h2>
          <p className="text-primary-foreground/80 mb-8">שיחת היכרות קצרה, בלי התחייבות — כדי להבין מה יש ומה כדאי לבדוק.</p>
          <Link to="/contact" className="inline-block bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg animate-pulse-glow">
            קבעו שיחת היכרות
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ReviewsPage;
