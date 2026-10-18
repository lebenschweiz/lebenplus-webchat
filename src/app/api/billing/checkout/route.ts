import { createCheckoutUrl } from "@/lib/billing";
import { seeOther, withQuery } from "@/lib/auth/redirect";
import { appUrl, currentUser } from "@/lib/auth/session";

export const runtime = "nodejs";

/** "Premium freischalten": weiter zum Stripe-Checkout. Nur angemeldet. */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return seeOther(withQuery("/login", { next: "/konto" }));

  try {
    return seeOther(await createCheckoutUrl(user, appUrl(request)));
  } catch (error) {
    console.error("Checkout fehlgeschlagen:", error);
    return seeOther(withQuery("/konto", { fehler: "checkout" }));
  }
}
