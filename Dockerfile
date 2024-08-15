FROM node:18-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
RUN npm ci --only=production

# Copy prisma schema and generate
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
