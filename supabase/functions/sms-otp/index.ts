import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SMS_ENDPOINT = "https://019sms.co.il/api";
const APP_ID = "1";

const ALLOWED_ORIGINS = new Set([
  "https://liba-fs.co.il",
  "https://www.liba-fs.co.il",
  "https://liba.1wp.site",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const corsHeaders = (origin: string | null): Record<string, string> => {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://liba-fs.co.il";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
};

const json = (body: unknown, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });

const toMobile = (raw: string): string | null => {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("972") && digits.length >= 12) digits = `0${digits.slice(3)}`;
  if (digits.startsWith("5") && digits.length === 9) digits = `0${digits}`;
  if (!/^05[0-9]\d{7}$/.test(digits)) return null;
  return digits;
};

const sendByPhone = new Map<string, number[]>();
const sendByIp = new Map<string, number[]>();

const prune = (times: number[], windowMs: number, now: number) =>
  times.filter((t) => now - t < windowMs);

const isLimited = (map: Map<string, number[]>, key: string, max: number, windowMs: number) => {
  const now = Date.now();
  const next = prune(map.get(key) ?? [], windowMs, now);
  if (next.length >= max) {
    map.set(key, next);
    return true;
  }
  next.push(now);
  map.set(key, next);
  return false;
};

const publicError = (status: number) => {
  if (status === 4 || status === 12) return "אין כרגע אפשרות לשלוח קוד. נסו שוב בעוד כמה דקות.";
  if (status === 515) return "שליחת ה-SMS עדיין לא מוגדרת. נסו שוב מאוחר יותר.";
  return "לא הצלחנו לשלוח או לאמת את הקוד. נסו שוב.";
};

type Sms019Result = { status?: number };

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405, origin);
  }

  let body: { action?: string; phone?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "בקשה לא תקינה." }, 400, origin);
  }

  const phone = typeof body.phone === "string" ? toMobile(body.phone) : null;
  if (!phone) {
    return json({ ok: false, error: "נדרש מספר נייד ישראלי תקין." }, 400, origin);
  }

  // 019 sender LIBA is pending approval. Do not send SMS; accept verify so cached old pages can still finish.
  const otpDisabled = (Deno.env.get("SMS_OTP_DISABLED") ?? "true").toLowerCase() !== "false";
  if (otpDisabled) {
    if (body.action === "send") {
      return json({ ok: true }, 200, origin);
    }
    if (body.action === "verify") {
      const code = String(body.code ?? "").replace(/\D/g, "");
      if (!/^\d{6}$/.test(code)) {
        return json({ ok: false, error: "הקוד חייב להיות 6 ספרות." }, 400, origin);
      }
      return json({ ok: true }, 200, origin);
    }
  }

  const username = Deno.env.get("SMS_019_USERNAME") ?? "";
  const token = Deno.env.get("SMS_019_API_TOKEN") ?? "";
  const source = (Deno.env.get("SMS_019_SOURCE") ?? "LIBA").replace(/[^A-Za-z0-9]/g, "").slice(0, 11);

  if (!username || !token || !source) {
    return json({ ok: false, error: "לא ניתן לאמת כרגע. נסו שוב מאוחר יותר." }, 503, origin);
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  const call019 = async (payload: unknown): Promise<Sms019Result> => {
    const res = await fetch(SMS_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { status: typeof data.status === "number" ? data.status : Number(data.status) };
  };

  if (body.action === "send") {
    if (
      isLimited(sendByPhone, phone, 5, 15 * 60 * 1000) ||
      isLimited(sendByIp, ip, 20, 15 * 60 * 1000)
    ) {
      return json({ ok: false, error: "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות." }, 429, origin);
    }

    const data = await call019({
      send_otp: {
        user: { username },
        phone,
        app_id: APP_ID,
        source,
        max_tries: "3",
        valid_time: "5",
        text: "קוד האימות של ליבה הוא [code]",
      },
    });

    if (data.status !== 0) {
      return json({ ok: false, error: publicError(Number(data.status)) }, 400, origin);
    }
    return json({ ok: true }, 200, origin);
  }

  if (body.action === "verify") {
    const code = String(body.code ?? "").replace(/\D/g, "");
    if (!/^\d{6}$/.test(code)) {
      return json({ ok: false, error: "הקוד חייב להיות 6 ספרות." }, 400, origin);
    }

    const data = await call019({
      validate_otp: {
        user: { username },
        phone,
        app_id: APP_ID,
        code,
      },
    });

    if (data.status !== 0) {
      return json({ ok: false, error: "הקוד שגוי או שפג תוקפו." }, 400, origin);
    }
    return json({ ok: true }, 200, origin);
  }

  return json({ ok: false, error: "פעולה לא תקינה." }, 400, origin);
});
