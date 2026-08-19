# ליבה ביטוח ופנסיוני — אתר

אתר שיווקי של `liba-fs.co.il`. לידים נשלחים ל-Make; גיבוי לטבלת `website_leads` ב-liba-os (Supabase).

## פריסה ב-xCloud (לפני שינוי DNS)

1. ב-xCloud, חברו GitHub של **ceo7815** (לא titatu-agents).
2. Deploy via Git → ריפו פרטי `ceo7815/liba-site` → ענף `main`.
3. סוג אפליקציה: **Node.js / React (Vite)**.
4. Serving mode: **Static build**. Web root: `dist`.
5. Node: **22**.
6. דומיין זמני של xCloud קודם. את `liba-fs.co.il` מחברים רק אחרי בדיקה.

### משתני סביבה (חובה לפני הבילד)

העתיקו מ-`.env` המקומי ל-Advanced / Environment ב-xCloud:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

בלי אלה גיבוי הלידים לא יישמר. האוטומציות ב-Make עדיין יעבדו כי כתובות ה-webhook בקוד.

### סקריפט פריסה

```bash
npm ci
npm run build
```

### SPA

רענון של `/about` או `/lp/...` חייב לחזור ל-`index.html`.  
אם xCloud לא מגדיר את זה אוטומטית, הדביקו את `deploy/nginx-spa.conf` בהגדרות Nginx של האתר.

### אחרי שהאתר הזמני עובד

1. לפתוח דף נחיתה ולשלוח טופס בדיקה — הליד חייב להגיע ל-Make.
2. רק אז לבקש ממנהל הדומיין לשנות A / CNAME של `liba-fs.co.il` (בלי לגעת ב-MX).

## פיתוח מקומי

```bash
npm install
npm run dev
```

ב-`npm run dev` לא נשלחים לידים ל-Make ולא נכתב למסד החי.
