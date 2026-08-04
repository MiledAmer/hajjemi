// Ooredoo Developer (CAMARA One-Time-Password SMS) client — sends an OTP by
// SMS to a Tunisian number and validates it. Spec: CAMARA one-time-password-sms
//   POST {base}/one-time-password-sms/v1/send-code     → { authenticationId }
//   POST {base}/one-time-password-sms/v1/validate-code → 204 on success
// Auth: OAuth2 client-credentials against the portal's token endpoint.
// Portal: https://developer.ooredoo.com/ (Tunisia)
import { env } from "@/env";

// ponytail: token cached in module scope; fine for one server process,
// move to DB/redis if we ever run many instances.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;
  const res = await fetch(env.OOREDOO_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: env.OOREDOO_CLIENT_ID,
      client_secret: env.OOREDOO_CLIENT_SECRET,
    }),
  });
  if (!res.ok) throw new Error(`Ooredoo token request failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string; expires_in?: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + ((data.expires_in ?? 300) - 30) * 1000,
  };
  return data.access_token;
}

/** Normalize a Tunisian number to E.164 (+216XXXXXXXX). Accepts "12345678",
 * "216 12 345 678", "+21612345678". Throws on anything else. */
export function toTunisianE164(input: string): string {
  const digits = input.replace(/[\s.-]/g, "").replace(/^\+/, "").replace(/^00/, "");
  const local = digits.startsWith("216") ? digits.slice(3) : digits;
  if (!/^\d{8}$/.test(local)) {
    throw new Error(`Numéro de téléphone tunisien invalide: ${input}`);
  }
  return `+216${local}`;
}

async function camaraPost(path: string, body: unknown): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${env.OOREDOO_API_BASE_URL}/one-time-password-sms/v1/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

/** Sends an OTP SMS. Returns the authenticationId to keep for validation.
 * `message` must contain the {{code}} placeholder (max 160 chars). */
export async function sendOtp(
  phoneNumber: string,
  message = "Hajjem: votre code de vérification est {{code}}",
): Promise<string> {
  const res = await camaraPost("send-code", {
    phoneNumber: toTunisianE164(phoneNumber),
    message,
  });
  if (!res.ok) {
    throw new Error(`Ooredoo send-code failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { authenticationId: string };
  return data.authenticationId;
}

/** Validates the code the user typed. Returns true if it matches. */
export async function validateOtp(
  authenticationId: string,
  code: string,
): Promise<boolean> {
  const res = await camaraPost("validate-code", { authenticationId, code });
  if (res.ok) return true;
  // 400 with INVALID_OTP / EXPIRED_OTP etc. = wrong/expired code, not a bug.
  if (res.status === 400) return false;
  throw new Error(`Ooredoo validate-code failed: ${res.status} ${await res.text()}`);
}
