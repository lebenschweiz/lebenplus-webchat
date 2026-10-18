import { cookies } from "next/headers";
import { upsertUser } from "@/lib/auth/accounts";
import { finishGoogleLogin, GOOGLE_STATE_COOKIE } from "@/lib/auth/google";
import { seeOther, withQuery } from "@/lib/auth/redirect";
import { appUrl, safeNext, signIn } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const store = await cookies();
  const raw = store.get(GOOGLE_STATE_COOKIE)?.value;
  store.delete({ name: GOOGLE_STATE_COOKIE, path: "/api/auth/google" });

  let saved: { state?: string; verifier?: string; next?: string } = {};
  try {
    saved = raw ? JSON.parse(raw) : {};
  } catch {
    // ungueltiges Cookie -> wie fehlend behandeln
  }
  const next = safeNext(saved.next);
  const code = params.get("code");

  // state muss zum Cookie passen, sonst koennte ein fremder Code untergeschoben werden.
  if (!code || !saved.state || !saved.verifier || params.get("state") !== saved.state) {
    return seeOther(withQuery("/login", { fehler: "google", next }));
  }

  try {
    const profile = await finishGoogleLogin(appUrl(request), code, saved.verifier);
    const user = upsertUser(profile.email, { name: profile.name, googleSub: profile.sub });
    await signIn(user.id);
  } catch (error) {
    console.error("Google-Login fehlgeschlagen:", error);
    return seeOther(withQuery("/login", { fehler: "google", next }));
  }
  return seeOther(next);
}
