import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Gemeinsame SQLite-Verbindung fuer Chat-Store und Konten.
 *
 * Eine Datei, eine Verbindung: Sessions, Verlauf und Nutzerkonten liegen
 * zusammen in chat.db und damit auf demselben Volume.
 */
const DB_PATH = process.env.CHAT_DB_PATH ?? path.join(process.cwd(), "data", "chat.db");

function open(): DatabaseSync {
  mkdirSync(path.dirname(DB_PATH), { recursive: true });
  // Beim Build lesen mehrere Worker parallel Module ein, die das Schema
  // anlegen — ohne Wartezeit scheitert der zweite sofort an "database is locked".
  return new DatabaseSync(DB_PATH, { timeout: 5000 });
}

// Next.js laedt Module im Dev-Modus neu; die Verbindung ueberlebt das am globalThis.
const globalForDb = globalThis as unknown as { __chatDb?: DatabaseSync };
export const db = globalForDb.__chatDb ?? open();
if (process.env.NODE_ENV !== "production") globalForDb.__chatDb = db;
