# limitly-sdk

The best **TypeScript-first** rate limiting SDK for Node.js and browser applications. Free, fast, feature-rich, and fully type-safe.

## Why Limitly?

✅ **TypeScript-First** - Built with TypeScript from the ground up. Full type safety and excellent IDE support  
✅ **Free** - No API keys or payments required  
✅ **Distributed** - Redis-backed for multi-server deployments  
✅ **Bring Your Own Redis** - Optional Redis URL for full tenant isolation  
✅ **Multiple Algorithms** - Token bucket, sliding window, fixed window, and leaky bucket  
✅ **Rate Limit Headers** - Standard `X-RateLimit-*` headers included  
✅ **Dynamic Configuration** - Per-route limits without redeployment  
✅ **Service Isolation** - Same IP across sites? No problem  
✅ **Graceful Degradation** - Works even if Redis is down  
✅ **Zero Config** - Works out of the box

## Installation

```bash
npm install limitly-sdk
```

## Quick Start

**Recommended: Use your own Redis for full tenant isolation**

```typescript
import { createClient } from 'limitly-sdk';

// Use your own Redis (recommended for production)
const client = createClient({
  redisUrl: 'redis://localhost:6379', // or your Redis URL
  serviceId: 'my-app',
});

// Next.js App Router example
export async function GET(request: Request) {
  const userId = request.headers.get('x-user-id') || 'unknown';
  const result = await client.checkRateLimit(userId);

  if (!result.allowed) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Process request...
  return Response.json({ success: true });
}
```

**Without Redis URL (uses hosted service):**

```typescript
// ⚠️ Note: Without redisUrl, you share Redis with other users
// If multiple users use the same serviceId, they may collide
const client = createClient({ serviceId: 'my-app' });
```

## Features

### 1. Bring Your Own Redis (Recommended)

**Use your own Redis for full tenant isolation and production deployments.**

```typescript
import { createClient } from 'limitly-sdk';

// Recommended: Use your own Redis
const client = createClient({
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  serviceId: 'my-app',
});

// All rate limit data stored in your Redis - no collisions with other users
const result = await client.checkRateLimit('user-123');
```

**Why use your own Redis?**

- ✅ **Full tenant isolation** - No collisions with other Limitly users
- ✅ **Data privacy** - Your rate limit data stays in your Redis
- ✅ **Better performance** - Direct Redis connection (no HTTP overhead)
- ✅ **Production ready** - Recommended for production deployments

**Without `redisUrl` (HTTP API mode):**

- ⚠️ Shares hosted Redis with other users
- ⚠️ Potential collisions if multiple users use the same `serviceId`
- ✅ Works out of the box with zero configuration
- ✅ Good for development and testing

### 2. Rate Limit Headers

Get standard rate limit information in headers:

```typescript
const result = await client.checkRateLimit('user-123');
// result.limit - total limit
// result.remaining - requests remaining
// result.reset - timestamp when limit resets
```

### 3. Service Isolation

Prevent cross-site collisions with service IDs:

```typescript
import { createClient } from 'limitly-sdk';

// Recommended: Use with your own Redis
const client = createClient({
  redisUrl: process.env.REDIS_URL,
  serviceId: 'my-app-production',
});

// Same IP across multiple apps? Each app has isolated limits
const result = await client.checkRateLimit('user-123');
```

### 4. Multiple Rate Limiting Algorithms

Choose the algorithm that fits your use case:

```typescript
// Token bucket (default) - smooth, continuous refill
const client = createClient({
  redisUrl: process.env.REDIS_URL,
  algorithm: 'token-bucket', // default
});

// Sliding window - smooth limits with better accuracy
const client = createClient({
  redisUrl: process.env.REDIS_URL,
  algorithm: 'sliding-window',
});

// Fixed window - simple, predictable limits
const client = createClient({
  redisUrl: process.env.REDIS_URL,
  algorithm: 'fixed-window',
});

// Leaky bucket - traffic shaping and burst smoothing
const client = createClient({
  redisUrl: process.env.REDIS_URL,
  algorithm: 'leaky-bucket',
});

// Per-request algorithm override
await client.checkRateLimit({
  identifier: 'user-123',
  algorithm: 'sliding-window',
  limit: 100,
  windowSize: 60000, // 60 seconds
});
```

