import { createPortalUrl } from "@/lib/billing";
import { seeOther, withQuery } from "@/lib/auth/redirect";
import { appUrl, currentUser } from "@/lib/auth/session";

export const runtime = "nodejs";

/** "Abo verwalten": weiter zum Stripe-Kundenportal. */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return seeOther(withQuery("/login", { next: "/konto" }));

  try {
    const url = await createPortalUrl(user, appUrl(request));
    return seeOther(url ?? withQuery("/konto", { fehler: "portal" }));
  } catch (error) {
    console.error("Kundenportal fehlgeschlagen:", error);
    return seeOther(withQuery("/konto", { fehler: "portal" }));
  }
}
