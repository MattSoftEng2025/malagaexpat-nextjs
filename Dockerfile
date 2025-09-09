# --- Stage 1: install deps (include dev for build) ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: build Next.js app ---
FROM node:20-alpine AS builder
WORKDIR /app
# SWC/Next need this on Alpine
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# --- Stage 3: run Next.js server ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# HTTPS to SendGrid + SWC runtime
RUN apk add --no-cache ca-certificates libc6-compat

# Copy only what's needed at runtime
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# EB maps host :80 -> container :80 by default for single-container Docker
EXPOSE 80
CMD ["sh","-c","npx next start -p 80"]