### 5. Dynamic Configuration

Set limits per request without code changes:

```typescript
const result = await client.checkRateLimit({
  identifier: 'user-123',
  capacity: 50, // 50 requests (token bucket/leaky bucket)
  refillRate: 5, // refill 5 per second (token bucket)
  limit: 100, // 100 requests (sliding/fixed window)
  windowSize: 60000, // 60 second window (sliding/fixed window)
  leakRate: 10, // leak 10 per second (leaky bucket)
});
```

### 6. Skip Conditions

Skip rate limiting for specific requests:

```typescript
const result = await client.checkRateLimit({
  identifier: 'user-123',
  skip: req.user?.isPremium || false,
});
```

### 7. PostHog Analytics Integration

Send rate limit events directly to your PostHog instance:

```typescript
import { createClient } from 'limitly-sdk';

const client = createClient({
  redisUrl: process.env.REDIS_URL,
  serviceId: 'my-app',
  posthog: {
    apiKey: process.env.POSTHOG_API_KEY!,
    host: 'https://app.posthog.com', // optional
  },
});

// Events are automatically sent to your PostHog with actual identifiers
const result = await client.checkRateLimit('user-123');
```

**How it works:**

- Events are sent to your PostHog instance with actual `serviceId` and `clientId` (not hashed)
- Events are also sent to Limitly's analytics endpoint (if `enableSystemAnalytics` is true) with hashed identifiers
- Both happen asynchronously and failures don't affect rate limiting
- Events tracked: `rate_limit_check`, `rate_limit_allowed`, `rate_limit_denied`

**Benefits:**

- Track your own analytics in PostHog
- See actual user IDs and service IDs (not hashed)
- Build custom dashboards and insights
- Works with direct Redis mode (when using `redisUrl`)

### 8. Express.js Middleware

```typescript
import express from 'express';
import { createClient } from 'limitly-sdk';

const app = express();
const client = createClient({ serviceId: 'my-api' });

app.use(async (req, res, next) => {
  const result = await client.checkRateLimit({
    identifier: req.user?.id || req.ip,
    capacity: 100,
    refillRate: 10,
  });

  if (!result.allowed) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
    });
  }

  res.setHeader('X-RateLimit-Limit', result.limit?.toString() || '');
  res.setHeader('X-RateLimit-Remaining', result.remaining?.toString() || '');
  res.setHeader(
    'X-RateLimit-Reset',
    result.reset ? Math.ceil(result.reset / 1000).toString() : ''
  );

  next();
});
```

## API

### `createClient(config?: LimitlyConfig)`

Creates a new Limitly client instance.

**Config options:**

