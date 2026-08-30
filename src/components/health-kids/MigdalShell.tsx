import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { HealthKidsCampaign } from "@/data/healthKidsCampaigns";
import { siteConfig } from "@/data/siteConfig";
import migdalLogo from "@/assets/migdal-logo.png";
import libaLogo from "@/assets/logo.png";

export const MigdalShell = ({
  campaign,
  children,
}: {
  campaign: HealthKidsCampaign;
  children: ReactNode;
}) => (
  <div className="migdal-lp min-h-screen flex flex-col" dir="rtl">
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-[#020140] text-white">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between gap-4 text-xs md:text-sm">
          <span className="font-medium tracking-wide">מגדל חברה לביטוח בע״מ</span>
          <span className="text-white/75 shrink-0">בשיתוף סוכנות ליבה</span>
        </div>
      </div>
      <div className="border-b-[3px] border-[#a2eb9a] shadow-[0_4px_16px_rgba(2,1,64,0.06)]">
        <div className="container mx-auto px-4 h-[68px] md:h-[80px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <img src={migdalLogo} alt="מגדל חברה לביטוח" className="h-11 md:h-[52px] w-auto object-contain shrink-0" />
            <span className="w-px h-8 md:h-9 bg-[#d7deea]" aria-hidden />
            <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
              <span className="text-[10px] md:text-xs text-[#020140]/55 leading-none">בשיתוף</span>
              <img src={libaLogo} alt={`סוכנות ${siteConfig.name}`} className="h-7 md:h-9 w-auto object-contain" />
            </div>
            <span className="hidden md:block w-px h-9 bg-[#d7deea]" aria-hidden />
            <div className="hidden md:block min-w-0">
              <p className="text-sm md:text-base font-bold text-[#020140] leading-tight truncate">
                כתב שירות התפתחות הילד
              </p>
              <p className="text-xs text-[#020140]/50">הצטרפות אונליין</p>
            </div>
          </div>
          <Link
            to={`${campaign.basePath}/check`}
            className="migdal-cta inline-flex items-center justify-center px-4 md:px-5 py-2.5 text-sm shrink-0"
          >
            בדקו זכאות
          </Link>
        </div>
      </div>
    </header>
    <div className="flex-1">{children}</div>
    <footer className="bg-white border-t border-[#020140]/10 mt-auto">
      <div className="container mx-auto px-4 py-8 text-center space-y-4">
        <img src={migdalLogo} alt="מגדל חברה לביטוח" className="h-10 mx-auto object-contain" />
        <p className="text-sm text-[#020140]/70">{campaign.partnerLabel}</p>
        <div className="flex items-center justify-center gap-4 text-sm text-[#020140]/60">
          <Link to="/privacy-policy" className="hover:text-[#020140]">מדיניות פרטיות</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-[#020140]">תנאי שימוש</Link>
          <span>|</span>
          <Link to="/accessibility" className="hover:text-[#020140]">הצהרת נגישות</Link>
        </div>
        <p className="text-xs text-[#020140]/45">© {new Date().getFullYear()} מגדל חברה לביטוח בע״מ · בשיתוף סוכנות ליבה</p>
      </div>
    </footer>
  </div>
);
