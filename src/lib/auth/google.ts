import { createHash, randomBytes } from "node:crypto";

/**
 * "Mit Google anmelden" als schlichter OAuth-2.0-Code-Flow mit PKCE.
 *
 * Braucht GOOGLE_CLIENT_ID und GOOGLE_CLIENT_SECRET aus der Google Cloud
 * Console (OAuth-Client vom Typ "Webanwendung"). Als autorisierte
 * Weiterleitungs-URI dort `<APP_URL>/api/auth/google/callback` eintragen.
 */

const AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

/** Kurzlebiges Cookie mit state, PKCE-Verifier und Ziel waehrend des Logins. */
export const GOOGLE_STATE_COOKIE = "lp_google";

export function googleEnabled(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function callbackUrl(base: string): string {
  return `${base}/api/auth/google/callback`;
}

export interface GoogleStart {
  url: string;
  /** Kommt ins kurzlebige Cookie und wird im Callback verglichen. */
  state: string;
  verifier: string;
}

export function startGoogleLogin(base: string): GoogleStart {
  const state = randomBytes(16).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: callbackUrl(base),
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  });
  return { url: `${AUTHORIZE_URL}?${params}`, state, verifier };
}

export interface GoogleProfile {
  sub: string;
  email: string;
  name: string | null;
}

/** Tauscht den Code gegen ein Token und liest das Profil. */
export async function finishGoogleLogin(base: string, code: string, verifier: string): Promise<GoogleProfile> {
  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: callbackUrl(base),
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  });
  if (!tokenResponse.ok) {
    throw new Error(`Google-Token fehlgeschlagen (${tokenResponse.status}): ${await tokenResponse.text()}`);
  }
  const { access_token } = (await tokenResponse.json()) as { access_token: string };

  const profileResponse = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!profileResponse.ok) throw new Error(`Google-Profil fehlgeschlagen (${profileResponse.status})`);
  const profile = (await profileResponse.json()) as {
    sub: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
  };

  // Nur bestaetigte Adressen: das Konto haengt an der E-Mail, und darueber
  // wird auch das Abo zugeordnet.
  if (!profile.email || profile.email_verified !== true) {
    throw new Error("Google-Konto ohne bestaetigte E-Mail-Adresse");
  }
  return { sub: profile.sub, email: profile.email, name: profile.name ?? null };
}
