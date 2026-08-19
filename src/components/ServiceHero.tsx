import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  trustLine?: string;
  imageAlt?: string;
  heroImage?: string;
}

const ServiceHero = ({ title, subtitle, trustLine, heroImage, imageAlt }: ServiceHeroProps) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {heroImage && (
        <div className="absolute inset-0">
          <img src={heroImage} alt={imageAlt || title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/85 to-primary/70" />
        </div>
      )}
      {!heroImage && (
        <div className="absolute inset-0 bg-gradient-to-bl from-primary via-primary to-primary/90" />
      )}
      {/* Floating decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-brand-cream rounded-full blur-[150px] animate-float-slow" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="font-heading text-3xl md:text-5xl font-black leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-8 whitespace-pre-line">
            {subtitle}
          </p>
          {trustLine && (
            <p className="text-sm text-primary-foreground/60 mb-8">{trustLine}</p>
          )}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-accent text-accent-foreground px-7 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg hover:shadow-accent/20"
            >
              קבעו שיחת היכרות
            </Link>
            <Link
              to="/tools/insurance-scan"
              className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 px-7 py-3 rounded-full font-bold hover:bg-primary-foreground/20 transition-colors"
            >
              סורק הביטוח האישי (90 שניות)
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
