// AUTOMATISCH ERZEUGT — nicht von Hand bearbeiten.
// Quelle: data/manychat/*.json  |  Neu erzeugen: node scripts/convert-manychat.mjs
import type { Flow } from "./types";

export const generatedFlows: Flow[] = [
  {
    id: "content20251123151913_895281",
    name: "GW_Verify_Subscription",
    sourceNs: "content20251123151913_895281",
    entry: "b92982ff-4d54-4f6d-a70f-8c239c8c36d5",
    trigger: undefined,
    nodes: [
    // Actions — TODO: Aktionen (Tag/Feld) aus ManyChat ergänzen
    {
      "id": "b92982ff-4d54-4f6d-a70f-8c239c8c36d5",
      "type": "action",
      "actions": [],
      "next": {
        "node": "d8ad4df3-efb3-4d5d-b157-a76c2a8e802a"
      }
    },
    // Condition
    {
      "id": "d8ad4df3-efb3-4d5d-b157-a76c2a8e802a",
      "type": "condition",
      "if": {
        "type": "field_set",
        "field": "TG_ID"
      },
      "then": {
        "node": "7d7ce78a-8ac5-4c88-8555-ac41c62ab80e"
      },
      "else": {
        "node": "1814af77-2ec3-4829-9b42-ae12dcc0581a"
      }
    },
    // Actions — TODO: Aktionen (Tag/Feld) aus ManyChat ergänzen
    {
      "id": "7d7ce78a-8ac5-4c88-8555-ac41c62ab80e",
      "type": "action",
      "actions": [],
      "next": {
        "node": "4eae7ee1-0027-45c6-975c-1cd654f93843"
      }
    },
    // Condition
    {
      "id": "4eae7ee1-0027-45c6-975c-1cd654f93843",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "25748c95-748f-4dd3-9ecf-68d65d22b655"
      },
      "else": {
        "node": "5c236ca0-8c0c-4e1f-a300-4114d5440e19"
      }
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "25748c95-748f-4dd3-9ecf-68d65d22b655",
      "type": "end",
      "text": null
    },
    // Send Message #1
    {
      "id": "5c236ca0-8c0c-4e1f-a300-4114d5440e19",
      "type": "message",
      "text": "Du hast aktuell kein aktives Abo.\nWenn du wieder Zugriff möchtest, kannst du es im Zahlungs-Bot verlängern.\nDanach kannst du hier direkt nochmal prüfen.",
      "buttons": [
        {
          "label": "Abo verlängern",
          "url": "https://t.me/lebenplus_bot"
        },
        {
          "label": "Zugriff prüfen",
          "goto": {
            "node": "fe86c39d-7868-4e21-9ea1-4385d35b56c1"
          }
        }
      ],
      "next": null
    },
    // Start Automation #1 — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "fe86c39d-7868-4e21-9ea1-4385d35b56c1",
      "type": "end",
      "text": null
    },
    // Send Message (nicht zuordenbar)
    {
      "id": "1814af77-2ec3-4829-9b42-ae12dcc0581a",
      "type": "message",
      "text": "Ich kann dich noch nicht zuordnen. Bitte sende einmal /start an diesen Bot, dann klappt’s.",
      "next": null
    }
    ],
  },
  {
    id: "content20260121094938_747514",
    name: "Persönliche Beratung bezahlt mit Stripe",
    sourceNs: "content20260121094938_747514",
    entry: "490733dd-7f3b-40b4-b657-e9ae34fb1fe1",
    trigger: undefined,
    nodes: [
    // Actions — TODO: Aktionen (Tag/Feld) aus ManyChat ergänzen
    {
      "id": "490733dd-7f3b-40b4-b657-e9ae34fb1fe1",
      "type": "action",
      "actions": [],
      "next": null
    },
    // Send Message
    {
      "id": "a7a79162-9ea9-4591-8f48-dd28831a3615",
      "type": "message",
      "text": "",
      "next": null
    }
    ],
  },
  {
    id: "content20260223134411_644348",
    name: "Test Gatekeeper NEU",
    sourceNs: "content20260223134411_644348",
    entry: "ef2f427d-dda0-4d68-857d-666861b19db3",
    trigger: undefined,
    nodes: [
    // Send Message
    {
      "id": "ef2f427d-dda0-4d68-857d-666861b19db3",
      "type": "message",
      "text": "Hi",
      "next": null
    }
    ],
  },
  {
    id: "content20260411211439_651817",
    name: "Telegram Hilfemenü",
    sourceNs: "content20260411211439_651817",
    entry: "22458ec6-dda7-4842-a839-e45da455603c",
    trigger: { keywords: ["hilfe", "/hilfe", "help", "/help"] },
    nodes: [
    // Send Message
    {
      "id": "22458ec6-dda7-4842-a839-e45da455603c",
      "type": "message",
      "text": "👋 Hilfe & Orientierung\n\nWillkommen im Groundzero-Bot – du wirst hier Schritt für Schritt durch alle Inhalte geführt.\n\n—\n\n🧪 Beta-Hinweis\n\nUnser Tool befindet sich aktuell noch im Beta-Modus.\nEinige Inhalte sind noch im Aufbau oder funktionieren vereinzelt noch nicht vollständig.\n\n—\n\n📩 Support\n\nFalls etwas nicht funktioniert oder du Fragen hast, melde dich einfach bei uns:\nlebenschweizconsulting@gmail.com\n\nWir helfen dir so schnell wie möglich weiter 👍",
      "next": null
    }
    ],
  },
  {
    id: "content20260412075556_969985",
    name: "00 - AGB GATE",
    sourceNs: "content20260412075556_969985",
    entry: "e1e8fac8-9186-40d7-9149-93df219d30f2",
    trigger: undefined,
    nodes: [
    // Send Message
    {
      "id": "e1e8fac8-9186-40d7-9149-93df219d30f2",
      "type": "message",
      "text": "Bevor du startest, brauchen wir kurz deine Zustimmung 👇\n\nBitte bestätige, dass du unsere AGB und Datenschutzbestimmungen akzeptierst, damit du den Bot nutzen kannst.",
      "buttons": [
        {
          "label": "✅ Ich akzeptiere",
          "goto": {
            "node": "eacd5d64-a3f3-4d5e-8925-183c80041ea2"
          }
        },
        {
          "label": "📄 AGB ansehen",
          "url": "https://lebenplus-community.ch/allgemeine-geschaftsbedingungen"
        },
        {
          "label": "🔐Datenschutz ansehen",
          "url": "https://lebenplus-community.ch/datenschutzerklarung"
        }
      ],
      "next": null
    },
    // Actions — TODO: Aktionen (Tag/Feld) aus ManyChat ergänzen
    {
      "id": "eacd5d64-a3f3-4d5e-8925-183c80041ea2",
      "type": "action",
      "actions": [],
      "next": {
        "node": "91279639-2d80-419d-aac0-c1f61ceb2ca7"
      }
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "91279639-2d80-419d-aac0-c1f61ceb2ca7",
      "type": "end",
      "text": null
    }
    ],
  },
  {
    id: "system_tg_subscribe",
    name: "Subscribe to Telegram",
    sourceNs: "system_tg_subscribe",
    entry: "64dc76a6-168f-4dcd-ab35-4278d23f4099",
    trigger: undefined,
    nodes: [
    // Subscribe to Telegram — TODO: Aktionen (Tag/Feld) aus ManyChat ergänzen
    {
      "id": "64dc76a6-168f-4dcd-ab35-4278d23f4099",
      "type": "action",
      "actions": [],
      "next": {
        "node": "5e3b5cc8-9a9b-4359-a3ae-6bdbe8377211"
      }
    },
    // Send Message
    {
      "id": "5e3b5cc8-9a9b-4359-a3ae-6bdbe8377211",
      "type": "message",
      "text": "You have successfully subscribed!\n\nP.S. If you want to unsubscribe again just type \"stop\".",
      "next": null
    }
    ],
  },
  {
    id: "system_tg_unsubscribe",
    name: "Unsubscribe from Telegram",
    sourceNs: "system_tg_unsubscribe",
    entry: "0696da62-0c7c-497f-a698-41a56eb6c06b",
    trigger: undefined,
    nodes: [
    // Unsubscribe from Telegram — TODO: Aktionen (Tag/Feld) aus ManyChat ergänzen
    {
      "id": "0696da62-0c7c-497f-a698-41a56eb6c06b",
      "type": "action",
      "actions": [],
      "next": {
        "node": "bebf865a-4f45-4a89-bd37-f71016a11acc"
      }
    },
    // Subscribe Back Confirmation
    {
      "id": "bebf865a-4f45-4a89-bd37-f71016a11acc",
      "type": "message",
      "text": "You were successfully unsubscribed. Click the button below or just type \"start\" to subscribe back anytime",
      "next": null
    },
    // Subscribe — TODO: Aktionen (Tag/Feld) aus ManyChat ergänzen
    {
      "id": "8673fff4-ede2-4c28-a3c5-d65f3c0a6b4b",
      "type": "action",
      "actions": [],
      "next": {
        "node": "e266b22f-57a9-44e2-a443-acadd9bec656"
      }
    },
    // Successfully Subscribed
    {
      "id": "e266b22f-57a9-44e2-a443-acadd9bec656",
      "type": "message",
      "text": "You have successfully subscribed!",
      "next": null
    }
    ],
  },
  {
    id: "tg_default",
    name: "Telegram Default Reply",
    sourceNs: "tg_default",
    entry: "3fcb7480-bb78-476d-863e-6f3f2f7ad717",
    trigger: { isDefault: true },
    nodes: [
    // Condition
    {
      "id": "3fcb7480-bb78-476d-863e-6f3f2f7ad717",
      "type": "condition",
      "if": {
        "type": "not",
        "of": {
          "type": "has_tag",
          "tag": "AGB_ACCEPTED"
        }
      },
      "then": {
        "node": "d32b09dc-c989-4d27-8eb4-7a1323cd0d9a"
      },
      "else": null
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "d32b09dc-c989-4d27-8eb4-7a1323cd0d9a",
      "type": "end",
      "text": null
    }
    ],
  },
  {
    id: "tg_welcome",
    name: "Lebenplus Groundzero Bot",
    sourceNs: "tg_welcome",
    entry: "e3782805-c16a-4fbc-844b-0fe61078a0c3",
    trigger: { isWelcome: true, keywords: ["start", "/start"] },
    nodes: [
    // Send Message
    {
      "id": "e3782805-c16a-4fbc-844b-0fe61078a0c3",
      "type": "message",
      "text": "",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_036e670e47c0cfcb8048b9b0ffde0de3.png",
      "buttons": [
        {
          "label": "Anleitung",
          "goto": {
            "node": "7138435a-b7a8-423b-b57a-850e389bc0a1"
          }
        },
        {
          "label": "Dein Weg",
          "goto": {
            "node": "95a6044b-8ebb-45f0-9c9e-6c75397c6705"
          }
        },
        {
          "label": "Bewerbungen",
          "goto": {
            "node": "5bd7f086-e8b4-48e4-8e66-5b0cf384e403"
          }
        },
        {
          "label": "Jobs",
          "goto": {
            "node": "9bc8d580-d96f-4fdb-987d-99ee84a7471c"
          }
        },
        {
          "label": "Wohnungen",
          "goto": {
            "node": "c67a91ce-979b-464c-a2c6-c411021a70fd"
          }
        },
        {
          "label": "Umzug",
          "goto": {
            "node": "a4ed595b-d6e4-4b4c-849f-f20ecdb1bba9"
          }
        },
        {
          "label": "Tools",
          "goto": {
            "node": "7aba45cc-537e-417f-bb6c-269eeedd05a7"
          }
        },
        {
          "label": "Chatgruppen",
          "goto": {
            "node": "f3c17ca9-d4f7-4c91-b28c-4fc2a06e26e6"
          }
        },
        {
          "label": "Versicherungen",
          "goto": {
            "node": "fb112bc4-6ac2-4818-b670-c7c1463ff2bd"
          }
        },
        {
          "label": "Zusatzmenü",
          "goto": {
            "node": "e9e3edb4-d46d-4e29-9268-a5377f2afbcc"
          }
        }
      ],
      "next": null
    },
    // Send Message #9
    {
      "id": "7138435a-b7a8-423b-b57a-850e389bc0a1",
      "type": "message",
      "text": "Sieh dir dieses Anleitungsvideo an, damit du dich bei Groundzero zurechtfindest:",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_07a78a30a2909253efaf0245294b884c.png",
      "buttons": [
        {
          "label": "Bereit für Lebenplus",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // JOB
    {
      "id": "95a6044b-8ebb-45f0-9c9e-6c75397c6705",
      "type": "message",
      "text": "Benötigst du einen Job in der Schweiz?",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_308bd630a83736b3574bd2189a1ba043.png",
      "buttons": [
        {
          "label": "Ja, benötige ich",
          "goto": {
            "node": "f17e93b8-f5b8-48e5-a56f-36dbc1f714e8"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "1b6232c4-0f66-4a60-9fd2-4e6751d17775"
          }
        }
      ],
      "next": null
    },
    // Send Message #51
    {
      "id": "f17e93b8-f5b8-48e5-a56f-36dbc1f714e8",
      "type": "message",
      "text": "Bitte mache den Job-Ampel-Check damit wir herausfinden können, ob dein Job in der Schweiz gefragt ist.\n\nKlick auf \"Weiter\" sobald du dein Ergebnis hast.",
      "buttons": [
        {
          "label": "Job-Ampel-Check",
          "url": "t.me/gehalt_bot/job_ampel_schweiz"
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "172fc0f6-6eac-46a0-992a-28b974d5b8fc"
          }
        }
      ],
      "next": null
    },
    // Send Message #52
    {
      "id": "172fc0f6-6eac-46a0-992a-28b974d5b8fc",
      "type": "message",
      "text": "Ist deine Berufserfahrung in der Schweiz gefragt? Welches Licht hat dir die Job-Ampel angezeigt?",
      "buttons": [
        {
          "label": "Grün (sehr gefragt)",
          "goto": {
            "node": "0733db09-ea3d-4053-9d1e-105c340a0ad1"
          }
        },
        {
          "label": "Gelb (etwas gefragt)",
          "goto": {
            "node": "de764333-6ea1-44a6-9217-66ef75e37778"
          }
        },
        {
          "label": "Rot (kaum gefragt)",
          "goto": {
            "node": "5bed6b39-4fe8-466d-aa79-dbffd1e0c1fe"
          }
        }
      ],
      "next": null
    },
    // Send Message #65
    {
      "id": "0733db09-ea3d-4053-9d1e-105c340a0ad1",
      "type": "message",
      "text": "Die Ampel hat \"Grün\" angezeigt? Glückwünsch, du hast sehr gute Chancen einen Job in der Schweiz zu bekommen.",
      "buttons": [
        {
          "label": "Weiter zur Bewerbung",
          "goto": {
            "node": "0fbe191b-85ed-4dd4-aa06-ba73166cf326"
          }
        }
      ],
      "next": null
    },
    // Send Message #61
    {
      "id": "0fbe191b-85ed-4dd4-aa06-ba73166cf326",
      "type": "message",
      "text": "Wir haben einen 5-Phasen-Plan entwickelt, der euch Schritt für Schritt dabei unterstützt, in der Schweiz erfolgreich einen Job zu finden.",
      "buttons": [
        {
          "label": "Erfolgsplan-Jobsuche",
          "goto": {
            "node": "2300a71b-f32d-4c52-aee9-a8279e50b8be"
          }
        },
        {
          "label": "Interview absolviert",
          "goto": {
            "node": "ab0c936f-4377-4cec-a688-6835887ffdff"
          }
        }
      ],
      "next": null
    },
    // Send Message #53
    {
      "id": "2300a71b-f32d-4c52-aee9-a8279e50b8be",
      "type": "message",
      "text": "Erfolgsplan-Jobsuche:\nHier findest du deinen Schritt-für-Schritt-Plan für starke Bewerbungsunterlagen, eine erfolgreiche Interviewvorbereitung und viele weitere hilfreiche Tipps.",
      "buttons": [
        {
          "label": "Phase 1: Fundament",
          "goto": {
            "node": "72c91764-ecb6-4789-9684-901bf90fdf2e"
          }
        },
        {
          "label": "Phase 2: Strategie",
          "goto": {
            "node": "6221d23f-5e5b-4400-ad5c-0b9a8b4c34d9"
          }
        },
        {
          "label": "Phase 3: Dossier",
          "goto": {
            "node": "2e046b17-fc10-486a-8702-0042aa550b4f"
          }
        },
        {
          "label": "Phase 4: Interview",
          "goto": {
            "node": "42246f08-e7a4-4d85-bf67-c73f54edaa16"
          }
        },
        {
          "label": "Phase 5: Training",
          "goto": {
            "node": "9dc15c1a-37a2-4247-b26c-ad0dc78b70e0"
          }
        },
        {
          "label": "zurück",
          "goto": {
            "node": "0fbe191b-85ed-4dd4-aa06-ba73166cf326"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "72c91764-ecb6-4789-9684-901bf90fdf2e",
      "type": "message",
      "text": "Phase 1: Fundament, Mindset & Organisation\nBevor du die erste Bewerbung schreibst, musst du dich selbst organisieren und wissen, was dich antreibt. Das verhindert zielloses Suchen.\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zur nächsten Phase springen.",
      "buttons": [
        {
          "label": "Leitfäden-Phase 1",
          "goto": {
            "node": "4764835b-9398-4911-951d-c87542c86df2"
          }
        },
        {
          "label": "Infos zu den Berufen",
          "goto": {
            "node": "5c3b3260-2225-426f-b17b-3e15d2ae7c7b"
          }
        },
        {
          "label": "weiter zu Phase 2",
          "goto": {
            "node": "6221d23f-5e5b-4400-ad5c-0b9a8b4c34d9"
          }
        },
        {
          "label": "zurück zur Übersicht",
          "goto": {
            "node": "2300a71b-f32d-4c52-aee9-a8279e50b8be"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "4764835b-9398-4911-951d-c87542c86df2",
      "type": "message",
      "text": "Phase 1: Fundament, Mindset & Organisation:\n\nArbeite folgende Unterlagen durch:",
      "buttons": [
        {
          "label": "zurück ",
          "goto": {
            "node": "72c91764-ecb6-4789-9684-901bf90fdf2e"
          }
        }
      ],
      "next": null
    },
    // Send Message #71
    {
      "id": "5c3b3260-2225-426f-b17b-3e15d2ae7c7b",
      "type": "message",
      "text": "Hier findest wertvolle Informationen über Gehälter, gefragte Jobs und vieles mehr.",
      "buttons": [
        {
          "label": "Jobmarktanalyse",
          "url": "t.me/gehalt_bot/jobmarktanalyse"
        },
        {
          "label": "Gehaltsrechnermedian",
          "url": "t.me/gehalt_bot/gehaltsrechner"
        },
        {
          "label": "zurück",
          "goto": {
            "node": "72c91764-ecb6-4789-9684-901bf90fdf2e"
          }
        }
      ],
      "next": null
    },
    // Send Message #97
    {
      "id": "6221d23f-5e5b-4400-ad5c-0b9a8b4c34d9",
      "type": "message",
      "text": "Phase 2: Deine Story & Strategie\nJetzt entwickelst du den Inhalt: Was erzählst du über dich?\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zur nächsten Phase springen.",
      "buttons": [
        {
          "label": "Leidfäden-Phase 2",
          "goto": {
            "node": "90ef93f5-9f49-4b8a-894b-2872106ba271"
          }
        },
        {
          "label": "weiter zu Phase 3",
          "goto": {
            "node": "2e046b17-fc10-486a-8702-0042aa550b4f"
          }
        },
        {
          "label": "zurück zur Übersicht",
          "goto": {
            "node": "2300a71b-f32d-4c52-aee9-a8279e50b8be"
          }
        }
      ],
      "next": null
    },
    // Send Message #97
    {
      "id": "90ef93f5-9f49-4b8a-894b-2872106ba271",
      "type": "message",
      "text": "Phase 2: Deine Story & Strategie\nJetzt entwickelst du den Inhalt: Was erzählst du über dich?",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "6221d23f-5e5b-4400-ad5c-0b9a8b4c34d9"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "2e046b17-fc10-486a-8702-0042aa550b4f",
      "type": "message",
      "text": "Phase 3: Die Bewerbungsunterlagen (Erstellung & Qualität)\nJetzt wird es handfest: Du erstellst die Dokumente, die du versendest.\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zur nächsten Phase springen.",
      "buttons": [
        {
          "label": "Leidfäden-Phase 3",
          "goto": {
            "node": "3d7392d5-8dba-4dfa-9ac5-f487b41a40c9"
          }
        },
        {
          "label": "Unterlagen prüfen",
          "goto": {
            "node": "a46afb4c-2995-4956-ae9c-f2b54d1add66"
          }
        },
        {
          "label": "sich bewerben",
          "goto": {
            "node": "0d88289d-feeb-47c4-8ebb-0f2559564246"
          }
        },
        {
          "label": "weiter zu Phase 4",
          "goto": {
            "node": "42246f08-e7a4-4d85-bf67-c73f54edaa16"
          }
        },
        {
          "label": "zurück zur Übersicht",
          "goto": {
            "node": "2300a71b-f32d-4c52-aee9-a8279e50b8be"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "3d7392d5-8dba-4dfa-9ac5-f487b41a40c9",
      "type": "message",
      "text": "Phase 3: Die Bewerbungsunterlagen (Erstellung & Qualität):\nArbeite folgende Dokument durch:",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "2e046b17-fc10-486a-8702-0042aa550b4f"
          }
        }
      ],
      "next": null
    },
    // Send Message #56
    {
      "id": "a46afb4c-2995-4956-ae9c-f2b54d1add66",
      "type": "message",
      "text": "Wenn du deine Unterlagen fertig gestellt hast und die Bewerbungsleitfäden und optional das Bewerbungstraining durchlaufen bist, ergibt es Sinn deine Unterlagen prüfen zu lassen. \n\nDas Lebenplus-Team übernimmt diese Arbeit für dich und achtet dabei auf aktuelle DSGVO-Richtlinien. Wenn du dich dafür entscheidest deinen Lebenslauf an uns zu senden, wird dieser nach Prüfung durch uns unwiderruflich bei uns gelöscht.",
      "buttons": [
        {
          "label": "Unterlagen senden",
          "url": "t.me/gehalt_bot/bewerbungsenden"
        }
      ],
      "next": null
    },
    // Send Message #70
    {
      "id": "0d88289d-feeb-47c4-8ebb-0f2559564246",
      "type": "message",
      "text": "Mit fertigen Bewerbungsunterlagen kannst du hier direkt mit der Jobsuche starten. Du hast dabei folgende Optionen:\n\n1.Bewerbung über die LebenPlus-Jobbörse\n\n2.Weitergabe deiner Unterlagen an ausgewählte, geprüfte Recruiter, mit denen wir zusammenarbeiten.\n\n3.Bewerbung auf externen Jobbörsen, z. B. jobs.ch\n\nFalls deine Bewerbungsunterlagen noch nicht CH-tauglich sind, empfehlen wir dir, sie zuerst Schweiz-ready zu machen.\nKlicke dafür einfach auf den Button „zu Phase 3- Dossier“. Dort findest du einen klaren Schritt-für-Schritt-Plan, mit dem du deine Bewerbungsunterlagen gezielt optimieren oder komplett neu erstellen kannst.\nFalls du von Grund auf deine Bewerbungsstrategie erstellen bzw. anpassen möchtest dann gerne über den Button \"zum Bewerbungsguide\".",
      "buttons": [
        {
          "label": "1.Jobbörse Lebenplus",
          "goto": {
            "node": "7bb2876a-c462-4c79-b12a-581eae0d6c1d"
          }
        },
        {
          "label": "2.Recruiter anfragen",
          "goto": {
            "node": "b0cce2b9-5e88-44de-a234-8acabf524097"
          }
        },
        {
          "label": "3.Externe Jobbörsen",
          "url": "t.me/gehalt_bot/jobportaleswiss"
        },
        {
          "label": "zu Phase 4-Interview",
          "goto": {
            "node": "42246f08-e7a4-4d85-bf67-c73f54edaa16"
          }
        },
        {
          "label": "Interview ist durch",
          "goto": {
            "node": "ab0c936f-4377-4cec-a688-6835887ffdff"
          }
        },
        {
          "label": "zum Bewerbungsguide",
          "goto": {
            "node": "2300a71b-f32d-4c52-aee9-a8279e50b8be"
          }
        },
        {
          "label": "zu Phase 3- Dossier",
          "goto": {
            "node": "2e046b17-fc10-486a-8702-0042aa550b4f"
          }
        }
      ],
      "next": null
    },
    // Send Message #3
    {
      "id": "7bb2876a-c462-4c79-b12a-581eae0d6c1d",
      "type": "message",
      "text": "",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_07234399be1bcbc1cb2e94f469910985.png",
      "buttons": [
        {
          "label": "Informatik",
          "goto": {
            "node": "5ee4a8ee-a315-4bd8-a926-435392049018"
          }
        },
        {
          "label": "Medizin/Pflege",
          "goto": {
            "node": "40034019-8280-4582-99f8-1bc6d9a43324"
          }
        },
        {
          "label": "Handwerk/Bau",
          "goto": {
            "node": "3ae7f13f-0ff7-4e0f-b62f-754ffce05605"
          }
        },
        {
          "label": "Bildung/Soziales",
          "goto": {
            "node": "e4e22783-aaad-4b77-9be1-e679e845eec8"
          }
        },
        {
          "label": "Finance",
          "goto": {
            "node": "2aa93109-5ab0-4115-ae25-5775ccb7b987"
          }
        },
        {
          "label": "Logistik",
          "goto": {
            "node": "16b6fd7c-505a-4f4a-9bef-ade4b29312ec"
          }
        },
        {
          "label": "Gastronomie",
          "goto": {
            "node": "3573cd56-75a4-48bc-b62f-b4f4ce4e5a46"
          }
        },
        {
          "label": "allgemeine Jobsuche",
          "goto": {
            "node": "eda0439e-1a1f-4739-8206-6bd63aff9522"
          }
        }
      ],
      "next": null
    },
    // Send Message #10
    {
      "id": "5ee4a8ee-a315-4bd8-a926-435392049018",
      "type": "message",
      "text": "Informatik Jobs",
      "buttons": [
        {
          "label": "SAP / ERP",
          "url": "https://lebenplus-jobs.ch/sap"
        },
        {
          "label": "Alle IT-Jobs ansehen",
          "url": "https://lebenplus-jobs.ch/it"
        }
      ],
      "next": null
    },
    // Send Message #11
    {
      "id": "40034019-8280-4582-99f8-1bc6d9a43324",
      "type": "message",
      "text": "Medizin/Pflege Jobs",
      "buttons": [
        {
          "label": "Pflegefachkräfte",
          "url": "https://lebenplus-jobs.ch/pflege"
        },
        {
          "label": "Ärtze ",
          "url": "https://lebenplus-jobs.ch/aerzte/"
        }
      ],
      "next": null
    },
    // Send Message #19
    {
      "id": "3ae7f13f-0ff7-4e0f-b62f-754ffce05605",
      "type": "message",
      "text": "Aktuelle Stellen für Bauleiter, Elektriker, Maurer, Schreiner, Sanitär und Handwerker",
      "buttons": [
        {
          "label": "Bau Jobs",
          "url": "lebenplus-jobs.ch/bau"
        }
      ],
      "next": null
    },
    // Send Message #19
    {
      "id": "e4e22783-aaad-4b77-9be1-e679e845eec8",
      "type": "message",
      "text": "Bildung / Soziale Jobs",
      "buttons": [
        {
          "label": "Lehrpersonen",
          "url": "lebenplus-jobs.ch/lehrer"
        }
      ],
      "next": null
    },
    // Send Message #19
    {
      "id": "2aa93109-5ab0-4115-ae25-5775ccb7b987",
      "type": "message",
      "text": "Aktuelle Stellen für Buchhalter, Controller, Compliance-Spezialisten, Treasury Manager und Finanzfachleute",
      "buttons": [
        {
          "label": "Finance Jobs",
          "url": "lebenplus-jobs.ch/finanzen"
        }
      ],
      "next": null
    },
    // Send Message #19
    {
      "id": "16b6fd7c-505a-4f4a-9bef-ade4b29312ec",
      "type": "message",
      "text": "Aktuelle Stellen für Lagerleiter, Disponenten, Supply Chain Manager und Transportfachleute",
      "buttons": [
        {
          "label": "Logistik",
          "url": "lebenplus-jobs.ch/logistik"
        }
      ],
      "next": null
    },
    // Send Message #19
    {
      "id": "3573cd56-75a4-48bc-b62f-b4f4ce4e5a46",
      "type": "message",
      "text": "Aktuelle Stellen für Köche, Servicefachkräfte, Hoteldirektoren und Gastronomiefachleute",
      "buttons": [
        {
          "label": "Gastronomie Jobs",
          "url": "https://lebenplus-jobs.ch/gastronomie/"
        }
      ],
      "next": null
    },
    // Send Message #19
    {
      "id": "eda0439e-1a1f-4739-8206-6bd63aff9522",
      "type": "message",
      "text": "Aktuelle Stellenanzeigen aus verschiedenen Berufsfeldern",
      "buttons": [
        {
          "label": "Allgemeine Jobsuche",
          "url": "lebenplus-jobs.ch"
        }
      ],
      "next": null
    },
    // Send Message #72
    {
      "id": "b0cce2b9-5e88-44de-a234-8acabf524097",
      "type": "message",
      "text": "Deine Anfrage wird von uns an den passenden Recruiter weitergeleitet.\n\nWir arbeiten ausschliesslich mit geprüften und vertrauenswürdigen LebenPlus-Partnern zusammen.\n\nSobald wir deine Anfrage erhalten haben, prüfen wir dein Jobprofil und leiten dich gezielt an den passenden Partner weiter.",
      "buttons": [
        {
          "label": "SAP Jobs ",
          "url": "t.me/gehalt_bot/recruiteranfrage"
        },
        {
          "label": "Jobs in der Medizin",
          "url": "t.me/gehalt_bot/recruiteranfrage"
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "42246f08-e7a4-4d85-bf67-c73f54edaa16",
      "type": "message",
      "text": "Phase 4: Interview-Vorbereitung (Strategie & Wissen)\nDu hast eine Einladung! Jetzt geht es an die inhaltliche Vorbereitung.\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zur nächsten Phase springen.",
      "buttons": [
        {
          "label": "Leidfäden-Phase 4",
          "goto": {
            "node": "ecc41ee3-acb0-4eaf-a8f7-aadc992b115c"
          }
        },
        {
          "label": "Bewerbungstraining",
          "goto": {
            "node": "eb602e24-e695-481d-8bbf-65a406f62572"
          }
        },
        {
          "label": "weiter zu Phase 5",
          "goto": {
            "node": "9dc15c1a-37a2-4247-b26c-ad0dc78b70e0"
          }
        },
        {
          "label": "zurück zur Übersicht",
          "goto": {
            "node": "2300a71b-f32d-4c52-aee9-a8279e50b8be"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "ecc41ee3-acb0-4eaf-a8f7-aadc992b115c",
      "type": "message",
      "text": "Phase 4: Interview-Vorbereitung (Strategie & Wissen)\n\nArbeite folgende Unterlagen durch:",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "42246f08-e7a4-4d85-bf67-c73f54edaa16"
          }
        }
      ],
      "next": null
    },
    // Send Message #54
    {
      "id": "eb602e24-e695-481d-8bbf-65a406f62572",
      "type": "message",
      "text": "Das nächste Online-Bewerbungstraining findet am\n(Datum folgt) statt.\n\nWenn du in der Schweiz einen Job suchst oder wechseln willst, ist das Training ein Muss!\n\nDu lernst:\n✅ Wie Bewerbungen hier aussehen müssen\n✅ Worauf Schweizer Arbeitgeber achten\n✅ Wie du dich im Gespräch top präsentierst\n✅ Und welche Fehler du vermeiden solltest \n\nDas Training ist live & interaktiv – du kannst deine eigenen Unterlagen zeigen und direkt Feedback bekommen.\n\n Hier kannst du dich anmelden:\n<<inline-button-anchor:57ee46cb-caba-4f1c-9e73-c529fbb5cf8a>>",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "42246f08-e7a4-4d85-bf67-c73f54edaa16"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "9dc15c1a-37a2-4247-b26c-ad0dc78b70e0",
      "type": "message",
      "text": "Phase 5: Training & Tag X (Übung & Durchführung)\nKurz vor dem Termin: Üben und Checklisten abhaken.\n\nWenn dein Interview erfolgreich war, hast du den 5 Phasenplan damit auch erfolgreich durchgeführt!",
      "buttons": [
        {
          "label": "Leidfäden: Phase 5",
          "goto": {
            "node": "f4d11072-bd2c-4bfb-abcc-3fa36fe27f23"
          }
        },
        {
          "label": "zurück zur Übersicht",
          "goto": {
            "node": "2300a71b-f32d-4c52-aee9-a8279e50b8be"
          }
        },
        {
          "label": "Interview ist vorbei",
          "goto": {
            "node": "ab0c936f-4377-4cec-a688-6835887ffdff"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "f4d11072-bd2c-4bfb-abcc-3fa36fe27f23",
      "type": "message",
      "text": "Phase 5: Training & Tag X (Übung & Durchführung)\n\nArbeite folgende Inhalte durch:",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "9dc15c1a-37a2-4247-b26c-ad0dc78b70e0"
          }
        }
      ],
      "next": null
    },
    // Send Message #75
    {
      "id": "ab0c936f-4377-4cec-a688-6835887ffdff",
      "type": "message",
      "text": "Wir drücken dir die Daumen bei deiner Bewerbung!",
      "buttons": [
        {
          "label": "Ich habe einen Job!",
          "goto": {
            "node": "294e7f00-94d7-4016-a088-8d544b35f45e"
          }
        },
        {
          "label": "Weiter Bewerben",
          "goto": {
            "node": "0d88289d-feeb-47c4-8ebb-0f2559564246"
          }
        }
      ],
      "next": null
    },
    // Send Message #76
    {
      "id": "294e7f00-94d7-4016-a088-8d544b35f45e",
      "type": "message",
      "text": "Herzlichen Glückwunsch zu deinem neuen Job! 🎆\n\nDann lass uns weitermachen auf deiner Reise in die Schweiz!",
      "buttons": [
        {
          "label": "Weiter",
          "goto": {
            "node": "1b6232c4-0f66-4a60-9fd2-4e6751d17775"
          }
        }
      ],
      "next": null
    },
    // WOHNEN
    {
      "id": "1b6232c4-0f66-4a60-9fd2-4e6751d17775",
      "type": "message",
      "text": "Benötigst du eine Wohnung in der Schweiz?",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_3b049274f33faeb82855366530f322bd.png",
      "buttons": [
        {
          "label": "Ja, benötige ich",
          "goto": {
            "node": "e303fc04-a5de-4c59-871b-e9fe6673b274"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "fb7bcd56-2ca5-41d3-8f8a-64b6551c978f"
          }
        }
      ],
      "next": null
    },
    // Send Message #78
    {
      "id": "e303fc04-a5de-4c59-871b-e9fe6673b274",
      "type": "message",
      "text": "Der erste Schritt ist, herauszufinden, wo du wohnen möchtest.\nDabei unterstützt dich unser Wohnortwahl-Tool, das dir hilft, den passenden Ort für deine Bedürfnisse zu finden.\n\nWenn du bereits weisst, wo du leben möchtest, kannst du direkt mit der Wohnungssuche weitermachen.\nIn unserer eigenen Wohnungsplattform (derzeit noch im Aufbau) sowie über eine kuratierte Liste empfohlener Wohnungsbörsen in der Schweiz findest du passende Inserate.\n\nZusätzlich stellen wir dir ein Bewerbungs-Tool zur Verfügung:\nEs hilft dir beim Erstellen eines überzeugenden Anschreibens und bietet dir eine Checkliste, damit deine Unterlagen vollständig und Schweiz-tauglich sind.",
      "buttons": [
        {
          "label": "Wohnortwahl-Analyse",
          "url": "t.me/gehalt_bot/wohnortwahlanalyse"
        },
        {
          "label": "Mietpreisberechnung",
          "url": "t.me/gehalt_bot/mietpreisrechner"
        },
        {
          "label": "Wohnungssuche",
          "goto": {
            "node": "b993f0cd-265f-4306-abc5-e4b6829d9090"
          }
        },
        {
          "label": "Kaution",
          "goto": {
            "node": "e64d927a-182a-407f-a3c3-95d77136afec"
          }
        },
        {
          "label": "Wohnungsbesichtigung",
          "goto": {
            "node": "e026a363-48b9-410a-932d-247881d010b7"
          }
        }
      ],
      "next": null
    },
    // Send Message #80
    {
      "id": "b993f0cd-265f-4306-abc5-e4b6829d9090",
      "type": "message",
      "text": "Folgende Möglichkeiten hast du an eine Wohnung zu kommen",
      "buttons": [
        {
          "label": "Lebenplus Wohnungen",
          "goto": {
            "node": "73edfb7e-0be7-4695-842a-16971cf5ceae"
          }
        },
        {
          "label": "Externe Wohnungen",
          "goto": {
            "node": "bee21f2c-8916-4476-aaf9-5ef5e686b4bd"
          }
        }
      ],
      "next": null
    },
    // Send Message #81
    {
      "id": "73edfb7e-0be7-4695-842a-16971cf5ceae",
      "type": "message",
      "text": "Hier werden alle Wohnungen zur Miete von uns oder unseren Partnern in der Schweiz vorhanden sein 🏡🇨🇭 (Coming soon)",
      "buttons": [
        {
          "label": "Wohungsbörse L+",
          "goto": {
            "node": "0a257247-1670-4d86-8f8c-e5f6ad2e55dc"
          }
        }
      ],
      "next": null
    },
    // Send Message #83
    {
      "id": "0a257247-1670-4d86-8f8c-e5f6ad2e55dc",
      "type": "message",
      "text": "Lebenplus Wohnungsbörse (Coming soon)",
      "next": null
    },
    // Send Message #82
    {
      "id": "bee21f2c-8916-4476-aaf9-5ef5e686b4bd",
      "type": "message",
      "text": "Hier findest du zahlreiche Anbieter für Wohnungen in der Schweiz.",
      "buttons": [
        {
          "label": "Wohnungsfinder",
          "url": "t.me/gehalt_bot/wohnungsfinder"
        }
      ],
      "next": null
    },
    // Send Message #27
    {
      "id": "e64d927a-182a-407f-a3c3-95d77136afec",
      "type": "message",
      "text": "Eugen hier: Ich weiß, das Thema Mietkaution ist für viele beim Start in der Schweiz ein echter Schock. 😅\n\nIn der Regel wollen Vermieter 1–3 Monatsmieten als Kaution – also schnell mal 5’000–7’000 Franken, die einfach auf einem Konto blockiert sind.\n\nIch hab’s damals anders gelöst:\nIch hab mir eine Mietkautionsversicherung geholt von SwissCaution. (gibt noch andere Anbieter wie GoCaution, etc..)\nIch zahle für meine Wohnung ungefähr 1.100 CHF Miete und dementsprechend beträgt meine Jahresprämie 150 CHF. Je nach dem wieviel deine Wohnung kostet zahlst du nur eine kleine Jahresprämie (so 150–350 Fr.) und behältst dein Geld für Möbel, Umzug etc. für dich.\n\nWichtig: Das ist keine „gratis Lösung“, du kriegst die Prämie nicht zurück – aber du musst eben nicht tausende Franken einfrieren.\n\nWenn du das checken willst, hier ist der Link:\n🔗 Kautionsversicherung jetzt prüfen\n <<inline-button-anchor:a52ab446-2284-41a5-8854-c007410da549>>\n\nIch würd’s jedem empfehlen, der gerade neu ankommt oder die Wohnungssuche entspannt angehen will.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "e303fc04-a5de-4c59-871b-e9fe6673b274"
          }
        }
      ],
      "next": null
    },
    // Send Message #85
    {
      "id": "e026a363-48b9-410a-932d-247881d010b7",
      "type": "message",
      "text": "Sobald du deine Bewerbungsunterlagen abgeschickt hast, geht's zur Wohnungsbesichtigung! 🏡\n\nFalls etwas dazwischenkommt oder die Reise zu weit ist, übernehmen wir gerne die Besichtigung! 😃\n\nFür Infos drück auf \"Wohnungsbesichtigung\". Bei eigener Besichtigung einfach auf \"Weiter\" drücken. 🚀",
      "buttons": [
        {
          "label": "Besichtigungsservice",
          "goto": {
            "node": "7c2cf669-3bb1-4bb4-a36e-098a95351ed8"
          }
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "41cd7300-b13d-463e-8ad7-2b2a9df89b85"
          }
        }
      ],
      "next": null
    },
    // Send Message #86
    {
      "id": "7c2cf669-3bb1-4bb4-a36e-098a95351ed8",
      "type": "message",
      "text": "So funktioniert’s:\n1️⃣ Du schickst uns den Link oder die Adresse der Wohnung\n2️⃣ Wir klären mit dem Vermieter, ob eine Vertretungsbesichtigung möglich ist\n3️⃣ Ein Mitglied unseres Teams oder der Community geht für dich hin\n4️⃣ Du bekommst danach Videos, Fotos und ehrliche Eindrücke – so, als wärst du selbst da\n\nIdeal für alle, die noch im Ausland sind oder keine Zeit für den Termin haben.\n\nWenn du magst, fügen wir dir sogar eine neutrale Einschätzung hinzu:\n„Wie ruhig ist es wirklich?“\n„Wie wirkt das Haus, Nachbarschaft, Zustand?“\n\nSo kannst du den Service anfragen:\nKlick auf „Jetzt anfragen“ und sende uns:\n\nDen Link zur Wohnung (z. B. Homegate, Immoscout24 etc.)\n\nDen Termin oder Zeitraum der Besichtigung\n\nDeinen aktuellen Standort / Stadt\n\nWir melden uns innerhalb von 24 h bei dir mit den nächsten Schritten.",
      "next": null
    },
    // Send Message #87
    {
      "id": "41cd7300-b13d-463e-8ad7-2b2a9df89b85",
      "type": "message",
      "text": "Hast du jetzt eine Wohnung?",
      "buttons": [
        {
          "label": "Ja",
          "goto": {
            "node": "0fcf153a-fb6b-4934-869a-6c5e56996365"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "c76d6b86-1d8d-4942-a4d5-2f31d858d71a"
          }
        }
      ],
      "next": null
    },
    // Send Message #88
    {
      "id": "0fcf153a-fb6b-4934-869a-6c5e56996365",
      "type": "message",
      "text": "Herzlichen Glückwunsch zu deiner neuen Wohnung! \n\nDann lass uns weitermachen auf deiner Reise in die Schweiz!",
      "buttons": [
        {
          "label": "Weiter",
          "goto": {
            "node": "fb7bcd56-2ca5-41d3-8f8a-64b6551c978f"
          }
        }
      ],
      "next": null
    },
    // UMZUG
    {
      "id": "fb7bcd56-2ca5-41d3-8f8a-64b6551c978f",
      "type": "message",
      "text": "Benötigst du Unterstützung bei deinem <mc-bold>Umzug</mc-bold> in die Schweiz?",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_a5267e8959a33a4e57dd48d5a6c422d8.png",
      "buttons": [
        {
          "label": "Ja, benötige ich",
          "goto": {
            "node": "d44d197f-3bae-48a1-948f-a476cfd64d7a"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "907c6558-e4ff-4618-b848-1bd4d75ebb83"
          }
        }
      ],
      "next": null
    },
    // Send Message #77
    {
      "id": "d44d197f-3bae-48a1-948f-a476cfd64d7a",
      "type": "message",
      "text": "Der Umzugs-Ratgeber unterstützt dich deinen Umzug problemlos durchzuführen.\n\nKlick auf \"Weiter\" sobald du einen Überblick mit dem Umzugs-Ratgeber erhalten hast.",
      "buttons": [
        {
          "label": "Umzugs-Ratgeber-Tool",
          "url": "t.me/gehalt_bot/umzugsratgeber"
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "f083a0a0-541e-4caa-bb7c-26f499577d2e"
          }
        }
      ],
      "next": null
    },
    // Send Message #93
    {
      "id": "f083a0a0-541e-4caa-bb7c-26f499577d2e",
      "type": "message",
      "text": "Die folgenden Buttons liefern dir weitere Unterstützungsmöglichkeiten.\n\nButton \"Umzugsunternehmen\" hilft dir ein geeignetes Umzugsunternehmen zu finden.\n\nButton \"Aufbau-Service\" hilft dir Handwerker zu finden, die dir beim Aufbau nach deinem Umzug helfen.\n\nButton \"Community Hilfe\" bringt dich in eine Chatgruppe, in der du nach Hilfe fragen kannst bei deinem Umzug.\n\nButton \"Schweiz Starter Kit\" hilft dir alles wichtige an deinen ersten Tagen zu bestellen.\n\nFalls du keine weitere Hilfe benötigst, klicke auf \"Weiter\".",
      "buttons": [
        {
          "label": "Umzugsunternehmen",
          "goto": {
            "node": "e8f44554-0e1e-47c7-b255-4aa46df521f4"
          }
        },
        {
          "label": "Aufbau-Service",
          "goto": {
            "node": "e277138c-8613-4ac0-8458-97a0483e7bef"
          }
        },
        {
          "label": "Community Hilfe",
          "goto": {
            "node": "aedf0733-fb92-4518-917d-997579fbc49f"
          }
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "0ccc29b2-d175-4117-a259-b2cd16ff1366"
          }
        }
      ],
      "next": null
    },
    // Send Message #31
    {
      "id": "e8f44554-0e1e-47c7-b255-4aa46df521f4",
      "type": "message",
      "text": "Achte bei der Auswahl eines Umzugsunternehmens auf:\n\n✅ Erfahrung mit internationalen Umzügen\n✅ Versicherungsschutz für Schäden\n✅ Zollpapiere inklusive\n✅ Transparente Preisstruktur\n\nHol dir am besten 2–3 Angebote und vergleiche.\n\nWenn du Unterstützung möchtest, fülle über den Button kurz das Umzugsformular aus. Wir leiten deine Anfrage an ein von uns geprüftes Umzugsunternehmen weiter, das sich danach direkt bei dir meldet.",
      "buttons": [
        {
          "label": "Umzugsanfrage füllen",
          "url": "https://forms.gle/RrVNJSud1J1fPc1r6"
        },
        {
          "label": "zurück",
          "goto": {
            "node": "a4ed595b-d6e4-4b4c-849f-f20ecdb1bba9"
          }
        }
      ],
      "next": null
    },
    // Send Message #6
    {
      "id": "a4ed595b-d6e4-4b4c-849f-f20ecdb1bba9",
      "type": "message",
      "text": "",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_0a4d6eec691c7ebb2e822aa69e89d201.png",
      "buttons": [
        {
          "label": "Checkliste Einwand.",
          "goto": {
            "node": "f58d0ef5-acaf-4580-b8dd-22cd288523e4"
          }
        },
        {
          "label": "L+Umzugsratgeber ",
          "url": "t.me/gehalt_bot/umzugsratgeber"
        },
        {
          "label": "Umzugsunternehmen",
          "goto": {
            "node": "e8f44554-0e1e-47c7-b255-4aa46df521f4"
          }
        },
        {
          "label": "Transporter mieten",
          "goto": {
            "node": "1cf25721-fcca-47f9-9c88-73f378588caf"
          }
        },
        {
          "label": "Lagerung",
          "goto": {
            "node": "3113a97d-f213-42cc-b3db-da15796e8db7"
          }
        },
        {
          "label": "Aufbauservice",
          "goto": {
            "node": "d0d599ae-90ae-4a7b-9ae4-8d9cdb06e7db"
          }
        },
        {
          "label": "Ummeldung",
          "goto": {
            "node": "37c1c0b2-4d12-4c71-b3aa-18b4d61522fd"
          }
        },
        {
          "label": "Zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #33
    {
      "id": "f58d0ef5-acaf-4580-b8dd-22cd288523e4",
      "type": "message",
      "text": "Der Zoll ist beim Umzug in die Schweiz kein Nebenthema.\nDein Umzugsgut muss korrekt angemeldet werden – sonst kann es teuer werden. 💸\n\nKurz & wichtig:\n✅ Formular 18.44 (Umzugsgut)\n✅ Inventarliste mit Wertangaben\n✅ Ausweis + Arbeits- & Mietvertrag\n✅ Fahrzeugpapiere (falls Auto)\n\n👉 Vorab beim zuständigen Zoll anmelden. Sauber vorbereitet = stressfrei.\n\nEbenso entscheidend:\nBevor du einreist, sollten deine persönlichen Unterlagen vollständig sein:\n✅ Pass oder ID\n✅ Arbeitsvertrag\n✅ Wohnungsnachweis\n✅ Krankenversicherung\n✅ ggf. Führerschein & Fahrzeugpapiere\n\n👉 Fehlende Dokumente führen schnell zu Problemen beim Zoll oder bei der Anmeldung.\n\n💡 Genau dafür haben wir ein Tool gebaut:\nMit unserer Einwanderungs-Checkliste prüfst du Schritt für Schritt,\n\nwelche Unterlagen du brauchst\n\nwas wann erledigt werden muss\n\nund was du digital bereithalten solltest\n\nDer Guide führt dich durch alles Weitere – kompakt, klar und Schweiz-tauglich 🇨🇭",
      "buttons": [
        {
          "label": "Checkliste Einwand.",
          "url": "t.me/gehalt_bot/einwanderungscheckliste"
        }
      ],
      "next": null
    },
    // Send Message #32
    {
      "id": "1cf25721-fcca-47f9-9c88-73f378588caf",
      "type": "message",
      "text": "Wenn du selbst fährst, achte auf die Grenzüberfahrt-Regeln.\nNicht jeder Miettransporter darf einfach in die Schweiz fahren.\n\nAchte auf:\n✅ Im Mietvertrag muss Auslandsfahrt erlaubt sein\n✅ Fahrzeug für Zollübertritt anmelden\n✅ Versicherungsschutz prüfen\n✅ Frühzeitig reservieren, vor allem am Monatsende\n\nLieber ein paar Franken mehr zahlen und seriös fahren, als später Ärger mit dem Zoll zu haben.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "a4ed595b-d6e4-4b4c-849f-f20ecdb1bba9"
          }
        }
      ],
      "next": null
    },
    // Send Message #34
    {
      "id": "3113a97d-f213-42cc-b3db-da15796e8db7",
      "type": "message",
      "text": "Wenn du noch keine Wohnung hast oder Platz brauchst, ist Einlagern eine gute Zwischenlösung.\n\nAchte auf:\n✅ Versicherungsschutz für dein Lagergut\n✅ Trockene, saubere Räume\n✅ Monatlich kündbare Verträge\n✅ Nähe zu deinem neuen Wohnort\n\n👉 Viele Umzugsfirmen bieten eigene Lager an – oft einfacher und sicherer als externe Anbieter.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "a4ed595b-d6e4-4b4c-849f-f20ecdb1bba9"
          }
        },
        {
          "label": "Lagerraum Guide",
          "url": "t.me/gehalt_bot/lagerraumguide"
        }
      ],
      "next": null
    },
    // Send Message #35
    {
      "id": "d0d599ae-90ae-4a7b-9ae4-8d9cdb06e7db",
      "type": "message",
      "text": "🔧 -AUFBAUSERVICE-\n\nKeine Zeit oder keine Lust, alles selbst aufzubauen?\n\nViele Umzugsfirmen bieten einen Aufbau- und Möbelmontage-Service direkt nach dem Umzug an.\n\nAchte dabei auf:\n✅ Ist der Service im Umzugsangebot enthalten?\n✅ Besteht Versicherungsschutz bei Schäden?\n✅ Haben die Monteure Erfahrung mit Möbelmontage (z.B. IKEA & Co.)?\n\nGerade bei komplexeren Möbeln lohnt sich professionelle Hilfe.\nSauber montiert = weniger Stress, weniger Ärger und keine schiefen Schränke.\n\n👉 Falls du Unterstützung brauchst:\nJe nach Termin und Region versuchen wir gerne, passende Kontakte oder helfende Hände aus unserem Netzwerk zu vermitteln. Eine Garantie können wir nicht geben – aber wir schauen, was möglich ist.\n\nStressfrei ankommen. Schritt für Schritt einrichten.\n\nKontaktiere uns per Mail bei Bedarf an lebenschweizconsulting@gmail.com mit dem Betreff \"AUFBAUSERVICE\"!",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "a4ed595b-d6e4-4b4c-849f-f20ecdb1bba9"
          }
        }
      ],
      "next": null
    },
    // Send Message #36
    {
      "id": "37c1c0b2-4d12-4c71-b3aa-18b4d61522fd",
      "type": "message",
      "text": "Nach dem Umzug musst du dich in der Schweiz innerhalb von 14 Tagen anmelden.\nDas machst du beim Einwohneramt deiner Gemeinde.\n\nDu brauchst:\n✅ Reisepass oder ID\n✅ Mietvertrag\n✅ Arbeitsvertrag\n✅ Krankenversicherung\n✅ Passfoto (je nach Gemeinde)\n\nOhne Anmeldung bekommst du keine Aufenthaltsbewilligung.\nMach’s gleich, sobald du da bist – dann bist du offiziell angekommen.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "a4ed595b-d6e4-4b4c-849f-f20ecdb1bba9"
          }
        }
      ],
      "next": null
    },
    // Send Message #95
    {
      "id": "e277138c-8613-4ac0-8458-97a0483e7bef",
      "type": "message",
      "text": "Aufbau-Service (coming soon)",
      "next": null
    },
    // Send Message #96
    {
      "id": "aedf0733-fb92-4518-917d-997579fbc49f",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatgruppe [Wohnen - L1]\n\n<<inline-button-anchor:206a0b90-8688-47dc-b013-05beb9437b96>>",
      "next": null
    },
    // Send Message #98
    {
      "id": "0ccc29b2-d175-4117-a259-b2cd16ff1366",
      "type": "message",
      "text": "Bist du erfolgreich umgezogen?",
      "buttons": [
        {
          "label": "Ja",
          "goto": {
            "node": "46628e5e-a09a-48d2-b89c-90f5c3715c2b"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "fb7bcd56-2ca5-41d3-8f8a-64b6551c978f"
          }
        }
      ],
      "next": null
    },
    // Send Message #99
    {
      "id": "46628e5e-a09a-48d2-b89c-90f5c3715c2b",
      "type": "message",
      "text": "Willkommen in der Schweiz! 🎉 Lass uns gemeinsam deine erfolgreiche Einwanderung starten! 🚀",
      "next": null
    },
    // FRISCH EINGEWANDERT
    {
      "id": "907c6558-e4ff-4618-b848-1bd4d75ebb83",
      "type": "message",
      "text": "Bist du gerade oder kürzlich (maximal seit 6 Monaten) in die Schweiz eingewandert und benötigst Unterstützung für deinen Start?",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_5bbfe48faba09b0997fa222b6ff004c6.png",
      "buttons": [
        {
          "label": "Ja, benötige ich",
          "goto": {
            "node": "3123e5de-5278-451d-b85e-962b8bb9470b"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "7b50d957-4d41-4343-9db2-3c16ac9a822b"
          }
        }
      ],
      "next": null
    },
    // Send Message #100
    {
      "id": "3123e5de-5278-451d-b85e-962b8bb9470b",
      "type": "message",
      "text": "Das Einwanderungs-Checklisten-Tool hilft dir dabei dich in der Schweiz zurecht zu finden.\n\nKlick auf \"Weiter\" sobald du deine Checkliste abgearbeitet hast oder einen Überblick über alle wichtigen Themen für deine Einwanderung erhalten hast.",
      "buttons": [
        {
          "label": "Einwanderungs-Tool",
          "url": "t.me/gehalt_bot/einwanderungscheckliste"
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "ec5b37ad-96c8-4157-bd42-215a71b3fe37"
          }
        }
      ],
      "next": null
    },
    // Send Message #102
    {
      "id": "ec5b37ad-96c8-4157-bd42-215a71b3fe37",
      "type": "message",
      "text": "Hier findest du weitere Unterstützungs-Möglichkeiten nach deiner Einwanderung.\n\nWenn du bereits über alles informiert bist und keine weitere Unterstützung nach deiner Einwanderung benötigst, klicke auf \"Weiter\".",
      "buttons": [
        {
          "label": "Versicherungen",
          "goto": {
            "node": "fb112bc4-6ac2-4818-b670-c7c1463ff2bd"
          }
        },
        {
          "label": "Auto",
          "goto": {
            "node": "8b9786cd-4f64-489f-b858-433b6a8b369b"
          }
        },
        {
          "label": "Leben",
          "goto": {
            "node": "61ca457f-f07a-4a73-8c25-0a6aa4548eaf"
          }
        },
        {
          "label": "Investitionen",
          "goto": {
            "node": "0d5985b6-1f18-470c-a9cf-5712542c040f"
          }
        },
        {
          "label": "Für Selbstständige",
          "goto": {
            "node": "5da2063a-e243-4aca-8271-37b72c65bb82"
          }
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "d35cf856-e86a-42fe-ae7d-ba6f9f59490a"
          }
        }
      ],
      "next": null
    },
    // Send Message #103
    {
      "id": "fb112bc4-6ac2-4818-b670-c7c1463ff2bd",
      "type": "message",
      "text": "Wir haben für dich einen eigenen Guide zu Versicherungen in der Schweiz erstellt – schau ihn dir gerne in Ruhe an.\n\nZusätzlich haben wir dir einen vertrauenswürdigen Partner hinterlegt, den du bei Fragen oder für eine persönliche Beratung jederzeit direkt kontaktieren kannst. Direktkontakt zu Marcel– für Versicherungsfragen: 👇 \n\nDer Chat öffnet sich mit einer kurzen Vorlage. Ergänz 1 Satz, worum es geht – Marcel antwortet dir persönlich.\n<<inline-button-anchor:5efb25a6-43c5-4965-9e5a-4e1676919f8d>>",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_5da9ed6cb81dfa6c7cb1a40842e12e51.png",
      "buttons": [
        {
          "label": "Versicherungsguide",
          "url": "t.me/gehalt_bot/versicherungsguide"
        },
        {
          "label": "zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #104
    {
      "id": "8b9786cd-4f64-489f-b858-433b6a8b369b",
      "type": "message",
      "text": "🚗 Auto in der Schweiz? Achtung – teuer, wenn man’s falsch macht. 🇨🇭\n\nWir haben für euch den SwissDrive Auto-Guide erstellt. Dort findet ihr alles Wichtige:\n\n✅ Auto anmelden & Strassenverkehrsamt\n✅ Fahrzeug-Import & MFK\n✅ Führerausweis umschreiben\n✅ Verkehrsregeln & Vortritt\n✅ Bussenrechner & typische Strafen\n\nGerade für Neuzuzüger können kleine Fehler schnell mehrere hundert Franken kosten.\n\nInformieren statt zahlen!",
      "buttons": [
        {
          "label": "Auto-Guide-Tool",
          "url": "t.me/gehalt_bot/autoguideswiss"
        },
        {
          "label": "zurück",
          "goto": {
            "node": "ec5b37ad-96c8-4157-bd42-215a71b3fe37"
          }
        }
      ],
      "next": null
    },
    // Send Message #105
    {
      "id": "61ca457f-f07a-4a73-8c25-0a6aa4548eaf",
      "type": "message",
      "text": "Klicke auf \"Weiter\" sobald du eine Übersicht erhalten hast mit den Lebenunterhalts-Übersichts-Tool.",
      "buttons": [
        {
          "label": "Lebensunterhal.-Tool",
          "url": "t.me/gehalt_bot/budget_rechner"
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "6b89f52b-6724-4790-9edf-0256e921be00"
          }
        }
      ],
      "next": null
    },
    // Send Message #110
    {
      "id": "6b89f52b-6724-4790-9edf-0256e921be00",
      "type": "message",
      "text": "Hier sind weitere wichtige Sachen die du zum Leben in der Schweiz benötigst, sobald du eingewandert bist.",
      "buttons": [
        {
          "label": "Bankkonto",
          "goto": {
            "node": "6265c05b-6e1d-45f7-bdc8-dc075c8b4a68"
          }
        },
        {
          "label": "Handyvertrag",
          "goto": {
            "node": "d7bc68c2-c32b-492b-8798-932287edc8fd"
          }
        },
        {
          "label": "Internetvertrag",
          "goto": {
            "node": "fa94d3dd-dc67-4d81-9af7-abeec1d152ee"
          }
        },
        {
          "label": "Kita",
          "goto": {
            "node": "736d0396-924e-4142-b73f-3e4c95808f4b"
          }
        },
        {
          "label": "Schule",
          "goto": {
            "node": "94f6b1e9-77cf-405e-b990-db55876486e7"
          }
        }
      ],
      "next": null
    },
    // Send Message #118
    {
      "id": "6265c05b-6e1d-45f7-bdc8-dc075c8b4a68",
      "type": "message",
      "text": "Bald verfügbar",
      "next": null
    },
    // Send Message #119
    {
      "id": "d7bc68c2-c32b-492b-8798-932287edc8fd",
      "type": "message",
      "text": "Bald verfügbar",
      "next": null
    },
    // Send Message #120
    {
      "id": "fa94d3dd-dc67-4d81-9af7-abeec1d152ee",
      "type": "message",
      "text": "Bald verfügbar",
      "next": null
    },
    // Send Message #121
    {
      "id": "736d0396-924e-4142-b73f-3e4c95808f4b",
      "type": "message",
      "text": "ist aktuell noch in Arbeit",
      "next": null
    },
    // Send Message #122
    {
      "id": "94f6b1e9-77cf-405e-b990-db55876486e7",
      "type": "message",
      "text": "Ist aktuell noch in Arbeit",
      "next": null
    },
    // Send Message #106
    {
      "id": "0d5985b6-1f18-470c-a9cf-5712542c040f",
      "type": "message",
      "text": "Aktuell ist dieser Bereich noch im Ausbau. Was wir anbieten können aktuell sind folgende 3 Tools die euch besonders hilfreich ein können, für eine Immobilieninvestition.",
      "buttons": [
        {
          "label": "3A-Säule",
          "url": "t.me/gehalt_bot/drei_saeulen_prinzip"
        },
        {
          "label": "Wohnungsfinanzierung",
          "url": "t.me/gehalt_bot/immobilieninvestmentguide"
        },
        {
          "label": "Wohnungskaufpreise",
          "url": "t.me/gehalt_bot/immobilienkaufpreismonitor"
        }
      ],
      "next": null
    },
    // Send Message #107
    {
      "id": "5da2063a-e243-4aca-8271-37b72c65bb82",
      "type": "message",
      "text": "Wir haben für euch einen kompakten Guide zur Selbstständigkeit in der Schweiz erstellt. 🇨🇭\n\nDarin findet ihr alle wichtigen Informationen zur Gründung – von den Rechtsformen (Einzelfirma, GmbH, AG) über Anmeldung, AHV, Steuern bis hin zu praktischen Tipps für den Start.\n\nZusätzlich habt ihr die Möglichkeit, direkt über den Guide eine Kontaktanfrage an einen unserer geprüften Treuhand-Partner zu senden, wenn ihr eine persönliche Beratung oder vertiefte Informationen benötigt.\n\nSo habt ihr nicht nur das Wissen – sondern bei Bedarf auch direkt den passenden Experten an eurer Seite.\n\nJetzt informieren & selbstständig durchstarten.",
      "buttons": [
        {
          "label": "Guide Selbstständige",
          "url": "t.me/gehalt_bot/selbststaendigkeitsguide"
        },
        {
          "label": "zurück",
          "goto": {
            "node": "ec5b37ad-96c8-4157-bd42-215a71b3fe37"
          }
        }
      ],
      "next": null
    },
    // Send Message #108
    {
      "id": "d35cf856-e86a-42fe-ae7d-ba6f9f59490a",
      "type": "message",
      "text": "Benötigst du weitere Unterstützung für deine Einwanderung?",
      "buttons": [
        {
          "label": "Ja",
          "goto": {
            "node": "907c6558-e4ff-4618-b848-1bd4d75ebb83"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "7b50d957-4d41-4343-9db2-3c16ac9a822b"
          }
        }
      ],
      "next": null
    },
    // NACH EINWANDERUNG
    {
      "id": "7b50d957-4d41-4343-9db2-3c16ac9a822b",
      "type": "message",
      "text": "Bist du bereits erfolgreich eingewandert?",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_0415795f21e14c3ff0ec2d291f4b0f8b.png",
      "buttons": [
        {
          "label": "Ja",
          "goto": {
            "node": "8b480292-9afc-4c8a-9d0a-ce59b4449717"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "907c6558-e4ff-4618-b848-1bd4d75ebb83"
          }
        }
      ],
      "next": null
    },
    // Send Message #124
    {
      "id": "8b480292-9afc-4c8a-9d0a-ce59b4449717",
      "type": "message",
      "text": "Herzlichen Glückwünsch zu deiner erfolgreichen Einwanderung. \n\nHier endet Groundzero und dein Start in dein neues Lebenplus startet ab jetzt.\n\nFolgende Möglichkeiten bietet dir Lebenplus.",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_911e2ad360f84cb62c7de77ab0ace3a8.jpg",
      "buttons": [
        {
          "label": "Groundzero Offiziell",
          "goto": {
            "node": "12f191e5-2db0-47c3-9636-2b08ff4a2b22"
          }
        },
        {
          "label": "Netzwerk-Events",
          "goto": {
            "node": "0594112f-b5d7-4105-90cf-f14c9854c63c"
          }
        },
        {
          "label": "Motivation",
          "goto": {
            "node": "3a55542f-f8be-4974-a487-de4ada865db7"
          }
        },
        {
          "label": "Live-Calls",
          "goto": {
            "node": "ab9d4540-c68c-4742-83be-9dd0118b3808"
          }
        },
        {
          "label": "Chatgruppen",
          "goto": {
            "node": "025e3b19-d738-4e29-80ca-5c8ed24f3d9e"
          }
        },
        {
          "label": "Sport-Meetings",
          "goto": {
            "node": "e26c2ac7-0ccf-4a69-8ca7-3415a818d7d2"
          }
        },
        {
          "label": "Podcast Bewerbung",
          "goto": {
            "node": "5dab3665-7d9a-4acf-af10-915aa3525170"
          }
        },
        {
          "label": "Arbeit bei Lebenplus",
          "goto": {
            "node": "af66b197-2cb4-4a94-ab66-490ad7c6d483"
          }
        },
        {
          "label": "zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #125
    {
      "id": "12f191e5-2db0-47c3-9636-2b08ff4a2b22",
      "type": "message",
      "text": "Hier kommt Ihr zum offiziellen Groundzero-Kanal: Updates, wichtige Themen und der meiste Content – alles an einem Ort.\n\n<<inline-button-anchor:9075111f-36d2-4033-8ec2-8875a245fe59>>",
      "next": null
    },
    // Send Message #126
    {
      "id": "0594112f-b5d7-4105-90cf-f14c9854c63c",
      "type": "message",
      "text": "Lebenplus Netzwerk-Event Schweiz \n(vor Ort)\n\nDu lebst bereits in der Schweiz?\nOder planst gerade den Schritt hierher?\n\nWir bringen die Lebenplus Community zusammen –\nfür echten Austausch, ehrliche Gespräche & neue Kontakte.\n\n📍 Ort & Datum werden aktuell geplant\n(abhängig von Region & Anzahl der Anmeldungen)\n\n👉 Jetzt unverbindlich anmelden\n<<inline-button-anchor:747fa4e0-5cd8-4af8-88fb-d4c3f4f9a751>>",
      "next": null
    },
    // Send Message #8
    {
      "id": "3a55542f-f8be-4974-a487-de4ada865db7",
      "type": "message",
      "text": "Dieser Bereich ist gerade noch im Aufbau:\n\nEugen hier: Hiermit stelle ich euch das Motivationsmaterial zur Verfügung, welches wir für Euch erstellt haben, um euch einen Einblick in unser Leben hier zu geben. Gleichzeitig behandeln wir hier weitere Themen, die wir kaum oder gar nicht in unserem Podcast angesprochen haben, wie zum Beispiel:\n\n- Angst vor der Auswanderung\n- Angst vor einem Neustart in einem fremden Land\n- Durchhaltevermögen bei schwierigen Zeiten\n- Selbstprogrammierung \n- Einfluss von Medien auf unsere Entscheidungen\n- Familie & Freunde \n\nund vieles mehr.\n\nIch hätte mir damals vor meiner Auswanderung gewünscht solche Materialien zu haben, da ich vor meiner Auswanderung viele Fragen hatte, die mir keiner so richtig beantworten konnte..\n\nBald sind die Materiallien fertig für euch, habt Geduld wir sind gerade an der Ausarbeitung!",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_b0a8469c5cf2bbd6d603420ffd50b89a.png",
      "buttons": [
        {
          "label": "Zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #129
    {
      "id": "ab9d4540-c68c-4742-83be-9dd0118b3808",
      "type": "message",
      "text": "Coming soon",
      "next": null
    },
    // Send Message #128
    {
      "id": "025e3b19-d738-4e29-80ca-5c8ed24f3d9e",
      "type": "message",
      "text": "Hier geht’s zu allen Groundzero-Chatgruppen 👇",
      "buttons": [
        {
          "label": "Jobs - L1",
          "url": "https://t.me/+ZMxu9z7_Jj9iZmI0"
        },
        {
          "label": "Wohnen - L1",
          "url": "https://t.me/+ZjuXPFAtcCwzOTA0"
        },
        {
          "label": "Selbstständige - L3",
          "url": "https://t.me/+_tH4TJ6Tn1NkNjI8"
        },
        {
          "label": "Eltern - L4",
          "url": "https://t.me/+SEkVf5FSDtE5ZDZk"
        },
        {
          "label": "LPG Core - L5",
          "url": "https://t.me/+4HcsYSheYpZhZGE0"
        }
      ],
      "next": null
    },
    // Send Message #130
    {
      "id": "e26c2ac7-0ccf-4a69-8ca7-3415a818d7d2",
      "type": "message",
      "text": "Es sind auch gemeinsame sportliche Aktivitäten geplant. (coming soon)",
      "next": null
    },
    // Send Message #131
    {
      "id": "5dab3665-7d9a-4acf-af10-915aa3525170",
      "type": "message",
      "text": "Du willst deine Auswanderungsgeschichte erzählen? Dann bewirb dich als Gast für unseren Podcast – wir schauen, ob es thematisch passt, und melden uns bei dir.\n\n<<inline-button-anchor:b92e34d5-8b45-474e-af32-e9eb611d60d6>>",
      "next": null
    },
    // Send Message #41
    {
      "id": "af66b197-2cb4-4a94-ab66-490ad7c6d483",
      "type": "message",
      "text": "Unsere Mission ist es Nr. 1 Podcast in der Schweiz zu werden. \n\nDu kannst uns bei dieser Mission gerne unterstützen, in dem du dich bewirbst für folgende offene Stellen.\n\nBitte beachte, dass du dich erst ab Level 5 bei uns bewerben kannst.",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_cab814646746c3c8ae63461d892cc4d4.png",
      "buttons": [
        {
          "label": "Video Editor",
          "goto": {
            "node": "f2c29bdf-3e60-4d09-ad8e-b5cc88673d34"
          }
        },
        {
          "label": "Data Analyst",
          "goto": {
            "node": "e9ea5312-1c81-4dd0-b015-e02686eac2b3"
          }
        },
        {
          "label": "Social Media Manager",
          "goto": {
            "node": "db06f028-7683-4d5a-800f-195fb4a17170"
          }
        },
        {
          "label": "Automation Expert",
          "goto": {
            "node": "bf50c558-2ec3-463e-a48c-021015f07008"
          }
        },
        {
          "label": "Allrounder",
          "goto": {
            "node": "bc1db045-7d05-4559-b0f5-250664130ebb"
          }
        },
        {
          "label": "Zurück zum Menü",
          "goto": {
            "node": "e9e3edb4-d46d-4e29-9268-a5377f2afbcc"
          }
        }
      ],
      "next": null
    },
    // Send Message #42
    {
      "id": "f2c29bdf-3e60-4d09-ad8e-b5cc88673d34",
      "type": "message",
      "text": "Bald Verfügbar",
      "next": null
    },
    // Send Message #43
    {
      "id": "e9ea5312-1c81-4dd0-b015-e02686eac2b3",
      "type": "message",
      "text": "Bald Verfügbar",
      "next": null
    },
    // Send Message #44
    {
      "id": "db06f028-7683-4d5a-800f-195fb4a17170",
      "type": "message",
      "text": "Bald Verfügbar",
      "next": null
    },
    // Send Message #45
    {
      "id": "bf50c558-2ec3-463e-a48c-021015f07008",
      "type": "message",
      "text": "Bald Verfügbar",
      "next": null
    },
    // Send Message #46
    {
      "id": "bc1db045-7d05-4559-b0f5-250664130ebb",
      "type": "message",
      "text": "Bald Verfügbar",
      "next": null
    },
    // Send Message #37
    {
      "id": "e9e3edb4-d46d-4e29-9268-a5377f2afbcc",
      "type": "message",
      "text": "",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_660e6ec78644bfc3ac13d52dec2a5edf.png",
      "buttons": [
        {
          "label": "Arbeit bei Lebenplus",
          "goto": {
            "node": "27c45b4a-a6a5-431e-8eb8-45d82c384e01"
          }
        },
        {
          "label": "Podcast Bewerbung",
          "goto": {
            "node": "43d99f08-ee15-41f4-a5d5-f67ccf6693ac"
          }
        },
        {
          "label": "1:1-Beratung buchen",
          "goto": {
            "node": "4c706fdd-2b30-4609-9bf6-34434f912834"
          }
        },
        {
          "label": "Events",
          "goto": {
            "node": "b2f4e67c-4e51-418f-92d4-e0f2692d4f71"
          }
        },
        {
          "label": "Kontakt",
          "goto": {
            "node": "ec0705c3-209f-41a3-a087-bff3acb9a11e"
          }
        },
        {
          "label": "Motivation",
          "goto": {
            "node": "5bb54139-cd13-4e29-8bb2-b4f9aa4c88d7"
          }
        },
        {
          "label": "Bewilligungsguide",
          "goto": {
            "node": "9e5a9d42-939c-425d-99af-131bb21db5d4"
          }
        },
        {
          "label": "Zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Condition
    {
      "id": "27c45b4a-a6a5-431e-8eb8-45d82c384e01",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "af66b197-2cb4-4a94-ab66-490ad7c6d483"
      },
      "else": {
        "node": "b57fc36b-301c-45c6-bc4c-709ce7c67bf7"
      }
    },
    // Send Message #1
    {
      "id": "b57fc36b-301c-45c6-bc4c-709ce7c67bf7",
      "type": "message",
      "text": "Du hast aktuell kein aktives Abo.\nWenn du wieder Zugriff möchtest, kannst du es im Zahlungs-Bot verlängern.\nDanach kannst du hier direkt nochmal prüfen.",
      "buttons": [
        {
          "label": "Abo verlängern",
          "url": "https://t.me/lebenplus_bot"
        },
        {
          "label": "Zugriff prüfen",
          "goto": {
            "node": "b2fb0e5b-fb27-4fb2-b409-e870158be721"
          }
        }
      ],
      "next": null
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "b2fb0e5b-fb27-4fb2-b409-e870158be721",
      "type": "end",
      "text": null
    },
    // Condition
    {
      "id": "43d99f08-ee15-41f4-a5d5-f67ccf6693ac",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "59f71fbc-8512-48a8-8938-56e2a98bd8d8"
      },
      "else": {
        "node": "b57fc36b-301c-45c6-bc4c-709ce7c67bf7"
      }
    },
    // Send Message #40
    {
      "id": "59f71fbc-8512-48a8-8938-56e2a98bd8d8",
      "type": "message",
      "text": "Du willst deine Auswanderungsgeschichte erzählen? Dann bewirb dich als Gast für unseren Podcast – wir schauen, ob es thematisch passt, und melden uns bei dir.\n\n<<inline-button-anchor:5486e209-66d5-4ff1-ab21-106d922ca272>>",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_db19315fcc34de9053e461f0db6dcdc9.png",
      "next": null
    },
    // Condition
    {
      "id": "4c706fdd-2b30-4609-9bf6-34434f912834",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "bed4b182-6374-4a3c-b1a6-b84d83b01c6e"
      },
      "else": {
        "node": "b2fb0e5b-fb27-4fb2-b409-e870158be721"
      }
    },
    // Send Message #47
    {
      "id": "bed4b182-6374-4a3c-b1a6-b84d83b01c6e",
      "type": "message",
      "text": "1:1-Beratung mit Lebenplus\n\nViele von euch haben danach gefragt und deswegen möchten wir euch die Möglichkeit bieten, eine persönliche Beratung mit uns zu buchen.\n\nStell uns deine individuelle Situation vor und wir gehen im persönlichen Gespräch mit dir deine Chancen in der Schweiz, Bewerbungsstrategie, Wohnungssuche & nächste Schritte durch.",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_a366be672ec520cf91031d63ed8b7301.png",
      "buttons": [
        {
          "label": "Wie läuft das ab?",
          "goto": {
            "node": "6c367c49-be20-4d91-84bb-38d679b2b207"
          }
        },
        {
          "label": "Zurück zum Menü",
          "goto": {
            "node": "e9e3edb4-d46d-4e29-9268-a5377f2afbcc"
          }
        }
      ],
      "next": null
    },
    // Send Message #48
    {
      "id": "6c367c49-be20-4d91-84bb-38d679b2b207",
      "type": "message",
      "text": "🔹 1. Bewerbung ausfüllen\nDu bewirbst dich über einen kurzen Fragebogen für eine persönliche 60-Minuten-Beratung. So bekommen wir ein klares Bild von deiner Situation und deinem Anliegen.\n\n🔹 2. Persönliche Prüfung\nWir prüfen jede Anfrage individuell. Nicht jede Bewerbung wird angenommen – uns ist wichtig, dass wir dir im Call wirklich weiterhelfen können.\n\n🔹 3. Rückmeldung von uns\nWenn wir deine Anfrage annehmen, melden wir uns bei dir mit allen weiteren Infos zum Ablauf, zur Bezahlung und zur Terminvereinbarung.\n\n🔹 4. Beratungscall\nIm 1:1-Call (z. B. via Zoom oder Google Meet) gehen wir deine Situation Schritt für Schritt durch, bis du Klarheit und einen konkreten Plan hast.\n\nDie Beratung ist <mc-bold>keine kostenlose Erstberatung</mc-bold>. Wir arbeiten nur mit Menschen, die bereit sind, Verantwortung zu übernehmen.\n\nWenn du bereit bist, bewirb dich unten für eine persönliche 60-Minuten-Beratung.",
      "buttons": [
        {
          "label": "Beratung anfragen",
          "url": "https://forms.gle/8uLYCfwEn7iLRatV7"
        }
      ],
      "next": null
    },
    // Condition
    {
      "id": "b2f4e67c-4e51-418f-92d4-e0f2692d4f71",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "cdd8bf87-6e81-4fcf-b2b1-0e10a3181838"
      },
      "else": {
        "node": "b57fc36b-301c-45c6-bc4c-709ce7c67bf7"
      }
    },
    // Send Message #39
    {
      "id": "cdd8bf87-6e81-4fcf-b2b1-0e10a3181838",
      "type": "message",
      "text": "Lebenplus Netzwerk-Event Schweiz \n(vor Ort)\n\nDu lebst bereits in der Schweiz?\nOder planst gerade den Schritt hierher?\n\nWir bringen die Lebenplus Community zusammen –\nfür echten Austausch, ehrliche Gespräche & neue Kontakte.\n\n📍 Ort & Datum werden aktuell geplant\n(abhängig von Region & Anzahl der Anmeldungen)\n\n👉 Jetzt unverbindlich anmelden\n<<inline-button-anchor:e5d1aa3b-8e95-482d-9147-69ee1138e849>>",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_ac506690486f9d33f00db68ef4b3afa9.png",
      "next": null
    },
    // Send Message #38
    {
      "id": "ec0705c3-209f-41a3-a087-bff3acb9a11e",
      "type": "message",
      "text": "Du hast Fragen? Wende dich gerne an:\n\nMail: lebenschweizconsulting@gmail.com\n\nWir werden deine Anfrage zeitnah bearbeiten.",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_f4b8bdd2a6074a88a2b61905b3945429.png",
      "next": null
    },
    // Condition
    {
      "id": "5bb54139-cd13-4e29-8bb2-b4f9aa4c88d7",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "3a55542f-f8be-4974-a487-de4ada865db7"
      },
      "else": {
        "node": "b57fc36b-301c-45c6-bc4c-709ce7c67bf7"
      }
    },
    // Condition
    {
      "id": "9e5a9d42-939c-425d-99af-131bb21db5d4",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "1d6d94de-116b-46f7-960f-652e99583639"
      },
      "else": {
        "node": "b57fc36b-301c-45c6-bc4c-709ce7c67bf7"
      }
    },
    // Send Message #42
    {
      "id": "1d6d94de-116b-46f7-960f-652e99583639",
      "type": "message",
      "text": "Wir haben für euch einen umfassenden Guide erstellt rund um Aufenthaltsbewilligungen in der Schweiz 🇨🇭\n\nDarin erfahrt ihr unter anderem:\n\nWelche Bewilligung (L, B, C) für euch infrage kommt\n\nAb wann ihr als Grenzgänger gilt\n\nWo ihr steuerpflichtig seid\n\nAb wann ihr keine Steuern mehr in Deutschland zahlen müsst\n\nWas ihr beim Wohnsitzwechsel unbedingt beachten solltet\n\nDer Guide hilft euch, typische Fehler zu vermeiden und Klarheit bei einem der wichtigsten Themen der Auswanderung zu bekommen.",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_ab9d00019cddd28be754d6b2deb4f44a.png",
      "buttons": [
        {
          "label": "Bewilligungsberatung",
          "url": "t.me/gehalt_bot/bewilligungsberatung"
        }
      ],
      "next": null
    },
    // Send Message #89
    {
      "id": "c76d6b86-1d8d-4942-a4d5-2f31d858d71a",
      "type": "message",
      "text": "Brauchst du weiterhin Unterstützung bei der Wohnungssuche?",
      "buttons": [
        {
          "label": "Ich brauche Hilfe",
          "goto": {
            "node": "71470c13-cc32-42db-a4e8-20f593e436fe"
          }
        },
        {
          "label": "Ich suche selber",
          "goto": {
            "node": "15c7d361-70fa-4e72-a6f4-9eb5c9c71b7d"
          }
        }
      ],
      "next": null
    },
    // Send Message #58
    {
      "id": "71470c13-cc32-42db-a4e8-20f593e436fe",
      "type": "message",
      "text": "Hier sind folgende Unterstützungsmöglichkeiten, falls du bei der Wohnungssuche nicht weiter kommst oder einen Ratschlag von uns oder der Community benötigst zu deiner speziellen Situation.",
      "buttons": [
        {
          "label": "Community Chatgruppe",
          "goto": {
            "node": "56be8944-4a2d-453e-a861-4ca67c9124b9"
          }
        },
        {
          "label": "Netzwerk Event",
          "goto": {
            "node": "6c7ac770-ea6b-4091-9dd0-b2f9909c8cd2"
          }
        },
        {
          "label": "Persönliche Beratung",
          "goto": {
            "node": "43115d07-5c34-4f7c-9267-139d3bd71c9b"
          }
        }
      ],
      "next": null
    },
    // Send Message #22
    {
      "id": "56be8944-4a2d-453e-a861-4ca67c9124b9",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatgruppe [Wohnen - L1]\n\n<<inline-button-anchor:06f14d29-d0b2-4980-8160-55f64bbca22c>>",
      "next": null
    },
    // Send Message #39
    {
      "id": "6c7ac770-ea6b-4091-9dd0-b2f9909c8cd2",
      "type": "message",
      "text": "Lebenplus Netzwerk-Event Schweiz \n(vor Ort)\n\nDu lebst bereits in der Schweiz?\nOder planst gerade den Schritt hierher?\n\nWir bringen die Lebenplus Community zusammen –\nfür echten Austausch, ehrliche Gespräche & neue Kontakte.\n\n📍 Ort & Datum werden aktuell geplant\n(abhängig von Region & Anzahl der Anmeldungen)\n\n👉 Jetzt unverbindlich anmelden\n<<inline-button-anchor:e4d81488-54dc-4add-9210-5a0f8e256c71>>",
      "next": null
    },
    // Send Message #47
    {
      "id": "43115d07-5c34-4f7c-9267-139d3bd71c9b",
      "type": "message",
      "text": "1:1-Beratung mit Lebenplus\n\nViele von euch haben danach gefragt und deswegen möchten wir euch die Möglichkeit bieten, eine persönliche Beratung mit uns zu buchen.\n\nStell uns deine individuelle Situation vor und wir gehen im persönlichen Gespräch mit dir deine Chancen in der Schweiz, Bewerbungsstrategie, Wohnungssuche & nächste Schritte durch.",
      "buttons": [
        {
          "label": "Wie läuft das ab?",
          "goto": {
            "node": "6c367c49-be20-4d91-84bb-38d679b2b207"
          }
        }
      ],
      "next": null
    },
    // Send Message #90
    {
      "id": "15c7d361-70fa-4e72-a6f4-9eb5c9c71b7d",
      "type": "message",
      "text": "Du wirst weitergeleitet zum Wohnungs-Menü.",
      "buttons": [
        {
          "label": "Weiter",
          "goto": {
            "node": "e303fc04-a5de-4c59-871b-e9fe6673b274"
          }
        }
      ],
      "next": null
    },
    // Send Message #66
    {
      "id": "de764333-6ea1-44a6-9217-66ef75e37778",
      "type": "message",
      "text": "Die Ampel hat \"Gelb\" angezeigt? Glückwünsch, du hast gute Chancen einen Job in der Schweiz zu bekommen.",
      "buttons": [
        {
          "label": "Weiter zur Bewerbung",
          "goto": {
            "node": "0fbe191b-85ed-4dd4-aa06-ba73166cf326"
          }
        }
      ],
      "next": null
    },
    // Send Message #57
    {
      "id": "5bed6b39-4fe8-466d-aa79-dbffd1e0c1fe",
      "type": "message",
      "text": "Wenn die Job-Ampel bei dir \"Rot\" angezeigt hat, wirst du es schwieriger haben in die Schweiz zu kommen. Aber keine Sorge, zusammen mit Lebenplus schaffen wir das gemeinsam.\n\nDer nächste Schritt wäre es herauszufinden, welche Jobs nachgefragt sind und welche die geringste Einstiegsbarriere haben. \n\nPlan B -> Dieser Button führt dich durch genau diese Jobs - was du benötigst, um in diesen Jobs zu arbeiten und liefert dir Informationen zu Gehältern.\n\nUnterstützung -> Dieser Button gibt dir die Möglichkeit einen Rat entweder von uns oder aus der Community zu deiner Situation zu holen.",
      "buttons": [
        {
          "label": "Plan B",
          "goto": {
            "node": "881334dd-a678-4980-9da3-a4aa7163e6e3"
          }
        },
        {
          "label": "Unterstützung ",
          "goto": {
            "node": "fb05a90f-e34f-4322-a273-e20c75c7067a"
          }
        }
      ],
      "next": null
    },
    // Send Message #60
    {
      "id": "881334dd-a678-4980-9da3-a4aa7163e6e3",
      "type": "message",
      "text": "Dann lass uns herausfinden, welchen Beruf du anstreben solltest. Das folgende Übersichtstool gibt dir unter anderem einen Überblick über alle nachgefragte Berufe.\n\n\nSobald du dir einen Überblick verschafft hast, klicke auf \"Weiter\".",
      "buttons": [
        {
          "label": "Gefragte-Jobs CH",
          "goto": {
            "node": "53631196-35ae-444c-b1c8-e798deb3beaa"
          }
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "5e9f0cf8-2714-4fd8-bfaf-a72fe9506238"
          }
        }
      ],
      "next": null
    },
    // Send Message #19
    {
      "id": "53631196-35ae-444c-b1c8-e798deb3beaa",
      "type": "message",
      "text": "Hier sehr ihr die Jobmarktanalyse",
      "buttons": [
        {
          "label": "Jobmarktanalyse",
          "url": "https://jobmarktanalyse.netlify.app"
        }
      ],
      "next": null
    },
    // Send Message #63
    {
      "id": "5e9f0cf8-2714-4fd8-bfaf-a72fe9506238",
      "type": "message",
      "text": "Unter \"Information anfragen\" bekommst du spezifische Informationen zu deinem Beruf wie z. B. Gehälter oder Benefits.\n\nSobald du die Informationen angefragt hast, klicke auf \"Weiter\".",
      "buttons": [
        {
          "label": "Information anfragen",
          "url": "t.me/gehalt_bot/gehaltsrechner"
        },
        {
          "label": "Weiter",
          "goto": {
            "node": "fa167880-394b-49b6-948e-62c35f4001dd"
          }
        }
      ],
      "next": null
    },
    // Send Message #64
    {
      "id": "fa167880-394b-49b6-948e-62c35f4001dd",
      "type": "message",
      "text": "Jetzt wo du sehr gut informiert bist über alle nachgefragten Berufe in der Schweiz -\nWillst du einen dieser Berufe ausüben? \n\nKlicke auf \"Ja\", und du kommst zum Bewerbungs-Vorbereitung.\n\nKlicke auf \"Nein\", und du kommst zurück zur Liste mit den nachgefragten Berufen oder zum Hauptmenü.\n\nKlicke auf \"Keine Ahnung\", und wir oder dir Community helfen die gerne bei deiner Entscheidung.",
      "buttons": [
        {
          "label": "Ja",
          "goto": {
            "node": "0fbe191b-85ed-4dd4-aa06-ba73166cf326"
          }
        },
        {
          "label": "Nein",
          "goto": {
            "node": "a716320d-cd50-4007-be7c-6840d7135246"
          }
        },
        {
          "label": "Keine Ahnung",
          "goto": {
            "node": "fb05a90f-e34f-4322-a273-e20c75c7067a"
          }
        }
      ],
      "next": null
    },
    // Send Message #67
    {
      "id": "a716320d-cd50-4007-be7c-6840d7135246",
      "type": "message",
      "text": "Wenn dir dein ausgewählter Beruf über den du dich informiert hast nicht gefällt, kannst du gerne einen anderen wählen aus der Liste der nachgefragten Berufe oder zurück zum Hauptmenü kommen.",
      "buttons": [
        {
          "label": "Anderen Job wählen",
          "goto": {
            "node": "881334dd-a678-4980-9da3-a4aa7163e6e3"
          }
        },
        {
          "label": "Zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #58
    {
      "id": "fb05a90f-e34f-4322-a273-e20c75c7067a",
      "type": "message",
      "text": "Hier sind folgende Unterstützungsmöglichkeiten, falls du bei der Jobwahl nicht weiter kommst oder einen Ratschlag von uns oder der Community benötigst zu deiner speziellen Situation.",
      "buttons": [
        {
          "label": "Community Chatgruppe",
          "goto": {
            "node": "fee80c9d-0aed-4fec-80e6-299e4ff008ff"
          }
        },
        {
          "label": "Netzwerk Event",
          "goto": {
            "node": "6c7ac770-ea6b-4091-9dd0-b2f9909c8cd2"
          }
        },
        {
          "label": "Persönliche Beratung",
          "goto": {
            "node": "43115d07-5c34-4f7c-9267-139d3bd71c9b"
          }
        }
      ],
      "next": null
    },
    // Send Message #59
    {
      "id": "fee80c9d-0aed-4fec-80e6-299e4ff008ff",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatgruppe [Jobs - L1]:\n\n<<inline-button-anchor:f9f08a9d-2af5-44d9-a754-cdaaea150f5a>>",
      "buttons": [
        {
          "label": "zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #2
    {
      "id": "5bd7f086-e8b4-48e4-8e66-5b0cf384e403",
      "type": "message",
      "text": "",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_8d066877d82bd7e6e3ec50393e0eed10.png",
      "buttons": [
        {
          "label": "Bewerbungsleitfäden",
          "goto": {
            "node": "4a97f943-a0a3-4b14-84f1-1f7a9f6ee926"
          }
        },
        {
          "label": "Bewerbungstraining",
          "goto": {
            "node": "3b0c9110-9cab-44c7-8737-710daa10a82a"
          }
        },
        {
          "label": "Infos zu Berufen",
          "goto": {
            "node": "72c191cc-248a-4157-92a8-d6d9cf49f133"
          }
        },
        {
          "label": "Unterlagen prüfen",
          "goto": {
            "node": "b63a1c1d-11fc-4e94-b8ba-5d570b9bf3d8"
          }
        },
        {
          "label": "zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #53
    {
      "id": "4a97f943-a0a3-4b14-84f1-1f7a9f6ee926",
      "type": "message",
      "text": "Hier findest du deinen Schritt-für-Schritt-Plan für starke Bewerbungsunterlagen, eine erfolgreiche Interviewvorbereitung und viele weitere hilfreiche Tipps.",
      "buttons": [
        {
          "label": "Leitfäden Phase 1",
          "goto": {
            "node": "477fe6b5-cb2c-4c3b-b3e2-0aa9b93a1180"
          }
        },
        {
          "label": "Leitfäden Phase 2",
          "goto": {
            "node": "2c48d2e1-981c-440c-9790-91488254e517"
          }
        },
        {
          "label": "Leitfäden Phase 3",
          "goto": {
            "node": "15822cb4-0f3d-4588-a8d9-d657eac5bde2"
          }
        },
        {
          "label": "Leitfäden Phase 4",
          "goto": {
            "node": "456e60ed-22df-4d24-a5a8-884f5fce6d58"
          }
        },
        {
          "label": "Leitfäden Phase 5",
          "goto": {
            "node": "667f2207-a300-4522-a214-3747e5be8f9e"
          }
        },
        {
          "label": "zurück",
          "goto": {
            "node": "5bd7f086-e8b4-48e4-8e66-5b0cf384e403"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "477fe6b5-cb2c-4c3b-b3e2-0aa9b93a1180",
      "type": "message",
      "text": "Phase 1: Fundament, Mindset & Organisation\nBevor du die erste Bewerbung schreibst, musst du dich selbst organisieren und wissen, was dich antreibt. Das verhindert Burnout und zielloses Suchen.\n\nDiese Inhalte wurden exklusiv für Mitglieder der LebenPlus Community erstellt.\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zu den Leitfäden der nächsten Phase springen.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "4a97f943-a0a3-4b14-84f1-1f7a9f6ee926"
          }
        },
        {
          "label": "weiter zu Phase 2",
          "goto": {
            "node": "2c48d2e1-981c-440c-9790-91488254e517"
          }
        }
      ],
      "next": null
    },
    // Send Message #97
    {
      "id": "2c48d2e1-981c-440c-9790-91488254e517",
      "type": "message",
      "text": "Phase 2: Deine Story & Strategie\nJetzt entwickelst du den Inhalt: Was erzählst du über dich?\n\nDiese Inhalte wurden exklusiv für Mitglieder der LebenPlus Community erstellt.\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zu den Leitfäden der nächsten Phase springen.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "4a97f943-a0a3-4b14-84f1-1f7a9f6ee926"
          }
        },
        {
          "label": "weiter zu Phase 3",
          "goto": {
            "node": "15822cb4-0f3d-4588-a8d9-d657eac5bde2"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "15822cb4-0f3d-4588-a8d9-d657eac5bde2",
      "type": "message",
      "text": "Phase 3: Die Bewerbungsunterlagen (Erstellung & Qualität)\nJetzt wird es handfest: Du erstellst die Dokumente, die du versendest.\n\nDiese Inhalte wurden exklusiv für Mitglieder der LebenPlus Community erstellt.\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zu den Leitfäden der nächsten Phase springen.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "4a97f943-a0a3-4b14-84f1-1f7a9f6ee926"
          }
        },
        {
          "label": "weiter zu Phase 4",
          "goto": {
            "node": "456e60ed-22df-4d24-a5a8-884f5fce6d58"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "456e60ed-22df-4d24-a5a8-884f5fce6d58",
      "type": "message",
      "text": "Phase 4: Interview-Vorbereitung (Strategie & Wissen)\nDu hast eine Einladung! Jetzt geht es an die inhaltliche Vorbereitung.\n\nDiese Inhalte wurden exklusiv für Mitglieder der LebenPlus Community erstellt.\n\nWenn du diese Phase beendet hast, kannst du zurück zur Übersicht gehen oder zu den Leitfäden der nächsten Phase springen.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "4a97f943-a0a3-4b14-84f1-1f7a9f6ee926"
          }
        },
        {
          "label": "weiter zu Phase 5",
          "goto": {
            "node": "667f2207-a300-4522-a214-3747e5be8f9e"
          }
        }
      ],
      "next": null
    },
    // Send Message #55
    {
      "id": "667f2207-a300-4522-a214-3747e5be8f9e",
      "type": "message",
      "text": "Phase 5: Training & Tag X (Übung & Durchführung)\nKurz vor dem Termin: Üben und Checklisten abhaken.\n\nDiese Inhalte wurden exklusiv für Mitglieder der LebenPlus Community erstellt.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "4a97f943-a0a3-4b14-84f1-1f7a9f6ee926"
          }
        }
      ],
      "next": null
    },
    // Condition
    {
      "id": "3b0c9110-9cab-44c7-8737-710daa10a82a",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "54a88baa-7e17-4af5-a30f-6982dd17a0a9"
      },
      "else": {
        "node": "d26bed32-cc8a-4f76-8081-1c2b93d60a2b"
      }
    },
    // Send Message #26
    {
      "id": "54a88baa-7e17-4af5-a30f-6982dd17a0a9",
      "type": "message",
      "text": "Das nächste Online-Bewerbungstraining findet am\n(Datum folgt) statt.\n\nWenn du in der Schweiz einen Job suchst oder wechseln willst, ist das Training Pflicht! \n\nDu lernst:\n✅ Wie Bewerbungen hier aussehen müssen\n✅ Worauf Schweizer Arbeitgeber achten\n✅ Wie du dich im Gespräch top präsentierst\n✅ Und welche Fehler du vermeiden solltest \n\nDas Training ist live & interaktiv – du kannst deine eigenen Unterlagen zeigen und direkt Feedback bekommen.\n\n Hier kannst du dich anmelden:\n<<inline-button-anchor:eef665d2-b41e-463f-a20b-2469426b5a25>>",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "5bd7f086-e8b4-48e4-8e66-5b0cf384e403"
          }
        }
      ],
      "next": null
    },
    // Send Message #1
    {
      "id": "d26bed32-cc8a-4f76-8081-1c2b93d60a2b",
      "type": "message",
      "text": "Du hast aktuell kein aktives Abo.\nWenn du wieder Zugriff möchtest, kannst du es im Zahlungs-Bot verlängern.\nDanach kannst du hier direkt nochmal prüfen.",
      "buttons": [
        {
          "label": "Abo verlängern",
          "url": "https://t.me/lebenplus_bot"
        },
        {
          "label": "Zugriff prüfen",
          "goto": {
            "node": "e1e15e38-1b57-476e-b58e-1befbe120921"
          }
        }
      ],
      "next": null
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "e1e15e38-1b57-476e-b58e-1befbe120921",
      "type": "end",
      "text": null
    },
    // Send Message #71
    {
      "id": "72c191cc-248a-4157-92a8-d6d9cf49f133",
      "type": "message",
      "text": "Hier findest wertvolle Informationen über Gehälter, gefragte Jobs und vieles mehr.",
      "buttons": [
        {
          "label": "Jobmarktanalyse",
          "url": "t.me/gehalt_bot/jobmarktanalyse"
        },
        {
          "label": "Gehaltsrechnermedian",
          "url": "t.me/gehalt_bot/gehaltsrechner"
        },
        {
          "label": "zurück",
          "goto": {
            "node": "5bd7f086-e8b4-48e4-8e66-5b0cf384e403"
          }
        }
      ],
      "next": null
    },
    // Condition
    {
      "id": "b63a1c1d-11fc-4e94-b8ba-5d570b9bf3d8",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "7ee66d37-e65a-450a-8958-115ca32eaa6e"
      },
      "else": {
        "node": "d26bed32-cc8a-4f76-8081-1c2b93d60a2b"
      }
    },
    // Send Message #56
    {
      "id": "7ee66d37-e65a-450a-8958-115ca32eaa6e",
      "type": "message",
      "text": "Wenn du deine Unterlagen fertig gestellt hast und die Bewerbungsleitfäden und optional das Bewerbungstraining durchlaufen bist, ergibt es Sinn deine Unterlagen prüfen zu lassen. \n\nDas Lebenplus-Team übernimmt diese Arbeit für dich und achtet dabei auf aktuelle DSGVO-Richtlinien. Wenn du dich dafür entscheidest deinen Lebenslauf an uns zu senden, wird dieser nach Prüfung durch uns unwiderruflich bei uns gelöscht. \n\nFalls du Fragen hast, wende dich dazu an \"lebenschweizconsulting@gmail.com\"",
      "buttons": [
        {
          "label": "Unterlagen senden",
          "url": "t.me/gehalt_bot/bewerbungsenden"
        }
      ],
      "next": null
    },
    // Send Message #70
    {
      "id": "9bc8d580-d96f-4fdb-987d-99ee84a7471c",
      "type": "message",
      "text": "Mit fertigen Bewerbungsunterlagen kannst du hier direkt mit der Jobsuche starten. Du hast dabei folgende 3 Optionen:\n\n1. Bewerbung über die LebenPlus-Jobbörse\n\n2. Weitergabe deiner Unterlagen an ausgewählte, geprüfte Recruiter, mit denen wir zusammenarbeiten.\n\n3. Bewerbung auf externen Jobbörsen, z. B. jobs.ch\n\nFalls deine Bewerbungsunterlagen noch nicht CH-tauglich sind, empfehlen wir dir, sie zuerst Schweiz-ready zu machen.\nUnter der Rubrik Bewerbungen findest du einen klaren Schritt-für-Schritt-Plan, mit dem du deine Bewerbungsunterlagen gezielt optimieren oder komplett neu erstellen kannst.",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_64b4cbde4a77ebcd554f5f5254d52cb8.png",
      "buttons": [
        {
          "label": "1.LebenplusJobbörse ",
          "goto": {
            "node": "7bb2876a-c462-4c79-b12a-581eae0d6c1d"
          }
        },
        {
          "label": "2. Recruiter-Anfrage",
          "url": "t.me/gehalt_bot/recruiteranfrage"
        },
        {
          "label": "3. Externe Jobbörsen",
          "goto": {
            "node": "89bd2e0b-d311-4ff6-b907-10651660f9de"
          }
        },
        {
          "label": "Bewerbungsguide",
          "goto": {
            "node": "5bd7f086-e8b4-48e4-8e66-5b0cf384e403"
          }
        }
      ],
      "next": null
    },
    // Send Message #73
    {
      "id": "89bd2e0b-d311-4ff6-b907-10651660f9de",
      "type": "message",
      "text": "Eine Übersicht aller wichtigen Jobportale in der Schweiz findest du im folgenden Tool:",
      "buttons": [
        {
          "label": "Job-Portale aufrufen",
          "url": "t.me/gehalt_bot/jobportaleswiss"
        }
      ],
      "next": null
    },
    // Send Message #5
    {
      "id": "c67a91ce-979b-464c-a2c6-c411021a70fd",
      "type": "message",
      "text": "Der erste Schritt ist, herauszufinden, wo du wohnen möchtest.\nDabei unterstützt dich unser Wohnortwahl-Tool, das dir hilft, den passenden Ort für deine Bedürfnisse zu finden.\n\nWenn du bereits weisst, wo du leben möchtest, kannst du direkt mit der Wohnungssuche weitermachen.\nIn unserer eigenen Wohnungsplattform (derzeit noch im Aufbau) sowie über eine kuratierte Liste empfohlener Wohnungsbörsen in der Schweiz findest du passende Inserate.\n\nZusätzlich stellen wir dir ein Bewerbungs-Tool zur Verfügung:\nEs hilft dir beim Erstellen eines überzeugenden Anschreibens und bietet dir eine Checkliste, damit deine Unterlagen vollständig und Schweiz-tauglich sind.",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_0f665352e2116977997cbbd39288375f.png",
      "buttons": [
        {
          "label": "Wohnortwahl-Analyse",
          "url": "t.me/gehalt_bot/wohnortwahlanalyse"
        },
        {
          "label": "Wohnungssuche",
          "goto": {
            "node": "1c1b3a92-a381-4184-83d1-19428e1fc7e0"
          }
        },
        {
          "label": "L+ Wohnungsinserate",
          "goto": {
            "node": "0fe04f47-bdbc-412a-9d82-0dc530e85be8"
          }
        },
        {
          "label": "Kaution",
          "goto": {
            "node": "b6fbe62e-1ece-4b09-9d50-06a40e48c490"
          }
        },
        {
          "label": "Zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #29
    {
      "id": "1c1b3a92-a381-4184-83d1-19428e1fc7e0",
      "type": "message",
      "text": "Wenn du dich in der Schweiz auf eine Wohnung bewirbst, läuft das ganz anders als in Deutschland.\nHier zählt Professionalität – und deine Bewerbungsunterlagen sind dein Aushängeschild. \n\nWas du unbedingt brauchst:\n✅ Kopie deines Ausweises\n✅ Aktueller Betreibungsauszug (Schuldenauskunft)\n✅ Arbeitsvertrag oder Einkommensnachweis\n✅ Bewerbungsformular (vom Vermieter oder der Verwaltung)\n✅ Referenzperson (meist dein vorheriger Vermieter oder Arbeitgeber)\n\nIch sag’s euch ehrlich – die schauen hier wirklich genau hin.\nIn meiner Wohnungssuche hat mein neuer Vermieter damals sogar meinen alten Vermieter angerufen, um sich nach mir zu erkundigen. 😅\nIch erzähl die ganze Story übrigens in unserer Podcast-Folge\n🎙️ „Beste Stadt zum Leben in der Schweiz“ (siehe Link: TBD)\n\nMein Tipp: Wenn du eine Referenz angibst, sag der Person vorher Bescheid, dass sie eventuell angerufen wird.\nDas kommt besser, wenn sie vorbereitet ist – und macht dich gleich vertrauenswürdiger. \n\nUnd falls du unsicher bist, ob deine Unterlagen wirklich komplett sind:\nBei Leben+ haben wir ein Tool entwickelt, mit dem du prüfen kannst, ob du alle wichtigen Dokumente hast.\n\nDu bekommst außerdem:\n\n- eine Übersicht, wo du passende Wohnungsinserate findest\n- einen Anschreiben-Guide, der dir ein passendes Bewerbungsschreiben generiert\n- Checklisten, damit nichts vergessen geht\n\nGerade in Städten wie Zürich oder Luzern, wo sich oft 50 oder mehr Bewerber auf eine Wohnung melden, kann eine saubere und vollständige Bewerbung den entscheidenden Unterschied machen.",
      "buttons": [
        {
          "label": "Wohnungssuche L+Tool",
          "url": "t.me/gehalt_bot/wohnungsfinder"
        },
        {
          "label": "zurück",
          "goto": {
            "node": "c67a91ce-979b-464c-a2c6-c411021a70fd"
          }
        }
      ],
      "next": null
    },
    // Condition
    {
      "id": "0fe04f47-bdbc-412a-9d82-0dc530e85be8",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "ee9bc72d-16d9-41d3-b263-a0c97ee5cdff"
      },
      "else": {
        "node": "a27d8cbb-bbc8-47bf-9f93-da1d81f47d95"
      }
    },
    // Send Message #28
    {
      "id": "ee9bc72d-16d9-41d3-b263-a0c97ee5cdff",
      "type": "message",
      "text": "Wohnung gesucht?\nWir bauen gerade eine eigene Plattform für Kurzzeitwohnungen auf – ideal für die ersten Monate in der Schweiz.\n\nWenn du dringend etwas suchst, schreib uns eine Mail und wir schauen, ob wir dich kurzfristig unterstützen können:\nlebenschweizconsulting@gmail.com\n\nDie Plattform kommt bald. Bitte habe noch etwas gedult.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "c67a91ce-979b-464c-a2c6-c411021a70fd"
          }
        }
      ],
      "next": null
    },
    // Send Message #1
    {
      "id": "a27d8cbb-bbc8-47bf-9f93-da1d81f47d95",
      "type": "message",
      "text": "Du hast aktuell kein aktives Abo.\nWenn du wieder Zugriff möchtest, kannst du es im Zahlungs-Bot verlängern.\nDanach kannst du hier direkt nochmal prüfen.",
      "buttons": [
        {
          "label": "Abo verlängern",
          "url": "https://t.me/lebenplus_bot"
        },
        {
          "label": "Zugriff prüfen",
          "goto": {
            "node": "7ea18c40-463a-43b6-89ca-6b1242112cf4"
          }
        }
      ],
      "next": null
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "7ea18c40-463a-43b6-89ca-6b1242112cf4",
      "type": "end",
      "text": null
    },
    // Send Message #27
    {
      "id": "b6fbe62e-1ece-4b09-9d50-06a40e48c490",
      "type": "message",
      "text": "Eugen hier: Ich weiß, das Thema Mietkaution ist für viele beim Start in der Schweiz ein echter Schock.\n\nIn der Regel wollen Vermieter 1–3 Monatsmieten als Kaution – also schnell mal 5’000–7’000 Franken, die einfach auf einem Konto blockiert sind.\n\nIch hab’s damals anders gelöst:\nIch hab mir eine Mietkautionsversicherung geholt von SwissCaution. (gibt noch andere Anbieter wie GoCaution, etc..)\nIch zahle für meine Wohnung ungefähr 1.100 CHF Miete und dementsprechend beträgt meine Jahresprämie 150 CHF. Je nach dem wieviel deine Wohnung kostet zahlst du nur eine kleine Jahresprämie (so 150–350 Fr.) und behältst dein Geld für Möbel, Umzug etc. für dich.\n\nWichtig: Das ist keine „gratis Lösung“, du kriegst die Prämie nicht zurück – aber du musst eben nicht tausende Franken einfrieren.\n\nWenn du das checken willst, hier ist der Link:\n🔗 Kautionsversicherung jetzt prüfen\n<<inline-button-anchor:1353326c-4d89-47b8-a92b-77cb9e2e7f96>>\n\noder hier:\n<<inline-button-anchor:3f0167a6-8ac2-4472-ac59-243a4d365d9d>>\n\nIch würd’s jedem empfehlen, der gerade neu ankommt oder die Wohnungssuche entspannt angehen will.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "c67a91ce-979b-464c-a2c6-c411021a70fd"
          }
        }
      ],
      "next": null
    },
    // Send Message #1
    {
      "id": "7aba45cc-537e-417f-bb6c-269eeedd05a7",
      "type": "message",
      "text": "",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_cef0cfe4560a87cb0a9711163bf5eaba.png",
      "buttons": [
        {
          "label": "Job Ampel",
          "url": "t.me/gehalt_bot/job_ampel_schweiz"
        },
        {
          "label": "Gehaltsrechner",
          "url": "t.me/gehalt_bot/gehaltsrechner"
        },
        {
          "label": "Brutto-Netto-Rechner",
          "url": "t.me/gehalt_bot/bruttonettorechner"
        },
        {
          "label": "Budget-Rechner",
          "url": "t.me/gehalt_bot/budget_rechner"
        },
        {
          "label": "Versicherungsguide",
          "url": "t.me/gehalt_bot/versicherungsguide"
        },
        {
          "label": "Mietpreis-Rechner",
          "url": "t.me/gehalt_bot/mietpreisrechner"
        },
        {
          "label": "3 Säulen Prinzip",
          "url": "t.me/gehalt_bot/drei_saeulen_prinzip"
        },
        {
          "label": "Weitere Tools",
          "goto": {
            "node": "848169e6-1730-4661-a77c-d41f5161ac52"
          }
        },
        {
          "label": "Zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Condition
    {
      "id": "848169e6-1730-4661-a77c-d41f5161ac52",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "95c0c323-9319-463a-800d-a904b46e7a93"
      },
      "else": {
        "node": "05defa99-03f7-4b05-bf01-ee36f897c77c"
      }
    },
    // Send Message #1
    {
      "id": "95c0c323-9319-463a-800d-a904b46e7a93",
      "type": "message",
      "text": "Hier sind weitere Guides für deine Auswanderung:",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_a7109f4158ab5771c7e738dfb8d4afbd.png",
      "buttons": [
        {
          "label": "Wohnortanalyse",
          "url": "t.me/gehalt_bot/wohnortwahlanalyse"
        },
        {
          "label": "Jobmarktanalyse-Tool",
          "url": "t.me/gehalt_bot/jobmarktanalyse"
        },
        {
          "label": "Gehaltsrechner",
          "url": "t.me/gehalt_bot/gehaltsrechner"
        },
        {
          "label": "Umzugsratgeber",
          "url": "t.me/gehalt_bot/umzugsratgeber"
        },
        {
          "label": "Mietpreisberechnung",
          "url": "t.me/gehalt_bot/mietpreisrechner"
        },
        {
          "label": "Einwand.Checkliste",
          "url": "t.me/gehalt_bot/einwanderungscheckliste"
        },
        {
          "label": "Selbstständigkeit-CH",
          "url": "t.me/gehalt_bot/selbststaendigkeitsguide"
        },
        {
          "label": "Zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        },
        {
          "label": "Bewilligungsguide",
          "url": "t.me/gehalt_bot/bewilligungsberatung"
        },
        {
          "label": "Immo-Invest-Guide",
          "url": "t.me/gehalt_bot/immobilieninvestmentguide"
        },
        {
          "label": "Immokaufpreismonitor",
          "url": "t.me/gehalt_bot/immobilienkaufpreismonitor"
        },
        {
          "label": "Auto-Guide",
          "url": "t.me/gehalt_bot/autoguideswiss"
        },
        {
          "label": "Kitakostenrechner",
          "url": "t.me/gehalt_bot/kitakostenrechner"
        },
        {
          "label": "Zurück zum Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #1
    {
      "id": "05defa99-03f7-4b05-bf01-ee36f897c77c",
      "type": "message",
      "text": "Du hast aktuell kein aktives Abo.\nWenn du wieder Zugriff möchtest, kannst du es im Zahlungs-Bot verlängern.\nDanach kannst du hier direkt nochmal prüfen.",
      "buttons": [
        {
          "label": "Abo verlängern",
          "url": "https://t.me/lebenplus_bot"
        },
        {
          "label": "Zugriff prüfen",
          "goto": {
            "node": "9a858b25-de9b-4ca0-9d8b-2dc352757d29"
          }
        }
      ],
      "next": null
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "9a858b25-de9b-4ca0-9d8b-2dc352757d29",
      "type": "end",
      "text": null
    },
    // Send Message #4
    {
      "id": "f3c17ca9-d4f7-4c91-b28c-4fc2a06e26e6",
      "type": "message",
      "text": "",
      "image": "https://manybot-thumbnails.s3.eu-central-1.amazonaws.com/fb3616447/ca/big_008172905425f7a884b11e04f3c5919a.png",
      "buttons": [
        {
          "label": "Jobs - L1",
          "goto": {
            "node": "f6854daa-3f95-468b-ad68-f77c83afbaf4"
          }
        },
        {
          "label": "Wohnen - L1",
          "goto": {
            "node": "eb916ab2-310e-4af7-9d04-628e166e6db6"
          }
        },
        {
          "label": "Selbstständige - L3",
          "goto": {
            "node": "cb38a24c-f5f3-4169-94d7-339bd3cc3af7"
          }
        },
        {
          "label": "Eltern - L4",
          "goto": {
            "node": "48b9d672-89b7-4dfc-97fc-3d307738d4db"
          }
        },
        {
          "label": "LPG Core - L5",
          "goto": {
            "node": "3bf3718f-10b7-4800-9328-910016771357"
          }
        },
        {
          "label": "Hauptmenü",
          "goto": {
            "node": "e3782805-c16a-4fbc-844b-0fe61078a0c3"
          }
        }
      ],
      "next": null
    },
    // Send Message #21
    {
      "id": "f6854daa-3f95-468b-ad68-f77c83afbaf4",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatgruppe [Jobs - L1]:\n\n<<inline-button-anchor:ca5d0231-c675-413c-a5c2-5df86c26e5c5>>",
      "next": null
    },
    // Condition
    {
      "id": "eb916ab2-310e-4af7-9d04-628e166e6db6",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "65733a71-ec3e-43e6-9ad4-472a555c80f2"
      },
      "else": {
        "node": "846daf39-d08c-47c8-ad7a-21f8e8b1f31d"
      }
    },
    // Send Message #22
    {
      "id": "65733a71-ec3e-43e6-9ad4-472a555c80f2",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatgruppe [Wohnen - L1]\n\n<<inline-button-anchor:2b6e408f-abc1-4c05-9bf7-7f62114282b1>>",
      "next": null
    },
    // Send Message #1
    {
      "id": "846daf39-d08c-47c8-ad7a-21f8e8b1f31d",
      "type": "message",
      "text": "Du hast aktuell kein aktives Abo.\nWenn du wieder Zugriff möchtest, kannst du es im Zahlungs-Bot verlängern.\nDanach kannst du hier direkt nochmal prüfen.",
      "buttons": [
        {
          "label": "Abo verlängern",
          "url": "https://t.me/lebenplus_bot"
        },
        {
          "label": "Zugriff prüfen",
          "goto": {
            "node": "fca25162-cf02-4886-997e-9c01da95280b"
          }
        }
      ],
      "next": null
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "fca25162-cf02-4886-997e-9c01da95280b",
      "type": "end",
      "text": null
    },
    // Condition
    {
      "id": "cb38a24c-f5f3-4169-94d7-339bd3cc3af7",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "8505cd1f-993e-4844-bbdf-f1ababa79a13"
      },
      "else": {
        "node": "846daf39-d08c-47c8-ad7a-21f8e8b1f31d"
      }
    },
    // Send Message #23
    {
      "id": "8505cd1f-993e-4844-bbdf-f1ababa79a13",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatrgruppe [Selbstständige - L3]:\n\n<<inline-button-anchor:307fc72f-a2a1-43ff-9160-65bdf9455302>>",
      "next": null
    },
    // Condition
    {
      "id": "48b9d672-89b7-4dfc-97fc-3d307738d4db",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "ec4622c0-d784-4ccf-815a-5c465fb215ac"
      },
      "else": {
        "node": "846daf39-d08c-47c8-ad7a-21f8e8b1f31d"
      }
    },
    // Send Message #24
    {
      "id": "ec4622c0-d784-4ccf-815a-5c465fb215ac",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatgrupp [Eltern - L4]\n\n<<inline-button-anchor:3d7b8bb6-23c6-4429-ba07-658b1c48f000>>",
      "next": null
    },
    // Condition
    {
      "id": "3bf3718f-10b7-4800-9328-910016771357",
      "type": "condition",
      "if": {
        "type": "field_is",
        "field": "ActiveSubscription",
        "value": true
      },
      "then": {
        "node": "2ed1eeab-fc30-4366-8bed-3d2f6f0c4f07"
      },
      "else": {
        "node": "846daf39-d08c-47c8-ad7a-21f8e8b1f31d"
      }
    },
    // Send Message #25
    {
      "id": "2ed1eeab-fc30-4366-8bed-3d2f6f0c4f07",
      "type": "message",
      "text": "Über folgenden Link kommst du zur Chatgruppe [LPG Core - L5]:\n\n<<inline-button-anchor:8a2da6c1-bd7a-4f63-b37d-7101ddd1abf1>>",
      "next": null
    },
    // Send Message #20
    {
      "id": "d6c04bf3-c9f1-4a5c-bc6c-56972603dc4c",
      "type": "message",
      "text": "Du wohnst (noch) in Deutschland, willst aber eine Wohnung in der Schweiz besichtigen?\nKein Problem – wir übernehmen das für dich!\n\nSo funktioniert’s:\n1️⃣ Du schickst uns den Link oder die Adresse der Wohnung\n2️⃣ Wir klären mit dem Vermieter, ob eine Vertretungsbesichtigung möglich ist\n3️⃣ Ein Mitglied unseres Teams oder der Community geht für dich hin\n4️⃣ Du bekommst danach Videos, Fotos und ehrliche Eindrücke – so, als wärst du selbst da\n\nIdeal für alle, die noch im Ausland sind oder keine Zeit für den Termin haben.\n\nWenn du magst, fügen wir dir sogar eine neutrale Einschätzung hinzu:\n„Wie ruhig ist es wirklich?“\n„Wie wirkt das Haus, Nachbarschaft, Zustand?“\n\nSo kannst du den Service anfragen:\nKlick auf „Jetzt anfragen“ und sende uns:\n\nDen Link zur Wohnung (z. B. Homegate, Immoscout24 etc.)\n\nDen Termin oder Zeitraum der Besichtigung\n\nDeinen aktuellen Standort / Stadt\n\nWir melden uns innerhalb von 24 h bei dir mit den nächsten Schritten.",
      "buttons": [
        {
          "label": "zurück",
          "goto": {
            "node": "e303fc04-a5de-4c59-871b-e9fe6673b274"
          }
        }
      ],
      "next": null
    },
    // Send Message #31
    {
      "id": "7bb70820-0275-435c-af7e-942fbabdacd0",
      "type": "message",
      "text": "Wir bauen aktuell ein umfassendes Package für eure Einwanderung in die Schweiz auf.\nDarin unterstützen wir euch bei allem, was auf euch zukommt – von Papierkram, Zoll und Umzugsunternehmen über Anmeldung, Versicherungen und weitere Formalitäten.\nWenn ihr nicht alles selbst organisieren möchtet, übernehmen wir das gerne für euch und begleiten euch bei allen Fragen persönlich.\nBei Interesse könnt ihr das Formular gerne schon jetzt ausfüllen.",
      "next": null
    },
    // Start Automation — TODO: Sprungziel aus ManyChat ergänzen
    {
      "id": "b4e4629c-d1ba-4776-9cbe-fe5445f147e7",
      "type": "end",
      "text": null
    }
    ],
  }
];
