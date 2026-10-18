import { cookies } from "next/headers";
import { GOOGLE_STATE_COOKIE, googleEnabled, startGoogleLogin } from "@/lib/auth/google";
import { seeOther, withQuery } from "@/lib/auth/redirect";
import { appUrl, safeNext, secureCookies } from "@/lib/auth/session";

export const runtime = "nodejs";

/** Leitet zu Google weiter; state, PKCE-Verifier und Ziel merkt sich ein Cookie. */
export async function GET(request: Request) {
  const next = safeNext(new URL(request.url).searchParams.get("next"));
  if (!googleEnabled()) return seeOther(withQuery("/login", { fehler: "google", next }));

  const { url, state, verifier } = startGoogleLogin(appUrl(request));
  (await cookies()).set(GOOGLE_STATE_COOKIE, JSON.stringify({ state, verifier, next }), {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies(),
    maxAge: 10 * 60,
    path: "/api/auth/google",
  });
  return seeOther(url);
}
