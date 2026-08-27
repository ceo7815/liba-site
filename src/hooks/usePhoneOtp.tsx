import { useCallback, useEffect, useRef, useState } from "react";
import PhoneOtpDialog from "@/components/PhoneOtpDialog";
import { useToast } from "@/hooks/use-toast";
import {
  PHONE_OTP_ENABLED,
  sendPhoneOtp,
  verifyPhoneOtp,
  type PhoneConfirmResult,
} from "@/lib/phoneOtp";
import { isValidIsraeliMobile, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";

const RESEND_SECONDS = 45;

export { PHONE_OTP_ENABLED } from "@/lib/phoneOtp";
export type { PhoneConfirmResult } from "@/lib/phoneOtp";

export const usePhoneOtp = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const resolverRef = useRef<((result: PhoneConfirmResult) => void) | null>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  const settle = useCallback((result: PhoneConfirmResult) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    setOpen(false);
    setCode("");
    setError(null);
    setSending(false);
    setVerifying(false);
    resolve?.(result);
  }, []);

  const proceedUnverified = useCallback(() => {
    toast({
      title: "ממשיכים בלי קוד SMS",
      description: "לא הצלחנו לשלוח את הקוד. הפרטים נשלחים כרגיל.",
    });
    settle({ ok: true, verified: false });
  }, [settle, toast]);

  const sendCode = useCallback(async (target: string, failOpen = false) => {
    setSending(true);
    setError(null);
    const result = await sendPhoneOtp(target);
    setSending(false);
    if (result.ok && result.skipped) {
      proceedUnverified();
      return false;
    }
    if (!result.ok) {
      if (failOpen) {
        proceedUnverified();
        return false;
      }
      setError(result.error);
      return false;
    }
    setResendIn(RESEND_SECONDS);
    return true;
  }, [proceedUnverified]);

  const confirmPhone = useCallback((rawPhone: string): Promise<PhoneConfirmResult> => {
    const normalized = normalizeIsraeliPhone(rawPhone);
    if (!isValidIsraeliMobile(normalized)) return Promise.resolve({ ok: false, verified: false });

    if (!PHONE_OTP_ENABLED || !import.meta.env.PROD) {
      console.info("[otp] skipped phone OTP", !import.meta.env.PROD ? "(local)" : "(flag off)");
      return Promise.resolve({ ok: true, verified: false });
    }

    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setPhone(normalized);
      setCode("");
      setError(null);
      setOpen(true);
      void sendCode(normalized, true);
    });
  }, [sendCode]);

  const onVerify = useCallback(async () => {
    const digits = code.replace(/\D/g, "");
    if (digits.length !== 6 || verifying) return;
    setVerifying(true);
    setError(null);
    const result = await verifyPhoneOtp(phone, digits);
    setVerifying(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    settle({ ok: true, verified: true });
  }, [code, phone, settle, verifying]);

  const otpDialog = (
    <PhoneOtpDialog
      open={open}
      phone={phone}
      code={code}
      error={error}
      sending={sending}
      verifying={verifying}
      resendIn={resendIn}
      onCodeChange={(value) => {
        setCode(value.replace(/\D/g, "").slice(0, 6));
        if (error) setError(null);
      }}
      onVerify={() => { void onVerify(); }}
      onResend={() => {
        if (resendIn > 0) return;
        void sendCode(phone, false);
      }}
      onCancel={() => settle({ ok: false, verified: false })}
    />
  );

  return { confirmPhone, otpDialog };
};
