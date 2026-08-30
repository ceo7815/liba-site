export type HealthKidsCampaignId = "migdal" | "partners";

export type HealthKidsCampaign = {
  id: HealthKidsCampaignId;
  basePath: string;
  clarityCampaign: string;
  backupSource: string;
  webhookUrl: string;
  showMigdal: boolean;
  partnerLabel: string | null;
};

export const HEALTH_KIDS_CAMPAIGNS: Record<HealthKidsCampaignId, HealthKidsCampaign> = {
  migdal: {
    id: "migdal",
    basePath: "/lp/health-kids-migdal",
    clarityCampaign: "health-kids-migdal",
    backupSource: "lp-health-kids-migdal",
    webhookUrl: "https://hook.eu2.make.com/s9jb67ncliucy17wboal0z9mc6xm1vpw",
    showMigdal: true,
    partnerLabel: "כתב שירות של מגדל · בשיתוף סוכנות ליבה",
  },
  partners: {
    id: "partners",
    basePath: "/lp/health-kids-partners",
    clarityCampaign: "health-kids-partners",
    backupSource: "lp-health-kids-partners",
    webhookUrl: "https://hook.eu2.make.com/ickmu4p68b14a8h9qh5ghsyfkuetuc5d",
    showMigdal: false,
    partnerLabel: null,
  },
};

export const healthKidsNeedStorageKey = (campaignId: HealthKidsCampaignId) =>
  `hk_need_${campaignId}`;

export const campaignShellClass = (showMigdal: boolean) =>
  showMigdal ? "migdal-lp" : "";

export const healthKidsHeroOverlayStyle = {
  background:
    "linear-gradient(to left, hsl(var(--brand-navy)) 0%, hsl(var(--primary) / 0.94) 48%, hsl(var(--primary) / 0.8) 100%)",
};
