import { useEffect } from "react";
import { setClarityTag } from "@/lib/clarity";

interface ClarityPageTags {
  pageType?: string;
  lpCampaign?: string;
  funnelStep?: string;
}

/**
 * Tag the current page in Microsoft Clarity for filtering, segments, and funnels.
 * Safe no-op if Clarity is not loaded (e.g. user declined cookies).
 */
export const useClarityPageTags = ({ pageType, lpCampaign, funnelStep }: ClarityPageTags) => {
  useEffect(() => {
    if (pageType) setClarityTag("page_type", pageType);
    if (lpCampaign) setClarityTag("lp_campaign", lpCampaign);
    if (funnelStep) setClarityTag("funnel_step", funnelStep);
  }, [pageType, lpCampaign, funnelStep]);
};
