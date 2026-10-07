import type { Flow } from "./types";
import { generatedFlows } from "./flows.generated";

/**
 * Die Flows stammen 1:1 aus der ManyChat-Automation und werden von
 * `scripts/convert-manychat.mjs` aus den Dumps in data/manychat/ erzeugt.
 *
 * Diese Datei ist der Ort für Anpassungen, die im Web-Chat nötig sind und
 * im Original keine Entsprechung haben — sie überschreiben gezielt einzelne
 * Stellen, ohne die generierte Datei anzufassen.
 */

/** Im Original prüft die Paywall ein Feld, das Telegram/Stripe setzt. */
export const PAYWALL_FIELD = "ActiveSubscription";

export const flows: Flow[] = [...generatedFlows];
