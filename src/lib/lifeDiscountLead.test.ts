import { describe, expect, it } from "vitest";
import { buildLifeDiscountPayload, parseOptionalAge } from "@/lib/lifeDiscountLead";

describe("parseOptionalAge", () => {
  it("treats an empty age as optional", () => {
    expect(parseOptionalAge("")).toEqual({ ok: true, age: null });
    expect(parseOptionalAge("  ")).toEqual({ ok: true, age: null });
  });

  it("rejects ages outside 18–120", () => {
    expect(parseOptionalAge("17").ok).toBe(false);
    expect(parseOptionalAge("121").ok).toBe(false);
    expect(parseOptionalAge("44")).toEqual({ ok: true, age: 44 });
  });
});

describe("buildLifeDiscountPayload", () => {
  it("keeps Make keys and leaves the removed questions empty", () => {
    const payload = buildLifeDiscountPayload({
      name: "דנה לוי",
      phone: "052-111-2233",
      age: null,
      pageUrl: "https://liba-fs.co.il/lp/life-discount",
      attribution: { utm_source: "fb", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "", gclid: "", fbclid: "" },
    });

    expect(payload).toMatchObject({
      name: "דנה לוי",
      phone: "0521112233",
      age: null,
      lead_age: null,
      has_life_insurance: "",
      has_mortgage: "",
      lead_has_life_insurance: "",
      lead_has_mortgage: "",
      lead_first_name: "דנה",
      lead_last_name: "לוי",
      meta_source_page: "lp-life-discount",
      meta_campaign: "life-discount",
      utm_source: "fb",
    });
    expect(payload.inquiry_message).toBe("ביטוח חיים:  | משכנתא: ");
    expect(Object.keys(payload)).toEqual([
      "name",
      "phone",
      "age",
      "has_life_insurance",
      "has_mortgage",
      "lead_full_name",
      "lead_first_name",
      "lead_last_name",
      "first_name",
      "last_name",
      "lead_phone_number",
      "lead_age",
      "lead_has_life_insurance",
      "lead_has_mortgage",
      "inquiry_service_area",
      "inquiry_message",
      "meta_source_page",
      "meta_campaign_type",
      "meta_campaign",
      "meta_marketing_consent",
      "meta_contact_consent",
      "meta_locale",
      "meta_page_url",
      "meta_submitted_at",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
    ]);
  });
});
