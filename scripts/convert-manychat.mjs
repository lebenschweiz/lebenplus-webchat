/**
 * Übersetzt aus dem ManyChat-Builder extrahierte Flow-Dumps
 * (data/manychat/*.json) in Flow-Definitionen für die eigene Engine
 * (src/lib/flow/flows.generated.ts).
 *
 *   node scripts/convert-manychat.mjs
 *
 * Die Dumps entstehen, indem im ManyChat Basic Builder jeder Schritt
 * ausgewählt und das gerenderte Datenmodell abgegriffen wird — die
 * ManyChat API gibt Flow-Inhalte nicht heraus.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const IN_DIR = path.join(process.cwd(), "data", "manychat");
const OUT_FILE = path.join(process.cwd(), "src", "lib", "flow", "flows.generated.ts");

/** ManyChat-Custom-Field-IDs -> sprechende Namen (aus der ManyChat API). */
const CUSTOM_FIELDS = {
  cuf_13924751: "TG_ID",
  cuf_13947804: "ActiveSubscription",
};

/** ManyChat-Tag-IDs -> Namen (aus der ManyChat API, /fb/page/getTags). */
const TAGS = {
  94360367: "ig-schweiz-lead",
  94360325: "link_clicked",
  85264166: "AGB_ACCEPTED",
  76216460: "Lehrer",
  75848262: 'Button "Bewerben" geklickt',
};

/** Systemfelder, die ManyChat selbst mitbringt. */
const SYSTEM_FIELDS = {
  first_name: "first_name",
  last_name: "last_name",
  full_name: "full_name",
  email: "email",
  phone: "phone",
};

const warnings = [];

function fieldName(raw) {
  if (CUSTOM_FIELDS[raw]) return CUSTOM_FIELDS[raw];
  if (SYSTEM_FIELDS[raw]) return SYSTEM_FIELDS[raw];
  warnings.push(`Unbekanntes Feld: ${raw} — als "${raw}" übernommen`);
  return raw;
}

/** ManyChat-Filter -> Condition der Engine. */
function toCondition(filter) {
  const groups = (filter.groups ?? []).map((group) => {
    const items = (group.items ?? []).map(toConditionItem).filter(Boolean);
    if (items.length === 1) return items[0];
    return { type: group.operator === "OR" ? "any" : "all", of: items };
  });
  if (groups.length === 1) return groups[0];
  return { type: filter.operator === "OR" ? "any" : "all", of: groups };
}

function toConditionItem(item) {
  // Tag-Bedingungen referenzieren die Tag-ID, nicht den Namen.
  if (item.type === "tag") {
    const tag = TAGS[item.value] ?? String(item.value);
    if (!TAGS[item.value]) warnings.push(`Unbekannte Tag-ID ${item.value} — als "${tag}" übernommen`);
    const has = { type: "has_tag", tag };
    return item.operator === "IS_NOT" || item.operator === "NOT_SET" ? { type: "not", of: has } : has;
  }

  const field = fieldName(item.field);
  switch (item.operator) {
    case "TRUE":
      return { type: "field_is", field, value: true };
    case "FALSE":
      return { type: "field_is", field, value: false };
    case "IS_SET":
    case "HAS_VALUE":
      return { type: "field_set", field };
    case "IS_NOT_SET":
      return { type: "not", of: { type: "field_set", field } };
    case "EQUALS":
      return { type: "field_is", field, value: item.value ?? null };
    case "NOT_EQUALS":
      return { type: "not", of: { type: "field_is", field, value: item.value ?? null } };
    case "HAS_TAG":
      return { type: "has_tag", tag: String(item.value ?? field) };
    default:
      warnings.push(`Unbekannter Operator "${item.operator}" auf Feld ${field} — Bedingung als false gewertet`);
      return { type: "field_is", field, value: "__UNBEKANNTER_OPERATOR__" };
  }
}

