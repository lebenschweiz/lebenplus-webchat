/**
 * Datenmodell der Flow-Engine.
 *
 * Bildet die ManyChat-Primitive 1:1 ab, damit das Übertragen bestehender
 * Flows reines Übersetzen ist und keine Umstrukturierung erfordert:
 *
 *   ManyChat            ->  hier
 *   Flow                ->  Flow
 *   Step / Content-Node ->  Node ("message")
 *   Button / Quick Reply->  Button
 *   User Input          ->  Node ("ask")
 *   Condition           ->  Node ("condition")
 *   Action (Tag/Field)  ->  Node ("action") mit Action[]
 *   Smart Delay         ->  Node ("delay")
 *   Custom Field        ->  Session.fields
 *   Tag                 ->  Session.tags
 */

export type FieldValue = string | number | boolean | null;

/** Sprungziel. `flow` ohne `node` springt an den Entry-Punkt des Flows. */
export interface Target {
  flow?: string;
  node?: string;
}

export type Action =
  | { type: "add_tag"; tag: string }
  | { type: "remove_tag"; tag: string }
  /** `value: "$input"` übernimmt die letzte Nutzereingabe. */
  | { type: "set_field"; field: string; value: FieldValue | "$input" }
  | { type: "clear_field"; field: string }
  /** Ruft einen serverseitigen Handler auf (z. B. Stripe). Siehe lib/flow/handlers.ts */
  | { type: "external"; handler: string; args?: Record<string, unknown> };

export type Condition =
  | { type: "has_tag"; tag: string }
  | { type: "field_is"; field: string; value: FieldValue }
  | { type: "field_set"; field: string }
  | { type: "all"; of: Condition[] }
  | { type: "any"; of: Condition[] }
  | { type: "not"; of: Condition };

export interface Button {
  label: string;
  /** Aktionen laufen vor dem Sprung. */
  actions?: Action[];
  /** Externer Link statt Sprung (öffnet in neuem Tab, Konversation läuft weiter). */
  url?: string;
  goto?: Target;
}

export type Node =
  | {
      id: string;
      type: "message";
      /** Unterstützt {{feld}}-Interpolation aus Session.fields. */
      text: string;
      image?: string;
      /** Sind Buttons gesetzt, wartet die Engine auf eine Auswahl. */
      buttons?: Button[];
      next?: Target | null;
    }
  | {
      id: string;
      type: "ask";
      text: string;
      /** Custom Field, in das die Antwort geschrieben wird. */
      field: string;
      validate?: "text" | "email" | "number" | "phone";
      /** Wird bei fehlgeschlagener Validierung gesendet; danach erneut gefragt. */
      retryText?: string;
      next?: Target | null;
    }
  | { id: string; type: "condition"; if: Condition; then: Target | null; else: Target | null }
  | { id: string; type: "action"; actions: Action[]; next?: Target | null }
  | { id: string; type: "delay"; seconds: number; next?: Target | null }
  | { id: string; type: "end"; text?: string | null };

export interface Flow {
  id: string;
  name: string;
  /** ns des ManyChat-Originals — nur zur Nachverfolgbarkeit. */
  sourceNs?: string;
  entry: string;
  nodes: Node[];
  trigger?: {
    /** Startet den Flow bei exakter (case-insensitiver) Eingabe. */
    keywords?: string[];
    /** Flow beim ersten Öffnen des Chats (entspricht tg_welcome). */
    isWelcome?: boolean;
    /** Fallback bei unerkannter Eingabe (entspricht tg_default). */
    isDefault?: boolean;
  };
}

export interface Session {
  id: string;
  tags: string[];
  fields: Record<string, FieldValue>;
  /** Aktuelle Position; null = Konversation beendet oder noch nicht gestartet. */
  cursor: Target | null;
  /** Worauf die Engine gerade wartet. */
  awaiting: null | { kind: "buttons"; nodeId: string; flowId: string } | { kind: "text"; nodeId: string; flowId: string };
  createdAt: string;
  updatedAt: string;
}

/** Was im Chat gerendert wird. */
export type OutMessage =
  | { role: "bot"; kind: "text"; text: string; image?: string }
  | { role: "bot"; kind: "choices"; text: string; image?: string; buttons: { label: string; url?: string }[] }
  | { role: "user"; kind: "text"; text: string }
  | { role: "system"; kind: "notice"; text: string };
