import { NextResponse } from "next/server";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Nimmt einen aus dem ManyChat-Builder extrahierten Flow-Dump entgegen und legt
 * ihn unter data/manychat/<flow>.json ab. Nur fuer die einmalige Migration
 * gedacht — im Dev-Modus nutzbar, in Produktion abgeschaltet.
 */
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Nicht verfuegbar" }, { status: 404 });
  }

  const raw = await request.text();
  let parsed: { flow?: string };
  try {
    parsed = JSON.parse(raw) as { flow?: string };
  } catch {
    return NextResponse.json({ error: "Kein gueltiges JSON" }, { status: 400 });
  }

  const name = (parsed.flow ?? "unbenannt").replace(/[^\w.-]/g, "_");
  const dir = path.join(process.cwd(), "data", "manychat");
  mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${name}.json`);
  writeFileSync(file, raw, "utf8");

  console.log(`[import] ${name}: ${raw.length} Zeichen -> ${file}`);
  return new NextResponse(JSON.stringify({ ok: true, file, bytes: raw.length }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Der Dump kommt aus der ManyChat-Seite, also cross-origin.
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Private-Network": "true",
    },
  });
}
