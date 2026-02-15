FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

# Copy prisma schema and generate
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code and build
COPY src ./src/
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma/
COPY prisma ./prisma/

EXPOSE 3000

CMD ["node", "dist/index.js"]
