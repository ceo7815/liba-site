import { siteConfig } from "./siteConfig";

export const LIFE_DISCOUNT_LP = {
  path: "/lp/life-discount",
  thankYouPath: "/lp/life-discount/thank-you",
  campaign: "life-discount",
  source: "lp-life-discount",
  /** Desktop background only. Mobile does not download this file. */
  heroImage: "/images/life-discount-hero.webp",
  heroAlt: "משפחה בבית — בדיקת ביטוח חיים",
  title: "הנחת ביטוח חיים זמנית? בדיקה לבני 40–65 | ליבה",
  description:
    "הנחת פתיחה בביטוח חיים מוגבלת בזמן, ואז התשלום עולה. בדיקה ללא עלות וללא התחייבות לבני 40–65 עם ביטוח חיים או משכנתא. טיוטת רשות שוק ההון טרם בתוקף.",
} as const;

/** Set only after Make accepts the request. Thank-you must not fire Lead by itself. */
export const LIFE_DISCOUNT_SUBMITTED_KEY = "liba_life_discount_submitted";

export const LIFE_DISCOUNT_WEBHOOK_URL =
  "https://hook.eu2.make.com/5qyxhvaox1jtucgeyfv3wdwtc9zqqy8g";

const WHATSAPP_TEXT = "היי, אשמח לבדוק אם ההנחה בביטוח החיים שלי זמנית.";

export const lifeDiscountPhoneDisplay = siteConfig.phones[0];
export const lifeDiscountTelHref = `tel:${siteConfig.phones[0].replace(/-/g, "")}`;
export const lifeDiscountWhatsAppHref = `https://wa.me/972${siteConfig.whatsapp.replace(/^0/, "")}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const lifeDiscountFaqs = [
  {
    question: "זה מחייב אותי לקנות?",
    answer: "לא. משאירים פרטים לבדיקה. אין התחייבות לרכישה.",
  },
  {
    question: "הרפורמה כבר בתוקף?",
    answer: "לא. זו טיוטה בלבד, וטרם נכנסה לתוקף. אנחנו לא מציגים אותה כחוק שכבר חל.",
  },
  {
    question: "למי זה מתאים?",
    answer: "בעיקר בני 40–65, עם ביטוח חיים ו/או משכנתא.",
  },
  {
    question: "זה ייעוץ באתר?",
    answer: "לא. התאמה רק אחרי שיחה. המידע באתר כללי ואינו ייעוץ אישי.",
  },
];
