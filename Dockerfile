# Production-Image fuer den Web-Chat.
#
# Die App speichert Sessions und Verlauf in SQLite (node:sqlite). Die Datei
# muss deshalb auf einem dauerhaften Volume liegen: der Container schreibt
# nach /data/chat.db, beim Hoster ein Volume unter /data einhaengen.

# node:sqlite ist ab Node 24 ohne Flag stabil.
FROM node:24-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:24-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-slim AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    CHAT_DB_PATH=/data/chat.db

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Laeuft bewusst als root: Hoster wie Railway haengen Volumes root-owned ein,
# ein unprivilegierter User koennte dann nicht nach /data schreiben.
RUN mkdir -p /data
EXPOSE 3000
CMD ["node", "server.js"]
