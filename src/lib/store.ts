import type { DatabaseSync } from "node:sqlite";
import { db } from "./db";
import type { OutMessage, Session } from "./flow/types";

/**
 * Persistenz fuer Sessions, Chatverlauf und Schritt-Historie.
 *
 * Bewusst hinter einem schmalen Interface: SQLite (in Node 24 eingebaut, keine
 * Dependency, keine native Kompilierung) reicht fuer Dev und kleine Deployments.
 * Fuer Postgres nur diese Datei ersetzen — der Rest der App kennt nur SessionStore.
 */
export interface SessionStore {
  load(id: string): Session | null;
  save(session: Session): void;
  appendMessages(sessionId: string, messages: OutMessage[]): void;
  history(sessionId: string): OutMessage[];
  /** Fuer das Admin-Dashboard. */
  list(limit?: number): Session[];

  // --- Schritt-Historie fuer "Zurueck" -------------------------------------
  /** Sichert den Zustand vor einer Eingabe, damit er zurueckgeholt werden kann. */
  pushSnapshot(session: Session): void;
  /** Holt den letzten Zustand zurueck und entfernt ihn aus der Historie. */
  popSnapshot(sessionId: string): { session: Session; lastMessageId: number } | null;
  hasSnapshot(sessionId: string): boolean;
  /** Entfernt alle Nachrichten, die nach diesem Stand entstanden sind. */
  truncateMessagesAfter(sessionId: string, messageId: number): void;
  clearSnapshots(sessionId: string): void;
}

/**
 * Wird bei jedem Modul-Load ausgefuehrt, nicht nur beim Oeffnen der Verbindung:
 * im Dev-Modus ueberlebt die Verbindung am globalThis den Hot-Reload, neue
 * Tabellen wuerden sonst nie angelegt.
 */
function ensureSchema(db: DatabaseSync): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id         TEXT PRIMARY KEY,
      data       TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS messages (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      data       TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, id);
    CREATE TABLE IF NOT EXISTS snapshots (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id      TEXT NOT NULL,
      data            TEXT NOT NULL,
      last_message_id INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_snapshots_session ON snapshots(session_id, id);
  `);
}

ensureSchema(db);

/** Groesste Nachrichten-ID der Session — Marke fuer das Zuruecksetzen. */
function lastMessageId(sessionId: string): number {
  const row = db
    .prepare("SELECT COALESCE(MAX(id), 0) AS id FROM messages WHERE session_id = ?")
    .get(sessionId) as { id: number };
  return row.id;
}

export const store: SessionStore = {
  load(id) {
    const row = db.prepare("SELECT data FROM sessions WHERE id = ?").get(id) as
      | { data: string }
      | undefined;
    return row ? (JSON.parse(row.data) as Session) : null;
  },

  save(session) {
    db.prepare(
      `INSERT INTO sessions (id, data, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
    ).run(session.id, JSON.stringify(session), session.updatedAt);
  },

  appendMessages(sessionId, messages) {
    const insert = db.prepare(
      "INSERT INTO messages (session_id, data, created_at) VALUES (?, ?, ?)",
    );
    const now = new Date().toISOString();
    for (const message of messages) {
      // Tipp-Indikator ist reine Darstellung und gehoert nicht in den Verlauf.
      if (message.role === "system" && message.text.startsWith("__typing:")) continue;
      insert.run(sessionId, JSON.stringify(message), now);
    }
  },

  history(sessionId) {
    const rows = db
      .prepare("SELECT data FROM messages WHERE session_id = ? ORDER BY id")
      .all(sessionId) as { data: string }[];
    return rows.map((r) => JSON.parse(r.data) as OutMessage);
  },

  list(limit = 100) {
    const rows = db
      .prepare("SELECT data FROM sessions ORDER BY updated_at DESC LIMIT ?")
      .all(limit) as { data: string }[];
    return rows.map((r) => JSON.parse(r.data) as Session);
  },

  pushSnapshot(session) {
    db.prepare("INSERT INTO snapshots (session_id, data, last_message_id) VALUES (?, ?, ?)").run(
      session.id,
      JSON.stringify(session),
      lastMessageId(session.id),
    );
  },

  popSnapshot(sessionId) {
    const row = db
      .prepare("SELECT id, data, last_message_id FROM snapshots WHERE session_id = ? ORDER BY id DESC LIMIT 1")
      .get(sessionId) as { id: number; data: string; last_message_id: number } | undefined;
    if (!row) return null;
    db.prepare("DELETE FROM snapshots WHERE id = ?").run(row.id);
    return { session: JSON.parse(row.data) as Session, lastMessageId: row.last_message_id };
  },

  hasSnapshot(sessionId) {
    const row = db
      .prepare("SELECT COUNT(*) AS n FROM snapshots WHERE session_id = ?")
      .get(sessionId) as { n: number };
    return row.n > 0;
  },

  truncateMessagesAfter(sessionId, messageId) {
    db.prepare("DELETE FROM messages WHERE session_id = ? AND id > ?").run(sessionId, messageId);
  },

  clearSnapshots(sessionId) {
    db.prepare("DELETE FROM snapshots WHERE session_id = ?").run(sessionId);
  },
};
