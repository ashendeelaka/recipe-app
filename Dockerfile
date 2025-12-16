# 1. Base image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy source code
COPY . .

# 6. Build Next.js app
RUN npm run build

# -------------------------

# 7. Production image
FROM node:18-alpine

WORKDIR /app

# 8. Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# 9. Expose port
EXPOSE 3000

# 10. Start Next.js app
CMD ["npm", "start"]
