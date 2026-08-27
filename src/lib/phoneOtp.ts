import { supabase } from "@/integrations/supabase/client";

export type PhoneOtpResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; error: string };

export type PhoneConfirmResult = { ok: boolean; verified: boolean };

/** Phone OTP is on in production. Health-kids does not use this hook. */
export const PHONE_OTP_ENABLED = true;

const fallbackError = "לא הצלחנו לאמת את המספר. נסו שוב.";

const readInvokeError = async (error: unknown, data: unknown): Promise<string> => {
  if (data && typeof data === "object" && "error" in data) {
    const msg = (data as { error?: unknown }).error;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  const ctx = error && typeof error === "object" && "context" in error
    ? (error as { context?: Response }).context
    : undefined;
  if (ctx && typeof ctx.json === "function") {
    try {
      const body = await ctx.json();
      if (typeof body?.error === "string" && body.error.trim()) return body.error;
    } catch {
      /* ignore */
    }
  }
  if (error && typeof error === "object" && "message" in error) {
    const msg = (error as { message?: unknown }).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return fallbackError;
};

const invokeOtp = async (body: Record<string, string>): Promise<PhoneOtpResult> => {
  const { data, error } = await supabase.functions.invoke("sms-otp", { body });
  if (data && typeof data === "object" && "skipped" in data && data.skipped && data.ok) {
    return { ok: true, skipped: true };
  }
  if (error || !data?.ok) {
    return { ok: false, error: await readInvokeError(error, data) };
  }
  return { ok: true };
};

export const sendPhoneOtp = (phone: string): Promise<PhoneOtpResult> => {
  if (!PHONE_OTP_ENABLED) return Promise.resolve({ ok: true, skipped: true });
  return invokeOtp({ action: "send", phone });
};

export const verifyPhoneOtp = (phone: string, code: string): Promise<PhoneOtpResult> => {
  if (!PHONE_OTP_ENABLED) return Promise.resolve({ ok: true, skipped: true });
  return invokeOtp({ action: "verify", phone, code });
};
