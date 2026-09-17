import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceSchemaData {
  name: string;
  description: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FAQItem[];
  articleSchema?: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    image?: string;
  };
  serviceSchema?: ServiceSchemaData;
  noindex?: boolean;
}

const SEOHead = ({ title, description, canonical, keywords, ogImage, ogType = "website", breadcrumbs, faqItems, articleSchema, serviceSchema, noindex }: SEOHeadProps) => {
  const fullCanonical = canonical ? `${siteConfig.domain}${canonical}` : undefined;
  const image = ogImage || `${siteConfig.domain}/og-liba.webp`;

  useEffect(() => {
    document.title = title;
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      const sel = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
      let el = document.head.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:image", image);
    if (fullCanonical) {
      setMeta("property", "og:url", fullCanonical);
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = fullCanonical;
    }
  }, [title, description, fullCanonical, image, ogType]);

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.url}`,
    })),
  } : null;

  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  const articleJsonLd = articleSchema ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleSchema.headline,
    datePublished: articleSchema.datePublished,
    dateModified: articleSchema.dateModified || articleSchema.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullCanonical || `${siteConfig.domain}/`,
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.domain}${siteConfig.logo}`,
      },
    },
    ...(articleSchema.image && { image: articleSchema.image }),
  } : null;

  const serviceJsonLd = serviceSchema ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceSchema.name,
    description: serviceSchema.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
    availableLanguage: "he",
  } : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Locale & Language */}
      <meta property="og:locale" content="he_IL" />
      <link rel="alternate" hrefLang="he" href={fullCanonical || siteConfig.domain} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      {articleJsonLd && (
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      )}
      {serviceJsonLd && (
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
