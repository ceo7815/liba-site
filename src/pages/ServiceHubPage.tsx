import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceHero from "@/components/ServiceHero";
import InsuranceLogos from "@/components/InsuranceLogos";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";
import SectionDivider from "@/components/SectionDivider";
import { serviceHubs, hubNames } from "@/data/services";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
};

const hubKeywordsMap: Record<string, string[]> = {
  "family-insurance": ["ביטוח למשפחה", "בדיקת תיק ביטוח", "השוואת ביטוחים", "כפל ביטוח", "ביטוח בריאות", "ביטוח חיים"],
  "retirement": ["פנסיה", "תכנון פרישה", "קרן השתלמות", "חיסכון פנסיוני", "פנסיה לעצמאים"],
  "finance": ["תכנון פיננסי", "ייעוץ פיננסי", "הלוואות", "ניהול תקציב", "תכנון פיננסי למשפחות"],
  "rights": ["מימוש זכויות", "זכויות ביטוח", "החזרים", "בדיקת זכאות", "מימוש זכויות רפואיות"],
};

const hubImages: Record<string, { url: string; alt: string }> = {
  "family-insurance": { url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=80", alt: "ביטוחים למשפחה – בדיקת תיק ביטוח מקיפה" },
  "retirement": { url: "https://images.unsplash.com/photo-1553729459-uj8ax09dUGF?w=1600&q=80", alt: "פנסיה ופרישה – תכנון פנסיוני" },
  "finance": { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80", alt: "פיננסי ומימון – תכנון פיננסי" },
  "rights": { url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80", alt: "מיצוי זכויות – בדיקת זכאויות" },
};

const ServiceHubPage = () => {
  const { hubSlug } = useParams<{ hubSlug: string }>();
  const hub = hubSlug ? serviceHubs[hubSlug] : null;

  if (!hub) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">הדף לא נמצא</h1>
          <Link to="/" className="text-accent hover:underline">חזרה לדף הבית</Link>
        </div>
      </div>
    );
  }

  const image = hubImages[hub.slug];
  const breadcrumbItems = [
    { label: "דף הבית", href: "/" },
    { label: hubNames[hub.slug] || hub.slug },
  ];

  return (
    <main id="main-content">
      <SEOHead
        title={hub.seo.title}
        description={hub.seo.description}
        canonical={hub.seo.canonical}
        keywords={hubKeywordsMap[hub.slug]}
        ogImage={image?.url}
        breadcrumbs={[
          { name: "דף הבית", url: "/" },
          { name: hubNames[hub.slug], url: hub.seo.canonical },
        ]}
        faqItems={hub.faq}
        serviceSchema={{ name: hubNames[hub.slug], description: hub.seo.description }}
      />

      <ServiceHero title={hub.hero.title} subtitle={hub.hero.subtitle} imageAlt={hub.hero.imageAlt} heroImage={image?.url} />

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{hub.intro.title}</h2>
          <div className="space-y-4">
            {hub.intro.points.map((point, i) => (
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

      {/* Service Cards - dark section with bg image */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        {image && (
          <div className="absolute inset-0">
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover opacity-10" loading="lazy" />
          </div>
        )}
        <div className="container mx-auto relative">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-10 text-center text-primary-foreground">
            השירותים בתחום {hubNames[hub.slug]}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {hub.services.map((service, i) => (
              <motion.div key={service.href} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <Link to={service.href} className="glass-dark p-6 block hover:border-brand-teal/30 transition-all duration-300 group border border-primary-foreground/10 rounded-2xl">
                  <h3 className="font-heading font-bold text-lg mb-2 text-primary-foreground group-hover:text-brand-teal transition-colors">{service.title}</h3>
                  <p className="text-sm text-primary-foreground/70 mb-3">{service.desc}</p>
                  <span className="text-brand-teal text-sm font-medium flex items-center gap-1">
                    לפרטים <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      <InsuranceLogos />
      <FAQSection items={hub.faq} />

      {/* Lead Form */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          {image && <img src={image.url} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />}
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.96)] via-[hsl(205,65%,15%,0.93)] to-[hsl(205,65%,18%,0.88)]" />
        </div>
        <div className="container mx-auto relative">
          <div className="glass-dark p-8 md:p-12 border border-primary-foreground/10 max-w-3xl mx-auto">
            <LeadForm source={`hub-${hub.slug}`} title={hub.leadForm.title} subtitle={hub.leadForm.subtitle} lightTitle />
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-xl font-bold mb-6 text-center">לקריאה נוספת</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {hub.relatedLinks.map((link) => (
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

export default ServiceHubPage;
