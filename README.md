# Limitly

**Free, fast, and feature-rich rate limiting for Node.js and browsers.**

Limitly is a centralized rate-limiting service using Redis and token bucket algorithm, designed to operate across distributed services with graceful degradation and real-time metrics.

## Features

- ⚡ **TypeScript-First** - Fully typed with excellent IDE support
- 🆓 **Free Forever** - No API keys, no payments, no limits
- 🚀 **Distributed** - Redis-backed for multi-server deployments
- 🔐 **Bring Your Own Redis** - Optional Redis URL for full tenant isolation
- ⚙️ **Token Bucket** - More accurate than fixed window limits
- 🔒 **Service Isolation** - Same IP across sites? No problem
- 🎯 **Dynamic Config** - Per-request limits without redeployment
- 📊 **Rate Limit Headers** - Standard `X-RateLimit-*` headers
- 🛡️ **Graceful Degradation** - Works even if Redis is down
- ⚡ **Zero Config** - Works out of the box

## Quick Start

```bash
npm install limitly-sdk
```

**Recommended: Use your own Redis for production**

```typescript
import { createClient } from 'limitly-sdk';

// Use your own Redis (recommended for production)
const client = createClient({
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  serviceId: 'my-app'
});

async function handler(req, res) {
  const result = await client.checkRateLimit(req.userId || req.ip);
  
  if (!result.allowed) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  // Process request...
}
```

**Without Redis URL (development/testing):**

```typescript
// ⚠️ Note: Without redisUrl, you share the hosted Redis with other users
// If multiple users use the same serviceId, they may experience collisions
const client = createClient({ serviceId: 'my-app' });
```

**Why bring your own Redis?**
- ✅ Full tenant isolation (no collisions with other users)
- ✅ Data privacy (your rate limit data stays in your Redis)
- ✅ Better performance (direct connection, no HTTP overhead)
- ✅ Production ready (recommended for production deployments)

## Project Structure

This is a [Turborepo](https://turborepo.org) monorepo containing:

### Packages

- **`limitly-sdk`** - TypeScript-first SDK for rate limiting
  - Client library for Node.js and browsers
  - Full type safety and IntelliSense support
  - See [packages/sdk/README.md](./packages/sdk/README.md)

- **`@limitly/core`** - Core rate limiting service
  - Redis-backed token bucket algorithm
  - HTTP API for rate limit checks
  - Graceful degradation and error handling
  - See [packages/core/README.md](./packages/core/README.md)

- **`@repo/ui`** - Shared UI components
  - React components for web app
  - Code blocks, buttons, cards, etc.

- **`@repo/eslint-config`** - Shared ESLint configurations
- **`@repo/typescript-config`** - Shared TypeScript configurations

### Apps

- **`apps/web`** - Marketing website and documentation
  - Landing page at `/`
  - Documentation at `/docs`
  - Built with Next.js 16
  - See [apps/web/README.md](./apps/web/README.md)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start all apps and packages in development mode
npm run dev

# Or use turbo directly
turbo dev
```

### Build

```bash
# Build all packages and apps
npm run build

# Or use turbo directly
turbo build
```

### Run Specific Packages

```bash
# Run only the web app
turbo dev --filter=web

# Build only the SDK
turbo build --filter=limitly-sdk

# Build only the core service
turbo build --filter=@limitly/core
```

## Architecture

**HTTP API Mode (default):**
```
User Application
    ↓
limitly-sdk (installed via npm)
    ↓ HTTP requests
@limitly/core (hosted service)
    ↓
Redis (rate limit storage)
```

**Direct Redis Mode (optional):**
```
User Application
    ↓
limitly-sdk (with redisUrl config)
    ↓
User's Redis (full tenant isolation)
```

1. Users install `limitly-sdk` in their applications
2. If `redisUrl` is provided, SDK connects directly to user's Redis
3. If not provided, SDK makes HTTP requests to the hosted `@limitly/core` service
4. Token bucket algorithm ensures accurate rate limiting
5. Results returned with rate limit headers and metadata

## Packages

### limitly-sdk

The client SDK that users install in their applications.

```bash
cd packages/sdk
npm install
npm run build
```

### @limitly/core

The core rate limiting service (hosted by Limitly).

```bash
cd packages/core
npm install
npm run dev  # Development
npm run build && npm start  # Production
```

### apps/web

The marketing website and documentation.

```bash
cd apps/web
npm install
npm run dev  # Development server on http://localhost:3000
npm run build && npm start  # Production
```

## Tech Stack

- **TypeScript** - Full type safety across all packages
- **Turborepo** - Monorepo build system
- **Next.js 16** - Web app framework
- **Express** - Core service framework
- **Redis** - Rate limit storage
- **Tailwind CSS** - Styling

## Contributing

This is a monorepo managed by Turborepo. When making changes:

1. Make your changes in the relevant package/app
2. Run `npm run build` to verify everything compiles
3. Test your changes locally
4. Submit a pull request

## License

ISC

## Links

- [Documentation](https://limitly.emmanueltaiwo.dev/docs)
- [SDK Package](./packages/sdk/README.md)
- [Core Service](./packages/core/README.md)
- [Web App](./apps/web/README.md)
