import { authorizeGroup, denied } from "@/lib/auth/group";
import { messagesAfter, subscribe, type GroupEvent } from "@/lib/groups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Haelt die Verbindung bei Proxys offen, die stille Verbindungen kappen. */
const HEARTBEAT_MS = 25_000;

/**
 * Neue Nachrichten in Echtzeit (Server-Sent Events).
 *
 * Nach einem Abbruch verbindet sich der Browser selbst neu und schickt die
 * letzte gesehene ID als Last-Event-ID mit; was dazwischen kam, wird nachgeholt.
 */
export async function GET(request: Request, ctx: RouteContext<"/api/gruppen/[slug]/stream">) {
  const { slug } = await ctx.params;
  const { group, access } = await authorizeGroup(slug);
  const error = denied(group, access);
  if (error || !group) return error!;

  const url = new URL(request.url);
  const afterId = Number(request.headers.get("last-event-id") ?? url.searchParams.get("after") ?? 0) || 0;
  const encoder = new TextEncoder();
  let cleanup = () => {};

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (event: GroupEvent) => {
        const id = event.type === "message" ? `id: ${event.message.id}\n` : "";
        controller.enqueue(encoder.encode(`${id}data: ${JSON.stringify(event)}\n\n`));
      };

      // Erst abonnieren, dann nachholen: so geht nichts zwischen beidem verloren.
      // Doppelte IDs filtert der Client.
      const unsubscribe = subscribe(group.slug, send);
      for (const message of messagesAfter(group.slug, afterId)) send({ type: "message", message });

      const heartbeat = setInterval(() => controller.enqueue(encoder.encode(": ping\n\n")), HEARTBEAT_MS);
      cleanup = () => {
        clearInterval(heartbeat);
        unsubscribe();
      };
      request.signal.addEventListener("abort", () => {
        cleanup();
        try {
          controller.close();
        } catch {
          // schon geschlossen
        }
      });
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
