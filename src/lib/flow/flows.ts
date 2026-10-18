import type { Button, Flow, Node } from "./types";
import { generatedFlows } from "./flows.generated";

/**
 * Die Flows stammen 1:1 aus der ManyChat-Automation und werden von
 * `scripts/convert-manychat.mjs` aus den Dumps in data/manychat/ erzeugt.
 *
 * Diese Datei ist der Ort für Anpassungen, die im Web-Chat nötig sind und
 * im Original keine Entsprechung haben — sie überschreiben gezielt einzelne
 * Stellen, ohne die generierte Datei anzufassen.
 */

/**
 * Im Original prüft die Paywall ein Feld, das Telegram/Stripe setzt. Hier
 * schreibt es die Chat-Route bei jeder Eingabe aus dem angemeldeten Konto,
 * siehe `accountFields` in lib/auth/chat.ts.
 */
export const PAYWALL_FIELD = "ActiveSubscription";

/** E-Mail des angemeldeten Kontos; ersetzt im Web-Chat die Telegram-ID. */
export const ACCOUNT_FIELD = "_accountEmail";

const VERIFY_FLOW = "content20251123151913_895281"; // GW_Verify_Subscription
const VERIFY_SUCCESS_NODE = "25748c95-748f-4dd3-9ecf-68d65d22b655";
const VERIFY_UNKNOWN_NODE = "1814af77-2ec3-4829-9b42-ae12dcc0581a";
const MAIN_MENU: { flow: string; node: string } = { flow: "tg_welcome", node: "e3782805-c16a-4fbc-844b-0fe61078a0c3" };

/** Telegram-Zahlungsbot aus dem Original; im Web übernimmt das die Kontoseite. */
const PAYMENT_BOT_URL = "https://t.me/lebenplus_bot";
const ACCOUNT_PAGE = "/konto";

const PAYWALL_TEXT =
  "Dieser Bereich ist für Lebenplus-Mitglieder.\n" +
  "Melde dich an und schließ dein Abo ab — oder verlängere es, falls es ausgelaufen ist.\n" +
  "Danach kannst du hier direkt nochmal prüfen.";

/** Fragt Stripe sofort neu ab (statt des Caches) und springt in die Abo-Prüfung. */
const CHECK_ACCESS: Button = {
  label: "Zugriff prüfen",
  actions: [{ type: "external", handler: "stripe:verify_subscription" }],
  goto: { flow: VERIFY_FLOW },
};

function patchButton(button: Button): Button {
  if (button.url === PAYMENT_BOT_URL) return { label: "Anmelden & Abo", url: ACCOUNT_PAGE };
  // Im Original springt "Zugriff prüfen" per "Start Automation" in die Abo-Prüfung;
  // das Ziel fehlt im Export und wird hier direkt gesetzt.
  if (button.label === "Zugriff prüfen") return CHECK_ACCESS;
  return button;
}

function patchNode(flowId: string, node: Node): Node {
  if (flowId === VERIFY_FLOW) {
    // Wer zugeordnet werden kann, entscheidet hier das Konto statt der Telegram-ID.
    if (node.type === "condition" && node.if.type === "field_set" && node.if.field === "TG_ID") {
      return { ...node, if: { type: "field_set", field: ACCOUNT_FIELD } };
    }
    if (node.id === VERIFY_UNKNOWN_NODE) {
      return {
        id: node.id,
        type: "message",
        text: "Dafür musst du angemeldet sein. Melde dich mit deiner E-Mail-Adresse oder deinem Google-Konto an — danach kannst du hier direkt nochmal prüfen.",
        buttons: [
          { label: "Anmelden", url: "/login" },
          CHECK_ACCESS,
        ],
        next: null,
      };
    }
    if (node.id === VERIFY_SUCCESS_NODE) {
      return {
        id: node.id,
        type: "message",
        text: "Dein Abo ist aktiv ✅ Du hast Zugriff auf alle Inhalte.",
        buttons: [{ label: "Zum Hauptmenü", goto: MAIN_MENU }],
        next: null,
      };
    }
  }

  if (node.type === "message" && node.buttons?.some((b) => b.url === PAYMENT_BOT_URL)) {
    return { ...node, text: PAYWALL_TEXT, buttons: node.buttons.map(patchButton) };
  }
  if (node.type === "message" && node.buttons) {
    return { ...node, buttons: node.buttons.map(patchButton) };
  }
  return node;
}

export const flows: Flow[] = generatedFlows.map((flow) => ({
  ...flow,
  nodes: flow.nodes.map((node) => patchNode(flow.id, node)),
}));
