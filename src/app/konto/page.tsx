import Link from "next/link";
import { redirect } from "next/navigation";
import AccountShell, { Notice, primaryButton, secondaryButton } from "@/components/AccountShell";
import { currentUser } from "@/lib/auth/session";
import { isPremium, stripeEnabled } from "@/lib/billing";

export const metadata = { title: "Dein Konto — Lebenplus" };

const ERRORS: Record<string, string> = {
  checkout: "Die Zahlungsseite konnte nicht geöffnet werden. Bitte versuch es gleich nochmal.",
  portal: "Die Abo-Verwaltung ist gerade nicht erreichbar. Bitte versuch es später nochmal.",
};

export default async function AccountPage({ searchParams }: PageProps<"/konto">) {
  const params = await searchParams;
  const user = await currentUser();
  if (!user) redirect("/login?next=/konto");

  // Direkt nach dem Bezahlen am Cache vorbei bei Stripe nachfragen.
  const justPaid = params.bezahlt === "1";
  const premium = await isPremium(user, { force: justPaid });
  const error = typeof params.fehler === "string" ? ERRORS[params.fehler] : null;

  return (
    <AccountShell title="Dein Konto">
      <p className="text-xs font-medium uppercase tracking-wide text-faint">Angemeldet als</p>
      <p className="mt-0.5 mb-6 truncate text-[15px] font-medium text-ink">{user.email}</p>

      {error && <Notice tone="error">{error}</Notice>}
      {params.simulation === "1" && (
        <Notice>
          Stripe ist noch nicht eingerichtet (Simulationsmodus). Zum Testen gilt jede Adresse auf <code>@test.*</code> als
          zahlend.
        </Notice>
      )}
      {justPaid && !premium && (
        <Notice>
          Danke! Deine Zahlung wird noch verarbeitet. Lade die Seite in einem Moment neu, dann ist dein Zugang aktiv.
        </Notice>
      )}

      {premium ? (
        <>
          <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <strong className="block text-[15px]">Premium aktiv ✅</strong>
            Du hast Zugriff auf alle Inhalte im Chat.
          </div>
          <Link href="/" className={primaryButton}>
            Zum Chat
          </Link>
          <Link href="/gruppen" className={`${secondaryButton} mt-3`}>
            Zu den Chatgruppen
          </Link>
          {stripeEnabled() && user.stripeCustomerId && (
            <form action="/api/billing/portal" method="post" className="mt-3">
              <button type="submit" className={secondaryButton}>
                Abo verwalten
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          <div className="mb-6 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
            <strong className="block text-[15px] text-ink">Noch kein aktives Abo</strong>
            Mit einem Abo schaltest du alle Mitgliederinhalte im Chat frei, zum Beispiel den Bewilligungsguide, die Netzwerk-Events, die persönliche Beratung und die Chatgruppen der Community.
          </div>
          <form action="/api/billing/checkout" method="post">
            <button type="submit" className={primaryButton}>
              Premium freischalten
            </button>
          </form>
          <p className="mt-3 text-xs text-faint">
            Schon bezahlt, zum Beispiel über Telegram? Dann melde dich mit derselben E-Mail-Adresse an, die du beim
            Bezahlen angegeben hast.
          </p>
        </>
      )}

      <form action="/api/auth/logout" method="post" className="mt-8 border-t border-line pt-5 text-center">
        <button type="submit" className="text-sm text-muted hover:text-ink">
          Abmelden
        </button>
      </form>
    </AccountShell>
  );
}
