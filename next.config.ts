import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Im Dev-Modus blockiert Next den Zugriff auf seine eigenen Ressourcen
   * (u. a. /_next/hmr) von fremden Hosts. Ohne Freigabe lädt die Seite zwar,
   * das Client-JS hydriert aber nicht — man sieht alles und kann nichts klicken.
   *
   * Hier stehen die Adressen, unter denen der Dev-Server im lokalen Netz
   * erreichbar sein soll. Weitere Geräte per Umgebungsvariable ergänzen:
   *   DEV_ORIGINS=192.168.178.50,mein-laptop.local npm run dev
   *
   * Betrifft ausschließlich `next dev` — im Production-Build gibt es die
   * Einschränkung nicht.
   */
  allowedDevOrigins: [
    "192.168.178.35",
    ...(process.env.DEV_ORIGINS?.split(",").map((h) => h.trim()).filter(Boolean) ?? []),
  ],
};

export default nextConfig;
