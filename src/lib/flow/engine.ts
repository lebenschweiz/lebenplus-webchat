import type {
  Action,
  Button,
  Condition,
  FieldValue,
  Flow,
  Node,
  OutMessage,
  Session,
  Target,
} from "./types";

export interface ExternalContext {
  /** Handler fuer { type: "external" } — z. B. Stripe-Checkout oder Abo-Pruefung. */
  run(handler: string, args: Record<string, unknown>, session: Session): Promise<Action[]>;
}

export interface StepResult {
  session: Session;
  messages: OutMessage[];
}

/** Schutz gegen Zyklen in fehlerhaften Flow-Definitionen. */
const MAX_STEPS = 200;

export class FlowEngine {
  private flows = new Map<string, Flow>();

  constructor(flows: Flow[], private external?: ExternalContext) {
    for (const flow of flows) {
      if (this.flows.has(flow.id)) throw new Error(`Doppelte Flow-ID: ${flow.id}`);
      this.flows.set(flow.id, flow);
    }
  }

  get allFlows(): Flow[] {
    return [...this.flows.values()];
  }

  private flow(id: string): Flow {
    const found = this.flows.get(id);
    if (!found) throw new Error(`Unbekannter Flow: ${id}`);
    return found;
  }

  private node(flowId: string, nodeId: string): Node {
    const found = this.flow(flowId).nodes.find((n) => n.id === nodeId);
    if (!found) throw new Error(`Unbekannter Node: ${flowId}/${nodeId}`);
    return found;
  }

  /** Fuellt ein Target auf: fehlender Flow = aktueller, fehlender Node = Entry. */
  private resolve(target: Target | null | undefined, currentFlow: string): Target | null {
    if (!target) return null;
    const flowId = target.flow ?? currentFlow;
    const nodeId = target.node ?? this.flow(flowId).entry;
    return { flow: flowId, node: nodeId };
  }

  newSession(sessionId: string): Session {
    const now = new Date().toISOString();
    return {
      id: sessionId,
      tags: [],
      fields: {},
      cursor: null,
      awaiting: null,
      createdAt: now,
      updatedAt: now,
    };
  }

  /** Startet eine frische Session am Welcome-Flow. */
  start(sessionId: string): StepResult {
    const welcome = this.allFlows.find((f) => f.trigger?.isWelcome) ?? this.allFlows[0];
    return this.runFrom({ flow: welcome.id }, this.newSession(sessionId));
  }

  /**
   * Verarbeitet eine Nutzereingabe: Button-Klick (per Index) oder freier Text.
   * Wartet die Engine auf nichts, greifen Keyword- bzw. Default-Trigger.
   */
  async handleInput(
    session: Session,
    input: { text?: string; buttonIndex?: number },
  ): Promise<StepResult> {
    const awaiting = session.awaiting;

    if (awaiting?.kind === "buttons" && typeof input.buttonIndex === "number") {
      return this.handleButton(session, awaiting.flowId, awaiting.nodeId, input.buttonIndex);
    }

    const text = (input.text ?? "").trim();

    if (awaiting?.kind === "text") {
      return this.handleText(session, awaiting.flowId, awaiting.nodeId, text);
    }

    return this.handleLooseText(session, text);
  }

  private async handleButton(
    session: Session,
    flowId: string,
    nodeId: string,
    index: number,
  ): Promise<StepResult> {
    const node = this.node(flowId, nodeId);
    if (node.type !== "message" || !node.buttons) throw new Error("Node hat keine Buttons");
    const button: Button | undefined = node.buttons[index];
    if (!button) throw new Error("Ungueltiger Button-Index");

    const messages: OutMessage[] = [{ role: "user", kind: "text", text: button.label }];
    let next: Session = { ...session, awaiting: null };
    next = await this.applyActions(button.actions ?? [], next);

    // Reiner Link-Button ohne Sprungziel: Auswahl bleibt offen, Frage erneut anbieten.
    if (button.url && !button.goto) {
      return {
        session: { ...next, awaiting: session.awaiting },
        messages: [...messages, ...this.render(node, next)],
      };
    }

    const target = this.resolve(button.goto, flowId) ?? this.resolve(node.next, flowId);
    const result = this.runFrom(target, next);
    return { session: result.session, messages: [...messages, ...result.messages] };
  }

  private handleText(session: Session, flowId: string, nodeId: string, text: string): StepResult {
    const node = this.node(flowId, nodeId);
    if (node.type !== "ask") throw new Error("Node erwartet keinen Text");
    const messages: OutMessage[] = [{ role: "user", kind: "text", text }];

    if (!validate(text, node.validate ?? "text")) {
      const retry = node.retryText ?? "Das habe ich nicht verstanden. Bitte versuch es nochmal.";
      messages.push({ role: "bot", kind: "text", text: interpolate(retry, session) });
      messages.push(...this.render(node, session));
      return { session, messages };
    }

    const filled: Session = {
      ...session,
      awaiting: null,
      fields: { ...session.fields, [node.field]: coerce(text, node.validate) },
    };
    const result = this.runFrom(this.resolve(node.next, flowId), filled);
    return { session: result.session, messages: [...messages, ...result.messages] };
  }

