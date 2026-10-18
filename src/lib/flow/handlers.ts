import type { Action, Session } from "./types";
import type { ExternalContext } from "./engine";
import { ACCOUNT_FIELD, PAYWALL_FIELD } from "./flows";
import { getUserByEmail } from "../auth/accounts";
import { isPremium } from "../billing";

/**
 * Handler fuer { type: "external" }-Actions.
 *
 * Ein Handler bekommt die Session und gibt Actions zurueck, die die Engine
 * anschliessend anwendet — so bleibt die Engine selbst frei von Fachlogik.
 */
type Handler = (args: Record<string, unknown>, session: Session) => Promise<Action[]>;

const handlers: Record<string, Handler> = {
  /**
   * Prueft das Abo des angemeldeten Kontos sofort bei Stripe nach (am Cache
   * vorbei) und schreibt das Ergebnis ins Custom Field ActiveSubscription.
   *
   * Massgeblich ist nur das Konto, nie eine im Chat eingetippte Adresse:
   * sonst koennte jeder mit der E-Mail eines zahlenden Kunden freischalten.
   */
  "stripe:verify_subscription": async (_args, session) => {
    const email = session.fields[ACCOUNT_FIELD];
    const user = typeof email === "string" && email ? getUserByEmail(email) : null;
    const active = user ? await isPremium(user, { force: true }) : false;
    return [{ type: "set_field", field: PAYWALL_FIELD, value: active }];
  },

  /** Der Kauf laeuft ueber die Kontoseite, dort ist das Konto bekannt. */
  "stripe:create_checkout": async () => [{ type: "set_field", field: "checkout_url", value: "/konto" }],
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
