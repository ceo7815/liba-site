import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogArticles, categoryLabels, getArticlesByCategory } from "@/data/blogArticles";
import { blogCategories } from "@/data/siteConfig";

const BlogPage = () => {
  const { category } = useParams<{ category?: string }>();
  const isCategory = !!category;
  const articles = isCategory ? getArticlesByCategory(category!) : blogArticles;
  const categoryLabel = category ? categoryLabels[category] : undefined;
  const categories = [{ label: "הכל", slug: "" }, ...blogCategories.map(c => ({ label: c.label, slug: c.slug }))];

  const breadcrumbsNav = [
    { label: "דף הבית", href: "/" },
    { label: "מדריכים וכלים", href: "/blog" },
    ...(categoryLabel ? [{ label: categoryLabel }] : []),
  ];
  const breadcrumbsSeo = [
    { name: "דף הבית", url: "/" },
    { name: "מדריכים וכלים", url: "/blog" },
    ...(categoryLabel ? [{ name: categoryLabel, url: `/blog/${category}` }] : []),
  ];

  const title = categoryLabel
    ? `${categoryLabel} — מדריכים וכלים | ליבה ביטוח ופנסיוני`
    : "מדריכים וכלים | ליבה ביטוח ופנסיוני";
  const description = categoryLabel
    ? `כתבות ומדריכים בנושא ${categoryLabel} — תוכן פרקטי שיעזור לכם לקבל החלטות חכמות בביטוח ופנסיה.`
    : "מדריכים פרקטיים בביטוח ופנסיה: מה לבדוק, מתי לבדוק, ואיך להימנע מטעויות יקרות. קראו עכשיו →";

  return (
    <>
      <SEOHead title={title} description={description} canonical={isCategory ? `/blog/${category}` : "/blog"} breadcrumbs={breadcrumbsSeo} />
      <main id="main-content" className="pt-20">
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl">
            <Breadcrumbs items={breadcrumbsNav} />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <h1 className="font-heading text-4xl md:text-5xl font-black mb-4">
                {categoryLabel ? `מדריכים: ${categoryLabel}` : "מדריכים וכלים"}
              </h1>
              <p className="text-lg text-primary-foreground/80">{description}</p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(cat => {
                const isActive = cat.slug === (category || "");
                return (
                  <Link
                    key={cat.slug}
                    to={cat.slug ? `/blog/${cat.slug}` : "/blog"}
                    className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border hover:bg-accent hover:text-accent-foreground hover:border-accent"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* Articles Grid */}
            {articles.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">אין כתבות בקטגוריה זו עדיין.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.05 }}
                  >
                    <Link
                      to={`/blog/${post.categorySlug}/${post.slug}`}
                      className="glass-card block overflow-hidden group hover:shadow-xl transition-shadow h-full"
                    >
                      <div className="h-40 overflow-hidden">
                        {post.heroImage ? (
                          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                            <span className="text-4xl">{post.emoji}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-accent">{post.category}</span>
                          <span className="text-xs text-muted-foreground">• {post.readingTime} דק׳</span>
                        </div>
                        <h3 className="font-heading font-bold mt-1 mb-3 leading-snug group-hover:text-accent transition-colors">{post.title}</h3>
                        <span className="text-accent text-sm font-medium flex items-center gap-1">
                          לקריאה <ArrowLeft className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