  /** Keine offene Frage: Keyword-Trigger pruefen, sonst Default-Flow. */
  private handleLooseText(session: Session, text: string): StepResult {
    const messages: OutMessage[] = [{ role: "user", kind: "text", text }];
    const keyed = this.allFlows.find((f) =>
      f.trigger?.keywords?.some((k) => k.toLowerCase() === text.toLowerCase()),
    );
    const target = keyed ?? this.allFlows.find((f) => f.trigger?.isDefault);
    if (!target) {
      messages.push({ role: "system", kind: "notice", text: "Kein passender Flow gefunden." });
      return { session, messages };
    }
    const result = this.runFrom({ flow: target.id }, session);
    return { session: result.session, messages: [...messages, ...result.messages] };
  }

  /** Laeuft ab `target` durch, bis Eingabe noetig ist oder der Flow endet. */
  runFrom(target: Target | null, session: Session): StepResult {
    const messages: OutMessage[] = [];
    let cursor = target?.flow ? this.resolve(target, target.flow) : null;
    let current: Session = { ...session, cursor, awaiting: null };

    for (let step = 0; cursor && step < MAX_STEPS; step++) {
      const flowId = cursor.flow!;
      const node = this.node(flowId, cursor.node!);

      switch (node.type) {
        case "message": {
          messages.push(...this.render(node, current));
          if (node.buttons?.length) {
            return {
              session: touch({ ...current, cursor, awaiting: { kind: "buttons", flowId, nodeId: node.id } }),
              messages,
            };
          }
          cursor = this.resolve(node.next, flowId);
          break;
        }
        case "ask": {
          messages.push(...this.render(node, current));
          return {
            session: touch({ ...current, cursor, awaiting: { kind: "text", flowId, nodeId: node.id } }),
            messages,
          };
        }
        case "condition": {
          cursor = this.resolve(evaluate(node.if, current) ? node.then : node.else, flowId);
          break;
        }
        case "action": {
          // "external" braucht await und ist deshalb nur an Buttons erlaubt, nicht hier.
          current = applySync(node.actions, current);
          cursor = this.resolve(node.next, flowId);
          break;
        }
        case "delay": {
          // Im Web-Chat rein visuell: der Client zeigt so lange den Tipp-Indikator.
          messages.push({ role: "system", kind: "notice", text: `__typing:${node.seconds}` });
          cursor = this.resolve(node.next, flowId);
          break;
        }
        case "end": {
          if (node.text) messages.push({ role: "bot", kind: "text", text: interpolate(node.text, current) });
          cursor = null;
          break;
        }
      }
      current = { ...current, cursor };
    }

    return { session: touch({ ...current, cursor: null, awaiting: null }), messages };
  }

  private render(node: Node, session: Session): OutMessage[] {
    if (node.type === "message") {
      const text = interpolate(node.text, session);
      if (node.buttons?.length) {
        return [
          {
            role: "bot",
            kind: "choices",
            text,
            image: node.image,
            buttons: node.buttons.map((b) => ({ label: b.label, url: b.url })),
          },
        ];
      }
      return [{ role: "bot", kind: "text", text, image: node.image }];
    }
    if (node.type === "ask") {
      return [{ role: "bot", kind: "text", text: interpolate(node.text, session) }];
    }
    return [];
  }

  private async applyActions(actions: Action[], session: Session): Promise<Session> {
    let current = session;
    for (const action of actions) {
      if (action.type === "external") {
        if (!this.external) continue;
        current = applySync(await this.external.run(action.handler, action.args ?? {}, current), current);
      } else {
        current = applySync([action], current);
      }
    }
    return current;
  }
}

function applySync(actions: Action[], session: Session, lastInput?: string): Session {
  let tags = [...session.tags];
  const fields = { ...session.fields };

  for (const action of actions) {
    switch (action.type) {
      case "add_tag":
        if (!tags.includes(action.tag)) tags.push(action.tag);
        break;
      case "remove_tag":
        tags = tags.filter((t) => t !== action.tag);
        break;
      case "set_field":
        fields[action.field] = action.value === "$input" ? (lastInput ?? null) : action.value;
        break;
      case "clear_field":
        delete fields[action.field];
        break;
      case "external":
        // von applyActions aufgeloest
        break;
    }
  }
  return { ...session, tags, fields };
}

export function evaluate(condition: Condition, session: Session): boolean {
  switch (condition.type) {
    case "has_tag":
      return session.tags.includes(condition.tag);
    case "field_is":
      return session.fields[condition.field] === condition.value;
    case "field_set": {
      const value = session.fields[condition.field];
      return value !== undefined && value !== null && value !== "";
    }
    case "all":
      return condition.of.every((c) => evaluate(c, session));
    case "any":
      return condition.of.some((c) => evaluate(c, session));
    case "not":
      return !evaluate(condition.of, session);
  }
}

/** Ersetzt {{feld}} durch den Wert aus Session.fields; Unbekanntes wird leer. */
export function interpolate(text: string, session: Session): string {
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    const value = session.fields[key];
    return value === undefined || value === null ? "" : String(value);
  });
}

function validate(text: string, kind: "text" | "email" | "number" | "phone"): boolean {
  if (!text) return false;
  switch (kind) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text);
    case "number":
      return !Number.isNaN(Number(text));
    case "phone":
      return /^[+\d][\d\s/()-]{5,}$/.test(text);
    case "text":
      return true;
  }
}

function coerce(text: string, kind?: "text" | "email" | "number" | "phone"): FieldValue {
  return kind === "number" ? Number(text) : text;
}

function touch(session: Session): Session {
  return { ...session, updatedAt: new Date().toISOString() };
}
