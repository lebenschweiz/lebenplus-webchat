import { consumeLoginToken, upsertUser } from "@/lib/auth/accounts";
import { seeOther, withQuery } from "@/lib/auth/redirect";
import { safeNext, signIn } from "@/lib/auth/session";

export const runtime = "nodejs";

/**
 * Loest den Login-Link ein. Per POST aus der Bestaetigungsseite, nicht direkt
 * per GET aus der Mail: Virenscanner und Link-Vorschauen rufen Links in Mails
 * vorab auf und wuerden den einmaligen Token sonst verbrauchen.
 */
export async function POST(request: Request) {
  const form = await request.formData();
  const next = safeNext(form.get("next"));
  const email = consumeLoginToken(String(form.get("token") ?? ""));
  if (!email) return seeOther(withQuery("/login", { fehler: "link", next }));

  const user = upsertUser(email);
  await signIn(user.id);
  return seeOther(next);
}
