# Lebenplus Web-Chat

Nachbau der ManyChat-Automation „Lebenplus Groundzero Bot" als eigenständiger
Web-Chat: Besucher chatten direkt im Browser statt in Telegram, die Flow-Logik
läuft serverseitig in einer eigenen Engine.

## Stand

**Alle 9 aktiven Flows der Automation sind übernommen** — 185 Schritte mit
echten Texten, Bildern, Buttons und Bedingungen aus ManyChat. 263 Sprünge
geprüft, keine toten Verweise.

| Flow | Schritte |
|---|---|
| Lebenplus Groundzero Bot (`tg_welcome`) | 162 |
| GW_Verify_Subscription | 8 |
| Unsubscribe from Telegram | 4 |
| 00 - AGB GATE | 3 |
| Telegram Default Reply, Subscribe to Telegram, Persönliche Beratung | je 2 |
| Telegram Hilfemenü, Test Gatekeeper NEU | je 1 |

Nicht übernommen: die beiden Arbeitskopien `Lebenplus Groundzero Bot copy`
(156 Schritte) und `copy 2` (151) — Duplikate des Live-Flows.

## Starten

```bash
npm run dev
```

### Von einem anderen Gerät im Netz

Der Dev-Server ist unter der LAN-Adresse erreichbar (z. B.
`http://192.168.178.35:3000`). Damit die Seite dort nicht nur angezeigt wird,
sondern auch reagiert, muss der Host in `allowedDevOrigins` stehen — sonst
blockiert Next den Zugriff auf `/_next/hmr`, das Client-JS hydriert nicht und
nichts lässt sich anklicken. Weitere Geräte ohne Codeänderung freigeben:

```bash
DEV_ORIGINS=192.168.178.50 npm run dev
```

Betrifft nur `next dev` — der Production-Build kennt diese Einschränkung nicht.

Ohne `STRIPE_SECRET_KEY` läuft die App im Simulationsmodus: jede E-Mail auf
`@test.*` gilt als zahlender Kunde. Ohne `RESEND_API_KEY` steht der
Login-Link im Terminal statt in einer Mail. Vorlage: `.env.local.example`.

## Online stellen

