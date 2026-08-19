export const siteConfig = {
  name: "ליבה ביטוח ופנסיוני",
  nameEn: "Liba FS",
  domain: "https://liba-fs.co.il",
  phones: ["077-2376102", "077-2376103"],
  phonesIntl: ["+972-77-237-6102", "+972-77-237-6103"],
  whatsapp: "0505152221",
  email: "liba@liba-fs.co.il",
  address: {
    street: "חרושת 10",
    city: "קריית ביאליק",
    country: "ישראל",
    countryCode: "IL",
  },
  mapsUrl: "https://www.google.com/maps/search/%D7%97%D7%A8%D7%95%D7%A9%D7%AA+10+%D7%A7%D7%A8%D7%99%D7%99%D7%AA+%D7%91%D7%99%D7%90%D7%9C%D7%99%D7%A7",
  logo: "/assets/logo.png",
  privacyOfficer: "אסף",
  social: {
    instagram: "https://www.instagram.com/liba.insurance.il/",
    facebook: "https://www.facebook.com/profile.php?id=61590692581960",
  },
} as const;

export const servicesMenu = [
  {
    title: "ביטוחים למשפחה",
    hubHref: "/services/family-insurance",
    items: [
      { label: "ביטוח בריאות", href: "/services/family-insurance/health-insurance" },
      { label: "ביטוח מחלות קשות", href: "/services/family-insurance/critical-illness" },
      { label: "ביטוח חיים", href: "/services/family-insurance/life-insurance" },
      { label: "ביטוח משכנתא", href: "/services/family-insurance/mortgage-insurance" },
      { label: "ביטוח נסיעות לחו״ל", href: "/services/family-insurance/travel-insurance" },
    ],
  },
  {
    title: "פנסיה ופרישה",
    hubHref: "/services/retirement",
    items: [
      { label: "תכנון פרישה", href: "/services/retirement/retirement-planning" },
      { label: "קרנות השתלמות", href: "/services/retirement/study-fund" },
    ],
  },
  {
    title: "פיננסי ומימון",
    hubHref: "/services/finance",
    items: [
      { label: "תכנון פיננסי", href: "/services/finance/financial-planning" },
      { label: "הלוואות", href: "/services/finance/loans" },
    ],
  },
  {
    title: "זכויות והחזרים",
    hubHref: "/services/rights",
    items: [
      { label: "מיצוי זכויות", href: "/services/rights/rights-realization" },
    ],
  },
];

export const blogCategories = [
  { label: "משכנתא", slug: "mortgage", href: "/blog/mortgage" },
  { label: "בריאות", slug: "health", href: "/blog/health" },
  { label: "חיים", slug: "life", href: "/blog/life" },
  { label: "פרישה", slug: "retirement", href: "/blog/retirement" },
];

export const topicOptions = [
  "ביטוח בריאות",
  "ביטוח משכנתא",
  "ביטוח חיים / ריסק",
  "מחלות קשות",
  "תכנון פרישה / קרנות השתלמות",
  "תכנון פיננסי / הלוואות",
  "מיצוי זכויות",
  "כללי / לא בטוח",
];

export const purposeOptions = [
  "בדיקה לתיק הקיים (ללא עלות)",
  "שאלה/ייעוץ",
  "שיפור תנאים/סדר בתיק",
];

export const timeOptions = ["בוקר", "צהריים", "ערב"];

export const statusOptions = ["רווק/ה", "נשוי/אה", "גרוש/ה", "אלמן/ה"];
