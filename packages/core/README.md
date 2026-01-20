# @limitly/core

Centralized rate-limiting service using Redis and token bucket algorithm. Built with TypeScript for maximum type safety. This is the core service that powers `limitly-sdk`.

## Features

- **TypeScript-First** - Fully typed with strict type checking
- **Token Bucket Algorithm** - More accurate than fixed window limits
- **Redis-Backed** - Distributed across multiple servers
- **Service Isolation** - Same IP across sites? No collision
- **Dynamic Configuration** - Per-request limits via headers
- **Rate Limit Headers** - Standard `X-RateLimit-*` headers
- **Graceful Degradation** - Works even if Redis is unavailable
- **Atomic Operations** - Lua scripts ensure consistency

## Architecture

Limitly supports two modes:

**Direct Redis Mode (recommended for production):**
```
User Application → limitly-sdk → User's Redis
```
- ✅ Full tenant isolation
- ✅ No collisions with other users
- ✅ Better performance (direct connection)

**HTTP API Mode (development/testing):**
```
User Application → limitly-sdk → HTTP → @limitly/core → Shared Redis
```
- ⚠️ Shares Redis with other users
- ⚠️ Potential collisions if multiple users use same serviceId
- ✅ Works out of the box

- **SDK** - Client library users install
- **Core** - This service (hosted by Limitly, used when no redisUrl provided)
- **Redis** - Stores rate limit state (user's own Redis recommended for production)

## API Endpoints

### Health Check

```bash
GET /api/health
```

Returns service health status and Redis connection state.

### Rate Limit Check

```bash
GET /api/rate-limit
Headers:
  X-Service-Id: service-identifier (optional, prevents cross-site collisions)
  X-Client-Id: user-identifier (optional, falls back to IP)
  X-Rate-Limit-Capacity: number (optional, dynamic capacity)
  X-Rate-Limit-Refill: number (optional, dynamic refill rate)
```

**Response (200):**
```json
{
  "message": "Allowed",
  "limit": 100,
  "remaining": 95,
  "reset": 1234567890000
}
```

**Response (429):**
```json
{
  "message": "Too many requests",
  "limit": 100,
  "remaining": 0,
  "reset": 1234567890000
}
```

**Headers:**
- `X-RateLimit-Limit`: Total limit
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Unix timestamp in seconds when limit resets
- `Retry-After`: Seconds until retry (on 429)

### Analytics Endpoint

```bash
POST /api/analytics
Headers:
  X-Limitly-Analytics-Token: authentication-token
  Content-Type: application/json
Body:
{
  "events": [
    {
      "event": "rate_limit_check",
      "distinct_id": "hashed-identifier",
      "properties": {
        "service_id_hash": "...",
        "client_id_hash": "...",
        "allowed": true,
        "remaining": 95,
        "limit": 100,
        "reset": 1234567890000,
        "sdk_version": "1.2.0"
      }
    }
  ]
}
```

Accepts batched analytics events from the SDK when users provide their own Redis URL. Events are forwarded to PostHog for usage analytics. All identifiers are hashed for privacy. Rate limited to 100 requests per 10 seconds per IP.

## Rate Limiting Algorithm

Limitly uses the **Token Bucket** algorithm:

- Each user has a "bucket" of tokens
- Each request consumes 1 token
- Tokens refill at a configurable rate (tokens/second)
- More accurate than fixed windows

**Example:** `capacity=100, refillRate=10`
- Initially: 100 requests allowed
- After 1 second: +10 tokens (110 available)
- Smooth, continuous refill

## Default Configuration

- **Capacity**: 100 tokens
- **Refill Rate**: 10 tokens/second
- **TTL**: 1 hour (keys expire after inactivity)

## Service Isolation

Same IP across multiple sites? No problem!

Each service gets isolated rate limits using `X-Service-Id`:

```
Service A: rate_limit:service-a:192.168.1.1
Service B: rate_limit:service-b:192.168.1.1
```

Same IP, different limits per service.

## Edge Cases Handled

1. **Same IP across sites** - Service ID isolation
2. **Redis unavailable** - Graceful degradation (allows requests)
3. **Concurrent requests** - Atomic Lua scripts
4. **Config changes** - Dynamic per-request configuration
5. **Missing identifiers** - Falls back to IP address
6. **Tenant isolation** - Users should provide their own Redis URL for full isolation (recommended for production)

## Deployment

### Railway

This package includes a Dockerfile for deployment on Railway.

**Prerequisites:**
- Railway account
- Redis instance (Railway provides Redis addon)

**Setup Steps:**

1. **Create a new Railway project** and connect your repository

2. **Configure build settings (IMPORTANT):**
   - **Root Directory:** Must be set to `/` (repository root)
     - Go to your service → Settings → Build
     - Set "Root Directory" to `/` (the root of your repository)
   - **Dockerfile Path:** `packages/core/Dockerfile`
   - **Note:** The build context MUST be the repository root, not `packages/core/`, because the Dockerfile needs access to the root `package.json` and workspace structure.

3. **Set environment variables:**
   - `PORT`: Railway will set this automatically
   - `REDIS_URL`: Your Redis connection string (from Railway Redis addon)
   - `NODE_ENV`: `production`

4. **Deploy:** Railway will automatically build and deploy

## License

ISC
