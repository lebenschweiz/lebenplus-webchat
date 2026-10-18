import { createHash, randomBytes, randomUUID } from "node:crypto";
import { db } from "../db";

/**
 * Nutzerkonten, Login-Links und Anmelde-Sessions.
 *
 * Tokens werden nur als SHA-256-Hash gespeichert: wer die Datenbank liest,
 * kann sich damit trotzdem nicht anmelden. Das Klartext-Token existiert nur
 * im Cookie bzw. im Link der Login-Mail.
 */

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  /** Letzter bekannter Abo-Status, siehe lib/billing.ts. */
  premium: boolean;
  premiumCheckedAt: string | null;
  stripeCustomerId: string | null;
}

/** Wie lange ein Login-Link aus der Mail gilt. */
const LOGIN_TOKEN_TTL_MS = 30 * 60 * 1000;
/** Wie lange man angemeldet bleibt. */
export const SESSION_TTL_S = 60 * 60 * 24 * 60; // 60 Tage

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id                  TEXT PRIMARY KEY,
    email               TEXT NOT NULL UNIQUE,
    name                TEXT,
    google_sub          TEXT UNIQUE,
    created_at          TEXT NOT NULL,
    premium             INTEGER NOT NULL DEFAULT 0,
    premium_checked_at  TEXT,
    stripe_customer_id  TEXT
  );
  CREATE TABLE IF NOT EXISTS login_tokens (
    token_hash TEXT PRIMARY KEY,
    email      TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS auth_sessions (
    token_hash TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_auth_sessions_user ON auth_sessions(user_id);
`);

interface UserRow {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  premium: number;
  premium_checked_at: string | null;
  stripe_customer_id: string | null;
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
    premium: row.premium === 1,
    premiumCheckedAt: row.premium_checked_at,
    stripeCustomerId: row.stripe_customer_id,
  };
}

function hash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function newToken(): string {
  return randomBytes(32).toString("base64url");
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// --- Nutzer -----------------------------------------------------------------

export function getUser(id: string): User | null {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined;
  return row ? toUser(row) : null;
}

export function getUserByEmail(email: string): User | null {
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(normaliseEmail(email)) as UserRow | undefined;
  return row ? toUser(row) : null;
}

/**
 * Konto zur E-Mail holen oder anlegen. Google und Magic Link landen bei
 * derselben Adresse im selben Konto — beide Wege bestaetigen, dass die
 * Person das Postfach besitzt.
 */
export function upsertUser(email: string, profile: { name?: string | null; googleSub?: string } = {}): User {
  const normalised = normaliseEmail(email);
  const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(normalised) as UserRow | undefined;

  if (existing) {
    if (profile.googleSub || (profile.name && !existing.name)) {
      db.prepare(
        "UPDATE users SET google_sub = COALESCE(google_sub, ?), name = COALESCE(name, ?) WHERE id = ?",
      ).run(profile.googleSub ?? null, profile.name ?? null, existing.id);
    }
    return getUser(existing.id)!;
  }

  const id = randomUUID();
  db.prepare("INSERT INTO users (id, email, name, google_sub, created_at) VALUES (?, ?, ?, ?, ?)").run(
    id,
    normalised,
    profile.name ?? null,
    profile.googleSub ?? null,
    new Date().toISOString(),
  );
  return getUser(id)!;
}

export function savePremium(userId: string, premium: boolean, stripeCustomerId?: string | null): void {
  db.prepare(
    `UPDATE users SET premium = ?, premium_checked_at = ?,
       stripe_customer_id = COALESCE(?, stripe_customer_id) WHERE id = ?`,
  ).run(premium ? 1 : 0, new Date().toISOString(), stripeCustomerId ?? null, userId);
}

// --- Login per E-Mail-Link --------------------------------------------------

/** Erzeugt einen einmaligen Login-Link-Token fuer diese Adresse. */
export function createLoginToken(email: string): string {
  const token = newToken();
  db.prepare("DELETE FROM login_tokens WHERE expires_at < ?").run(Date.now());
  db.prepare("INSERT INTO login_tokens (token_hash, email, expires_at) VALUES (?, ?, ?)").run(
    hash(token),
    normaliseEmail(email),
    Date.now() + LOGIN_TOKEN_TTL_MS,
  );
  return token;
}

/** Loest den Token ein (nur einmal moeglich) und liefert die E-Mail. */
export function consumeLoginToken(token: string): string | null {
  const tokenHash = hash(token);
  const row = db.prepare("SELECT email, expires_at FROM login_tokens WHERE token_hash = ?").get(tokenHash) as
    | { email: string; expires_at: number }
    | undefined;
  if (!row) return null;
  db.prepare("DELETE FROM login_tokens WHERE token_hash = ?").run(tokenHash);
  return row.expires_at >= Date.now() ? row.email : null;
}

/** Bremst das Zuschicken von Mails an dieselbe Adresse. */
export function recentLoginTokens(email: string, withinMs: number): number {
  const row = db
    .prepare("SELECT COUNT(*) AS n FROM login_tokens WHERE email = ? AND expires_at > ?")
    .get(normaliseEmail(email), Date.now() + LOGIN_TOKEN_TTL_MS - withinMs) as { n: number };
  return row.n;
}

// --- Anmelde-Sessions -------------------------------------------------------

export function createAuthSession(userId: string): string {
  const token = newToken();
  db.prepare("DELETE FROM auth_sessions WHERE expires_at < ?").run(Date.now());
  db.prepare("INSERT INTO auth_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(
    hash(token),
    userId,
    Date.now() + SESSION_TTL_S * 1000,
  );
  return token;
}

export function userForSessionToken(token: string): User | null {
  const row = db
    .prepare("SELECT user_id, expires_at FROM auth_sessions WHERE token_hash = ?")
    .get(hash(token)) as { user_id: string; expires_at: number } | undefined;
  if (!row || row.expires_at < Date.now()) return null;
  return getUser(row.user_id);
}

export function deleteAuthSession(token: string): void {
  db.prepare("DELETE FROM auth_sessions WHERE token_hash = ?").run(hash(token));
}
