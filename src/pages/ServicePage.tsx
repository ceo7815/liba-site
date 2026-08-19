import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Shield, Heart, Home, Plane, Brain, TrendingUp, FileSearch, CheckCircle, ArrowLeft } from "lucide-react";
import LeadForm from "@/components/LeadForm";

const serviceData: Record<string, {
  title: string;
  h1: string;
  subtitle: string;
  metaTitle: string;
  metaDesc: string;
  icon: React.ReactNode;
  whyCheck: string[];
  whatWeCheck: string[];
  whoIsItFor: string[];
  topicOptions: string[];
  internalLinks: { label: string; href: string }[];
}> = {
  "health-insurance": {
    title: "ביטוח בריאות",
    h1: "ביטוח בריאות – לוודא שאתם מוגנים, בלי לשלם סתם",
    subtitle: "אנחנו עוזרים לעשות סדר: מה יש לכם, מה מיותר, ומה חסר — בשפה פשוטה.",
    metaTitle: "ביטוח בריאות פרטי | בדיקה והתאמה למשפחה – Liba FS",
    metaDesc: "ביטוח בריאות פרטי בהתאמה אישית: בדיקת כיסויים, מניעת כפילויות ותשלום מיותר, וסדר בתיק.",
    icon: <Heart className="w-8 h-8" />,
    whyCheck: [
      "מה מכוסה היום – ומה רק ״נשמע״ מכוסה",
      "איפה יש כפילות (קופה/עבודה/פרטי)",
      "מה באמת חשוב לכם (זמינות תורים, בחירת רופא, בדיקות/טיפולים פרטי)",
      "מה החיוב החודשי ומה גרם לו להשתנות",
      "האם הכיסוי מתאים לשלב החיים (משפחה, ילדים, עבודה, שינויים)",
    ],
    whatWeCheck: [
      "התאמת הכיסוי למצב המשפחתי והרפואי",
      "זיהוי כפילויות בין קופה, עבודה ופרטי",
      "בדיקת חיובים והתאמת מסלול",
      "בדיקת תנאים והחרגות",
    ],
    whoIsItFor: [
      'מי שמרגיש שהתיק הביטוחי שלו על ״אוטומט״',
      "מי שיש לו גם קופה + עבודה + משהו עוד, ולא בטוח מה באמת מוסיף",
      "משפחות שרוצות שקט כשצריך טיפול/בדיקה ולא להיתקע",
      "מי שחווה עלייה בחיובים ורוצה להבין למה",
    ],
    topicOptions: ["לוודא כיסוי נכון", "לבדוק כפילויות ותשלום", "לעשות סדר בתיק"],
    internalLinks: [
      { label: "ביטוחים למשפחה", href: "/services/family-insurance/health-insurance" },
      { label: "סורק הביטוח האישי", href: "/tools/insurance-scan" },
    ],
  },
  "critical-illness": {
    title: "ביטוח מחלות קשות",
    h1: "ביטוח מחלות קשות – כסף שמגיע ברגע האמת, כדי שהמשפחה תוכל לנשום",
    subtitle: "כשמתמודדים עם מחלה קשה, הבעיה היא לא רק רפואית. ביטוח מחלות קשות נועד לתת מרחב פעולה כלכלי למשפחה.",
    metaTitle: "ביטוח מחלות קשות | בדיקה והתאמה למשפחה – Liba FS",
    metaDesc: "ביטוח מחלות קשות נועד לתת חמצן כלכלי למשפחה בזמן משבר. בדיקה מסודרת מוודאת התאמה, תנאים ברורים, והימנעות מכפל.",
    icon: <Brain className="w-8 h-8" />,
    whyCheck: [
      "כי מחלה קשה משנה את השגרה: עבודה, הכנסה, הוצאות, נסיעות, טיפולים",
      "כי גם עם מערכת בריאות טובה, יש הוצאות שלא תמיד צפויות",
      "כי משפחות לא רוצות ״לגלות״ שהכיסוי לא תואם או לא ברור",
      "כי לפעמים כבר יש כיסויים קיימים, ושווה להבין מה באמת חסר ומה חופף",
    ],
    whatWeCheck: [
      'מה באמת כלול. להבין כותרות לא להסתמך על – מה מוגדר כ״מקרה מזכה״',
      "גובה הפיצוי ומה הוא מאפשר",
      "החרגות ו״אותיות קטנות״",
      "התאמה לגיל ולשלב החיים",
      "האם יש כפל או פער עם כיסויים אחרים",
    ],
    whoIsItFor: [
      "מי שיש לו משפחה ותלויים כלכליים ורוצה ודאות",
      "מי שחווה שינוי בשנים האחרונות ולא בדק את התיק רב זמן",
      "מי שיש לו כמה שכבות ביטוח ולא בטוח מה מכסה מה",
      'מי שרוצה לבנות תיק מסודר ולא ״טלאי על טלאי״',
    ],
    topicOptions: ["לדעת שיש כיסוי ברור", "לעשות סדר בתיק", "לוודא שאין כפילויות"],
    internalLinks: [
      { label: "ביטוחים למשפחה", href: "/services/family-insurance/health-insurance" },
      { label: "סורק הביטוח האישי", href: "/tools/insurance-scan" },
    ],
  },
  "life-insurance": {
    title: "ביטוח חיים",
    h1: "ביטוח חיים – להגן על המשפחה כלכלית, בלי ניחושים ובלי עודף תשלום",
    subtitle: "ביטוח חיים (ריסק) נועד להגן על התא המשפחתי במצבים שבהם ההכנסה נפגעת. חשוב להבין סכומים, תקופות, ומה באמת נדרש.",
    metaTitle: "ביטוח חיים (ריסק) | בדיקה והתאמה למשפחה – Liba FS",
    metaDesc: "ביטוח חיים ריסק נועד להגן על המשפחה כלכלית במקרה של אובדן חיים. בדיקה מסודרת מוודאת התאמה.",
    icon: <Shield className="w-8 h-8" />,
    whyCheck: [
      "כי בית משק בנוי על הכנסה. כשאחת ההכנסות נפגעת, החיים לא נעצרים: משכנתא, שכירות, חינוך, הוצאות",
      'כי אנשים רבים מחזיקים כיסוי ״דרך העבודה״ או ״דרך המשכנתא״, וחושבים שזה מספיק',
      'כי ביטוח חיים טוב הוא כזה שנותן למשפחה זמן להתארגן – לא רק ״מספר יפה על הנייר״',
      "כי עם השנים צריכים לעדכן: ילדים, שינוי הכנסה, מחזור משכנתא, מעבר לעצמאות",
    ],
    whatWeCheck: [
      "סכום הכיסוי – האם הוא באמת מתאים למשפחה",
      "התקופה – לכמה זמן המשפחה צריכה הגנה",
      "כיסויים נלווים – אובדן כושר עבודה, פטור מפרמיה",
      "התאמה למצב הכולל – ביטוח דרך עבודה/משכנתא/פרטי",
    ],
    whoIsItFor: [
      "משפחות עם ילדים או תלויים כלכליים",
      "מי שלקח משכנתא/הלוואות משמעותיות ורוצה הגנה אמיתית משפחתית",
      "מי שיש לו כיסוי דרך עבודה ולא בטוח מה יקרה אם יחליף מקום עבודה",
      "עצמאים/הכנסה לא קבועה שרוצים יציבות",
    ],
    topicOptions: ["להגן על המשפחה בצורה נכונה", "לעשות סדר בתיק", "לבדוק כיסוי דרך עבודה/משכנתא"],
    internalLinks: [
      { label: "ביטוח משכנתא", href: "/services/family-insurance/mortgage-insurance" },
      { label: "ביטוח בריאות", href: "/services/family-insurance/health-insurance" },
    ],
  },
  "mortgage-insurance": {
    title: "ביטוח משכנתא",
    h1: "ביטוח משכנתא – לבדוק שאתם עומדים בדרישות הבנק, ושלא משלמים סתם",
    subtitle: "ביטוח משכנתא נרכש בדרך כלל ביום החתימה — ונשכח. אבל עם השנים דברים משתנים. בדיקה קצרה עושה סדר.",
    metaTitle: "ביטוח משכנתא | בדיקה, התאמה והוזלה חכמה – Liba FS",
    metaDesc: "ביטוח משכנתא: בדיקה, התאמה והוזלה חכמה. לבדוק שאתם עומדים בדרישות הבנק, ושלא משלמים סתם.",
    icon: <Home className="w-8 h-8" />,
    whyCheck: [
      'כי זה אחד החיובים הכי ״שקטים״ בבית — יורד כל חודש, בלי שמסתכלים',
      "כי אחרי מיחזור משכנתא או שינוי במסלול, הרבה אנשים לא בטוחים מה קרה לביטוח",
      "כי החיוב עלול להשתנות עם השנים",
      "כי חשוב לוודא שתי מטרות במקביל: עמידה בדרישות הבנק + שקט בבית",
    ],
    whatWeCheck: [
      "מה הבנק דורש בפועל",
      "ביטוח חיים למשכנתא: האם זה תואם את יתרת ההלוואה ואת מבנה הלווים",
      "ביטוח מבנה: מה מכוסה ומה לא",
      "כפילויות ושכבות מסביב",
      "שינויים שהיו בשנים האחרונות",
    ],
    whoIsItFor: [
      "מי שלא בדק את הביטוח מאז החתימה",
      "מי שמיחזר/החליף בנק/שינה מסלול בשנים האחרונות",
      "מי שהחיוב החודשי עלה והוא לא יודע למה",
      "מי שיש לו גם סוכן וגם ביטוחים ״ישירים״",
    ],
    topicOptions: ["החיוב עלה", "עשינו מיחזור", "לא בדקנו שנים", "רוצים להבין אם משלמים כפול"],
    internalLinks: [
      { label: "ביטוח חיים", href: "/services/family-insurance/life-insurance" },
      { label: "ביטוחים למשפחה", href: "/services/family-insurance/health-insurance" },
    ],
  },
  "travel-insurance": {
    title: "ביטוח נסיעות לחו״ל",
    h1: "ביטוח נסיעות לחו״ל – התאמה מהירה לפני טיסה",
    subtitle: "ביטוח נסיעות אמור להיות פשוט, אבל בפועל יש נסיעות שונות. המטרה שלנו לעזור לכם לבחור כיסוי שמתאים לנסיעה עצמה.",
    metaTitle: "ביטוח נסיעות לחו״ל | התאמה ליעד ולסוג נסיעה – Liba FS",
    metaDesc: "ביטוח נסיעות לחו״ל בהתאמה ליעד ולסוג הנסיעה: מצב רפואי, ספורט, כבודה, ביטול טיסה ועוד.",
    icon: <Plane className="w-8 h-8" />,
    whyCheck: [
      "כי נסיעה קצרה לעיר אירופאית לא דומה לטיול ארוך, קרוז, או יעד מרוחק",
      "כי במקרים רבים הבעיה לא העלות — היא כיסוי שלא מתאים",
      "כי אנשים רבים מגלים את ההבדלים רק כשצריך עזרה — וכבר מאוחר",
    ],
    whatWeCheck: [
      "יעד + אורך נסיעה – משפיעים על סוג הכיסוי",
      "מי נוסע – ילדים / מבוגרים / זוג / קבוצה",
      "מצב רפואי קיים – חייבים לוודא שהכיסוי מתאים",
      "פעילות במהלך הנסיעה – ספורט, סקי, טרקים",
      "כבודה וביטול נסיעה",
    ],
    whoIsItFor: [
      "מי שטס עם ילדים ורוצה שקט",
      "מי שיש לו מצב רפואי קיים/טיפול קבוע",
      'מי שמתכנן פעילות ״מחוץ לשגרה״ (ספורט/סקי/טרקים)',
      "מי שטס לתקופה ארוכה",
    ],
    topicOptions: ["טיול משפחתי", "נסיעת עסקים", "ספורט/אתגרי", "אחר"],
    internalLinks: [
      { label: "ביטוח בריאות", href: "/services/family-insurance/health-insurance" },
      { label: "סורק הביטוח האישי", href: "/tools/insurance-scan" },
    ],
  },
  "retirement-planning": {
    title: "תכנון פרישה",
    h1: "תכנון פרישה – להפוך שנים של חיסכון לתוכנית ברורה, בלי טעויות יקרות",
    subtitle: "פרישה היא לא ״אירוע של שבוע״. היא מפנה נקודת כלכלית. בדיוק בגלל זה צריך תהליך מסודר: להבין מה צפוי, מה האפשרויות, ואיך מקבלים החלטות בשקט ולא בלחץ.",
    metaTitle: "תכנון פרישה | ליווי מקצועי לפני פרישה – Liba FS",
    metaDesc: "תכנון פרישה מסודר מונע טעויות יקרות ומייצר בהירות: הכנסות צפויות, קצבאות, מסלול ומשיכה.",
    icon: <TrendingUp className="w-8 h-8" />,
    whyCheck: [
      "כי החלטות בפרישה משפיעות על שנים קדימה, ולעיתים קשה לתקן אותן אחרי שבוצעו",
      "כי אנשים רבים יודעים כמה חסכו, אבל לא באמת יודעים מה תהיה ההכנסה החודשית",
      "כי יש הרבה אפשרויות, והרבה רעש. תכנון טוב מפשט ומייצר ודאות",
      "כי המטרה: לצאת לפרישה עם תוכנית: הכנסה, גמישות, וניהול סיכונים",
    ],
    whatWeCheck: [
      "תמונת מצב – מה יש היום, איפה זה נמצא, ומה המשמעות של המסלולים",
      "הכנסה צפויה בפרישה – מה צפוי להגיע, מה קבוע, ומה משתנה",
      "נקודות החלטה – בכל פרישה יש החלטות שיכולות להשפיע משמעותית. אנחנו מציפים אותן בצורה ברורה",
    ],
    whoIsItFor: [
      "מי שמתקרב לגיל פרישה ורוצה להגיע מוכן",
      "מי שכבר בפרישה אבל מרגיש שאין לו תמונה מסודרת",
      "מי שיש לו כמה מקורות/מסלולים ורוצה סדר",
      "מי שעבר שינוי עסקי/משפחתי בשנים אחרונות",
    ],
    topicOptions: ["מתקרב לפרישה", "כבר בפרישה", "רוצה לבדוק אופציות"],
    internalLinks: [
      { label: "קרנות השתלמות", href: "/services/retirement/study-fund" },
      { label: "סורק הביטוח האישי", href: "/tools/insurance-scan" },
    ],
  },
  "study-fund": {
    title: "קרנות השתלמות",
    h1: "קרנות השתלמות – לבדוק שאתם במסלול הנכון ושלא משלמים יותר ממה שצריך",
    subtitle: "קרן השתלמות היא כלי פיננסי חזק. הבעיה היא שרוב האנשים פותחים אותה פעם אחת ואז מפסיקים להסתכל.",
    metaTitle: "קרנות השתלמות | בדיקה והתאמת מסלול ודמי ניהול – Liba FS",
    metaDesc: "קרן השתלמות היא כלי פיננסי משמעותי. בדיקה מסודרת עוזרת להבין מסלול, דמי ניהול, פיזור.",
    icon: <FileSearch className="w-8 h-8" />,
    whyCheck: [
      'כי הרבה קרנות ״נשארות״ במסלול שלא בהכרח מתאים לשלב החיים היום',
      "כי דמי ניהול מצטברים לאורך זמן, ואנשים לא תמיד יודעים מה הם משלמים",
      "כי לפעמים יש כמה קרנות במקומות שונים, מה שיוצר חוסר סדר וחוסר מעקב",
    ],
    whatWeCheck: [
      "איפה הקרן נמצאת ומה היתרה. להפסיק לנחש",
      "המסלול – האם הוא מתאים לגיל, לתקופה ולרמת הסיכון",
      "דמי ניהול – כמה משלמים ולמה",
      "פיזור – האם יש ריכוז גבוה מדי",
    ],
    whoIsItFor: [
      "מי שפתח קרן ולא בדק מאז",
      "מי שיש לו כמה קרנות במקומות שונים",
      "מי שלא בטוח מה המסלול ומה דמי הניהול",
    ],
    topicOptions: ["תכנון פרישה", "קרן השתלמות", "כללי"],
    internalLinks: [
      { label: "פנסיה ופרישה", href: "/services/retirement/retirement-planning" },
      { label: "סורק הביטוח האישי", href: "/tools/insurance-scan" },
    ],
  },
  "financial-planning": {
    title: "תכנון פיננסי",
    h1: "תכנון פיננסי – סדר בתמונה הכוללת",
    subtitle: "הבנה מקיפה של המצב הפיננסי שלכם ובניית תוכנית מותאמת.",
    metaTitle: "תכנון פיננסי | ליבה ביטוח ופנסיוני – Liba FS",
    metaDesc: "תכנון פיננסי מקצועי – סדר בהכנסות, הוצאות, חסכונות והשקעות.",
    icon: <TrendingUp className="w-8 h-8" />,
    whyCheck: ["כדי לראות את התמונה המלאה", "כדי לקבל החלטות מבוססות", "כדי לתכנן קדימה"],
    whatWeCheck: ["הכנסות והוצאות", "חסכונות והשקעות", "ביטוחים ופנסיה", "התחייבויות"],
    whoIsItFor: ["משפחות שרוצות סדר פיננסי", "מי שעומד בפני החלטה כלכלית גדולה"],
    topicOptions: ["תכנון כללי", "השקעות", "חסכונות"],
    internalLinks: [{ label: "תכנון פרישה", href: "/services/retirement/retirement-planning" }],
  },
  "loans": {
    title: "הלוואות",
    h1: "הלוואות מחברות ביטוח/בתי השקעות",
    subtitle: "בדיקת אפשרויות הלוואה מגופים פיננסיים שונים.",
    metaTitle: "הלוואות | ליבה ביטוח ופנסיוני – Liba FS",
    metaDesc: "הלוואות מחברות ביטוח ובתי השקעות – בדיקה והשוואה.",
    icon: <TrendingUp className="w-8 h-8" />,
    whyCheck: ["כדי לבדוק את כל האפשרויות", "כדי למצוא תנאים מתאימים"],
    whatWeCheck: ["ריביות ותנאים", "גופים שונים", "התאמה למצב"],
    whoIsItFor: ["מי שמחפש הלוואה", "מי שרוצה להשוות תנאים"],
    topicOptions: ["הלוואה אישית", "מימון נכס", "אחר"],
    internalLinks: [{ label: "תכנון פיננסי", href: "/services/finance/financial-planning" }],
  },
  "rights-realization": {
    title: "מיצוי זכויות",
    h1: "מיצוי זכויות – לוודא שאתם מקבלים את מה שמגיע לכם",
    subtitle: "בדיקה מסודרת של זכויות שאולי לא ידעתם שמגיעות לכם.",
    metaTitle: "מיצוי זכויות | ליבה ביטוח ופנסיוני – Liba FS",
    metaDesc: "מיצוי זכויות – בדיקה מקצועית לוודא שאתם מקבלים את כל מה שמגיע.",
    icon: <FileSearch className="w-8 h-8" />,
    whyCheck: ["כי יש זכויות שלא תמיד יודעים עליהן", "כי בדיקה מסודרת יכולה לחשוף הטבות"],
    whatWeCheck: ["זכויות מביטוח לאומי", "זכויות ממעסיקים קודמים", "קצבאות והטבות"],
    whoIsItFor: ["מי שמתקרב לפרישה", "מי שעבר שינוי תעסוקתי", "מי שרוצה לבדוק"],
    topicOptions: ["פרישה", "שינוי עבודה", "כללי"],
    internalLinks: [{ label: "תכנון פרישה", href: "/services/retirement/retirement-planning" }],
  },
};

