# Use Node.js 18 LTS as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy root package files for workspace support
COPY package.json package-lock.json ./
COPY packages/typescript-config ./packages/typescript-config

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

# Copy TypeScript config package (needed for build) - must be before core
COPY packages/typescript-config ./packages/typescript-config

# Copy core package source files and config
COPY packages/core ./packages/core

# Copy base.json into core package for build (workaround for path resolution)
RUN cp /app/packages/typescript-config/base.json /app/packages/core/tsconfig-base.json

# Create tsconfig.docker.json that extends the local file
RUN cat > /app/packages/core/tsconfig.docker.json << 'EOF'
{
  "extends": "./tsconfig-base.json",
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true,
    "declarationMap": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
EOF

# Build the TypeScript code using the Docker-specific tsconfig
WORKDIR /app/packages/core
RUN npx tsc -p tsconfig.docker.json

# Clean up temporary files
RUN rm /app/packages/core/tsconfig.docker.json /app/packages/core/tsconfig-base.json

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
