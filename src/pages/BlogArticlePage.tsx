import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, CheckCircle2, AlertTriangle, Info, Zap, ExternalLink } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import ReadingProgress from "@/components/ReadingProgress";
import WhatsAppShare from "@/components/WhatsAppShare";
import LeadForm from "@/components/LeadForm";
import { getArticleBySlug, getRelatedArticles, categoryLabels, type ContentBlock, type BlogArticle } from "@/data/blogArticles";

/* ── Interactive Checklist Widget ── */
const ChecklistWidget = ({ id, items, threshold, thresholdMessage, successMessage, mode = "risk" }: {
  id: string; items: string[]; threshold: number; thresholdMessage: string; successMessage: string; mode?: "positive" | "risk";
}) => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const count = Object.values(checked).filter(Boolean).length;

  // Risk mode: checking items = problems you have. More checks = worse.
  // Positive mode: checking items = good things. More checks = better.
  const isWarning = mode === "risk" ? count >= threshold : count < threshold;
  const message = count >= threshold
    ? (mode === "risk" ? `⚠️ ${count} מתוך ${items.length} — ${thresholdMessage}` : `✅ ${count} מתוך ${items.length} — ${successMessage}`)
    : (mode === "risk" ? `${count} מתוך ${items.length} — ${successMessage}` : `${count} מתוך ${items.length} — ${thresholdMessage}`);

  return (
    <div className="my-8 p-6 rounded-2xl border-2 border-border bg-card shadow-sm">
      <p className="font-heading font-bold text-lg mb-4">בדקו את עצמכם ✓</p>
      <p className="text-sm text-muted-foreground mb-4">
        {mode === "risk" ? "סמנו כל משפט שנכון לגביכם:" : "סמנו כל דבר שעשיתם:"}
      </p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={!!checked[i]}
              onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
              className="mt-1 w-5 h-5 rounded border-border text-accent focus:ring-accent"
            />
            <span className={`text-sm transition-colors ${checked[i] ? (mode === "risk" ? "text-accent font-medium" : "text-foreground font-medium") : "text-muted-foreground"}`}>{item}</span>
          </label>
        ))}
      </div>
      {count > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          <div className={`p-4 rounded-xl text-sm font-medium ${
            isWarning
              ? "bg-red-50 text-red-800 border border-red-200" 
              : "bg-green-50 text-green-800 border border-green-200"
          }`}>
            <p>{message}</p>
            {isWarning && mode === "risk" && (
              <Link to="/contact" className="inline-block mt-3 px-5 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-md">
                דברו עם מומחה →
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ── Layers Widget (Health article 1) ── */
const LayersWidget = () => {
  const [active, setActive] = useState<number | null>(null);
  const layers = [
    { label: "ביטוח ממלכתי", sub: "חובה לכל תושב. רופא משפחה, מומחים בתור, ניתוחים ציבוריים.", color: "bg-primary text-primary-foreground" },
    { label: "שב\"ן — שירותי בריאות נוספים", sub: "רופא לבחירה, תרופות מחוץ לסל, בדיקות מהירות. 10-200 ₪/חודש.", color: "bg-primary/80 text-primary-foreground" },
    { label: "ביטוח פרטי", sub: "ניתוחים בחו\"ל, השתלות, תרופות ביולוגיות יקרות. בהתאם לצורך.", color: "bg-accent text-accent-foreground" },
  ];

  return (
    <div className="my-8 space-y-3">
      <p className="font-heading font-bold text-lg mb-2">שלוש שכבות הביטוח</p>
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className={`p-4 rounded-xl cursor-pointer transition-all ${layer.color} ${active === i ? "shadow-lg scale-[1.02]" : "hover:shadow-md"}`}
          onClick={() => setActive(active === i ? null : i)}
        >
          <p className="font-bold">{layer.label}</p>
          {active === i && <p className="mt-2 text-sm opacity-90">{layer.sub}</p>}
        </motion.div>
      ))}
    </div>
  );
};

