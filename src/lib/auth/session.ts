import { cookies } from "next/headers";
import { createAuthSession, deleteAuthSession, SESSION_TTL_S, userForSessionToken, type User } from "./accounts";

/**
 * Anmelde-Cookie lesen und schreiben.
 *
 * Getrennt vom Chat-Cookie: der Chat funktioniert auch ohne Konto, das Konto
 * entscheidet nur, ob die Premiumzweige freigeschaltet sind.
 */
export const AUTH_COOKIE = "lp_auth";

/**
 * Oeffentliche Basis-Adresse der App, fuer Links in Mails und die
 * OAuth-Rueckleitung.
 *
 * In Produktion nur aus der Konfiguration, nie aus dem Host-Header: sonst
 * koennte jemand mit gefaelschtem Host einen Login-Link fuer fremde Adressen
 * anfordern, der auf seine eigene Domain zeigt — samt gueltigem Token.
 * Railway setzt RAILWAY_PUBLIC_DOMAIN selbst, sobald eine Domain erzeugt ist.
 */
export function appUrl(request?: Request): string {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/+$/, "");
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  if (process.env.NODE_ENV === "production") {
    throw new Error("APP_URL ist nicht gesetzt — Login-Links brauchen die oeffentliche Adresse.");
  }
  if (!request) return "http://localhost:3000";
  const host = request.headers.get("host");
  return host ? `http://${host}` : new URL(request.url).origin;
}

/** Secure-Cookies, sobald die App unter https laeuft. */
export function secureCookies(): boolean {
  if (process.env.APP_URL) return process.env.APP_URL.startsWith("https://");
  return Boolean(process.env.RAILWAY_PUBLIC_DOMAIN) || process.env.NODE_ENV === "production";
}

/** Angemeldeter Nutzer der aktuellen Anfrage (Server Components, Route Handler). */
export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  return token ? userForSessionToken(token) : null;
}

export async function signIn(userId: string): Promise<void> {
  const token = createAuthSession(userId);
  (await cookies()).set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies(),
    maxAge: SESSION_TTL_S,
    path: "/",
  });
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  if (token) deleteAuthSession(token);
  store.delete(AUTH_COOKIE);
}

/** Nur relative Ziele zulassen, sonst wird der Login zum offenen Redirect. */
export function safeNext(value: unknown): string {
  return typeof value === "string" && /^\/(?!\/|\\)/.test(value) ? value : "/";
}