Die App speichert Sessions und Verlauf in einer SQLite-Datei. Sie braucht
deshalb einen Hoster mit **dauerhaftem Speicher** — auf Vercel & Co. (Serverless)
ginge der Verlauf bei jedem Neustart verloren. Das `Dockerfile` im Repo läuft
auf jedem Docker-Hoster; empfohlen ist [Railway](https://railway.com):

1. Bei Railway mit dem GitHub-Konto anmelden, **New Project → Deploy from
   GitHub repo** → `lebenschweiz/lebenplus-webchat`. Railway erkennt das
   Dockerfile selbst.
2. Im Service **Volume hinzufügen**, Mount-Pfad `/data`. Dort liegt
   `chat.db` (Pfad per `CHAT_DB_PATH` im Image voreingestellt).
3. Unter **Settings → Networking → Generate Domain** eine öffentliche Adresse
   erzeugen (Port `3000`). Eigene Domain optional ebenda.
4. Jeder Push auf `main` deployt automatisch neu.

Umgebungsvariablen (alle optional, unter **Variables** setzen, nie ins Repo):

| Variable | Wann |
|---|---|
| `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` | erst wenn Stripe scharfgeschaltet wird — ohne läuft der Simulationsmodus |
| `APP_URL` | öffentliche Adresse, z. B. `https://lebenplus.up.railway.app`. Auf Railway optional (dann gilt die erzeugte Domain), bei eigener Domain setzen |
| `RESEND_API_KEY`, `MAIL_FROM` | für den Versand der Login-Mails über [Resend](https://resend.com); Absender-Domain dort bestätigen |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | für „Mit Google anmelden“, ohne fehlt der Button |
| `PREMIUM_EMAILS` | kommagetrennte Adressen, die ohne Abo freigeschaltet sind (Team, Sonderfälle) |
| `ADMIN_EMAILS` | kommagetrennte Adressen, die in den Chatgruppen fremde Nachrichten löschen dürfen |

## Login und Premium

Besucher können den Chat ohne Konto nutzen. Für die Premiumzweige der Flows
(alle Stellen, an denen ManyChat `ActiveSubscription` prüft) muss man
angemeldet sein **und** ein aktives Abo haben.

- **Anmelden** unter `/login`: per Login-Link an die E-Mail-Adresse (kein
  Passwort) oder mit Google. Beide Wege führen bei gleicher Adresse ins
  selbe Konto.
- **Premium** heißt: zur Konto-Adresse gibt es bei Stripe ein Abo im Status
  `active`, `trialing` oder `past_due`. Damit zählen auch Abos aus dem
  Telegram-Zahlungsbot, solange der Kunde sich mit derselben Adresse anmeldet.
  Der Status wird 10 Minuten zwischengespeichert; „Zugriff prüfen“ im Chat
  und die Rückkehr aus dem Checkout fragen sofort neu.
- **Kontoseite** `/konto`: Status, „Premium freischalten“ (Stripe Checkout),
  „Abo verwalten“ (Stripe-Kundenportal, dort im Dashboard aktivieren), Abmelden.
- Die Paywall-Nachrichten im Chat verweisen statt auf den Telegram-Bot auf
  `/konto`; `GW_Verify_Subscription` prüft das Konto statt der `TG_ID`
  (beides in `flows.ts`).

Google einrichten: in der [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
einen OAuth-Client vom Typ „Webanwendung“ anlegen, als Weiterleitungs-URI
`<APP_URL>/api/auth/google/callback` eintragen.

Ein ManyChat-API-Key wird zur Laufzeit nicht gebraucht: die Flows sind in den
Code übersetzt.

Lokal testen: `docker build -t lebenplus-webchat . && docker run -p 3000:3000 -v lebenplus-data:/data lebenplus-webchat`

## Aufbau

| Datei | Zweck |
|---|---|
| `src/lib/flow/types.ts` | Datenmodell, bildet die ManyChat-Primitive 1:1 ab |
| `src/lib/flow/engine.ts` | Führt Flows aus, verwaltet Tags, Felder und Position |
| `src/lib/flow/flows.generated.ts` | **Automatisch erzeugt** — nicht von Hand ändern |
| `src/lib/flow/flows.ts` | Einstiegspunkt, Ort für bewusste Abweichungen |
| `src/lib/flow/handlers.ts` | Externe Aktionen (Abo-Prüfung) |
| `src/lib/db.ts` | Gemeinsame SQLite-Verbindung (`node:sqlite`, keine Dependency) |
| `src/lib/store.ts` | Sessions und Verlauf |
| `src/lib/auth/` | Konten, Login-Link, Google-Login, Anmelde-Cookie |
| `src/lib/billing.ts` | Premium-Status und Checkout über die Stripe-REST-API |
| `src/app/login`, `src/app/konto` | Anmelde- und Kontoseite |
| `src/app/api/chat/route.ts` | HTTP-Schnittstelle, Session per Cookie |
| `src/app/api/import/route.ts` | Nimmt Flow-Dumps entgegen (nur Dev) |
| `src/components/Chat.tsx` | Chat-Oberfläche: Verlauf, Quick Replies, Composer |
| `src/components/RichText.tsx` | Rendert ManyChat-Texte (Umbrüche, Trennlinien, Links) |
| `src/components/icons.tsx` | Inline-SVG-Icons, keine Icon-Dependency |
| `scripts/convert-manychat.mjs` | Übersetzt Dumps in Flow-Definitionen |

## Oberfläche

- **Zurück-Navigation** — jeder Schritt wird serverseitig als Snapshot
  gesichert (`snapshots`-Tabelle); der Pfeil im Header stellt den vorherigen
  Zustand wieder her und schneidet den Verlauf entsprechend zurück. Bei einem
  Baum mit 162 Schritten ist das der wichtigste Ausweg aus einer Sackgasse.
- **Tipp-Indikator mit Lesepause** vor jeder Bot-Antwort, Dauer abhängig von
  der Textlänge. `Smart Delay`-Nodes aus ManyChat steuern ihn direkt.
- **Freitext bleibt immer möglich**, auch wenn Buttons angeboten werden —
  so verhält sich auch das Original.
- **Link-Buttons sind echte `<a>`-Elemente**: Mittelklick und „Link kopieren"
  funktionieren, und sie erzeugen keine zweite Bot-Nachricht.
- **Bilder** öffnen sich per Klick in einer Lightbox (Esc schließt).
- Light und Dark über Systemeinstellung, ab 375 px nutzbar, respektiert
  `prefers-reduced-motion`.

## Weitere Flows übernehmen

Die ManyChat API gibt Flow-Inhalte nicht heraus (alle Content-Endpoints
antworten 404). Die Daten stammen deshalb aus dem **Basic Builder**, wo das
gerenderte Datenmodell im Seiten-State liegt:

1. In ManyChat den Flow öffnen und auf **Go To Basic Builder** wechseln.
2. Jeden Schritt auswählen und das Datenmodell einsammeln — der Builder lädt
   Blöcke und Buttons nur für den gerade gewählten Schritt.
3. Ergebnis als `data/manychat/<flow-ns>.json` ablegen.
4. `node scripts/convert-manychat.mjs` erzeugt daraus
   `src/lib/flow/flows.generated.ts` neu.

Die Flow-IDs (`ns`) liefert die ManyChat API über `/fb/page/getFlows`.

### Abbildung

| ManyChat | hier |
|---|---|
| Content-Step (`telegram`) | `{ type: "message" }` mit Text, Bild und Buttons |
| Button `content` | `goto: { node }` |
| Button `url` | `url` — Auswahl bleibt offen |
| Condition (`case`/`default`) | `{ type: "condition", if, then, else }` |
| Filter `cuf_13947804 = TRUE` | `{ type: "field_is", field: "ActiveSubscription", value: true }` |
| Custom Field | `Session.fields` |
| Tag | `Session.tags` |

## Unterschiede zum ManyChat-Original

Bewusste Abweichungen, weil der Kanal ein anderer ist:

- **Keine Telegram-ID.** Das Custom Field `TG_ID` hat im Web keinen Sinn;
  als Identitätsmerkmal für den Stripe-Abgleich dient die E-Mail-Adresse.
- **Instagram-Automation entfällt.** Der Kommentar-Trigger „Quick Automation EN"
  und „Auto-DM links from comments" haben im Web-Chat keine Entsprechung.
- **Delays sind rein visuell.** Statt verzögert zuzustellen zeigt der Client
  für die Dauer den Tipp-Indikator.
- **URL-Buttons** öffnen einen neuen Tab und lassen die Auswahl stehen, statt
  die Konversation zu beenden.

## Offen

Zwei Dinge stehen im Datenmodell des Builders schlicht nicht drin und müssen
aus ManyChat ergänzt werden. Beide sind im generierten Code als
`TODO`-Kommentar markiert:

- **9 „Start Automation"-Sprünge** ohne auslesbares Ziel. Sichtbare Folge:
  unbekannter Text löst derzeit keine Antwort aus, weil `tg_default` über so
  einen Sprung läuft.
- **6 Action-Nodes** (Tags setzen, Felder schreiben). Sichtbare Folge: das
  AGB-Gate vergibt den Tag `AGB_ACCEPTED` noch nicht.

Außerdem:

- **Stripe scharfschalten**: `STRIPE_SECRET_KEY` und `STRIPE_PRICE_ID` setzen,
  mehr braucht es nicht
- Optional: Admin-Dashboard auf Basis von `store.list()`

## Chatgruppen

Die fünf Telegram-Gruppen des Originals (Jobs, Wohnen, Selbstständige,
Eltern, LPG Core) laufen als eigene Gruppenchats unter `/gruppen`. Die
Bot-Buttons, die bisher Telegram-Einladungslinks öffneten, führen jetzt dorthin.

- Zugang wie im Original: **Jobs** für alle Angemeldeten, die anderen vier nur
  mit aktivem Abo. Festgelegt in `src/lib/groups.ts`.
- Wer sich per E-Mail-Link anmeldet, legt beim ersten Besuch einen
  Anzeigenamen fest; die E-Mail-Adresse sieht in den Gruppen niemand.
- Neue Nachrichten kommen per Server-Sent Events in Echtzeit. Der Event-Bus
  lebt im Serverprozess — passt zu einer Instanz mit SQLite-Volume. Wer auf
  mehrere Instanzen skaliert, muss ihn ersetzen (z. B. Postgres LISTEN/NOTIFY).
- Eigene Nachrichten lassen sich löschen, Adressen in `ADMIN_EMAILS` dürfen
  alle löschen.
