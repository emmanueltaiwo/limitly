# Use Node.js 18 LTS as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy root package files for workspace support
COPY package.json package-lock.json ./

# Copy all workspace package.json files so npm can properly resolve workspaces
# This ensures npm installs dependencies correctly for the workspace
COPY packages/core/package.json ./packages/core/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install dependencies (using npm ci for reproducible builds)
# Install all workspace dependencies - this hoists them to root node_modules
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy dependencies from deps stage (includes workspace node_modules)
COPY --from=deps /app/node_modules ./node_modules

# Copy workspace package.json files to maintain workspace structure
COPY packages/core/package.json ./packages/core/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Copy core package source files and config
COPY packages/core ./packages/core

# Build the TypeScript code
# TypeScript with moduleResolution: "Node" will look up the directory tree for node_modules
# Since dependencies are hoisted to /app/node_modules, it should find them
WORKDIR /app/packages/core
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy root package files for workspace structure
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Copy workspace package.json files to maintain workspace structure
COPY --from=builder /app/packages/core/package.json ./packages/core/package.json
COPY --from=builder /app/packages/typescript-config/package.json ./packages/typescript-config/package.json

# Install only production dependencies at root level
# This hoists all production deps to /app/node_modules where Node.js can find them
# Using npm install to handle potential lock file sync issues
RUN npm install --omit=dev

# Copy built application
COPY --from=builder /app/packages/core/dist ./packages/core/dist

# Expose port (Railway will set PORT env var)
EXPOSE 5000

# Set working directory to core package
WORKDIR /app/packages/core

# Start the application
CMD ["npm", "start"]