/* ── Content Block Renderer ── */
const BlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "p":
      return <p className="text-foreground/90 leading-relaxed mb-4">{block.text}</p>;
    case "h2":
      return <h2 className="font-heading text-2xl font-bold mt-10 mb-4 text-foreground">{block.text}</h2>;
    case "h3":
      return <h3 className="font-heading text-xl font-bold mt-6 mb-3 text-foreground">{block.text}</h3>;
    case "callout": {
      const variants: Record<string, { bg: string; border: string; icon: React.ReactNode }> = {
        warning: { bg: "bg-amber-50", border: "border-amber-300", icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> },
        success: { bg: "bg-green-50", border: "border-green-300", icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
        info: { bg: "bg-blue-50", border: "border-blue-300", icon: <Info className="w-5 h-5 text-blue-600" /> },
        reform: { bg: "bg-yellow-50", border: "border-yellow-400", icon: <Zap className="w-5 h-5 text-yellow-600" /> },
      };
      const v = variants[block.variant] || variants.info;
      return (
        <div className={`my-6 p-5 rounded-xl border ${v.bg} ${v.border}`}>
          <div className="flex items-center gap-2 mb-2">{v.icon}<span className="font-bold text-foreground">{block.title}</span></div>
          <p className="text-sm text-foreground/80">{block.text}</p>
        </div>
      );
    }
    case "list":
      return (
        <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90 mr-4">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case "numbered-card":
      return (
        <div className="my-4 p-5 rounded-xl border border-border bg-card">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">{block.number}</span>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">{block.title}</h3>
              <p className="text-sm text-foreground/80">{block.text}</p>
              {block.fix && (
                <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-green-800"><strong>מה לעשות:</strong> {block.fix}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    case "steps":
      return (
        <div className="my-6 space-y-4">
          {block.items.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{i + 1}</div>
              <div>
                <h4 className="font-bold text-foreground">{step.title}</h4>
                <p className="text-sm text-foreground/80 mt-1">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "comparison":
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden border border-border">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-3 text-right text-sm font-medium"></th>
                <th className="p-3 text-center text-sm font-bold">{block.headers[0]}</th>
                <th className="p-3 text-center text-sm font-bold">{block.headers[1]}</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                  <td className="p-3 text-sm font-medium text-foreground">{row.label}</td>
                  <td className="p-3 text-center text-sm text-foreground/80">{row.col1}</td>
                  <td className="p-3 text-center text-sm text-foreground/80">{row.col2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "checklist-widget":
      return <ChecklistWidget {...block} />;
    case "layers-widget":
      return <LayersWidget />;
    case "timeline":
      return (
        <div className="my-8 relative pr-8">
          <div className="absolute right-3 top-0 bottom-0 w-0.5 bg-border" />
          {block.items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative mb-6 last:mb-0">
              <div className="absolute -right-[1.35rem] top-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
              <div className="bg-card rounded-xl p-4 border border-border">
                <span className="text-xs font-bold text-accent">{item.year}</span>
                <p className="text-sm text-foreground/80 mt-1">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      );
    case "pros-cons":
      return (
        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="font-bold text-green-800 mb-2">✓ יתרונות</p>
            <ul className="space-y-1">{block.pros.map((p, i) => <li key={i} className="text-sm text-green-700">• {p}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="font-bold text-red-800 mb-2">✗ סיכונים</p>
            <ul className="space-y-1">{block.cons.map((c, i) => <li key={i} className="text-sm text-red-700">• {c}</li>)}</ul>
          </div>
        </div>
      );
    case "formula":
      return (
        <div className="my-6 p-5 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="font-mono text-sm md:text-base font-bold text-primary">{block.text}</p>
        </div>
      );
    case "chips":
      return (
        <div className="my-6 flex flex-wrap gap-2">
          {block.items.map((chip, i) => (
            <ChipWithTooltip key={i} label={chip.label} tooltip={chip.tooltip} />
          ))}
        </div>
      );
    case "glossary":
      return (
        <div className="my-6 space-y-2">
          {block.items.map((item, i) => (
            <details key={i} className="group border border-border rounded-lg">
              <summary className="p-3 font-bold text-sm cursor-pointer hover:bg-muted/50 transition-colors">{item.term}</summary>
              <p className="px-3 pb-3 text-sm text-muted-foreground">{item.definition}</p>
            </details>
          ))}
        </div>
      );
    case "internal-link":
      return (
        <Link to={block.href} className="my-3 flex items-center gap-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors">
          <ExternalLink className="w-4 h-4" />
          {block.text}
        </Link>
      );
    default:
      return null;
  }
};

const ChipWithTooltip = ({ label, tooltip }: { label: string; tooltip: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium hover:bg-muted transition-colors"
      >
        {label}
      </button>
      {show && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-10 top-full mt-2 right-0 w-64 p-3 rounded-xl bg-popover border border-border shadow-lg text-sm text-popover-foreground">
          {tooltip}
        </motion.div>
      )}
    </div>
  );
};

/* ── Related Articles ── */
const RelatedArticles = ({ article }: { article: BlogArticle }) => {
  const related = getRelatedArticles(article);
  if (!related.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="font-heading text-2xl font-bold mb-6">כתבות קשורות</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {related.map(r => (
          <Link key={r.slug} to={`/blog/${r.categorySlug}/${r.slug}`} className="glass-card block overflow-hidden group hover:shadow-lg transition-shadow">
            {r.heroImage ? (
              <div className="h-28 overflow-hidden">
                <img src={r.heroImage} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            ) : (
              <div className="h-20 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <span className="text-3xl">{r.emoji}</span>
              </div>
            )}
            <div className="p-4">
              <span className="text-xs font-medium text-accent">{r.category}</span>
              <h3 className="font-heading font-bold text-sm mt-1 leading-snug group-hover:text-accent transition-colors">{r.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ── Main Page ── */
const BlogArticlePage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  if (!category || !slug) return <Navigate to="/blog" />;

  const article = getArticleBySlug(category, slug);
  if (!article) return <Navigate to="/blog" />;

  const breadcrumbsNav = [
    { label: "דף הבית", href: "/" },
    { label: "מדריכים וכלים", href: "/blog" },
    { label: categoryLabels[article.categorySlug] || article.category, href: `/blog/${article.categorySlug}` },
    { label: article.title },
  ];

  const breadcrumbsSeo = [
    { name: "דף הבית", url: "/" },
    { name: "מדריכים וכלים", url: "/blog" },
    { name: categoryLabels[article.categorySlug] || article.category, url: `/blog/${article.categorySlug}` },
    { name: article.title, url: `/blog/${article.categorySlug}/${article.slug}` },
  ];

  return (
    <>
      <SEOHead
        title={article.seoTitle}
        description={article.metaDescription}
        canonical={`/blog/${article.categorySlug}/${article.slug}`}
        keywords={article.keywords}
        ogImage={article.heroImage}
        ogType="article"
        breadcrumbs={breadcrumbsSeo}
        faqItems={article.faqs}
        articleSchema={{
          headline: article.seoTitle,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          image: article.heroImage,
        }}
      />
      <ReadingProgress />
      <main id="main-content" className="pt-20">
        {/* Hero with image */}
        <section className="relative overflow-hidden">
          {article.heroImage && (
            <div className="absolute inset-0">
              <img src={article.heroImage} alt={article.title} className="w-full h-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/85 to-primary/75" />
            </div>
          )}
          <div className={`relative section-padding ${!article.heroImage ? 'bg-primary' : ''} text-primary-foreground`}>
            <div className="container mx-auto max-w-3xl">
              <Breadcrumbs items={breadcrumbsNav} />
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold mb-4">{article.category}</span>
                <h1 className="font-heading text-3xl md:text-4xl font-black leading-tight mb-4">
                  {article.heroHighlight ? (
                    <>
                      {article.title.split(article.heroHighlight)[0]}
                      <span className="text-accent">{article.heroHighlight}</span>
                      {article.title.split(article.heroHighlight)[1]}
                    </>
                  ) : article.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(article.datePublished).toLocaleDateString("he-IL")}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readingTime} דקות קריאה</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="section-padding bg-background">
          <div className="container mx-auto max-w-3xl">
            {article.content.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}

            {/* FAQ */}
            {article.faqs.length > 0 && (
              <div className="mt-12">
                <FAQSection items={article.faqs} title="שאלות נפוצות" />
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <WhatsAppShare title={article.title} />
            </div>

            {/* Related */}
            <RelatedArticles article={article} />

            {/* CTA */}
            <section className="mt-12 p-8 rounded-2xl bg-gradient-to-bl from-primary via-primary to-primary/90 text-primary-foreground text-center glow-primary">
              <p className="font-heading text-xl font-bold mb-4">{article.cta.text}</p>
              <Link to={article.cta.href} className="inline-block px-8 py-3 rounded-full bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity shadow-lg">
                {article.cta.button}
              </Link>
            </section>

            {/* Disclaimer */}
            <p className="mt-8 text-xs text-muted-foreground text-center">
              התוכן נכתב על ידי ליבה ביטוח ופנסיוני למטרות מידע כללי בלבד, ואינו מהווה ייעוץ ביטוחי או פיננסי. לייעוץ מותאם אישית — פנו אלינו.
            </p>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogArticlePage;
