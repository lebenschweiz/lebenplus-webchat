"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GroupEvent, GroupMessage } from "@/lib/groups";
import RichText from "./RichText";
import { ArrowLeft, Close, Send } from "./icons";

const MAX_LENGTH = 2000;

function formatTime(iso: string): string {
  const date = new Date(iso);
  const today = new Date().toDateString() === date.toDateString();
  return date.toLocaleString("de-CH", today ? { hour: "2-digit", minute: "2-digit" } : { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

/** Fuegt Nachrichten nach ID sortiert ein und ignoriert schon bekannte. */
function merge(current: GroupMessage[], incoming: GroupMessage): GroupMessage[] {
  if (current.some((m) => m.id === incoming.id)) return current;
  return [...current, incoming].sort((a, b) => a.id - b.id);
}

export default function GroupChat({
  group,
  initialMessages,
  me,
}: {
  group: { slug: string; name: string; description: string };
  initialMessages: GroupMessage[];
  me: { id: string; moderator: boolean };
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom("instant");
  }, [scrollToBottom]);

  useEffect(() => {
    if (stickToBottom.current) scrollToBottom();
  }, [messages, scrollToBottom]);

  // Echtzeit: EventSource verbindet sich nach Abbruechen selbst neu und
  // schickt dabei die letzte ID mit, der Server holt Verpasstes nach.
  useEffect(() => {
    const lastId = initialMessages.at(-1)?.id ?? 0;
    const source = new EventSource(`/api/gruppen/${group.slug}/stream?after=${lastId}`);
    source.onopen = () => setConnected(true);
    source.onerror = () => setConnected(false);
    source.onmessage = (event) => {
      const data = JSON.parse(event.data) as GroupEvent;
      if (data.type === "message") setMessages((current) => merge(current, data.message));
      else setMessages((current) => current.filter((m) => m.id !== data.id));
    };
    return () => source.close();
  }, [group.slug, initialMessages]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    setError(null);
    try {
      const response = await fetch(`/api/gruppen/${group.slug}/nachrichten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await response.json()) as { message?: GroupMessage; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error ?? "Senden fehlgeschlagen.");
      setDraft("");
      stickToBottom.current = true;
      setMessages((current) => merge(current, data.message!));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Senden fehlgeschlagen.");
    } finally {
      setSending(false);
    }
  }

  async function remove(id: number) {
    const response = await fetch(`/api/gruppen/${group.slug}/nachrichten/${id}`, { method: "DELETE" });
    if (response.ok) setMessages((current) => current.filter((m) => m.id !== id));
  }

  function onScroll() {
    const el = scrollRef.current;
    if (el) stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  return (
    <div className="flex h-dvh flex-col bg-bg">
      <header className="z-10 border-b border-line bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/gruppen"
            title="Alle Gruppen"
            aria-label="Alle Gruppen"
            className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink"
          >
            <ArrowLeft />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[15px] font-semibold tracking-tight text-ink">{group.name}</h1>
            <p className="flex items-center gap-1.5 truncate text-xs text-muted">
              <span
                className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${connected ? "bg-emerald-500" : "bg-faint"}`}
              />
              {connected ? group.description : "Verbinde …"}
            </p>
          </div>
          <Link href="/" className="text-sm font-medium text-accent hover:text-accent-hover">
            Zum Chat
          </Link>
        </div>
      </header>

      <div ref={scrollRef} onScroll={onScroll} className="scroll-slim flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-1 px-4 py-6 sm:px-6">
          {messages.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">Noch keine Nachrichten. Schreib die erste!</p>
          )}
          {messages.map((message, index) => {
            const mine = message.userId === me.id;
            const previous = messages[index - 1];
            const startsRun = !previous || previous.userId !== message.userId;
            return (
              <div
                key={message.id}
                className={`group flex flex-col ${mine ? "items-end" : "items-start"} ${startsRun ? "mt-3" : "mt-0.5"}`}
              >
                {startsRun && !mine && <span className="mb-1 ml-1 text-xs font-medium text-muted">{message.author}</span>}
                <div className={`flex max-w-[85%] items-end gap-1.5 sm:max-w-[78%] ${mine ? "flex-row-reverse" : ""}`}>
                  <div
                    className={[
                      "min-w-0 px-4 py-2 text-[15px] leading-relaxed shadow-[var(--shadow-sm)]",
                      mine
                        ? "rounded-2xl rounded-br-md bg-bubble-user text-bubble-user-text"
                        : "rounded-2xl rounded-bl-md border border-line bg-bubble-bot text-bubble-bot-text",
                    ].join(" ")}
                  >
                    <RichText text={message.text} inverted={mine} />
                    <span className={`mt-0.5 block text-right text-[11px] ${mine ? "text-white/70" : "text-faint"}`}>
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  {(mine || me.moderator) && (
                    <button
                      type="button"
                      onClick={() => void remove(message.id)}
                      title="Nachricht löschen"
                      aria-label="Nachricht löschen"
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-faint opacity-0 transition group-hover:opacity-100 hover:text-ink focus:opacity-100"
                    >
                      <Close />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} className="h-2" />
        </div>
      </div>

      <div className="border-t border-line bg-surface/85 backdrop-blur-md">
        <form onSubmit={submit} className="mx-auto flex w-full max-w-2xl items-end gap-2 px-4 py-3 sm:px-6">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submit(e);
              }
            }}
            rows={1}
            maxLength={MAX_LENGTH}
            placeholder={`Nachricht an ${group.name}`}
            className="max-h-40 min-h-[42px] flex-1 resize-none rounded-2xl border border-line-strong bg-surface px-4 py-2.5 text-[15px] text-ink outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending}
            aria-label="Senden"
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition hover:bg-accent-hover disabled:opacity-40"
          >
            <Send />
          </button>
        </form>
        {error && <p className="mx-auto max-w-2xl px-4 pb-3 text-sm text-red-600 sm:px-6">{error}</p>}
      </div>
    </div>
  );
}
