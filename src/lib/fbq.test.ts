import { afterEach, describe, it, expect, vi } from "vitest";
import { splitFullName, toMetaPhone, trackLead } from "@/lib/fbq";

describe("splitFullName", () => {
  it("keeps a single token as first name only", () => {
    expect(splitFullName("איריס")).toEqual({ fn: "איריס", ln: "" });
  });

  it("does not copy first name into last name", () => {
    const { fn, ln } = splitFullName("איריס");
    expect(ln).not.toBe(fn);
    expect(ln).toBe("");
  });

  it("splits two-word Hebrew names", () => {
    expect(splitFullName("יצחק שאול")).toEqual({ fn: "יצחק", ln: "שאול" });
  });

  it("joins extra tokens into last name", () => {
    expect(splitFullName("  דוד בן גוריון  ")).toEqual({ fn: "דוד", ln: "בן גוריון" });
  });
});

const LIFE_KEYS = ["/lp/life-discount", "/lp/life-discount/thank-you", "life-discount"];

describe("trackLead", () => {
  afterEach(() => {
    sessionStorage.clear();
    delete window.fbq;
    vi.restoreAllMocks();
  });

  it("fires Lead once for the life-discount campaign, including a second call from thank-you keys", () => {
    const fbq = vi.fn();
    window.fbq = fbq;

    trackLead({ ph: "0521112233", fn: "דנה", ln: "לוי" }, LIFE_KEYS);
    trackLead(undefined, LIFE_KEYS);

    const leads = fbq.mock.calls.filter((call) => call[0] === "track" && call[1] === "Lead");
    expect(leads).toHaveLength(1);
    expect(leads[0][3]).toEqual({ eventID: expect.any(String) });
    expect(leads[0][2]).toMatchObject({ ph: "972521112233", fn: "דנה", ln: "לוי", country: "il" });
  });
});

describe("toMetaPhone", () => {
  it("converts Israeli local mobile to 972", () => {
    expect(toMetaPhone("0521112233")).toBe("972521112233");
  });

  it("strips formatting", () => {
    expect(toMetaPhone("052-111-2233")).toBe("972521112233");
  });

  it("keeps already-international numbers", () => {
    expect(toMetaPhone("+972521112233")).toBe("972521112233");
  });
});
