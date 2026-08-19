import InsuranceScanner from "@/components/InsuranceScanner";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const ScannerPage = () => {
  return (
    <main id="main-content" className="pt-20">
      <SEOHead
        title="סורק ביטוח אישי — בדיקת תיק ביטוח ב-90 שניות | ליבה ביטוח"
        description="סורק ביטוח אישי חינמי: ב-90 שניות תגלו אם יש כפילויות, כיסוי חסר או תשלום מיותר בתיק הביטוח שלכם. בדקו עכשיו →"
        canonical="/tools/insurance-scan"
        keywords={["סורק ביטוח", "בדיקת תיק ביטוח", "כפילויות ביטוח", "בדיקת ביטוח חינם"]}
        breadcrumbs={[
          { name: "דף הבית", url: "/" },
          { name: "סורק ביטוח אישי", url: "/tools/insurance-scan" },
        ]}
      />
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-black mb-4">סורק הביטוח האישי</h1>
            <p className="text-lg text-muted-foreground">
              ב-90 שניות תקבלו תמונת מצב ראשונית: האם אתם מוגנים כמו שאתם חושבים — והאם יש סיכוי לתשלום מיותר/כפול.
            </p>
          </motion.div>
          <InsuranceScanner />
        </div>
      </section>
    </main>
  );
};

export default ScannerPage;
