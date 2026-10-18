import { authorizeGroup, denied } from "@/lib/auth/group";
import { deleteMessage } from "@/lib/groups";

export const runtime = "nodejs";

/** Eigene Nachricht loeschen; Moderatoren (ADMIN_EMAILS) auch fremde. */
export async function DELETE(_request: Request, ctx: RouteContext<"/api/gruppen/[slug]/nachrichten/[id]">) {
  const { slug, id } = await ctx.params;
  const { group, user, access } = await authorizeGroup(slug);
  const error = denied(group, access);
  if (error || !group || !user) return error!;

  if (!deleteMessage(group.slug, Number(id), user)) {
    return Response.json({ error: "Diese Nachricht kannst du nicht löschen." }, { status: 403 });
  }
  return Response.json({ ok: true });
}
