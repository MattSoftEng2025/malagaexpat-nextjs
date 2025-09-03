# --- Stage 1: install production dependencies ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# --- Stage 2: build Next.js app ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# --- Stage 3: run Next.js server ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only what's needed for runtime
COPY --from=builder /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Elastic Beanstalk (single-container Docker) requires port 80
EXPOSE 80

# Run Next.js server on port 80
CMD ["sh","-c","npx next start -p 80"]
