import type { User } from "./accounts";
import { currentUser } from "./session";
import { isPremium } from "../billing";
import { getGroup, groupAccess, type Group, type GroupAccess } from "../groups";

/** Wer gerade anfragt und ob er in diese Gruppe darf. */
export async function authorizeGroup(
  slug: string,
): Promise<{ group: Group | null; user: User | null; access: GroupAccess }> {
  const group = getGroup(slug);
  const user = await currentUser();
  if (!group) return { group, user, access: "login" };
  const premium = user && group.premium ? await isPremium(user) : false;
  return { group, user, access: groupAccess(group, user, premium) };
}

/** Einheitliche Fehlerantwort der Gruppen-API. */
export function denied(group: Group | null, access: GroupAccess): Response | null {
  if (!group) return Response.json({ error: "Diese Gruppe gibt es nicht." }, { status: 404 });
  if (access === "login") return Response.json({ error: "Bitte melde dich an." }, { status: 401 });
  if (access === "premium") return Response.json({ error: "Diese Gruppe ist für Mitglieder mit Abo." }, { status: 403 });
  return null;
}
