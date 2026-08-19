import { useCallback, useEffect, useRef, useState } from "react";
import PhoneOtpDialog from "@/components/PhoneOtpDialog";
import { sendPhoneOtp, verifyPhoneOtp } from "@/lib/phoneOtp";
import { isValidIsraeliMobile, normalizeIsraeliPhone } from "@/lib/validators/israeliPhone";

const RESEND_SECONDS = 45;

export const usePhoneOtp = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const resolverRef = useRef<((ok: boolean) => void) | null>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  const settle = useCallback((ok: boolean) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    setOpen(false);
    setCode("");
    setError(null);
    setSending(false);
    setVerifying(false);
    resolve?.(ok);
  }, []);

  const sendCode = useCallback(async (target: string) => {
    setSending(true);
    setError(null);
    const result = await sendPhoneOtp(target);
    setSending(false);
    if (!result.ok) {
      setError(result.error);
      return false;
    }
    setResendIn(RESEND_SECONDS);
    return true;
  }, []);

  const confirmPhone = useCallback((rawPhone: string): Promise<boolean> => {
    const normalized = normalizeIsraeliPhone(rawPhone);
    if (!isValidIsraeliMobile(normalized)) return Promise.resolve(false);

    if (!import.meta.env.PROD) {
      console.info("[local] skipped phone OTP to protect SMS credits");
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setPhone(normalized);
      setCode("");
      setError(null);
      setOpen(true);
      void sendCode(normalized);
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
    settle(true);
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
        void sendCode(phone);
      }}
      onCancel={() => settle(false)}
    />
  );

  return { confirmPhone, otpDialog };
};
