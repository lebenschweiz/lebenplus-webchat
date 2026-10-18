import { savePremium, type User } from "./auth/accounts";

/**
 * Entscheidet, wer zahlender Kunde ist, und startet den Kauf.
 *
 * Quelle der Wahrheit ist Stripe: ein Konto ist Premium, solange zu seiner
 * E-Mail-Adresse ein aktives Abo existiert. Damit zaehlen auch Abos, die
 * bisher ueber den Telegram-Zahlungsbot abgeschlossen wurden — vorausgesetzt,
 * der Kunde meldet sich hier mit derselben Adresse an.
 *
 * Stripe wird direkt per REST angesprochen (fetch, keine Dependency). Ohne
 * STRIPE_SECRET_KEY laeuft der Simulationsmodus: jede Adresse auf @test.*
 * gilt als zahlend.
 */

/** So lange gilt ein abgefragter Status, bevor Stripe erneut gefragt wird. */
const CACHE_MS = 10 * 60 * 1000;

/** Abo-Status, die Zugriff geben. `past_due`: Zahlung haengt, Stripe versucht es noch. */
const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"]);

export function stripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Von Hand freigeschaltete Adressen, z. B. fuer Team oder Sonderfaelle. */
function allowlisted(email: string): boolean {
  return (process.env.PREMIUM_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}

async function stripe<T>(path: string, init: { method?: string; body?: URLSearchParams } = {}): Promise<T> {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      ...(init.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init.body,
  });
  const data = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) throw new Error(`Stripe ${path}: ${data.error?.message ?? response.status}`);
  return data;
}

interface StripeList<T> {
  data: T[];
}

/** Fragt Stripe nach einem aktiven Abo zu dieser Adresse. */
async function lookupStripe(email: string): Promise<{ active: boolean; customerId: string | null }> {
  // Pro Checkout kann ein eigener Customer entstehen — alle zur Adresse pruefen.
  // Der Listen-Filter vergleicht exakt (Gross-/Kleinschreibung); die Suche
  // nicht, hinkt aber neuen Kunden etwas hinterher. Daher erst exakt, dann suchen.
  let customers = await stripe<StripeList<{ id: string }>>(
    `customers?${new URLSearchParams({ email, limit: "20" })}`,
  );
  if (customers.data.length === 0) {
    customers = await stripe<StripeList<{ id: string }>>(
      `customers/search?${new URLSearchParams({ query: `email:'${email.replace(/'/g, "\\'")}'`, limit: "20" })}`,
    );
  }
  for (const customer of customers.data) {
    const subs = await stripe<StripeList<{ status: string }>>(
      `subscriptions?${new URLSearchParams({ customer: customer.id, status: "all", limit: "20" })}`,
    );
    if (subs.data.some((s) => ACTIVE_STATUSES.has(s.status))) {
      return { active: true, customerId: customer.id };
    }
  }
  return { active: false, customerId: customers.data[0]?.id ?? null };
}

/**
 * Hat dieses Konto Zugriff auf die Premiumfunktionen?
 * `force` umgeht den Cache, z. B. direkt nach dem Bezahlen.
 */
export async function isPremium(user: User, { force = false } = {}): Promise<boolean> {
  if (allowlisted(user.email)) return true;
  if (!stripeEnabled()) return /@test\./i.test(user.email);

  const fresh = user.premiumCheckedAt && Date.now() - Date.parse(user.premiumCheckedAt) < CACHE_MS;
  if (fresh && !force) return user.premium;

  try {
    const { active, customerId } = await lookupStripe(user.email);
    savePremium(user.id, active, customerId);
    return active;
  } catch (error) {
    // Stripe nicht erreichbar: lieber den letzten bekannten Stand als alle aussperren.
    console.error("Abo-Pruefung fehlgeschlagen:", error);
    return user.premium;
  }
}

/** Legt eine Stripe-Checkout-Session fuer das Abo an und liefert deren URL. */
export async function createCheckoutUrl(user: User, base: string): Promise<string> {
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!stripeEnabled() || !priceId) return `${base}/konto?simulation=1`;

  const body = new URLSearchParams({
    mode: "subscription",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    client_reference_id: user.id,
    success_url: `${base}/konto?bezahlt=1`,
    cancel_url: `${base}/konto`,
    allow_promotion_codes: "true",
  });
  // Bestehenden Customer weiterverwenden, sonst entsteht pro Kauf ein neuer.
  if (user.stripeCustomerId) body.set("customer", user.stripeCustomerId);
  else body.set("customer_email", user.email);

  const session = await stripe<{ url: string }>("checkout/sessions", { method: "POST", body });
  return session.url;
}

/** Stripe-Kundenportal: Zahlungsmittel aendern, Rechnungen, Kuendigen. */
export async function createPortalUrl(user: User, base: string): Promise<string | null> {
  if (!stripeEnabled() || !user.stripeCustomerId) return null;
  const session = await stripe<{ url: string }>("billing_portal/sessions", {
    method: "POST",
    body: new URLSearchParams({ customer: user.stripeCustomerId, return_url: `${base}/konto` }),
  });
  return session.url;
}
