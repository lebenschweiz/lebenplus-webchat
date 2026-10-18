import { authorizeGroup, denied } from "@/lib/auth/group";
import { addMessage, MAX_MESSAGE_LENGTH, tooFast } from "@/lib/groups";

export const runtime = "nodejs";

/** Neue Nachricht in die Gruppe schreiben. Verteilt wird sie ueber den Stream. */
export async function POST(request: Request, ctx: RouteContext<"/api/gruppen/[slug]/nachrichten">) {
  const { slug } = await ctx.params;
  const { group, user, access } = await authorizeGroup(slug);
  const error = denied(group, access);
  if (error || !group || !user) return error!;
  if (!user.name) return Response.json({ error: "Bitte leg zuerst deinen Anzeigenamen fest." }, { status: 400 });

  const body = (await request.json().catch(() => null)) as { text?: unknown } | null;
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) return Response.json({ error: "Die Nachricht ist leer." }, { status: 400 });
  if (text.length > MAX_MESSAGE_LENGTH) {
    return Response.json({ error: `Maximal ${MAX_MESSAGE_LENGTH} Zeichen.` }, { status: 400 });
  }
  if (tooFast(user.id)) return Response.json({ error: "Nicht so schnell — warte kurz." }, { status: 429 });

  return Response.json({ message: addMessage(group.slug, user, text) });
}
