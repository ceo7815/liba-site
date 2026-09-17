import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { Plugin } from "vite";

const TITLE = "יש לכם ביטוח חיים? בדקו אם ההנחה זמנית | ליבה";
const DESCRIPTION =
  "בדיקת הנחות בביטוח חיים ללא עלות וללא התחייבות. טיוטת רשות שוק ההון טרם בתוקף. נציג מליבה חוזר אליכם.";
const URL = "https://liba-fs.co.il/lp/life-discount";
const IMAGE = "https://liba-fs.co.il/og-liba.webp";

/** Facebook's crawler does not run JS. Serve static OG tags for this LP path. */
export function lifeDiscountOgHtml(): Plugin {
  return {
    name: "life-discount-og-html",
    closeBundle() {
      const distHtml = path.resolve("dist/index.html");
      let html = readFileSync(distHtml, "utf8");
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`);
      html = html.replace(/property="og:title" content="[^"]*"/g, `property="og:title" content="${TITLE}"`);
      html = html.replace(/name="twitter:title" content="[^"]*"/g, `name="twitter:title" content="${TITLE}"`);
      html = html.replace(/name="description" content="[^"]*"/g, `name="description" content="${DESCRIPTION}"`);
      html = html.replace(/property="og:description" content="[^"]*"/g, `property="og:description" content="${DESCRIPTION}"`);
      html = html.replace(/name="twitter:description" content="[^"]*"/g, `name="twitter:description" content="${DESCRIPTION}"`);
      html = html.replace(/property="og:image" content="[^"]*"/g, `property="og:image" content="${IMAGE}"`);
      html = html.replace(/name="twitter:image" content="[^"]*"/g, `name="twitter:image" content="${IMAGE}"`);
      if (!html.includes('property="og:url"')) {
        html = html.replace(
          '<meta property="og:type" content="website">',
          `<meta property="og:type" content="website">\n  <meta property="og:url" content="${URL}">`,
        );
      } else {
        html = html.replace(/property="og:url" content="[^"]*"/g, `property="og:url" content="${URL}"`);
      }
      const outDir = path.resolve("dist/lp/life-discount");
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, "index.html"), html);
    },
  };
}
