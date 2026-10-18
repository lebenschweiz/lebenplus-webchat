import Link from "next/link";
import AccountShell, { Notice, primaryButton } from "@/components/AccountShell";
import { currentUser } from "@/lib/auth/session";
import { isPremium } from "@/lib/billing";
import { GROUPS, groupAccess } from "@/lib/groups";

export const metadata = { title: "Chatgruppen — Lebenplus" };

export default async function GroupsPage() {
  const user = await currentUser();
  const premium = user ? await isPremium(user) : false;

  return (
    <AccountShell title="Chatgruppen">
      <p className="mb-5 text-sm text-muted">
        Tausch dich mit anderen aus, die denselben Weg in die Schweiz gehen. Die Gruppen ersetzen die bisherigen
        Telegram-Gruppen.
      </p>
      {!user && (
        <>
          <Notice>Für die Gruppen musst du angemeldet sein.</Notice>
          <Link href="/login?next=/gruppen" className={`${primaryButton} mb-6`}>
            Anmelden
          </Link>
        </>
      )}
      <ul className="flex flex-col gap-2">
        {GROUPS.map((group) => {
          const access = groupAccess(group, user, premium);
          return (
            <li key={group.slug}>
              <Link
                href={`/gruppen/${group.slug}`}
                className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 transition hover:border-accent"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-ink">{group.name}</p>
                  <p className="truncate text-xs text-muted">{group.description}</p>
                </div>
                {access === "premium" && (
                  <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted">mit Abo</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </AccountShell>
  );
}
