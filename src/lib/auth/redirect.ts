/**
 * 303-Weiterleitung mit relativem Ziel.
 *
 * Bewusst relativ: hinter dem Proxy des Hosters kennt der Server seine
 * oeffentliche Adresse nicht zuverlaessig, der Browser schon.
 */
export function seeOther(location: string): Response {
  return new Response(null, { status: 303, headers: { Location: location } });
}

/** Zielpfad mit angehaengten Query-Parametern. */
export function withQuery(path: string, params: Record<string, string>): string {
  const query = new URLSearchParams(params).toString();
  return query ? `${path}${path.includes("?") ? "&" : "?"}${query}` : path;
}
