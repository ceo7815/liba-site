/**
 * Israeli phone number validator with strict anti-spam checks.
 * Accepts mobile (05X-XXXXXXX) and common landline prefixes.
 * Rejects obvious fakes: repeating digits, sequential digits, known test numbers.
 */

export const normalizeIsraeliPhone = (raw: string): string => {
  let s = (raw || "").replace(/[\s\-()._]/g, "");
  if (s.startsWith("+972")) s = "0" + s.slice(4);
  else if (s.startsWith("972")) s = "0" + s.slice(3);
  return s.replace(/\D/g, "");
};

// Valid Israeli mobile prefixes (real, currently allocated)
const VALID_MOBILE_PREFIXES = [
  "050", "051", "052", "053", "054", "055", "056", "057", "058", "059",
];

const KNOWN_FAKE_NUMBERS = new Set([
  "0500000000", "0501234567", "0507654321", "0521234567",
  "0541234567", "0551234567", "0581234567", "0509999999",
  "0500000001", "0512345678", "0523456789", "0534567890",
  "0545678901", "0556789012",
]);

const isAllSameDigits = (digits: string) => /^(\d)\1+$/.test(digits);

const isSequential = (digits: string): boolean => {
  // e.g. 1234567890 or 0987654321
  let asc = true;
  let desc = true;
  for (let i = 1; i < digits.length; i++) {
    const diff = digits.charCodeAt(i) - digits.charCodeAt(i - 1);
    if (diff !== 1) asc = false;
    if (diff !== -1) desc = false;
  }
  return asc || desc;
};

const hasTooMuchRepetition = (digits: string): boolean => {
  // Reject if 7+ identical digits in a row anywhere
  return /(\d)\1{6,}/.test(digits);
};

export const isValidIsraeliPhone = (raw: string): boolean => {
  const p = normalizeIsraeliPhone(raw);
  if (!p) return false;

  // Length
  if (p.length < 9 || p.length > 10) return false;

  // Must start with 0
  if (!p.startsWith("0")) return false;

  // Mobile: 10 digits, valid prefix
  if (p.length === 10) {
    const prefix = p.slice(0, 3);
    const isMobile = VALID_MOBILE_PREFIXES.includes(prefix);
    const isMobileService = /^07[2-9]/.test(p); // 072-079 service lines
    if (!isMobile && !isMobileService) return false;
  } else {
    // Landline: 9 digits with prefix 02/03/04/08/09
    if (!/^(0[2348]|09)\d{7}$/.test(p)) return false;
  }

  // Anti-fake heuristics on the subscriber portion (after the area/mobile prefix)
  const subscriber = p.length === 10 ? p.slice(3) : p.slice(2);
  if (isAllSameDigits(subscriber)) return false;
  if (isSequential(subscriber)) return false;
  if (hasTooMuchRepetition(p)) return false;
  if (KNOWN_FAKE_NUMBERS.has(p)) return false;

  return true;
};

export const MOBILE_PHONE_ERROR =
  "לאימות ב-SMS נדרש מספר נייד ישראלי (לדוגמה 050-1234567).";

/** OTP/SMS can only be delivered to Israeli mobiles (05X). */
export const isValidIsraeliMobile = (raw: string): boolean => {
  const p = normalizeIsraeliPhone(raw);
  if (p.length !== 10) return false;
  if (!VALID_MOBILE_PREFIXES.includes(p.slice(0, 3))) return false;
  return isValidIsraeliPhone(raw);
};
