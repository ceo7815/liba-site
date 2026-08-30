import { siteConfig } from "@/data/siteConfig";
import type { HealthKidsCampaign } from "@/data/healthKidsCampaigns";
import logo from "@/assets/logo-light.png";
import migdalLogo from "@/assets/migdal-logo.png";

type Props = {
  campaign: HealthKidsCampaign;
  className?: string;
  logoClassName?: string;
};

const HealthKidsBrandHeader = ({
  campaign,
  className = "mb-6",
  logoClassName = "h-12 md:h-16",
}: Props) => {
  if (!campaign.showMigdal) {
    return (
      <img
        src={logo}
        alt={`לוגו ${siteConfig.name}`}
        className={`${logoClassName} mx-auto ${className}`}
      />
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <img src={logo} alt={`לוגו ${siteConfig.name}`} className={logoClassName} />
        <img
          src={migdalLogo}
          alt="לוגו מגדל חברה לביטוח"
          className={`${logoClassName} object-contain`}
          style={{ mixBlendMode: "screen" }}
        />
      </div>
      {campaign.partnerLabel && (
        <p className="text-sm md:text-base font-semibold text-brand-gold tracking-wide">
          {campaign.partnerLabel}
        </p>
      )}
    </div>
  );
};

export default HealthKidsBrandHeader;
