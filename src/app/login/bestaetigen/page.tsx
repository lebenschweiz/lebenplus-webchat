import AccountShell, { primaryButton } from "@/components/AccountShell";
import { safeNext } from "@/lib/auth/session";

export const metadata = { title: "Anmeldung bestätigen — Lebenplus" };

/**
 * Ziel des Links aus der Login-Mail. Meldet noch nicht an, sondern zeigt einen
 * Button: Mail-Scanner rufen Links vorab auf und wuerden den einmaligen
 * Token sonst verbrauchen, bevor der Mensch klickt.
 */
export default async function ConfirmPage({ searchParams }: PageProps<"/login/bestaetigen">) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const next = safeNext(params.next);

  return (
    <AccountShell title="Anmelden">
      <h2 className="text-xl font-semibold tracking-tight text-ink">Fast geschafft</h2>
      <p className="mt-1.5 mb-6 text-sm text-muted">Ein Klick noch, dann bist du angemeldet.</p>
      <form action="/api/auth/verify" method="post">
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="next" value={next} />
        <button type="submit" className={primaryButton} autoFocus>
          Jetzt anmelden
        </button>
      </form>
    </AccountShell>
  );
}
