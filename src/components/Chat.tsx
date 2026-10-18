"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { OutMessage } from "@/lib/flow/types";
import RichText from "./RichText";
import { ArrowDown, ArrowLeft, Close, ExternalLink, Refresh, Send, User, Users } from "./icons";

type Awaiting = null | { kind: "buttons" | "text" };
type Choices = Extract<OutMessage, { kind: "choices" }>;

interface ChatResponse {
  sessionId: string;
  messages: OutMessage[];
  awaiting?: Awaiting;
  canGoBack?: boolean;
  /** true = kompletter Verlauf statt nur der Ergänzung. */
  full?: boolean;
  error?: string;
}

/** Der Delay-Node der Engine kommt als System-Notice durch. */
function typingSeconds(message: OutMessage): number | null {
  if (message.role !== "system" || !message.text.startsWith("__typing:")) return null;
  const seconds = Number(message.text.slice("__typing:".length));
  return Number.isFinite(seconds) ? Math.min(seconds, 5) : null;
}

/** Lesedauer simulieren, damit Antworten nicht schlagartig erscheinen. */
function thinkingTime(message: OutMessage): number {
  if (message.role !== "bot") return 0;
  const length = ("text" in message ? message.text : "").length;
  return Math.min(300 + length * 8, 1100);
}

/** Was der Header über das Konto wissen muss; null = nicht angemeldet. */
export interface ChatAccount {
  email: string;
  premium: boolean;
}

