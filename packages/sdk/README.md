# limitly-sdk

The best **TypeScript-first** rate limiting SDK for Node.js and browser applications. Free, fast, feature-rich, and fully type-safe.

## Why Limitly?

✅ **TypeScript-First** - Built with TypeScript from the ground up. Full type safety and excellent IDE support  
✅ **Free** - No API keys or payments required  
✅ **Distributed** - Redis-backed for multi-server deployments  
✅ **Token Bucket Algorithm** - More accurate than fixed windows  
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

```typescript
import { rateLimit } from 'limitly-sdk';

const checkLimit = rateLimit();

// In your API endpoint
async function handler(req, res) {
  const result = await checkLimit(req.userId || req.ip);
  
  if (!result.allowed) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  // Process request...
}
```

## Features

### 1. Rate Limit Headers

Get standard rate limit information in headers:

```typescript
const result = await checkLimit('user-123');
// result.limit - total limit
// result.remaining - requests remaining
// result.reset - timestamp when limit resets
```

### 2. Service Isolation

Prevent cross-site collisions with service IDs:

```typescript
import { createClient } from '@limitly/sdk';

const client = createClient({
  serviceId: 'my-app-production'
});

// Same IP across multiple apps? Each app has isolated limits
const result = await client.checkRateLimit('user-123');
```

### 3. Dynamic Configuration

Set limits per request without code changes:

```typescript
const result = await client.checkRateLimit({
  identifier: 'user-123',
  capacity: 50,        // 50 requests
  refillRate: 5        // refill 5 per second
});
```

### 4. Skip Conditions

Skip rate limiting for specific requests:

```typescript
const result = await client.checkRateLimit({
  identifier: 'user-123',
  skip: req.user?.isPremium || false
});
```

### 5. Express.js Middleware

```typescript
import express from 'express';
import { rateLimit } from 'limitly-sdk';

const app = express();
const checkLimit = rateLimit();

app.use(async (req, res, next) => {
  const result = await checkLimit({
    identifier: req.user?.id || req.ip,
    serviceId: 'my-api',
    capacity: 100,
    refillRate: 10
  });
  
  if (!result.allowed) {
    return res.status(429).json({ 
      error: 'Too many requests',
      retryAfter: Math.ceil((result.reset - Date.now()) / 1000)
    });
  }
  
  res.setHeader('X-RateLimit-Limit', result.limit?.toString() || '');
  res.setHeader('X-RateLimit-Remaining', result.remaining?.toString() || '');
  res.setHeader('X-RateLimit-Reset', result.reset ? Math.ceil(result.reset / 1000).toString() : '');
  
  next();
});
```

## API

### `rateLimit(config?: LimitlyConfig)`

Quick helper function that returns an async function to check rate limits.

```typescript
const checkLimit = rateLimit({ serviceId: 'my-app' });
const result = await checkLimit('user-123');
```

### `createClient(config?: LimitlyConfig)`

Creates a new Limitly client instance.

**Config options:**
- `serviceId` (string, optional): Isolate rate limits per service
- `timeout` (number, optional): Request timeout in ms (default: 5000)

### `client.checkRateLimit(options?: RateLimitOptions | string)`

Checks if a request is allowed based on rate limits.

**Options:**
- `identifier` (string, optional): User ID, IP, or other identifier
- `serviceId` (string, optional): Override default service ID
- `capacity` (number, optional): Override default capacity
- `refillRate` (number, optional): Override default refill rate (tokens/sec)
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
    capacity: 5,      // Only 5 login attempts
    refillRate: 0.1   // Refill 1 every 10 seconds
  });
  
  if (!result.allowed) {
    return res.status(429).json({ error: 'Too many login attempts' });
  }
  
  // Login logic...
});

app.get('/api/data', async (req, res) => {
  const result = await checkLimit({
    identifier: req.user?.id,
    capacity: 1000,   // More generous limit
    refillRate: 100   // Faster refill
  });
  
  // Data fetching logic...
});
```

### Premium vs Free Users

```typescript
app.use(async (req, res, next) => {
  const isPremium = req.user?.plan === 'premium';
  
  const result = await checkLimit({
    identifier: req.user?.id || req.ip,
    capacity: isPremium ? 1000 : 100,
    refillRate: isPremium ? 100 : 10,
    skip: req.user?.isAdmin || false
  });
  
  if (!result.allowed) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  next();
});
```

## vs express-rate-limit

| Feature | express-rate-limit | Limitly |
|---------|-------------------|---------|
| TypeScript Support | ❌ | ✅ (TypeScript-first) |
| Type Safety | ❌ | ✅ (Full type exports) |
| IntelliSense | ❌ | ✅ (JSDoc + types) |
| Free | ✅ | ✅ |
| Distributed | ❌ | ✅ (Redis) |
| Token Bucket | ❌ | ✅ |
| Dynamic Limits | ❌ | ✅ |
| Service Isolation | ❌ | ✅ |
| Rate Limit Headers | ❌ (manual) | ✅ (automatic) |
| Graceful Degradation | ❌ | ✅ |
| Zero Config | ✅ | ✅ |

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
  timeout: 5000
};

// Type-safe response
const result: LimitlyResponse = await checkLimit('user-123');
// TypeScript knows: result.allowed is boolean
// TypeScript knows: result.remaining is number | undefined
```

## License

ISC
