# --- Stage 1: install deps (include dev for build) ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: build Next.js app ---
FROM node:20-alpine AS build
WORKDIR /app
# Next/SWC native binaries need this on Alpine
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# --- Stage 3: run Next.js server ---
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production

# Ensure outbound HTTPS (SendGrid) works + SWC compatibility
RUN apk add --no-cache ca-certificates libc6-compat

# Copy only what's needed at runtime
COPY --from=build /app/package*.json ./
# Install only production deps for a lean image
RUN npm ci --omit=dev

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./next.config.js

# Elastic Beanstalk single-container maps host:80 -> container:80
EXPOSE 80
# Start Next on port 80
CMD ["sh","-c","npx next start -p 80"]
