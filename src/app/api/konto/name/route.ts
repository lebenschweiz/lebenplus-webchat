import { seeOther, withQuery } from "@/lib/auth/redirect";
import { setUserName } from "@/lib/auth/accounts";
import { currentUser, safeNext } from "@/lib/auth/session";

export const runtime = "nodejs";

/** Anzeigenamen fuer die Gruppenchats festlegen (Formular, kein JS noetig). */
export async function POST(request: Request) {
  const form = await request.formData();
  const next = safeNext(form.get("next"));
  const user = await currentUser();
  if (!user) return seeOther(withQuery("/login", { next }));

  const name = form.get("name");
  if (typeof name !== "string" || !setUserName(user.id, name)) {
    return seeOther(withQuery(next, { fehler: "name" }));
  }
  return seeOther(next);
}
