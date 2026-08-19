/**
 * Israeli ID number (תעודת זהות) validator using the Luhn-style algorithm
 * defined by the Ministry of the Interior.
 */

export const normalizeIsraeliId = (raw: string): string =>
  (raw || "").replace(/\D/g, "").slice(0, 9);

export const isValidIsraeliId = (raw: string): boolean => {
  const digits = normalizeIsraeliId(raw);
  if (digits.length === 0 || digits.length > 9) return false;
  // Pad with leading zeros to 9 digits (standard practice)
  const id = digits.padStart(9, "0");
  if (!/^\d{9}$/.test(id)) return false;
  // Reject all-zero id
  if (id === "000000000") return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = Number(id[i]) * ((i % 2) + 1);
    if (num > 9) num -= 9;
    sum += num;
  }
  return sum % 10 === 0;
};
