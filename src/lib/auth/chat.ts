import type { Session } from "../flow/types";
import { ACCOUNT_FIELD, PAYWALL_FIELD } from "../flow/flows";
import { isPremium } from "../billing";
import { currentUser } from "./session";

/**
 * Felder, die das angemeldete Konto in die Chat-Session schreibt.
 *
 * Wird vor jeder Eingabe neu gesetzt, damit die Paywall-Bedingungen der Flows
 * immer den aktuellen Stand sehen: nach dem Login, nach dem Bezahlen, nach
 * dem Abmelden. Ohne Konto ist der Premiumzweig zu — egal, was vorher in der
 * Session stand.
 */
export async function accountFields(): Promise<Session["fields"]> {
  const user = await currentUser();
  if (!user) return { [ACCOUNT_FIELD]: null, [PAYWALL_FIELD]: false };
  return {
    [ACCOUNT_FIELD]: user.email,
    email: user.email,
    [PAYWALL_FIELD]: await isPremium(user),
  };
}

export function withAccount(session: Session, fields: Session["fields"]): Session {
  return { ...session, fields: { ...session.fields, ...fields } };
}
