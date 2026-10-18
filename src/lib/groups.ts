import { EventEmitter } from "node:events";
import { db } from "./db";
import type { User } from "./auth/accounts";

/**
 * Gruppenchats der Community — ersetzen die Telegram-Gruppen aus dem
 * Original-Bot ("Hier geht's zu allen Groundzero-Chatgruppen").
 *
 * Die Gruppen selbst stehen fest im Code, nur die Nachrichten liegen in der
 * Datenbank. Neue Nachrichten verteilt ein Event-Bus im Prozess an alle
 * offenen Verbindungen (Server-Sent Events, siehe api/gruppen/[slug]/stream).
 * Das reicht, solange die App als eine Instanz laeuft — wie auf Railway mit
 * SQLite-Volume ohnehin noetig. Fuer mehrere Instanzen den Bus durch
 * Postgres LISTEN/NOTIFY oder Redis ersetzen.
 */

export interface Group {
  slug: string;
  name: string;
  description: string;
  /** Wie im Original: nur die Jobs-Gruppe ist ohne Abo offen. */
  premium: boolean;
}

export const GROUPS: Group[] = [
  {
    slug: "jobs",
    name: "Jobs",
    description: "Jobsuche, Bewerbungen und Arbeitsalltag in der Schweiz.",
    premium: false,
  },
  {
    slug: "wohnen",
    name: "Wohnen",
    description: "Wohnungssuche, Besichtigungen, Mieten und Nachbarschaft.",
    premium: true,
  },
  {
    slug: "selbststaendige",
    name: "Selbstständige",
    description: "Gründen, Steuern und Kunden finden als Selbstständige.",
    premium: true,
  },
  {
    slug: "eltern",
    name: "Eltern",
    description: "Kita, Schule und Familienleben in der Schweiz.",
    premium: true,
  },
  {
    slug: "lpg-core",
    name: "LPG Core",
    description: "Der innere Kreis der Lebenplus-Community.",
    premium: true,
  },
];

export function getGroup(slug: string): Group | null {
  return GROUPS.find((g) => g.slug === slug) ?? null;
}

export type GroupAccess = "ok" | "login" | "premium";

export function groupAccess(group: Group, user: User | null, premium: boolean): GroupAccess {
  if (!user) return "login";
  if (group.premium && !premium) return "premium";
  return "ok";
}

/** Von Hand ernannte Moderatoren: duerfen fremde Nachrichten loeschen. */
export function isModerator(user: User): boolean {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(user.email.toLowerCase());
}

// --- Nachrichten --------------------------------------------------------------

export const MAX_MESSAGE_LENGTH = 2000;
const PAGE_SIZE = 100;

export interface GroupMessage {
  id: number;
  userId: string;
  author: string;
  text: string;
  createdAt: string;
}

db.exec(`
  CREATE TABLE IF NOT EXISTS group_messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    group_slug TEXT NOT NULL,
    user_id    TEXT NOT NULL,
    author     TEXT NOT NULL,
    text       TEXT NOT NULL,
    created_at TEXT NOT NULL,
    deleted    INTEGER NOT NULL DEFAULT 0
  );
  CREATE INDEX IF NOT EXISTS idx_group_messages_group ON group_messages(group_slug, id);
`);

interface MessageRow {
  id: number;
  user_id: string;
  author: string;
  text: string;
  created_at: string;
}

function toMessage(row: MessageRow): GroupMessage {
  return { id: row.id, userId: row.user_id, author: row.author, text: row.text, createdAt: row.created_at };
}

/** Die letzten Nachrichten, aelteste zuerst. */
export function recentMessages(slug: string): GroupMessage[] {
  const rows = db
    .prepare(
      `SELECT id, user_id, author, text, created_at FROM group_messages
       WHERE group_slug = ? AND deleted = 0 ORDER BY id DESC LIMIT ?`,
    )
    .all(slug, PAGE_SIZE) as unknown as MessageRow[];
  return rows.reverse().map(toMessage);
}

/** Alles nach dieser ID — fuer das Nachholen nach einem Verbindungsabbruch. */
export function messagesAfter(slug: string, afterId: number): GroupMessage[] {
  const rows = db
    .prepare(
      `SELECT id, user_id, author, text, created_at FROM group_messages
       WHERE group_slug = ? AND deleted = 0 AND id > ? ORDER BY id LIMIT ?`,
    )
    .all(slug, afterId, PAGE_SIZE) as unknown as MessageRow[];
  return rows.map(toMessage);
}

export function addMessage(slug: string, user: User, text: string): GroupMessage {
  const author = user.name ?? "Mitglied";
  const createdAt = new Date().toISOString();
  const result = db
    .prepare("INSERT INTO group_messages (group_slug, user_id, author, text, created_at) VALUES (?, ?, ?, ?, ?)")
    .run(slug, user.id, author, text, createdAt);
  const message: GroupMessage = { id: Number(result.lastInsertRowid), userId: user.id, author, text, createdAt };
  bus.emit(slug, { type: "message", message } satisfies GroupEvent);
  return message;
}

/** Loescht weich: die Zeile bleibt fuer Rueckfragen, angezeigt wird sie nicht mehr. */
export function deleteMessage(slug: string, id: number, user: User): boolean {
  const row = db
    .prepare("SELECT user_id FROM group_messages WHERE id = ? AND group_slug = ? AND deleted = 0")
    .get(id, slug) as { user_id: string } | undefined;
  if (!row || (row.user_id !== user.id && !isModerator(user))) return false;
  db.prepare("UPDATE group_messages SET deleted = 1 WHERE id = ?").run(id);
  bus.emit(slug, { type: "delete", id } satisfies GroupEvent);
  return true;
}

// --- Schreibbremse ------------------------------------------------------------

const lastPost = new Map<string, number>();
const MIN_INTERVAL_MS = 1000;

/** true, wenn dieser Nutzer gerade erst geschrieben hat. */
export function tooFast(userId: string): boolean {
  const now = Date.now();
  const previous = lastPost.get(userId) ?? 0;
  if (now - previous < MIN_INTERVAL_MS) return true;
  lastPost.set(userId, now);
  return false;
}

// --- Echtzeit -----------------------------------------------------------------

export type GroupEvent = { type: "message"; message: GroupMessage } | { type: "delete"; id: number };

// Wie die DB-Verbindung: im Dev-Modus muss der Bus den Hot-Reload ueberleben,
// sonst hoeren alte Verbindungen auf einem anderen Bus als neue Nachrichten.
const globalForBus = globalThis as unknown as { __groupBus?: EventEmitter };
const bus = globalForBus.__groupBus ?? new EventEmitter();
bus.setMaxListeners(0);
globalForBus.__groupBus = bus;

export function subscribe(slug: string, listener: (event: GroupEvent) => void): () => void {
  bus.on(slug, listener);
  return () => bus.off(slug, listener);
}
