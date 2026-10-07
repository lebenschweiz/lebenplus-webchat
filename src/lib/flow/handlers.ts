import type { Action, Session } from "./types";
import type { ExternalContext } from "./engine";

/**
 * Handler fuer { type: "external" }-Actions.
 *
 * Ein Handler bekommt die Session und gibt Actions zurueck, die die Engine
 * anschliessend anwendet — so bleibt die Engine selbst frei von Fachlogik.
 *
 * TODO: Stripe ist hier bewusst nur simuliert. Zum Scharfschalten
 * `npm i stripe` und die beiden markierten Stellen ersetzen. Beides braucht
 * STRIPE_SECRET_KEY in .env.local.
 */
type Handler = (args: Record<string, unknown>, session: Session) => Promise<Action[]>;

const handlers: Record<string, Handler> = {
  /**
   * Prueft, ob zur E-Mail der Session ein aktives Abo existiert,
   * und schreibt das Ergebnis ins Custom Field ActiveSubscription.
   */
  "stripe:verify_subscription": async (_args, session) => {
    const email = session.fields.email;
    if (typeof email !== "string" || !email) {
      return [{ type: "set_field", field: "ActiveSubscription", value: false }];
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      // Simulation ohne Stripe-Key: jede Adresse auf @test.* gilt als zahlend,
      // damit sich beide Zweige des Flows lokal durchspielen lassen.
      const active = /@test\./i.test(email);
      return [{ type: "set_field", field: "ActiveSubscription", value: active }];
    }

    // TODO echtes Stripe:
    //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    //   const [customer] = (await stripe.customers.list({ email, limit: 1 })).data;
    //   const subs = customer
    //     ? await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 1 })
    //     : { data: [] };
    //   const active = subs.data.length > 0;
    return [{ type: "set_field", field: "ActiveSubscription", value: false }];
  },

  /** Legt eine Checkout-Session an und hinterlegt die URL als Custom Field. */
  "stripe:create_checkout": async (args, session) => {
    const email = typeof session.fields.email === "string" ? session.fields.email : undefined;
    const priceId = (args.priceId as string) ?? process.env.STRIPE_PRICE_ID;

    if (!process.env.STRIPE_SECRET_KEY || !priceId) {
      return [{ type: "set_field", field: "checkout_url", value: "https://example.com/checkout-simulation" }];
    }

    // TODO echtes Stripe:
    //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    //   const checkout = await stripe.checkout.sessions.create({
    //     mode: "subscription",
    //     line_items: [{ price: priceId, quantity: 1 }],
    //     customer_email: email,
    //     success_url: `${process.env.APP_URL}/?paid=1`,
    //     cancel_url: `${process.env.APP_URL}/`,
    //   });
    //   return [{ type: "set_field", field: "checkout_url", value: checkout.url! }];
    void email;
    return [{ type: "set_field", field: "checkout_url", value: "https://example.com/checkout-simulation" }];
  },
};

export const externalContext: ExternalContext = {
  async run(handler, args, session) {
    const fn = handlers[handler];
    if (!fn) {
      console.warn(`Unbekannter external-Handler: ${handler}`);
      return [];
    }
    try {
      return await fn(args, session);
    } catch (error) {
      console.error(`Handler ${handler} fehlgeschlagen:`, error);
      return [];
    }
  },
};
