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

/**
 * Make reads lead_phone_number (fallback phone) and lead_full_name (fallback name).
 * Other keys are notes only. Omit empty age and the removed questions so inquiry_message
 * is not sent as blank text. Field names that remain are unchanged.
 */
export const buildLifeDiscountPayload = (input: {
  name: string;
  phone: string;
  age: number | null;
  pageUrl: string;
  attribution: LifeDiscountAttribution;
}) => {
  const fullName = input.name.trim();
  const phone = normalizeIsraeliPhone(input.phone);
  const payload: Record<string, unknown> = {
    name: fullName,
    phone,
    lead_full_name: fullName,
    lead_phone_number: phone,
    meta_page_url: input.pageUrl,
    meta_submitted_at: new Date().toISOString(),
    ...input.attribution,
  };
  if (input.age != null) {
    payload.age = input.age;
    payload.lead_age = input.age;
  }
  return payload;
};
