import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import licenseAsset from "@/assets/license-asaf-bar-on.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const servicesMenu = [
  {
    title: "ביטוחים למשפחה",
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
    items: [
      { label: "תכנון פרישה", href: "/services/retirement/retirement-planning" },
      { label: "קרנות השתלמות", href: "/services/retirement/study-fund" },
    ],
  },
  {
    title: "פיננסי ומימון",
    items: [
      { label: "תכנון פיננסי", href: "/services/finance/financial-planning" },
      { label: "הלוואות", href: "/services/finance/loans" },
    ],
  },
  {
    title: "זכויות והחזרים",
    items: [
      { label: "מיצוי זכויות", href: "/services/rights/rights-realization" },
    ],
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);
  const location = useLocation();

  const openLicense = () => {
    setMobileOpen(false);
    // defer to next tick so mobile menu unmount doesn't race the dialog mount
    setTimeout(() => setLicenseOpen(true), 0);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-popover/95 backdrop-blur-xl border-b border-border/30 shadow-sm">
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-l from-accent via-brand-teal to-accent/60 animate-gradient" />
      <div className="container mx-auto flex items-center justify-between h-20 md:h-24 px-4 flex-row-reverse">
        {/* Logo — LEFT side (order reversed via flex-row-reverse) */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="ליבה ביטוח ופנסיוני" className="h-12 md:h-16 w-auto" />
        </Link>

        {/* Desktop Nav — RIGHT side */}
        <div className="hidden lg:flex items-center gap-1">
          <NavItem to="/" label="בית" current={location.pathname} />
          
          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              שירותי החברה
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 w-[560px] bg-popover/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6"
                  style={{ boxShadow: "0 20px 60px -15px hsl(var(--primary) / 0.15)" }}
                >
                  {servicesMenu.map((group) => (
                    <div key={group.title}>
                      <h4 className="font-heading font-bold text-sm text-foreground mb-2">{group.title}</h4>
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              to={item.href}
                              className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-md transition-colors"
                              onClick={() => setServicesOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavItem to="/blog" label="מדריכים וכלים" current={location.pathname} />
          <NavItem to="/about" label="אודות" current={location.pathname} />
          <NavItem to="/reviews" label="לקוחות" current={location.pathname} />
          <NavItem to="/contact" label="צור קשר" current={location.pathname} />

          {/* License Button */}
          <button
            onClick={() => setLicenseOpen(true)}
            className="mr-1 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <Award className="w-4 h-4 text-accent" />
            לצפייה ברשיון סוכן
          </button>

          {/* CTA */}
          <Link
            to="/tools/insurance-scan"
            className="mr-2 inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg hover:shadow-accent/20"
          >
            סורק הביטוח האישי
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-popover border-t border-border"
          >
            <nav className="p-4 space-y-2 max-h-[80vh] overflow-y-auto">
              <MobileLink to="/" label="בית" onClick={() => setMobileOpen(false)} />
              <div className="py-2">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 font-medium"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  שירותי החברה
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="pr-4 space-y-3 mt-2">
                    {servicesMenu.map((group) => (
                      <div key={group.title}>
                        <h4 className="font-bold text-xs text-muted-foreground mb-1">{group.title}</h4>
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="block py-1.5 text-sm text-foreground/80 hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <MobileLink to="/blog" label="מדריכים וכלים" onClick={() => setMobileOpen(false)} />
              <MobileLink to="/about" label="אודות" onClick={() => setMobileOpen(false)} />
              <MobileLink to="/reviews" label="לקוחות" onClick={() => setMobileOpen(false)} />
              <MobileLink to="/contact" label="צור קשר" onClick={() => setMobileOpen(false)} />
              
              {/* License Button Mobile */}
              <button
                onClick={openLicense}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-foreground/80 hover:text-foreground font-medium"
              >
                <Award className="w-4 h-4 text-accent" />
                לצפייה ברשיון סוכן
              </button>

              <Link
                to="/tools/insurance-scan"
                className="block text-center bg-accent text-accent-foreground py-3 rounded-full font-bold mt-4"
                onClick={() => setMobileOpen(false)}
              >
                סורק הביטוח האישי
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* License Dialog — rendered once at header level so it persists across mobile menu unmount */}
      <Dialog open={licenseOpen} onOpenChange={setLicenseOpen}>
        <DialogContent className="max-w-lg w-[92vw] max-h-[90vh] p-0 overflow-hidden bg-popover border-border/50 flex flex-col">
          <DialogHeader className="p-4 pb-2 text-right flex-shrink-0">
            <DialogTitle className="font-heading text-xl">רשיון סוכן - ליבה ביטוח ופנסיוני</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
            <img
              src={licenseAsset}
              alt="רשיון סוכן - ליבה ביטוח ופנסיוני"
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg border border-border/30 mx-auto"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground text-center mt-3">
              רשיון סוכן ביטוח מטעם משרד האוצר - רשות שוק ההון, ביטוח וחיסכון
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

const NavItem = ({ to, label, current }: { to: string; label: string; current: string }) => (
  <Link
    to={to}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors relative ${
      current === to 
        ? "text-accent" 
        : "text-foreground/70 hover:text-foreground hover:bg-muted"
    }`}
  >
    {label}
    {current === to && (
      <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-accent rounded-full" />
    )}
  </Link>
);

const MobileLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => (
  <Link to={to} className="block px-3 py-2 text-foreground/80 hover:text-foreground font-medium" onClick={onClick}>
    {label}
  </Link>
);

export default Header;
