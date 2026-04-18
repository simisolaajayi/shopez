# ---- Stage 1: install deps ----
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# ---- Stage 2: runtime ----
FROM node:18-alpine
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S app && adduser -S app -G app

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=app:app . .

USER app
EXPOSE 3000
ENV NODE_ENV=production PORT=3000

# Simple healthcheck so K8s/Docker can tell if the app is alive
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]