import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, FileCheck, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import SectionDivider from "@/components/SectionDivider";
import { siteConfig } from "@/data/siteConfig";
import SocialButtons from "@/components/SocialButtons";

const contactCards = [
  { icon: <Phone className="w-5 h-5" />, label: "טלפון", value: siteConfig.phones.join(" / "), href: `tel:${siteConfig.phonesIntl[0]}` },
  { icon: <Mail className="w-5 h-5" />, label: "אימייל", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: <MapPin className="w-5 h-5" />, label: "מיקום", value: `${siteConfig.address.street}, ${siteConfig.address.city}`, href: siteConfig.mapsUrl },
  { icon: <Clock className="w-5 h-5" />, label: "שעות פעילות", value: "א׳–ה׳ 9:00–18:00" },
];

const nextSteps = [
  { icon: <MessageCircle className="w-7 h-7" />, step: "01", title: "משאירים פרטים", desc: "ממלאים את הטופס עם כמה פרטים בסיסיים." },
  { icon: <PhoneCall className="w-7 h-7" />, step: "02", title: "מקבלים שיחה", desc: "נחזור אליכם תוך יום עסקים לשיחת היכרות קצרה." },
  { icon: <FileCheck className="w-7 h-7" />, step: "03", title: "מתחילים לעשות סדר", desc: "נבדוק את המצב הקיים ונציג המלצות — בלי לחץ ובלי התחייבות." },
];

const faqs = [
  { question: "השיחה עולה כסף?", answer: "לא. שיחת ההיכרות היא ללא עלות וללא התחייבות. מטרתה להבין מה המצב ולראות אם יש מקום לשיפור." },
  { question: "כמה זמן לוקחת שיחת ההיכרות?", answer: "בדרך כלל 10-15 דקות. מספיק כדי להבין מה יש ולתת כיוון ראשוני." },
  { question: "מה קורה אחרי שמשאירים פרטים?", answer: "נחזור אליכם תוך יום עסקים לתיאום שיחה בזמן שנוח לכם." },
  { question: "האם אתם מתחייבים להחזיר לכולם?", answer: "אנחנו עושים מאמץ לחזור לכל פנייה, אך שומרים לעצמנו את הזכות לפנות לפי שיקול דעת מקצועי." },
];

const ContactPage = () => {
  return (
    <main id="main-content" className="pt-20">
      <SEOHead
        title="צור קשר — ייעוץ ביטוחי ופנסיוני חינם | ליבה ביטוח"
        description="השאירו פרטים לשיחת היכרות קצרה — ללא עלות וללא התחייבות. ניצור קשר תוך יום עסקים ←"
        canonical="/contact"
        keywords={["צור קשר ביטוח", "סוכן ביטוח קריית ביאליק", "ייעוץ ביטוחי חינם", "שיחת היכרות ביטוח"]}
        breadcrumbs={[{ name: "דף הבית", url: "/" }, { name: "צור קשר", url: "/contact" }]}
        faqItems={faqs}
      />

      {/* Hero with background */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80" alt="צור קשר עם ליבה ביטוח" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-l from-[hsl(205,65%,12%,0.95)] via-[hsl(205,65%,15%,0.9)] to-[hsl(205,65%,18%,0.8)]" />
        </div>
        <div className="container mx-auto max-w-4xl relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-black mb-4 text-primary-foreground">צור קשר</h1>
            <p className="text-lg text-primary-foreground/80">
              השאירו פרטים לשיחת היכרות קצרה — כדי להבין מה יש היום ומה כדאי לבדוק.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="slant" className="text-background -mt-1" />

      {/* Form + Contact Info */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <LeadForm source="contact-page" showTopic showPurpose showMessage />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-heading text-2xl font-bold mb-4">דרכים ליצירת קשר</h3>
              <div className="space-y-4">
                {contactCards.map((item) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 glass-premium p-4 hover:glow-teal transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal flex items-center justify-center flex-shrink-0">{item.icon}</div>
                        <div>
                          <div className="text-sm text-muted-foreground">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 glass-premium p-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal flex items-center justify-center flex-shrink-0">{item.icon}</div>
                        <div>
                          <div className="text-sm text-muted-foreground">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="pt-2">
                <p className="mb-4 text-sm font-bold text-foreground">ליבה ברשתות</p>
                <SocialButtons align="start" />
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                לא שולחים ספאם. חוזרים רק לתיאום שיחה. המידע באתר כללי ואינו מהווה ייעוץ אישי.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next - with bg image */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1553729459-uj8ax09dUGF?w=1600&q=80" alt="תהליך עבודה" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
        <div className="container mx-auto max-w-4xl relative">
          <h2 className="font-heading text-3xl font-bold mb-10 text-center">מה קורה אחרי שמשאירים פרטים?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {nextSteps.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="glass-premium p-8 text-center relative group hover:glow-teal transition-all duration-300">
                <div className="absolute top-4 left-4 text-4xl font-black text-accent/10 font-heading">{step.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 text-brand-teal flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">{step.icon}</div>
                <h3 className="font-heading text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqs} />

      <section className="py-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-xs text-muted-foreground">
            המידע באתר כללי ואינו מהווה ייעוץ אישי. התאמה נעשית לאחר בדיקה. ליבה ביטוח ופנסיוני פועלת בהתאם לדין הישראלי.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
