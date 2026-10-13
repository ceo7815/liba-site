import { LIFE_DISCOUNT_LP } from "@/data/lifeDiscountLp";
import { splitFullName } from "@/lib/fbq";
import { normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";

export const parseOptionalAge = (
  raw: string,
): { ok: true; age: number | null } | { ok: false; error: string } => {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, age: null };
  if (!/^\d{1,3}$/.test(trimmed)) return { ok: false, error: "גיל לא תקין." };
  const age = Number(trimmed);
  if (age < 18 || age > 120) return { ok: false, error: "גיל חייב להיות בין 18 ל-120." };
  return { ok: true, age };
};

export type LifeDiscountAttribution = Record<string, string>;

/** Same keys the Make scenario already receives. Choice fields stay present but empty. */
export const buildLifeDiscountPayload = (input: {
  name: string;
  phone: string;
  age: number | null;
  pageUrl: string;
  attribution: LifeDiscountAttribution;
}) => {
  const fullName = input.name.trim();
  const { fn, ln } = splitFullName(fullName);
  const phone = normalizeIsraeliPhone(input.phone);
  // Removed questions stay on the Make payload as empty strings. Do not rename keys.
  const hasLife = "";
  const hasMortgage = "";
  return {
    name: fullName,
    phone,
    age: input.age,
    has_life_insurance: hasLife,
    has_mortgage: hasMortgage,
    lead_full_name: fullName,
    lead_first_name: fn,
    lead_last_name: ln,
    first_name: fn,
    last_name: ln,
    lead_phone_number: phone,
    lead_age: input.age,
    lead_has_life_insurance: hasLife,
    lead_has_mortgage: hasMortgage,
    inquiry_service_area: "ביטוח חיים",
    inquiry_message: `ביטוח חיים: ${hasLife} | משכנתא: ${hasMortgage}`,
    meta_source_page: LIFE_DISCOUNT_LP.source,
    meta_campaign_type: "facebook-instagram",
    meta_campaign: LIFE_DISCOUNT_LP.campaign,
    meta_marketing_consent: false,
    meta_contact_consent: true,
    meta_locale: "he-IL",
    meta_page_url: input.pageUrl,
    meta_submitted_at: new Date().toISOString(),
    ...input.attribution,
  };
};