function convert(dump) {
  const blocks = Object.fromEntries(dump.blocks.map((b) => [b.id, b]));
  const buttons = Object.fromEntries(dump.buttons.map((b) => [b.id, b]));
  const nodes = [];

  for (const node of dump.nodes) {
    const own = (node.blocks ?? []).map((id) => blocks[id]).filter(Boolean);

    if (node.t === "condition") {
      const cases = own.filter((b) => b.t === "case");
      const fallback = own.find((b) => b.t === "default");
      if (!cases.length) {
        warnings.push(`Condition ${node.id} ohne Case — wird zu einem Sprung`);
        nodes.push({ id: node.id, type: "action", actions: [], next: target(fallback?.targetId) });
        continue;
      }
      if (cases.length > 1) {
        warnings.push(`Condition ${node.id} hat ${cases.length} Cases — nur der erste wird abgebildet`);
      }
      nodes.push({
        id: node.id,
        type: "condition",
        if: toCondition(cases[0].filter),
        then: target(cases[0].targetId),
        else: target(fallback?.targetId),
        _caption: node.cap,
      });
      continue;
    }

    if (node.t === "actionGroup") {
      // ManyChat-Actions (Tag setzen, Feld schreiben, Automation starten) sind
      // im Datenmodell des Builders nicht enthalten — nur der Folgeschritt.
      warnings.push(`Action-Node ${node.id} ("${node.cap}"): Aktionen nicht auslesbar — TODO im Output`);
      nodes.push({
        id: node.id,
        type: "action",
        actions: [],
        next: target(node.to),
        _caption: node.cap,
        _todo: "Aktionen (Tag/Feld) aus ManyChat ergänzen",
      });
      continue;
    }

    if (node.t === "goto") {
      // "Start Automation" springt in eine andere Automation. Das Ziel steht
      // nicht im Builder-Datenmodell und muss von Hand ergänzt werden.
      warnings.push(`Goto-Node ${node.id} ("${node.cap}") hat kein auslesbares Ziel — TODO im Output`);
      nodes.push({ id: node.id, type: "end", text: null, _caption: node.cap, _todo: "Sprungziel aus ManyChat ergänzen" });
      continue;
    }

    // Nachrichten-Node: Texte zusammenfassen, erstes Bild übernehmen,
    // Buttons aller Blöcke in Reihenfolge sammeln.
    const texts = own.filter((b) => b.t === "text" && b.text).map((b) => b.text.trim());
    const image = own.find((b) => b.t === "attachment" && b.att?.url)?.att ?? null;
    const btnIds = own.flatMap((b) => b.btns ?? []);
    const btns = btnIds.map((id) => buttons[id]).filter(Boolean).map(toButton);

    nodes.push({
      id: node.id,
      type: "message",
      text: texts.join("\n\n"),
      image: image?.url ?? undefined,
      buttons: btns.length ? btns : undefined,
      next: null,
      _caption: node.cap,
    });
  }

  return nodes;
}

function toButton(button) {
  if (button.t === "url") {
    return { label: button.cap, url: button.url };
  }
  if (button.to) return { label: button.cap, goto: { node: button.to } };
  warnings.push(`Button "${button.cap}" (${button.id}) ohne Ziel`);
  return { label: button.cap };
}

function target(nodeId) {
  return nodeId ? { node: nodeId } : null;
}

// ---------------------------------------------------------------- Ausgabe

function serialise(value, indent = 2) {
  return JSON.stringify(value, (key, v) => (key.startsWith("_") || v === undefined ? undefined : v), indent);
}

/** Auslöser je Flow — im Original steuert Telegram das, hier der Chat selbst. */
function trigger(ns) {
  if (ns === "tg_welcome") return '{ isWelcome: true, keywords: ["start", "/start"] }';
  if (ns === "tg_default") return "{ isDefault: true }";
  if (ns === "content20260411211439_651817") return '{ keywords: ["hilfe", "/hilfe", "help", "/help"] }';
  return "undefined";
}

function emit(flowDumps) {
  const parts = [];
  for (const dump of flowDumps) {
    const nodes = convert(dump);
    const entry = nodes[0];
    const body = nodes
      .map((node) => {
        const comment = node._caption ? `    // ${node._caption}${node._todo ? ` — TODO: ${node._todo}` : ""}\n` : "";
        return comment + "    " + serialise(node).split("\n").join("\n    ");
      })
      .join(",\n");
    parts.push(`  {
    id: ${JSON.stringify(dump.flow)},
    name: ${JSON.stringify(dump.name ?? dump.flow)},
    sourceNs: ${JSON.stringify(dump.flow)},
    entry: ${JSON.stringify(entry.id)},
    trigger: ${trigger(dump.flow)},
    nodes: [
${body}
    ],
  }`);
  }

  return `// AUTOMATISCH ERZEUGT — nicht von Hand bearbeiten.
// Quelle: data/manychat/*.json  |  Neu erzeugen: node scripts/convert-manychat.mjs
import type { Flow } from "./types";

export const generatedFlows: Flow[] = [
${parts.join(",\n")}
];
`;
}

const files = readdirSync(IN_DIR).filter((f) => f.endsWith(".json"));
if (!files.length) {
  console.error(`Keine Dumps in ${IN_DIR}`);
  process.exit(1);
}

const dumps = files.map((f) => JSON.parse(readFileSync(path.join(IN_DIR, f), "utf8")));
writeFileSync(OUT_FILE, emit(dumps), "utf8");

const stats = dumps.map((d) => `${d.flow}: ${d.nodes.length} Nodes`).join(", ");
console.log(`${files.length} Flow(s) übersetzt -> ${path.relative(process.cwd(), OUT_FILE)}`);
console.log(`  ${stats}`);
if (warnings.length) {
  console.log(`\n${warnings.length} Hinweis(e):`);
  const counted = warnings.reduce((acc, w) => ((acc[w] = (acc[w] ?? 0) + 1), acc), {});
  for (const [w, n] of Object.entries(counted)) console.log(`  ${n > 1 ? n + "x " : ""}${w}`);
}
