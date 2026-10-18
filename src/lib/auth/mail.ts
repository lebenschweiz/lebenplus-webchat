/**
 * Versand der Login-Mail.
 *
 * Laeuft ueber die HTTP-API von Resend (https://resend.com) — ein fetch, keine
 * Dependency. Ohne RESEND_API_KEY wird der Link nur ins Server-Log
 * geschrieben, damit sich der Ablauf lokal ohne Mailkonto testen laesst.
 */
export async function sendLoginMail(email: string, link: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[login] Kein RESEND_API_KEY gesetzt. Login-Link fuer ${email}: ${link}`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? "Lebenplus <onboarding@resend.dev>",
      to: email,
      subject: "Dein Login-Link für Lebenplus",
      text: [
        "Hallo,",
        "",
        "mit diesem Link meldest du dich bei Lebenplus an:",
        link,
        "",
        "Der Link gilt 30 Minuten und funktioniert nur einmal.",
        "Wenn du das nicht angefordert hast, kannst du diese Mail ignorieren.",
      ].join("\n"),
      html: `<p>Hallo,</p>
<p>mit diesem Link meldest du dich bei Lebenplus an:</p>
<p><a href="${link}" style="display:inline-block;padding:10px 18px;border-radius:999px;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:600">Jetzt anmelden</a></p>
<p style="color:#667085;font-size:13px">Der Link gilt 30 Minuten und funktioniert nur einmal. Wenn du das nicht angefordert hast, kannst du diese Mail ignorieren.</p>`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend antwortet ${response.status}: ${await response.text()}`);
  }
}
