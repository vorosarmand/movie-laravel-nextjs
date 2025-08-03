# --- Stage 1: Build the Next.js application ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

RUN npm install

COPY . .

# --- Stage 2: Serve the Next.js application ---
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "dev"]