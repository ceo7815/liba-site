import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { siteConfig, servicesMenu, blogCategories } from "@/data/siteConfig";
import logo from "@/assets/logo.png";

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.955L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(205,65%,12%)] via-[hsl(210,60%,14%)] to-[hsl(205,65%,10%)]" />
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-[20%] w-96 h-96 rounded-full bg-brand-teal blur-[200px]" />
        <div className="absolute bottom-10 right-[30%] w-64 h-64 rounded-full bg-accent blur-[150px]" />
        <div className="absolute top-[50%] left-[60%] w-48 h-48 rounded-full bg-brand-gold blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-4 py-16 text-primary-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt={siteConfig.name} className="h-20 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
              ליווי ביטוחי ופיננסי מקצועי – סדר בכיסוי, בתנאים ובכסף.
            </p>
            <Link
              to="/tools/insurance-scan"
              className="inline-block bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity hover:shadow-lg hover:shadow-accent/20"
            >
              סורק הביטוח האישי
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">שירותים</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {servicesMenu.map((group) => (
                <li key={group.hubHref}>
                  <Link to={group.hubHref} className="hover:text-accent transition-colors font-medium">
                    {group.title}
                  </Link>
                  <ul className="mr-3 mt-1 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link to={item.href} className="hover:text-accent transition-colors text-primary-foreground/50 text-xs">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Categories */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">מדריכים וכלים</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/blog" className="hover:text-accent transition-colors">כל המדריכים</Link>
              </li>
              {blogCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={cat.href} className="hover:text-accent transition-colors">{cat.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">החברה</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-accent transition-colors">אודות</Link></li>
              <li><Link to="/reviews" className="hover:text-accent transition-colors">לקוחות והמלצות</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">צור קשר</Link></li>
            </ul>
          </div>

          {/* Contact + Legal */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">צור קשר</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {siteConfig.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-accent" />
                  <a href={`tel:${phone.replace(/-/g, "")}`} className="hover:text-accent transition-colors" dir="ltr">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href="tel:0505152221" className="hover:text-accent transition-colors" dir="ltr">
                  050-515-2221
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href={`https://wa.me/972${siteConfig.whatsapp.replace(/^0/, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" dir="ltr">
                  WhatsApp: {siteConfig.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 text-accent" />
                <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  {siteConfig.address.street}, {siteConfig.address.city}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="אינסטגרם"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="פייסבוק"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/972${siteConfig.whatsapp.replace(/^0/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="וואטסאפ"
                className="text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 space-y-1 text-xs text-primary-foreground/50">
              <Link to="/privacy-policy" className="block hover:text-accent/70 transition-colors">מדיניות פרטיות</Link>
              <Link to="/terms" className="block hover:text-accent/70 transition-colors">תנאי שימוש</Link>
              <Link to="/accessibility" className="block hover:text-accent/70 transition-colors">הצהרת נגישות</Link>
              
              <button
                type="button"
                onClick={() => (window as any).openCookieSettings?.()}
                className="block text-right hover:text-accent/70 transition-colors cursor-pointer"
              >
                הגדרות פרטיות וקוקיז
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} {siteConfig.name}. כל הזכויות שמורות.
      </div>
    </footer>
  );
};

export default Footer;