export default function Chat({ account }: { account: ChatAccount | null }) {
  const [messages, setMessages] = useState<OutMessage[]>([]);
  const [awaiting, setAwaiting] = useState<Awaiting>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [atBottom, setAtBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  /** Spielt neue Nachrichten nacheinander ab, inkl. Tipp-Indikator. */
  const play = useCallback(async (incoming: OutMessage[]) => {
    for (const message of incoming) {
      const explicit = typingSeconds(message);
      if (explicit !== null) {
        setTyping(true);
        await new Promise((r) => setTimeout(r, explicit * 1000));
        setTyping(false);
        continue;
      }
      const pause = thinkingTime(message);
      if (pause) {
        setTyping(true);
        await new Promise((r) => setTimeout(r, pause));
        setTyping(false);
      }
      setMessages((prev) => [...prev, message]);
    }
  }, []);

  const send = useCallback(
    async (body: Record<string, unknown>, optimistic?: OutMessage) => {
      setBusy(true);
      setError(null);
      setAwaiting(null);
      if (optimistic) setMessages((prev) => [...prev, optimistic]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = (await response.json()) as ChatResponse;
        if (!response.ok) throw new Error(data.error ?? "Unbekannter Fehler");

        if (data.full) {
          setMessages(data.messages.filter((m) => typingSeconds(m) === null));
        } else {
          // Die Antwort enthält die Nutzernachricht bereits — beim optimistischen
          // Rendern darf sie nicht doppelt erscheinen.
          await play(optimistic ? data.messages.filter((m) => m.role !== "user") : data.messages);
        }
        setAwaiting(data.awaiting ?? null);
        setCanGoBack(Boolean(data.canGoBack));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Verbindung fehlgeschlagen");
        if (optimistic) setMessages((prev) => prev.filter((m) => m !== optimistic));
      } finally {
        setBusy(false);
      }
    },
    [play],
  );

  // Verlauf beim Laden wiederherstellen.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/chat");
        const data = (await response.json()) as ChatResponse;
        if (cancelled) return;
        setMessages(data.messages.filter((m) => typingSeconds(m) === null));
        setAwaiting(data.awaiting ?? null);
        setCanGoBack(Boolean(data.canGoBack));
      } catch {
        if (!cancelled) setError("Chat konnte nicht geladen werden.");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (atBottom) scrollToBottom(messages.length > 3 ? "smooth" : "auto");
  }, [messages, typing, atBottom, scrollToBottom]);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 60);
  }

  const choices = useMemo(() => {
    const last = messages.at(-1);
    return awaiting?.kind === "buttons" && last?.kind === "choices" ? (last as Choices) : null;
  }, [messages, awaiting]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;
    setDraft("");
    setAtBottom(true);
    void send({ text }, { role: "user", kind: "text", text });
  }

  function choose(index: number, button: { label: string; url?: string }) {
    if (busy) return;
    setAtBottom(true);
    // Link-Buttons öffnen nur ihr Ziel: kein Server-Roundtrip, keine neue
    // Nachricht. Die Auswahl bleibt dadurch unverändert stehen, statt die
    // vorherige Bot-Nachricht ein zweites Mal auszugeben.
    if (button.url) return;
    void send({ buttonIndex: index }, { role: "user", kind: "text", text: button.label });
  }

  const status = busy || typing ? "schreibt …" : "Online — antwortet sofort";

  return (
    <div className="relative flex h-dvh flex-col bg-bg">
      <Header
        status={status}
        active={busy || typing}
        canGoBack={canGoBack}
        busy={busy}
        account={account}
        onBack={() => {
          setAtBottom(true);
          void send({ back: true });
        }}
        onReset={() => {
          setAtBottom(true);
          void send({ reset: true });
        }}
      />

      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="scroll-slim relative flex-1 overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-1 px-4 py-6 sm:px-6">
          {!loaded && <Skeleton />}

          {messages.map((message, index) => {
            if (message.role === "system") return null;
            const previous = messages[index - 1];
            const startsRun = !previous || previous.role !== message.role;
            return (
              <Bubble
                key={index}
                message={message}
                startsRun={startsRun}
                onImage={setLightbox}
              />
            );
          })}

          {typing && <TypingBubble />}
          <div ref={bottomRef} className="h-2" />
        </div>
      </div>

      <Composer
        showJump={!atBottom}
        onJump={() => {
          setAtBottom(true);
          scrollToBottom();
        }}
        choices={choices}
        onChoose={choose}
        draft={draft}
        setDraft={setDraft}
        onSubmit={submit}
        busy={busy}
        error={error}
        inputRef={inputRef}
      />

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ Header */

function Header({
  status,
  active,
  canGoBack,
  busy,
  account,
  onBack,
  onReset,
}: {
  status: string;
  active: boolean;
  canGoBack: boolean;
  busy: boolean;
  account: ChatAccount | null;
  onBack: () => void;
  onReset: () => void;
}) {
  return (
    <header className="z-10 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
        <Logo />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[15px] font-semibold tracking-tight text-ink">
            Lebenplus
          </h1>
          <p className="flex items-center gap-1.5 truncate text-xs text-muted">
            <span
              className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 ${
                active ? "" : "animate-ring"
              }`}
            />
            {status}
          </p>
        </div>

        <IconButton label="Einen Schritt zurück" onClick={onBack} disabled={!canGoBack || busy}>
          <ArrowLeft />
        </IconButton>
        <IconButton label="Gespräch neu starten" onClick={onReset} disabled={busy}>
          <Refresh />
        </IconButton>
        <Link
          href="/gruppen"
          title="Chatgruppen"
          aria-label="Chatgruppen"
          className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink"
        >
          <Users />
        </Link>
        <AccountLink account={account} />
      </div>
    </header>
  );
}

/** Anmelden bzw. Konto — normale Navigation, der Chatverlauf bleibt erhalten. */
function AccountLink({ account }: { account: ChatAccount | null }) {
  if (!account) {
    return (
      <a
        href="/login"
        className="ml-1 rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-accent-fg transition hover:bg-accent-hover"
      >
        Anmelden
      </a>
    );
  }
  const label = account.premium ? `Konto (Premium): ${account.email}` : `Konto: ${account.email}`;
  return (
    <a
      href="/konto"
      title={label}
      aria-label={label}
      className="relative grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink"
    >
      <User />
      {account.premium && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-surface" />
      )}
    </a>
  );
}

function Logo() {
  return (
    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-[13px] font-bold text-accent-fg shadow-[var(--shadow-sm)]">
      L+
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------- Nachricht */

function Bubble({
  message,
  startsRun,
  onImage,
}: {
  message: OutMessage;
  startsRun: boolean;
  onImage: (src: string) => void;
}) {
  const isUser = message.role === "user";
  const text = "text" in message ? message.text : "";
  const image = "image" in message ? message.image : undefined;

  return (
    <div
      className={`animate-msg flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"} ${
        startsRun ? "mt-3" : "mt-0.5"
      }`}
    >
      {!isUser && (
        <div className="w-7 shrink-0">
          {startsRun && (
            <div className="grid h-7 w-7 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-fg">
              L+
            </div>
          )}
        </div>
      )}

      <div
        className={[
          "max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed sm:max-w-[78%]",
          isUser
            ? "rounded-2xl rounded-br-md bg-bubble-user text-bubble-user-text shadow-[var(--shadow-sm)]"
            : "rounded-2xl rounded-bl-md border border-line bg-bubble-bot text-bubble-bot-text shadow-[var(--shadow-sm)]",
        ].join(" ")}
      >
        {image && (
          <button
            type="button"
            onClick={() => onImage(image)}
            className="mb-2 block w-full overflow-hidden rounded-xl border border-line/60 transition hover:opacity-95"
            aria-label="Bild vergrößern"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" loading="lazy" className="block max-h-72 w-full object-cover" />
          </button>
        )}
        {text && <RichText text={text} inverted={isUser} />}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="animate-fade mt-3 flex items-end gap-2">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-fg">
        L+
      </div>
      <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-line bg-bubble-bot px-4 py-3.5 shadow-[var(--shadow-sm)]">
        {[0, 180, 360].map((delay) => (
          <span
            key={delay}
            style={{ animationDelay: `${delay}ms` }}
            className="animate-dot h-1.5 w-1.5 rounded-full bg-faint"
          />
        ))}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-3 py-4">
      {[64, 40, 72].map((width, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="h-7 w-7 shrink-0 rounded-full bg-surface-2" />
          <div
            className="h-10 animate-pulse rounded-2xl rounded-bl-md bg-surface-2"
            style={{ width: `${width}%` }}
          />
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- Composer */

function Composer({
  choices,
  onChoose,
  draft,
  setDraft,
  onSubmit,
  busy,
  error,
  inputRef,
  showJump,
  onJump,
}: {
  choices: Choices | null;
  onChoose: (index: number, button: { label: string; url?: string }) => void;
  draft: string;
  setDraft: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  busy: boolean;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  showJump: boolean;
  onJump: () => void;
}) {
  return (
    <div className="relative z-10 border-t border-line bg-surface/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      {showJump && (
        <button
          type="button"
          onClick={onJump}
          aria-label="Zum neuesten Beitrag springen"
          className="animate-fade absolute -top-12 left-1/2 z-20 -translate-x-1/2 rounded-full border border-line bg-surface p-2.5 text-muted shadow-[var(--shadow-md)] transition hover:text-ink"
        >
          <ArrowDown />
        </button>
      )}
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        {error && (
          <p className="animate-fade mt-3 rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-700 dark:bg-red-950/60 dark:text-red-300">
            {error}
          </p>
        )}

        {choices && (
          <div className="flex flex-wrap gap-2 pt-3">
            {choices.buttons.map((button, index) => {
              const shared = [
                "animate-pop inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition",
                busy ? "pointer-events-none opacity-50" : "",
              ];
              const delay = { animationDelay: `${Math.min(index * 35, 350)}ms` };

              // Externe Ziele sind echte Links: Popup-Blocker, Mittelklick und
              // "Link kopieren" funktionieren damit wie erwartet. Eigene Seiten
              // (Login, Konto) oeffnen im selben Tab, der Verlauf bleibt ja erhalten.
              const internal = button.url?.startsWith("/");
              return button.url ? (
                <a
                  key={index}
                  href={normaliseUrl(button.url)}
                  target={internal ? undefined : "_blank"}
                  rel={internal ? undefined : "noopener noreferrer"}
                  onClick={() => onChoose(index, button)}
                  style={delay}
                  className={[
                    ...shared,
                    "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent",
                  ].join(" ")}
                >
                  {button.label}
                  {!internal && <ExternalLink />}
                </a>
              ) : (
                <button
                  key={index}
                  type="button"
                  disabled={busy}
                  onClick={() => onChoose(index, button)}
                  style={delay}
                  className={[
                    ...shared,
                    "bg-accent-soft text-accent hover:bg-accent hover:text-accent-fg",
                  ].join(" ")}
                >
                  {button.label}
                </button>
              );
            })}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex items-center gap-2 py-3">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={busy}
            placeholder={choices ? "… oder frei schreiben" : "Nachricht schreiben …"}
            enterKeyHint="send"
            className="min-w-0 flex-1 rounded-full border border-line bg-surface-2 px-4 py-2.5 text-[15px] text-ink placeholder:text-faint transition focus:border-accent focus:bg-surface focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label="Senden"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition hover:bg-accent-hover disabled:opacity-35"
          >
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Lightbox */

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="animate-fade fixed inset-0 z-50 grid place-items-center bg-black/80 p-6 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        aria-label="Schließen"
        className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <Close />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-xl shadow-[var(--shadow-lg)]"
      />
    </div>
  );
}

function normaliseUrl(url: string): string {
  if (/^https?:\/\//i.test(url) || url.startsWith("/")) return url;
  if (/^[\w.+-]+@/.test(url)) return `mailto:${url}`;
  return `https://${url}`;
}
