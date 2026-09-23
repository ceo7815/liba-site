import { describe, it, expect } from "vitest";
import { splitFullName, toMetaPhone } from "@/lib/fbq";

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
