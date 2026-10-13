import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LPLifeDiscountPage from "@/pages/LPLifeDiscountPage";
import LPLifeDiscountThankYouPage from "@/pages/LPLifeDiscountThankYouPage";
import { LIFE_DISCOUNT_SUBMITTED_KEY, LIFE_DISCOUNT_WEBHOOK_URL } from "@/data/lifeDiscountLp";
import { backupLead, postLeadWebhooks } from "@/lib/leadsBackup";

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver = IntersectionObserverStub as unknown as typeof IntersectionObserver;

vi.mock("@/lib/leadsBackup", () => ({
  backupLead: vi.fn(async () => {}),
  postLeadWebhooks: vi.fn(async () => ({ ok: true })),
}));

const renderFlow = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/lp/life-discount"]}>
        <Routes>
          <Route path="/lp/life-discount" element={<LPLifeDiscountPage />} />
          <Route path="/lp/life-discount/thank-you" element={<LPLifeDiscountThankYouPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

const fillValid = () => {
  fireEvent.change(screen.getByLabelText("שם מלא"), { target: { value: "דנה לוי" } });
  fireEvent.change(screen.getByLabelText("טלפון נייד"), { target: { value: "0521112233" } });
  fireEvent.click(screen.getByRole("checkbox"));
};

describe("life discount form", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.fbq = vi.fn();
    vi.mocked(postLeadWebhooks).mockReset();
    vi.mocked(postLeadWebhooks).mockResolvedValue({ ok: true });
    vi.mocked(backupLead).mockReset();
    vi.mocked(backupLead).mockResolvedValue();
  });

  afterEach(() => {
    cleanup();
    delete window.fbq;
  });

  it("delivers name and phone, then fires Lead exactly once", async () => {
    renderFlow();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: "בדקו את ההנחה שלי" }));

    expect(await screen.findByRole("heading", { name: "קיבלנו את הפרטים." })).toBeInTheDocument();
    expect(backupLead).toHaveBeenCalledTimes(1);
    expect(postLeadWebhooks).toHaveBeenCalledTimes(1);
    expect(vi.mocked(postLeadWebhooks).mock.calls[0][0]).toBe(LIFE_DISCOUNT_WEBHOOK_URL);
    expect(vi.mocked(postLeadWebhooks).mock.calls[0][1]).toMatchObject({
      name: "דנה לוי",
      phone: "0521112233",
      age: null,
      has_life_insurance: "",
      has_mortgage: "",
      lead_has_life_insurance: "",
      lead_has_mortgage: "",
      inquiry_message: "ביטוח חיים:  | משכנתא: ",
    });

    const leads = vi.mocked(window.fbq!).mock.calls.filter((call) => call[0] === "track" && call[1] === "Lead");
    expect(leads).toHaveLength(1);
    expect(sessionStorage.getItem(LIFE_DISCOUNT_SUBMITTED_KEY)).toBe("1");
  });

  it("does not fire Lead or navigate when delivery fails", async () => {
    vi.mocked(postLeadWebhooks).mockResolvedValue({ ok: false });
    renderFlow();
    fillValid();
    fireEvent.click(screen.getByRole("button", { name: "בדקו את ההנחה שלי" }));

    await waitFor(() => expect(postLeadWebhooks).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole("heading", { name: "קיבלנו את הפרטים." })).not.toBeInTheDocument();
    const leads = vi.mocked(window.fbq!).mock.calls.filter((call) => call[0] === "track" && call[1] === "Lead");
    expect(leads).toHaveLength(0);
  });

  it("ignores a second click while the first submit is in flight", async () => {
    let release: (value: { ok: boolean }) => void = () => {};
    vi.mocked(postLeadWebhooks).mockImplementation(
      () => new Promise((resolve) => {
        release = resolve;
      }),
    );
    renderFlow();
    fillValid();
    const button = screen.getByRole("button", { name: "בדקו את ההנחה שלי" });
    fireEvent.click(button);
    fireEvent.click(button);
    await waitFor(() => expect(postLeadWebhooks).toHaveBeenCalledTimes(1));
    release({ ok: true });

    expect(await screen.findByRole("heading", { name: "קיבלנו את הפרטים." })).toBeInTheDocument();
    expect(postLeadWebhooks).toHaveBeenCalledTimes(1);
    const leads = vi.mocked(window.fbq!).mock.calls.filter((call) => call[0] === "track" && call[1] === "Lead");
    expect(leads).toHaveLength(1);
  });

  it("blocks an invalid mobile without calling the webhook", async () => {
    renderFlow();
    fireEvent.change(screen.getByLabelText("שם מלא"), { target: { value: "דנה לוי" } });
    fireEvent.change(screen.getByLabelText("טלפון נייד"), { target: { value: "0501234567" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "בדקו את ההנחה שלי" }));

    expect(await screen.findByText(/מספר נייד ישראלי/)).toBeInTheDocument();
    expect(postLeadWebhooks).not.toHaveBeenCalled();
    expect(window.fbq).not.toHaveBeenCalled();
  });

  it("sends an optional age when it is filled", async () => {
    renderFlow();
    fillValid();
    fireEvent.change(screen.getByLabelText("גיל, לא חובה"), { target: { value: "44" } });
    fireEvent.click(screen.getByRole("button", { name: "בדקו את ההנחה שלי" }));

    await screen.findByRole("heading", { name: "קיבלנו את הפרטים." });
    expect(vi.mocked(postLeadWebhooks).mock.calls[0][1]).toMatchObject({ age: 44, lead_age: 44 });
  });
});

describe("life discount thank-you", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.fbq = vi.fn();
  });

  afterEach(() => {
    cleanup();
    delete window.fbq;
  });

  it("does not fire Lead when opened directly", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/lp/life-discount/thank-you"]}>
          <Routes>
            <Route path="/lp/life-discount/thank-you" element={<LPLifeDiscountThankYouPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );
    const leads = vi.mocked(window.fbq!).mock.calls.filter((call) => call[0] === "track" && call[1] === "Lead");
    expect(leads).toHaveLength(0);
  });
});
