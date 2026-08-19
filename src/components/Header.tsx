import { useEffect, useState } from "react";
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

const glassFill =
  "bg-[hsl(var(--popover)/0.96)] backdrop-blur-xl";

const navLinkClass =
  "rounded-full px-3 py-1.5 font-body text-[16px] font-black tracking-tight text-foreground hover:bg-white/35 transition-colors";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const openLicense = () => {
    setMobileOpen(false);
    // defer to next tick so mobile menu unmount doesn't race the dialog mount
    setTimeout(() => setLicenseOpen(true), 0);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-3 pt-3 md:px-5 md:pt-4 pointer-events-none">
      <div className="nav-float-rim pointer-events-auto mx-auto max-w-[1240px] rounded-[22px] p-[3px]">
        <div
          className={`rounded-[19px] font-body ${glassFill} ${
            mobileOpen ? "overflow-hidden" : "overflow-visible"
          } ${scrolled || mobileOpen ? "bg-[hsl(var(--popover)/0.98)]" : ""}`}
        >
        <div className="relative flex h-16 md:h-[80px] items-center px-3 md:px-5">
          <Link to="/" className="relative z-20 shrink-0">
            <img src={logo} alt="ליבה ביטוח ופנסיוני" className="h-12 md:h-14 w-auto" />
          </Link>

          <nav className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
            <div className="pointer-events-auto flex items-center gap-0.5">
              <NavItem to="/" label="בית" current={location.pathname} />

              <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <button className={`${navLinkClass} flex items-center gap-1 ${servicesOpen ? "bg-white/30" : ""}`}>
                  שירותי החברה
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className={`absolute top-[calc(100%+10px)] right-0 z-30 w-[580px] rounded-[22px] border border-white/40 p-5 grid grid-cols-2 gap-x-6 gap-y-4 shadow-[0_18px_50px_-20px_rgba(18,42,64,0.4)] ${glassFill}`}
                    >
                      {servicesMenu.map((group) => (
                        <div key={group.title}>
                          <h4 className="mb-2 px-2 font-body text-[13px] font-black text-accent">
                            {group.title}
                          </h4>
                          <ul>
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  to={item.href}
                                  className="block rounded-full px-3 py-2 font-body text-[16px] font-black text-foreground hover:bg-white/40 transition-colors"
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

              <button
                onClick={() => setLicenseOpen(true)}
                className={`${navLinkClass} inline-flex items-center gap-1.5`}
              >
                <Award className="w-3.5 h-3.5 text-accent" />
                לצפייה ברשיון סוכן
              </button>

              <NavItem to="/contact" label="צור קשר" current={location.pathname} />
            </div>
          </nav>

          <div className="relative z-20 ms-auto flex items-center">
            <Link
              to="/insurance-check"
              className="hidden rounded-full bg-accent px-5 py-2.5 font-body text-[14px] font-extrabold text-accent-foreground hover:brightness-[1.04] transition lg:inline-flex"
            >
              סורק הביטוח האישי
            </Link>
            <button
              className="rounded-full p-2 hover:bg-foreground/[0.05] transition-colors lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-black/[0.06]"
            >
              <nav className="p-3 space-y-1 max-h-[75vh] overflow-y-auto">
                <MobileLink to="/" label="בית" onClick={() => setMobileOpen(false)} />
                <div className="py-1">
                  <button
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 font-body text-[16px] font-black"
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    שירותי החברה
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {servicesOpen && (
                    <div className="pr-4 space-y-3 mt-1 mb-2">
                      {servicesMenu.map((group) => (
                        <div key={group.title}>
                          <h4 className="font-body text-[13px] font-black text-accent mb-1">{group.title}</h4>
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="block py-1.5 font-body text-[16px] font-black text-foreground"
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

                <button
                  onClick={openLicense}
                  className="w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-body text-[16px] font-black text-foreground"
                >
                  <Award className="w-4 h-4 text-accent" />
                  לצפייה ברשיון סוכן
                </button>

                <Link
                  to="/insurance-check"
                  className="block text-center bg-accent text-accent-foreground py-3 rounded-full font-body text-[16px] font-black mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  סורק הביטוח האישי
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

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

const NavItem = ({ to, label, current }: { to: string; label: string; current: string }) => {
  const active = current === to;
  return (
    <Link
      to={to}
      className={`${navLinkClass} ${active ? "bg-white/35 text-accent" : ""}`}
    >
      {label}
    </Link>
  );
};

const MobileLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => (
  <Link to={to} className="block rounded-xl px-3 py-2.5 font-body text-[16px] font-black text-foreground hover:bg-white/30" onClick={onClick}>
    {label}
  </Link>
);

export default Header;
