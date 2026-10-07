import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { FlowEngine } from "@/lib/flow/engine";
import { externalContext } from "@/lib/flow/handlers";
import { flows } from "@/lib/flow/flows";
import { store } from "@/lib/store";
import type { OutMessage, Session } from "@/lib/flow/types";

// node:sqlite laeuft nicht im Edge-Runtime.
export const runtime = "nodejs";

const engine = new FlowEngine(flows, externalContext);

const COOKIE = "chat_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage

interface ChatRequest {
  text?: string;
  buttonIndex?: number;
  /** Einen Schritt zurueck. */
  back?: boolean;
  /** Verlauf verwerfen und neu am Welcome-Flow starten. */
  reset?: boolean;
}

interface ChatPayload {
  sessionId: string;
  messages: OutMessage[];
  awaiting: Session["awaiting"];
  /** Steuert den Zurueck-Button im Client. */
  canGoBack: boolean;
  /** true = `messages` ist der komplette Verlauf, nicht nur die Ergaenzung. */
  full?: boolean;
}

function respond(payload: ChatPayload) {
  const response = NextResponse.json(payload);
  response.cookies.set(COOKIE, payload.sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}

function startFresh(sessionId: string) {
  const { session, messages } = engine.start(sessionId);
  store.clearSnapshots(sessionId);
  store.save(session);
  store.appendMessages(sessionId, messages);
  return { session, messages };
}

/** Verlauf einer bestehenden Session laden (oder eine neue starten). */
export async function GET(request: Request) {
  const cookie = readCookie(request);
  const existing = cookie ? store.load(cookie) : null;

  if (!existing) {
    const id = cookie ?? randomUUID();
    const { session, messages } = startFresh(id);
    return respond({ sessionId: id, messages, awaiting: session.awaiting, canGoBack: false, full: true });
  }

  return respond({
    sessionId: existing.id,
    messages: store.history(existing.id),
    awaiting: existing.awaiting,
    canGoBack: store.hasSnapshot(existing.id),
    full: true,
  });
}

export async function POST(request: Request) {
  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Ungueltiger Request-Body" }, { status: 400 });
  }

  const sessionId = readCookie(request) ?? randomUUID();

  if (body.reset) {
    const id = randomUUID();
    const { session, messages } = startFresh(id);
    return respond({ sessionId: id, messages, awaiting: session.awaiting, canGoBack: false, full: true });
  }

  const current = store.load(sessionId);
  if (!current) {
    const { session, messages } = startFresh(sessionId);
    return respond({ sessionId, messages, awaiting: session.awaiting, canGoBack: false, full: true });
  }

  if (body.back) {
    const previous = store.popSnapshot(sessionId);
    if (!previous) {
      return respond({
        sessionId,
        messages: store.history(sessionId),
        awaiting: current.awaiting,
        canGoBack: false,
        full: true,
      });
    }
    store.truncateMessagesAfter(sessionId, previous.lastMessageId);
    store.save(previous.session);
    return respond({
      sessionId,
      messages: store.history(sessionId),
      awaiting: previous.session.awaiting,
      canGoBack: store.hasSnapshot(sessionId),
      full: true,
    });
  }

  if (typeof body.buttonIndex !== "number" && !body.text?.trim()) {
    return NextResponse.json({ error: "text oder buttonIndex erforderlich" }, { status: 400 });
  }

  try {
    // Zustand vor der Eingabe sichern, damit "Zurueck" ihn wiederherstellen kann.
    store.pushSnapshot(current);
    const { session, messages } = await engine.handleInput(current, {
      text: body.text,
      buttonIndex: body.buttonIndex,
    });
    store.save(session);
    store.appendMessages(sessionId, messages);
    return respond({
      sessionId,
      messages,
      awaiting: session.awaiting,
      canGoBack: store.hasSnapshot(sessionId),
    });
  } catch (error) {
    console.error("Flow-Fehler:", error);
    return NextResponse.json({ error: "Der Flow konnte nicht fortgesetzt werden." }, { status: 500 });
  }
}

function readCookie(request: Request): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}
