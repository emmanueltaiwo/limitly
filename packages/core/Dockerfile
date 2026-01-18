# Use Node.js 18 LTS as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy root package files for workspace support
COPY package.json package-lock.json ./

# Copy core package files
COPY packages/core/package.json ./packages/core/

# Install dependencies (using npm ci for reproducible builds)
# Install all workspace dependencies
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy core package source files and config
COPY packages/core ./packages/core

# Build the TypeScript code
WORKDIR /app/packages/core
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Copy only production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/packages/core/dist ./packages/core/dist
COPY --from=builder /app/packages/core/package.json ./packages/core/package.json

# Expose port (Railway will set PORT env var)
EXPOSE 5000

# Set working directory to core package
WORKDIR /app/packages/core

# Start the application
CMD ["npm", "start"]
