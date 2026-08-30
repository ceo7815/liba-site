import { siteConfig } from "@/data/siteConfig";
import type { HealthKidsCampaign } from "@/data/healthKidsCampaigns";
import logoLight from "@/assets/logo-light.png";
import migdalLogo from "@/assets/migdal-logo.png";

type Props = {
  campaign: HealthKidsCampaign;
  className?: string;
  logoClassName?: string;
  variant?: "inline" | "bar" | "footer";
};

const HealthKidsBrandHeader = ({
  campaign,
  className = "mb-6",
  logoClassName = "h-12 md:h-16",
  variant = "inline",
}: Props) => {
  if (!campaign.showMigdal) {
    return (
      <img
        src={logoLight}
        alt={`לוגו ${siteConfig.name}`}
        className={`${logoClassName} mx-auto ${className}`}
      />
    );
  }

  if (variant === "bar") {
    return (
      <header className="bg-white border-b-[5px] border-[hsl(var(--accent))] shadow-sm">
        <div className="bg-[hsl(var(--primary))] text-white text-center text-xs md:text-sm font-bold py-2 px-3">
          כתב שירות התפתחות הילד של מגדל · בשיתוף סוכנות ליבה
        </div>
        <div className="container mx-auto px-4 py-4 md:py-5 flex flex-col items-center gap-3">
          <img
            src={migdalLogo}
            alt="מגדל חברה לביטוח"
            className="h-16 md:h-24 w-auto object-contain"
          />
          <div className="flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] text-white px-4 py-1.5">
            <span className="text-xs md:text-sm font-semibold">בשיתוף</span>
            <img src={logoLight} alt={`סוכנות ${siteConfig.name}`} className="h-7 md:h-8 w-auto object-contain" />
          </div>
        </div>
      </header>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <img src={migdalLogo} alt="מגדל חברה לביטוח" className="h-12 md:h-14 w-auto object-contain" />
        <div className="flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] text-white px-4 py-1.5">
          <span className="text-xs font-semibold">בשיתוף</span>
          <img src={logoLight} alt={`סוכנות ${siteConfig.name}`} className="h-7 w-auto object-contain" />
        </div>
        {campaign.partnerLabel && (
          <p className="text-xs md:text-sm font-semibold text-[hsl(var(--primary))]">{campaign.partnerLabel}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <img src={migdalLogo} alt="מגדל חברה לביטוח" className={`${logoClassName} w-auto object-contain`} />
      <div className="flex items-center gap-2 rounded-full bg-white/15 border border-white/25 text-white px-3 py-1">
        <span className="text-xs font-semibold">בשיתוף</span>
        <img src={logoLight} alt={`סוכנות ${siteConfig.name}`} className="h-7 w-auto object-contain" />
      </div>
    </div>
  );
};

export default HealthKidsBrandHeader;
