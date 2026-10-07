/**
 * Rendert die Texte aus ManyChat.
 *
 * Die Inhalte sind reiner Text mit Zeilenumbrüchen, Emojis, gelegentlichen
 * Trennlinien ("—" allein auf einer Zeile) sowie nackten Links und
 * E-Mail-Adressen. Hier werden genau diese drei Dinge sichtbar gemacht —
 * bewusst kein voller Markdown-Parser, weil ManyChat kein Markdown liefert.
 */

const LINK = /(https?:\/\/[^\s<>()]+|www\.[^\s<>()]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

function href(token: string): string {
  if (/^https?:\/\//i.test(token)) return token;
  if (token.includes("@")) return `mailto:${token}`;
  return `https://${token}`;
}

function label(token: string): string {
  return token.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function Line({ text, inverted }: { text: string; inverted?: boolean }) {
  const parts = text.split(LINK);
  return (
    <>
      {parts.map((part, i) =>
        // Jeder ungerade Index ist ein Treffer der Capture-Group.
        i % 2 === 1 ? (
          <a
            key={i}
            href={href(part)}
            target="_blank"
            rel="noopener noreferrer"
            className={
              inverted
                ? "underline decoration-white/40 underline-offset-2 hover:decoration-white"
                : "text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            }
          >
            {label(part)}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function RichText({ text, inverted }: { text: string; inverted?: boolean }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Trennlinie: eine Zeile, die nur aus Strichen besteht.
        if (/^[—–-]{1,3}$/.test(trimmed)) {
          return (
            <hr
              key={i}
              className={`my-2 border-0 border-t ${inverted ? "border-white/25" : "border-line"}`}
            />
          );
        }

        // Leerzeile: Abstand statt leerem Absatz.
        if (!trimmed) return <div key={i} className="h-2" />;

        return (
          <p key={i} className="whitespace-pre-wrap break-words">
            <Line text={line} inverted={inverted} />
          </p>
        );
      })}
    </div>
  );
}
