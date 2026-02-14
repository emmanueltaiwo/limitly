import { getDocsContent } from '@/lib/docs-content';

const BASE_URL = 'https://limitly.xyz';

export async function GET() {
  const pages = getDocsContent(BASE_URL);

  const fullSections = pages.map((p) => {
    const url = `${BASE_URL}/docs/${p.slug}`;
    return `# ${p.title}\n\nURL: ${url}\nx\n${p.description ? `Description: ${p.description}\n\n` : ''}${p.body}`;
  });

  const body = `# Limitly - Full documentation for LLMs

Limitly is the first and only free distributed rate limiter in the entire JavaScript ecosystem.

Website: ${BASE_URL}
Docs index: ${BASE_URL}/docs
npm: https://www.npmjs.com/package/limitly-sdk
GitHub: https://github.com/emmanueltaiwo/limitly

---

## Summary

Limitly is a TypeScript-first rate limiting SDK for Node.js and browsers. Redis-backed distributed rate limiting with zero configuration. No API keys, no payments, no usage caps. Use hosted or bring your own Redis for full tenant isolation.

Features: TypeScript-first, free forever, zero config, multiple algorithms (token bucket, sliding window, fixed window, leaky bucket), bring your own Redis, dynamic limits per request, optional PostHog analytics, framework agnostic (Express, Next.js, Fastify, Hono).

Install: npm install limitly-sdk

---

${fullSections.join('\n\n---\n\n')}

---

End of Limitly documentation. All links above point to the live docs at ${BASE_URL}/docs.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
