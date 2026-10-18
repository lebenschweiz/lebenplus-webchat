import { createLoginToken, isValidEmail, normaliseEmail, recentLoginTokens } from "@/lib/auth/accounts";
import { sendLoginMail } from "@/lib/auth/mail";
import { seeOther, withQuery } from "@/lib/auth/redirect";
import { appUrl, safeNext } from "@/lib/auth/session";

export const runtime = "nodejs";

/** Formular "Login-Link schicken": legt einen Token an und verschickt die Mail. */
export async function POST(request: Request) {
  const form = await request.formData();
  const email = normaliseEmail(String(form.get("email") ?? ""));
  const next = safeNext(form.get("next"));

  if (!isValidEmail(email)) {
    return seeOther(withQuery("/login", { fehler: "email", next }));
  }
  // Schutz vor Mail-Bombing einer fremden Adresse.
  if (recentLoginTokens(email, 10 * 60 * 1000) >= 3) {
    return seeOther(withQuery("/login", { fehler: "zuoft", next }));
  }

  try {
    const token = createLoginToken(email);
    const link = withQuery(`${appUrl(request)}/login/bestaetigen`, { token, next });
    await sendLoginMail(email, link);
  } catch (error) {
    console.error("Login-Mail fehlgeschlagen:", error);
    return seeOther(withQuery("/login", { fehler: "versand", next }));
  }

  return seeOther(withQuery("/login", { gesendet: email, next }));
}
