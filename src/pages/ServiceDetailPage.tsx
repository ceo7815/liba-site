import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Users, Search, FileCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHero from "@/components/ServiceHero";
import InsuranceLogos from "@/components/InsuranceLogos";
import HowWeWork from "@/components/HowWeWork";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import SectionDivider from "@/components/SectionDivider";
import { serviceDetails, hubNames } from "@/data/services";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const stepIcons = [
  <Users className="w-8 h-8" />,
  <Search className="w-8 h-8" />,
  <FileCheck className="w-8 h-8" />,
];

// Map service slugs to relevant background images for SEO
const serviceImages: Record<string, { url: string; alt: string }> = {
  "health-insurance": { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80", alt: "ביטוח בריאות – בדיקת כיסוי רפואי" },
  "critical-illness": { url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&q=80", alt: "ביטוח מחלות קשות – הגנה כלכלית למשפחה" },
  "life-insurance": { url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=80", alt: "ביטוח חיים – הגנה על המשפחה" },
  "mortgage-insurance": { url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80", alt: "ביטוח משכנתא – בדיקת פוליסת משכנתא" },
  "travel-insurance": { url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80", alt: "ביטוח נסיעות לחו״ל – כיסוי לפני טיסה" },
  "retirement-planning": { url: "https://images.unsplash.com/photo-1553729459-uj8ax09dUGF?w=1600&q=80", alt: "תכנון פרישה – ניהול חיסכון פנסיוני" },
  "study-fund": { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80", alt: "קרנות השתלמות – ניהול חיסכון" },
  "financial-planning": { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80", alt: "תכנון פיננסי – ניהול תקציב משפחתי" },
  "loans": { url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80", alt: "הלוואות – ליווי מקצועי במימון" },
  "rights-realization": { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80", alt: "מיצוי זכויות – בדיקת זכאויות" },
};

const serviceKeywordsMap: Record<string, string[]> = {
  "health-insurance": ["ביטוח בריאות פרטי", "השוואת ביטוח בריאות", "כיסוי רפואי", "שב\"ן", "ביטוח משלים"],
  "critical-illness": ["ביטוח מחלות קשות", "כיסוי מחלות קשות", "ביטוח מחלות קשות מחיר"],
  "life-insurance": ["ביטוח חיים ריסק", "ביטוח חיים מחירים", "ביטוח חיים למשפחה", "כמה עולה ביטוח חיים"],
  "mortgage-insurance": ["ביטוח משכנתא", "ביטוח חיים למשכנתא", "ביטוח משכנתא חוץ בנקאי", "השוואת ביטוח משכנתא"],
  "travel-insurance": ["ביטוח נסיעות לחו\"ל", "ביטוח טיסה", "ביטוח נסיעות מומלץ"],
  "retirement-planning": ["תכנון פרישה", "תכנון פנסיוני", "פנסיה", "גיל פרישה", "פנסיה לעצמאים"],
  "study-fund": ["קרן השתלמות", "קרן השתלמות לשכירים", "הלוואה מקרן השתלמות", "דמי ניהול קרן השתלמות"],
  "financial-planning": ["תכנון פיננסי", "ייעוץ פיננסי", "ניהול תקציב משפחתי", "תכנון פיננסי למשפחות"],
  "loans": ["הלוואה מקרן פנסיה", "הלוואה כנגד חיסכון", "מימון", "הלוואה מביטוח מנהלים"],
  "rights-realization": ["מימוש זכויות", "זכויות ביטוח", "מימוש זכויות רפואיות", "החזרים", "בדיקת זכאות"],
};

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDetails[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">הדף לא נמצא</h1>
          <Link to="/" className="text-accent hover:underline">חזרה לדף הבית</Link>
        </div>
      </div>
    );
  }

  const hubName = hubNames[service.hubSlug] || service.hubSlug;
  const hubPath = `/services/${service.hubSlug}`;
  const image = serviceImages[service.slug];

  const breadcrumbItems = [
    { label: "דף הבית", href: "/" },
    { label: hubName, href: hubPath },
    { label: service.hero.title.split("–")[0].trim() },
  ];

  const steps = service.howWeWork.steps.map((s, i) => ({
    icon: stepIcons[i] || stepIcons[0],
    title: s.title,
    description: s.description,
  }));

  return (
    <main id="main-content">
      <SEOHead
        title={service.seo.title}
        description={service.seo.description}
        canonical={service.seo.canonical}
        keywords={serviceKeywordsMap[service.slug]}
        ogImage={image?.url}
        breadcrumbs={[
          { name: "דף הבית", url: "/" },
          { name: hubName, url: hubPath },
          { name: service.hero.title.split("–")[0].trim(), url: service.seo.canonical },
        ]}
        faqItems={service.faq}
        serviceSchema={{ name: service.hero.title.split("–")[0].trim(), description: service.seo.description }}
      />

      <ServiceHero
        title={service.hero.title}
        subtitle={service.hero.subtitle}
        trustLine={service.hero.trustLine}
        imageAlt={service.hero.imageAlt}
        heroImage={image?.url}
      />

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Why Check */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{service.whyCheck.title}</h2>
          <div className="space-y-4">
            {service.whyCheck.points.map((point, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="angle" className="text-primary -mb-1" />

      {/* Checklist - dark section with inline image for SEO */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        {image && (
          <div className="absolute inset-0">
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover opacity-10" loading="lazy" />
          </div>
        )}
        <div className="container mx-auto max-w-3xl relative">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-10 text-center text-primary-foreground">{service.checklist.title}</h2>
          <div className="space-y-6">
            {service.checklist.items.map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="glass-dark p-5 flex items-start gap-4 border border-primary-foreground/10">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-1 text-primary-foreground">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-primary-foreground/60 mt-8 text-sm">{service.checklist.summary}</p>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* Audience */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{service.audience.title}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.audience.points.map((point, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="flex items-start gap-2 glass-premium p-4">
                <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <p className="text-sm">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HowWeWork title={service.howWeWork.title} steps={steps} />
      <InsuranceLogos />
      <FAQSection items={service.faq} />

      {/* Lead Form */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          {image && <img src={image.url} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />}
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.96)] via-[hsl(205,65%,15%,0.93)] to-[hsl(205,65%,18%,0.88)]" />
        </div>
        <div className="container mx-auto relative">
          <div className="glass-dark p-8 md:p-12 border border-primary-foreground/10 max-w-3xl mx-auto">
            <LeadForm source={`service-${service.slug}`} title={service.leadForm.title} subtitle={service.leadForm.subtitle} lightTitle />
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-xl font-bold mb-6 text-center">לקריאה נוספת</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {service.relatedLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm text-accent hover:underline font-medium">
                {link.label} ←
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
