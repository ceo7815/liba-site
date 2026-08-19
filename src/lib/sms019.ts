/**
 * 019sms API contract (JSON).
 * Docs: https://docs.019sms.co.il/sms/send-sms.html
 *
 * The API token must NEVER be used from the Vite client (`VITE_*`).
 * Send only from Make or a server/edge function:
 *   POST https://019sms.co.il/api
 *   Authorization: Bearer <token>
 *   Content-Type: application/json
 * Test endpoint: https://019sms.co.il/api/test
 */

export const SMS_019_ENDPOINT = "https://019sms.co.il/api";
export const SMS_019_TEST_ENDPOINT = "https://019sms.co.il/api/test";

export type Sms019SendRequest = {
  sms: {
    user: { username: string };
    source: string;
    destinations: { phone: string | string[] };
    message: string;
    campaign_name?: string;
  };
};

export type Sms019SendResponse = {
  status: number;
  message?: string;
  shipment_id?: string;
};

/** Source (sender name) is max 11 chars: English letters and digits only. */
export const clampSmsSource = (source: string): string =>
  source.replace(/[^A-Za-z0-9]/g, "").slice(0, 11);

/** 019sms accepts 05xxxxxxx or 5xxxxxxx. */
export const toSms019Phone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("972") && digits.length >= 12) return `0${digits.slice(3)}`;
  if (digits.startsWith("0")) return digits;
  if (digits.startsWith("5")) return `0${digits}`;
  return digits;
};

export type Sms019SendOtpRequest = {
  send_otp: {
    user: { username: string };
    phone: string;
    app_id?: string;
    source: string;
    max_tries?: string;
    valid_time?: string;
    text?: string;
  };
};

export type Sms019ValidateOtpRequest = {
  validate_otp: {
    user: { username: string };
    phone: string;
    app_id?: string;
    code: string;
  };
};

export const buildSendOtpPayload = (input: {
  username: string;
  source: string;
  phone: string;
  text?: string;
}): Sms019SendOtpRequest => ({
  send_otp: {
    user: { username: input.username },
    phone: toSms019Phone(input.phone),
    app_id: "1",
    source: clampSmsSource(input.source),
    max_tries: "3",
    valid_time: "5",
    text: input.text ?? "קוד האימות של ליבה הוא [code]",
  },
});

export const buildValidateOtpPayload = (input: {
  username: string;
  phone: string;
  code: string;
}): Sms019ValidateOtpRequest => ({
  validate_otp: {
    user: { username: input.username },
    phone: toSms019Phone(input.phone),
    app_id: "1",
    code: input.code.replace(/\D/g, ""),
  },
});

export const buildSendSmsPayload = (input: {
  username: string;
  source: string;
  phone: string;
  message: string;
  campaignName?: string;
}): Sms019SendRequest => ({
  sms: {
    user: { username: input.username },
    source: clampSmsSource(input.source),
    destinations: { phone: toSms019Phone(input.phone) },
    message: input.message.slice(0, 1005),
    ...(input.campaignName ? { campaign_name: input.campaignName.slice(0, 50) } : {}),
  },
});

export const isSms019Success = (res: Sms019SendResponse): boolean => res.status === 0;
