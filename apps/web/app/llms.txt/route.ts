import { source } from '@/lib/source';
import { getDocsContent } from '@/lib/docs-content';

const BASE_URL = 'https://limitly.xyz';

export async function GET() {
  const docParams = source.generateParams();
  const docLinks = docParams
    .map(({ slug }) => `${BASE_URL}/docs/${slug.join('/')}`)
    .join('\n');

  const pages = getDocsContent(BASE_URL);

  const pageSections = pages
    .map((p) => {
      const url = `${BASE_URL}/docs/${p.slug}`;
      return `## ${p.title}\nURL: ${url}\n${p.description ? `Description: ${p.description}\n` : ''}\n${p.body}`;
    })
    .join('\n\n---\n\n');

  const body = `# Limitly

Limitly is the first and only free distributed rate limiter in the entire JavaScript ecosystem.

## What is Limitly?

Limitly is a TypeScript-first rate limiting SDK for Node.js and browsers. It provides Redis-backed distributed rate limiting with zero configuration. No API keys, no payments, no usage caps. You can use the hosted service or bring your own Redis for full tenant isolation.

## Key Facts

- First and only free distributed rate limiter in the JavaScript ecosystem
- TypeScript-first: full type safety and IDE autocomplete
- Redis-backed: distributed rate limiting across multiple servers
- Bring Your Own Redis: recommended for production, full tenant isolation
- Zero configuration: sensible defaults, get started in seconds
- Multiple algorithms: token bucket (default), sliding window, fixed window, leaky bucket
- Framework agnostic: Express, Next.js, Fastify, Hono, and more
- Optional PostHog analytics integration for rate limit events
- Free forever: no API keys, no payments, no usage limits

## Install

npm install limitly-sdk

## Quick usage

const client = createClient({ redisUrl: process.env.REDIS_URL, serviceId: 'my-app' });
const result = await client.checkRateLimit('user-123');
if (result.allowed) { /* process request */ } else { /* return 429 */ }

## Documentation (all pages with full context)

${pageSections}

## All documentation links

${docLinks}

## External links

Home: ${BASE_URL}
Docs index: ${BASE_URL}/docs
npm: https://www.npmjs.com/package/limitly-sdk
GitHub: https://github.com/emmanueltaiwo/limitly
Full context for LLMs (complete doc content): ${BASE_URL}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