- `redisUrl` (string, optional): **Recommended for production.** Redis connection URL for direct Redis mode. If provided, SDK connects directly to your Redis for full tenant isolation. If not provided, uses HTTP API mode (shares hosted Redis with other users).
- `serviceId` (string, optional): Isolate rate limits per service
- `algorithm` (string, optional): Rate limiting algorithm to use. Options: `'token-bucket'` (default), `'sliding-window'`, `'fixed-window'`, `'leaky-bucket'`
- `baseUrl` (string, optional): Base URL of the Limitly API service (default: https://api.limitly.emmanueltaiwo.dev). Only used when `redisUrl` is not provided.
- `timeout` (number, optional): Request timeout in ms (default: 5000)
- `enableSystemAnalytics` (boolean, optional): Enable system analytics tracking (default: true). When enabled, usage metrics are sent to Limitly for service improvement. All identifiers are hashed for privacy.
- `posthog` (object, optional): PostHog configuration to send events directly to your PostHog instance. Events include actual identifiers (not hashed) for your analytics.
  - `apiKey` (string, required): Your PostHog API key
  - `host` (string, optional): PostHog host (default: https://app.posthog.com)

**Example with Redis (recommended):**

```typescript
const client = createClient({
  redisUrl: 'redis://localhost:6379',
  serviceId: 'my-app',
});
```

**Example without Redis (development/testing):**

```typescript
// ⚠️ Shares hosted Redis - may collide with other users
const client = createClient({
  serviceId: 'my-app',
});
```

### `client.checkRateLimit(options?: RateLimitOptions | string)`

Checks if a request is allowed based on rate limits.

**Options:**

- `identifier` (string, optional): User ID, IP, or other identifier
- `serviceId` (string, optional): Override default service ID
- `algorithm` (string, optional): Override algorithm for this request (`'token-bucket'`, `'sliding-window'`, `'fixed-window'`, `'leaky-bucket'`)
- `capacity` (number, optional): Override default capacity (for token bucket/leaky bucket)
- `refillRate` (number, optional): Override default refill rate (tokens/sec, for token bucket)
- `limit` (number, optional): Override default limit (for sliding/fixed window)
- `windowSize` (number, optional): Override window size in milliseconds (for sliding/fixed window)
- `leakRate` (number, optional): Override leak rate (for leaky bucket)
- `skip` (boolean, optional): Skip rate limiting for this request

**Returns:**

```typescript
{
  allowed: boolean;
  message?: string;
  limit?: number;      // Total limit
  remaining?: number;  // Requests remaining
  reset?: number;      // Unix timestamp (ms) when limit resets
}
```

## Advanced Examples

### Per-Route Limits

```typescript
app.post('/api/login', async (req, res) => {
  const result = await checkLimit({
    identifier: req.ip,
    capacity: 5, // Only 5 login attempts
    refillRate: 0.1, // Refill 1 every 10 seconds
  });

  if (!result.allowed) {
    return res.status(429).json({ error: 'Too many login attempts' });
  }

  // Login logic...
});

app.get('/api/data', async (req, res) => {
  const result = await checkLimit({
    identifier: req.user?.id,
    capacity: 1000, // More generous limit
    refillRate: 100, // Faster refill
  });

  // Data fetching logic...
});
```

### Premium vs Free Users (Next.js App Router)

```typescript
// middleware.ts
import { createClient } from 'limitly-sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = createClient({ serviceId: 'my-app' });

export async function middleware(request: NextRequest) {
  // Get user from your auth system
  const user = await getUser(request); // Your auth logic
  const isPremium = user?.plan === 'premium';

  const result = await client.checkRateLimit({
    identifier: user?.id || request.ip || 'unknown',
    capacity: isPremium ? 1000 : 100,
    refillRate: isPremium ? 100 : 10,
    skip: user?.isAdmin || false,
  });

  if (!result.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

## vs express-rate-limit

| Feature              | express-rate-limit | Limitly                |
| -------------------- | ------------------ | ---------------------- |
| TypeScript Support   | ❌                 | ✅ (TypeScript-first)  |
| Type Safety          | ❌                 | ✅ (Full type exports) |
| IntelliSense         | ❌                 | ✅ (JSDoc + types)     |
| Free                 | ✅                 | ✅                     |
| Distributed          | ❌                 | ✅ (Redis)             |
| Token Bucket         | ❌                 | ✅                     |
| Dynamic Limits       | ❌                 | ✅                     |
| Service Isolation    | ❌                 | ✅                     |
| Rate Limit Headers   | ❌ (manual)        | ✅ (automatic)         |
| Graceful Degradation | ❌                 | ✅                     |
| Zero Config          | ✅                 | ✅                     |

## TypeScript Support

Limitly is built with TypeScript-first principles:

- **Full Type Exports** - All interfaces exported for your use
- **IntelliSense** - Complete autocomplete in VS Code and other editors
- **Type Safety** - Catch errors at compile time, not runtime
- **JSDoc Comments** - Hover documentation for every function

```typescript
import type { LimitlyConfig, LimitlyResponse } from 'limitly-sdk';

// Fully typed configuration
const config: LimitlyConfig = {
  serviceId: 'my-app',
  redisUrl: 'redis://localhost:6379',
  timeout: 5000,
  posthog: {
    apiKey: process.env.POSTHOG_API_KEY!,
  },
};

const client = createClient(config);

// Type-safe response
const result: LimitlyResponse = await client.checkRateLimit('user-123');
// TypeScript knows: result.allowed is boolean
// TypeScript knows: result.remaining is number | undefined
```

## License

ISC
