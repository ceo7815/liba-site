import { useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { siteConfig } from "@/data/siteConfig";
import { trackLead } from "@/lib/fbq";
import { trackClarityEvent, setClarityTag } from "@/lib/clarity";

const ThankYouPage = () => {
  useEffect(() => { trackLead(); setClarityTag("lead_campaign", "main"); trackClarityEvent("lead_submitted"); }, []);
  return (
  <main id="main-content" className="pt-24 pb-16">
    <SEOHead
      title={`תודה, קיבלנו את הפנייה | ${siteConfig.name}`}
      description="הפנייה התקבלה. ניצור קשר בזמן שבחרתם. בינתיים אפשר לבצע סריקה קצרה כדי לקבל תמונת מצב ראשונית."
      canonical="/thank-you"
    />
    <div className="container mx-auto px-4 text-center max-w-2xl">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="font-heading text-3xl md:text-4xl font-black mb-4">תודה — הפנייה התקבלה</h1>
      <p className="text-muted-foreground text-lg mb-8">נחזור אליכם בזמן שבחרתם. אם לא עניתם — ננסה שוב מאוחר יותר.</p>

      <div className="glass-card p-8 mb-8 text-right">
        <h2 className="font-heading text-xl font-bold mb-4">מה הלאה?</h2>
        <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
          <li>אנחנו עוברים על הפרטים</li>
          <li>חוזרים אליכם לשיחת היכרות קצרה</li>
          <li>אם תרצו — נבצע בדיקה מסודרת לתיק ונמליץ בצורה שקופה</li>
        </ol>
      </div>

      <div className="glass-card p-8 mb-8 text-right">
        <h3 className="font-heading font-bold mb-3">כדי לחסוך זמן בשיחה, כדאי להכין מראש:</h3>
        <ul className="space-y-2 text-muted-foreground text-sm list-disc list-inside">
          <li>שם החברה שבה נמצאים הביטוחים/פנסיה (אם יודעים)</li>
          <li>בערך כמה יורד לכם בחודש על ביטוחים</li>
          <li>כל שינוי שקרה לאחרונה (החיוב עלה / מיחזור / עבודה חדשה)</li>
        </ul>
      </div>

      <Link to="/tools/insurance-scan" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg mb-6">
        הפעילו את סורק הביטוח האישי (90 שניות)
      </Link>

      <p className="text-sm text-muted-foreground mt-6">
        דחוף לכם?{" "}
        <a href={`tel:${siteConfig.phones[0].replace(/-/g, "")}`} className="underline hover:text-foreground">{siteConfig.phones[0]}</a>
        {" | "}
        <a href={`mailto:${siteConfig.email}`} className="underline hover:text-foreground">{siteConfig.email}</a>
      </p>
    </div>
  </main>
  );
};

export default ThankYouPage;
