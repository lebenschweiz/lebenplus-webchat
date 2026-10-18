import Link from "next/link";

/**
 * Rahmen fuer Login- und Kontoseite: gleiche Farben und Kopfzeile wie der
 * Chat, damit der Wechsel nicht wie eine fremde Seite wirkt.
 */
export default function AccountShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="border-b border-line bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-[13px] font-bold text-accent-fg shadow-[var(--shadow-sm)]"
            aria-label="Zurück zum Chat"
          >
            L+
          </Link>
          <h1 className="flex-1 truncate text-[15px] font-semibold tracking-tight text-ink">{title}</h1>
          <Link href="/" className="text-sm font-medium text-accent hover:text-accent-hover">
            Zum Chat
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-8 sm:py-12">
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-md)] sm:p-8">{children}</div>
      </main>
    </div>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "error" | "success"; children: React.ReactNode }) {
  const styles = {
    info: "bg-accent-soft text-ink",
    error: "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300",
    success: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  }[tone];
  return <p className={`mb-5 rounded-lg px-3 py-2.5 text-sm ${styles}`}>{children}</p>;
}

export const primaryButton =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover";
export const secondaryButton =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:text-accent";
