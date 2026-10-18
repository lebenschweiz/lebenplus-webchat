import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AccountShell, { Notice, primaryButton } from "@/components/AccountShell";
import GroupChat from "@/components/GroupChat";
import { MAX_NAME_LENGTH } from "@/lib/auth/accounts";
import { authorizeGroup } from "@/lib/auth/group";
import { isModerator, recentMessages } from "@/lib/groups";

export default async function GroupPage({ params, searchParams }: PageProps<"/gruppen/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;
  const { group, user, access } = await authorizeGroup(slug);
  if (!group) notFound();
  const path = `/gruppen/${group.slug}`;
  if (access === "login" || !user) redirect(`/login?next=${encodeURIComponent(path)}`);

  if (access === "premium") {
    return (
      <AccountShell title={group.name}>
        <p className="mb-5 text-sm text-muted">
          Die Gruppe <strong className="text-ink">{group.name}</strong> ist für Lebenplus-Mitglieder mit Abo.
        </p>
        <Link href="/konto" className={primaryButton}>
          Abo abschließen
        </Link>
      </AccountShell>
    );
  }

  // Ohne Google-Login fehlt der Name; in der Gruppe soll niemand seine E-Mail zeigen muessen.
  if (!user.name) {
    return (
      <AccountShell title={group.name}>
        {query.fehler === "name" && <Notice tone="error">Der Name muss 2 bis {MAX_NAME_LENGTH} Zeichen lang sein.</Notice>}
        <p className="mb-5 text-sm text-muted">
          Wie sollen dich die anderen in den Gruppen sehen? Deine E-Mail-Adresse bleibt privat.
        </p>
        <form action="/api/konto/name" method="post" className="flex flex-col gap-3">
          <input type="hidden" name="next" value={path} />
          <input
            name="name"
            required
            minLength={2}
            maxLength={MAX_NAME_LENGTH}
            autoComplete="nickname"
            placeholder="Vorname oder Spitzname"
            className="rounded-full border border-line-strong bg-surface px-4 py-2.5 text-[15px] text-ink outline-none focus:border-accent"
          />
          <button type="submit" className={primaryButton}>
            Weiter zur Gruppe
          </button>
        </form>
      </AccountShell>
    );
  }

  return (
    <GroupChat
      group={{ slug: group.slug, name: group.name, description: group.description }}
      initialMessages={recentMessages(group.slug)}
      me={{ id: user.id, moderator: isModerator(user) }}
    />
  );
}
