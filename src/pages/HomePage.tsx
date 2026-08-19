import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart, Shield, Home, Plane, Brain, TrendingUp,
  FileSearch, CheckCircle, Star, ArrowLeft, Landmark, Scale,
  Users, Clock, Award
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import InsuranceLogos from "@/components/InsuranceLogos";
import LeadForm from "@/components/LeadForm";
import FAQSection from "@/components/FAQSection";
import SectionTitle from "@/components/SectionTitle";
import SectionDivider from "@/components/SectionDivider";
import AnimatedCounter from "@/components/AnimatedCounter";
import { testimonials } from "@/data/testimonials";
import { blogArticles } from "@/data/blogArticles";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const heroEnter = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const HomePage = () => {
  const featuredArticles = blogArticles.slice(0, 4);
  const reduceMotion = useReducedMotion();

  return (
    <main id="main-content">
      <SEOHead
        title="בדיקת תיק ביטוח ופנסיה ללא עלות | ליבה ביטוח ופנסיוני"
        description="בדיקת תיק ביטוח ופנסיה ללא עלות. מיפוי כפילויות, פערים וחיסכון אפשרי — מול כל חברות הביטוח. השאירו פרטים לשיחה קצרה ←"
        canonical="/"
        keywords={["ביטוח", "פנסיה", "תכנון פיננסי", "ביטוח בריאות", "ביטוח חיים", "ביטוח משכנתא", "מיצוי זכויות"]}
        faqItems={faqs}
      />

      {/* 1. Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="יועץ ביטוח ופנסיוני – בדיקת תיק ביטוח ופיננסים למשפחה" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.82)] via-[hsl(205,65%,15%,0.66)] to-[hsl(205,65%,18%,0.41)]" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[3%] w-80 h-80 rounded-full border-2 border-dashed border-brand-teal/20 animate-spin-slow" />
          <div className="absolute top-[10%] left-[3%] w-80 h-80 rounded-full border border-accent/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
          <div className="absolute top-[20%] left-[8%] w-40 h-40 rounded-full bg-gradient-to-br from-brand-teal/20 to-transparent animate-float blur-xl" />
          <div className="absolute bottom-[15%] right-[5%] w-56 h-56 rounded-full bg-gradient-to-br from-accent/15 to-transparent animate-float-slow blur-xl" />
          <div className="absolute top-[55%] left-[20%] w-24 h-24 rounded-full bg-brand-gold/10 animate-float blur-lg" />
          <div className="absolute top-[40%] right-[3%] w-32 h-32 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary-foreground) / 0.3) 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }} />
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={heroEnter}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.h1
              variants={heroItem}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-6"
            >
              ליווי ביטוחי ופיננסי -{" "}
              <span className="text-accent">עושים סדר</span>{" "}
              בכיסוי, בתנאים ובכסף
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="text-lg md:text-xl text-primary-foreground/80 mb-4 leading-relaxed"
            >
              אנחנו מלווים משפחות ואנשים בבניית תיק ביטוח ופיננסים מדויק: שקוף, מותאם למציאות החיים, ומבוסס בדיקה — לא תחושות.
            </motion.p>
            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center justify-center gap-3 text-sm text-primary-foreground/60 mb-8"
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />שפה פשוטה</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />שקיפות מלאה</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-teal" />עובדים מול כל החברות</span>
            </motion.div>
            <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-accent/30 animate-pulse-glow">
                קבעו שיחת היכרות
                <span className="emoji-click text-xl leading-none" style={{ filter: "brightness(0) invert(1)" }} aria-hidden>👆</span>
              </Link>
              <div className="nav-float-rim inline-block rounded-full p-[3px]">
                <Link
                  to="/insurance-check"
                  className="relative flex items-center justify-center gap-2 rounded-full bg-[hsl(205,65%,12%)] px-8 py-3.5 font-bold text-lg text-primary-foreground hover:brightness-110 transition-all"
                >
                  סורק הביטוח האישי
                  <span className="emoji-click text-xl leading-none" style={{ filter: "brightness(0) invert(1)" }} aria-hidden>👆</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. What We Do */}
      <section className="section-padding section-gradient-mesh relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="container mx-auto relative">
          <SectionTitle eyebrow="01 · בדיקה" title="מה אנחנו עושים בפועל?" accent="בפועל" subtitle="אנחנו לא מתחילים ממוצר. מתחילים מבדיקה: מה יש היום, מה כפול, מה חסר ומה אפשר לשפר." />
          <div className="grid md:grid-cols-3 gap-8">
            {whatWeDo.map((card, i) => (
              <motion.div key={card.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="relative group h-full">
                <div className="nav-float-rim rim-edge-only h-full rounded-[26px] p-[3px]">
                  <div className="relative h-full overflow-hidden rounded-[23px] bg-[hsl(var(--popover))] p-8 text-center">
                    <div className="absolute -top-4 -left-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                      <div className="w-32 h-32">{card.bgIcon}</div>
                    </div>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-teal/20 transition-all duration-300">
                        {card.icon}
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3">{card.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* 3. Services Grid — Dark section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            alt="תחומי שירות ביטוח ופנסיוני" 
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-brand-teal/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="container mx-auto relative">
          <SectionTitle eyebrow="02 · שירותים" title="תחומי שירות" subtitle="בחרו תחום שירות וקראו מה כולל התהליך, למי מתאים, ואיך מתחילים." light />
          {/* Mobile: 3-col grid | Desktop: 4-col */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {services.map((service, i) => (
              <motion.div key={service.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <Link to={service.href} className="glass-dark p-3 md:p-6 flex flex-col items-center text-center gap-2 md:gap-3 hover:border-brand-teal/30 transition-all duration-300 group block border border-primary-foreground/5 rounded-2xl">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-brand-teal/30 to-accent/20 text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-bold text-xs md:text-base text-primary-foreground group-hover:text-brand-teal transition-colors leading-tight">{service.title}</h3>
                  <p className="text-[10px] md:text-sm text-primary-foreground/60 leading-relaxed hidden md:block">{service.desc}</p>
                  <span className="text-brand-teal text-xs md:text-sm font-medium flex items-center gap-1 mt-auto pt-1 md:pt-2">
                    לפרטים <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* 4. Who We Are + Counters — warm background with image */}
      <section className="relative section-padding overflow-hidden">
        {/* Background image instead of stripes */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553729459-uj8ax09dUGF?w=1600&q=80" 
            alt="ליבה ביטוח - למה לבחור בנו" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto relative">
          <SectionTitle eyebrow="03 · החברה" title="למה ליבה?" accent="ליבה" subtitle="ליבה ביטוח ופנסיוני היא חברת ליווי ביטוחי-פיננסי שמטרתה אחת: לגרום לתיק שלכם להיות ברור, מותאם ומבוקר." />
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                הגישה שלנו: קודם להבין → אחר כך להמליץ → ואז ליישם בצורה נקייה ושקופה.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutPoints.map((point, i) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full"
                  >
                    <div className="nav-float-rim rim-edge-only h-full rounded-[16px] p-[3px]">
                      <div className="flex h-full flex-col items-center gap-3 rounded-[13px] bg-[hsl(var(--popover))] p-5 text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal">
                          {point.icon}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{point.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{point.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center justify-center gap-2 text-accent font-bold hover:gap-3 transition-all">
                עוד עלינו <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="grid grid-cols-3 gap-2 md:gap-4 pt-2">
                {[
                  { target: 15, suffix: "+", label: "שנות ניסיון", gradient: "from-brand-teal/20 to-brand-teal/5" },
                  { target: 1000, suffix: "+", label: "משפחות מלוות", gradient: "from-accent/20 to-accent/5" },
                  { target: 100, suffix: "%", label: "שקיפות מלאה", gradient: "from-brand-gold/20 to-brand-gold/5" },
                ].map((counter, i) => (
                  <div key={i} className={`glass-premium p-3 md:p-6 bg-gradient-to-br ${counter.gradient}`}>
                    <AnimatedCounter target={counter.target} suffix={counter.suffix} label={counter.label} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Insurance Logos */}
      <InsuranceLogos eyebrow="04 · שותפים" />

      {/* Divider */}
      <SectionDivider variant="curve" className="text-primary -mb-1" />

      {/* 6. Scanner CTA */}
      <section className="relative section-padding overflow-hidden" id="scanner">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80" 
            alt="סורק ביטוח אישי" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.95)] via-[hsl(205,65%,15%,0.9)] to-[hsl(205,65%,18%,0.85)]" />
        </div>
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <SectionTitle
              eyebrow="05 · סורק"
              title="סורק ביטוח אישי"
              accent="ביטוח אישי"
              subtitle="ב-90 שניות תקבלו תמונת מצב ראשונית: האם אתם מוגנים כמו שאתם חושבים — והאם יש סיכוי לתשלום מיותר/כפול."
              light
            />
            <Link to="/insurance-check" className="bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-xl hover:shadow-accent/30 inline-block animate-pulse-glow">
              התחילו סריקה עכשיו
            </Link>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1 rotate-180" />

      {/* 7. Testimonials — horizontal scroll */}
      <section className="section-padding section-gradient-mesh relative overflow-hidden">
        <div className="container mx-auto relative">
          <SectionTitle eyebrow="06 · לקוחות" title="לקוחות מספרים" accent="מספרים" />
        </div>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 overflow-x-auto pb-4 px-4 md:px-8 snap-x snap-mandatory scrollbar-hide overscroll-x-contain touch-pan-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'hidden' }}>
            {testimonials.slice(0, 8).map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-premium p-6 md:p-8 hover:glow-accent transition-all duration-300 relative overflow-hidden group flex-shrink-0 w-[280px] md:w-[340px] snap-center">
                <div className="absolute top-3 left-3 text-5xl font-heading text-accent/10 leading-none group-hover:text-accent/20 transition-colors">"</div>
                <div className="relative">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />)}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 italic text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-teal to-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      {t.area && <div className="text-xs text-muted-foreground">{t.area}</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="container mx-auto">
          <div className="text-center mt-6">
            <Link to="/reviews" className="text-accent font-bold hover:gap-3 inline-flex items-center gap-2 transition-all">לכל ההמלצות <ArrowLeft className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* 8. Blog Highlights */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[5%] w-96 h-96 rounded-full bg-accent/8 blur-[150px]" />
        </div>
        <div className="container mx-auto relative">
          <SectionTitle eyebrow="07 · ידע" title="מדריכים וכלים" subtitle="תוכן פרקטי שמסביר מה לבדוק, מתי לבדוק, ואיך להימנע מטעויות יקרות." light />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.map((post, i) => (
              <motion.div key={post.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <Link to={`/blog/${post.categorySlug}/${post.slug}`} className="block overflow-hidden group rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:border-brand-teal/30 transition-all duration-300">
                  {post.heroImage ? (
                    <div className="h-44 overflow-hidden relative">
                      <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(205,65%,12%)] via-transparent to-transparent" />
                      <span className="absolute bottom-3 right-3 text-xs font-medium text-brand-teal bg-brand-teal/15 backdrop-blur px-2.5 py-1 rounded-full">{post.category}</span>
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-brand-teal/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl">{post.emoji}</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="font-heading font-bold text-primary-foreground mt-1 mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">{post.title}</h4>
                    <span className="text-brand-teal text-sm font-medium flex items-center gap-1">
                      לקריאה <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="text-brand-teal font-bold hover:gap-3 inline-flex items-center gap-2 transition-all">לכל המדריכים <ArrowLeft className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* 9. FAQ */}
      <FAQSection eyebrow="08 · שאלות" items={faqs} />

      {/* 10. Lead Form */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80" 
            alt="צוות ליבה ביטוח" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.96)] via-[hsl(205,65%,15%,0.93)] to-[hsl(205,65%,18%,0.88)]" />
        </div>
        <div className="container mx-auto relative">
          <div className="glass-dark p-8 md:p-12 border border-primary-foreground/10 max-w-3xl mx-auto">
            <LeadForm
              source="homepage-bottom"
              title="רוצים שנעשה לכם סדר?"
              subtitle="השאירו פרטים לשיחת היכרות קצרה — כדי להבין מה יש היום ומה כדאי לבדוק."
              lightTitle
            />
          </div>
        </div>
      </section>
    </main>
  );
};

/* ============ Data ============ */

const whatWeDo = [
  { icon: <FileSearch className="w-8 h-8" />, bgIcon: <FileSearch className="w-32 h-32" />, title: "בדיקת תיק ביטוח", desc: "מיפוי מהיר של הכיסויים והחיובים + איתור כפילויות/פערים." },
  { icon: <Heart className="w-8 h-8" />, bgIcon: <Heart className="w-32 h-32" />, title: "התאמת כיסוי", desc: "בריאות • מחלות קשות • חיים • משכנתא • נסיעות — לפי צורך אמיתי." },
  { icon: <TrendingUp className="w-8 h-8" />, bgIcon: <TrendingUp className="w-32 h-32" />, title: "דוח נקי ומסודר", desc: "בדיקת תיק ביטוח – איתור כפילויות וחוסרים, בשפה פשוטה." },
];

const services = [
  { icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />, title: "ביטוח בריאות", desc: "בדיקת כיסוי, מניעת כפילויות והתאמה אישית.", href: "/services/family-insurance/health-insurance" },
  { icon: <Brain className="w-5 h-5 md:w-6 md:h-6" />, title: "מחלות קשות", desc: "כסף שמגיע ברגע האמת.", href: "/services/family-insurance/critical-illness" },
  { icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />, title: "ביטוח חיים", desc: "להגן על המשפחה כלכלית.", href: "/services/family-insurance/life-insurance" },
  { icon: <Home className="w-5 h-5 md:w-6 md:h-6" />, title: "ביטוח משכנתא", desc: "לוודא שלא משלמים סתם.", href: "/services/family-insurance/mortgage-insurance" },
  { icon: <Plane className="w-5 h-5 md:w-6 md:h-6" />, title: "ביטוח נסיעות", desc: "כיסוי נכון לפני טיסה.", href: "/services/family-insurance/travel-insurance" },
  { icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />, title: "תכנון פרישה", desc: "סדר לפני החלטות יקרות.", href: "/services/retirement/retirement-planning" },
  { icon: <Landmark className="w-5 h-5 md:w-6 md:h-6" />, title: "תכנון פיננסי", desc: "סדר בתזרים ובהחלטות.", href: "/services/finance/financial-planning" },
  { icon: <Scale className="w-5 h-5 md:w-6 md:h-6" />, title: "מיצוי זכויות", desc: "לוודא שלא מפספסים.", href: "/services/rights/rights-realization" },
];

const aboutPoints = [
  { icon: <CheckCircle className="w-4 h-4" />, title: "שקיפות והסבר פשוט", desc: "אתם מבינים מה יש ולמה." },
  { icon: <Clock className="w-4 h-4" />, title: "בדיקה לפני שינוי", desc: "החלטות על בסיס נתונים." },
  { icon: <Users className="w-4 h-4" />, title: "גישה רחבה", desc: "ביטוח + פיננסים + פרישה." },
  { icon: <Award className="w-4 h-4" />, title: "ליווי לאורך זמן", desc: "חיים משתנים, התיק מתאים." },
];

const faqs = [
  { question: "האם הסריקה מחייבת?", answer: "לא. זו בדיקה ראשונית שנותנת אינדיקציה. שיחה מלאה היא לפי רצון." },
  { question: "האם צריך את כל הביטוחים האלה?", answer: "לא בהכרח. זה תלוי בצרכים ובשלב החיים. לכן אנחנו מתחילים בבדיקה והתאמה." },
  { question: "מה ההבדל בין ביטוח ״עוד״ לבין תיק מסודר?", answer: "תיק מסודר נותן כיסוי נכון בלי שכבות מיותרות, והכול ברור ובשליטה." },
  { question: "כמה זמן לוקח?", answer: "הסריקה – 90 שניות. שיחת היכרות – קצרה. משם מתקדמים לפי צורך." },
  { question: "עם מי אתם עובדים?", answer: "אנחנו עובדים מול כל חברות הביטוח והגופים המובילים בישראל — לא מחויבים לחברה אחת." },
];

export default HomePage;
