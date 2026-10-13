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

const attribution = {
  utm_source: "fb",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  gclid: "",
  fbclid: "",
};

describe("buildLifeDiscountPayload", () => {
  it("sends the Make phone and name fields and omits empty notes", () => {
    const payload = buildLifeDiscountPayload({
      name: "דנה לוי",
      phone: "052-111-2233",
      age: null,
      pageUrl: "https://liba-fs.co.il/lp/life-discount",
      attribution,
    });

    expect(payload).toMatchObject({
      name: "דנה לוי",
      phone: "0521112233",
      lead_full_name: "דנה לוי",
      lead_phone_number: "0521112233",
      meta_page_url: "https://liba-fs.co.il/lp/life-discount",
      utm_source: "fb",
    });
    expect(payload).not.toHaveProperty("age");
    expect(payload).not.toHaveProperty("lead_age");
    expect(payload).not.toHaveProperty("inquiry_message");
    expect(payload).not.toHaveProperty("has_life_insurance");
    expect(payload).not.toHaveProperty("has_mortgage");
    expect(typeof payload.meta_submitted_at).toBe("string");
  });

  it("includes age only when it was filled", () => {
    const payload = buildLifeDiscountPayload({
      name: "דנה לוי",
      phone: "0521112233",
      age: 44,
      pageUrl: "https://liba-fs.co.il/lp/life-discount",
      attribution,
    });
    expect(payload.age).toBe(44);
    expect(payload.lead_age).toBe(44);
  });
});