const slugToKey: Record<string, string> = {
  "health-insurance": "health-insurance",
  "critical-illness": "critical-illness",
  "life-insurance": "life-insurance",
  "mortgage-insurance": "mortgage-insurance",
  "travel-insurance": "travel-insurance",
  "retirement-planning": "retirement-planning",
  "study-fund": "study-fund",
  "financial-planning": "financial-planning",
  "loans": "loans",
  "rights-realization": "rights-realization",
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const key = slug ? slugToKey[slug] : undefined;
  const data = key ? serviceData[key] : undefined;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p>הדף לא נמצא</p>
      </div>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
                {data.icon}
              </div>
              <nav className="text-sm text-primary-foreground/60">
                <Link to="/" className="hover:text-primary-foreground">בית</Link> / <Link to="/" className="hover:text-primary-foreground">שירותים</Link> / {data.title}
              </nav>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-black leading-tight mb-4">{data.h1}</h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">{data.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                קבעו שיחת היכרות
              </Link>
              <Link to="/tools/insurance-scan" className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary-foreground/10 transition-colors">
                סורק הביטוח האישי
              </Link>
            </div>
            <p className="text-sm text-primary-foreground/50 mt-4">שיחה ראשונית ללא התחייבות • הסבר פשוט • התאמה אישית</p>
          </motion.div>
        </div>
      </section>

      {/* למה לבדוק */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">למה לבדוק {data.title}?</h2>
          <div className="space-y-4">
            {data.whyCheck.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* מה בודקים */}
      <section className="section-padding bg-secondary/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">מה בודקים בפועל?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.whatWeCheck.map((item, i) => (
              <div key={i} className="glass-card p-5 flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* למי מתאים */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">למי במיוחד מתאים?</h2>
          <div className="space-y-3">
            {data.whoIsItFor.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-accent">●</span>
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* איך עובדים */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">איך עובדים אצלנו?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: "שיחת היכרות קצרה", desc: "מבינים מה מצב המשפחה, ומה חשוב לכם." },
              { step: 2, title: "בדיקה מסודרת", desc: "ממפים את השכבות, בודקים כפילויות/פערים, ומסדרים תמונת מצב." },
              { step: 3, title: "המלצה שקופה", desc: "מראים מה כדאי להשאיר, מה לשפר, ומה לשקול — עם הסבר פשוט." },
            ].map((s) => (
              <div key={s.step} className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 font-heading font-black text-xl">
                  {s.step}
                </div>
                <h3 className="font-heading font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/contact" className="text-accent font-bold hover:underline">
              קבעו שיחת היכרות ←
            </Link>
          </div>
        </div>
      </section>

      {/* טופס */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-xl">
          <LeadForm
            source={`service-${key}`}
            title={`רוצים שנעשה סדר ב${data.title}?`}
            subtitle="השאירו פרטים ונחזור לשיחת היכרות קצרה — כדי להבין מה יש היום ומה כדאי לבדוק."
          />
        </div>
      </section>

      {/* קישורים פנימיים */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="font-heading text-xl font-bold mb-4">לקריאה נוספת</h3>
          <div className="flex flex-wrap gap-3">
            {data.internalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="glass-card px-5 py-2.5 text-sm font-medium hover:shadow-md transition-shadow flex items-center gap-2"
              >
                {link.label} <ArrowLeft className="w-3 h-3" />
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60 mt-6">
            המידע באתר כללי ואינו מהווה ייעוץ אישי. התאמה נעשית לאחר בדיקה.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
