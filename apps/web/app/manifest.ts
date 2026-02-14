import type { MetadataRoute } from 'next';

const BASE_URL = 'https://limitly.xyz';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Limitly - Free Distributed Rate Limiting SDK',
    short_name: 'Limitly',
    description:
      'The first and only free distributed rate limiter in the JavaScript ecosystem. TypeScript-first, Redis-backed, zero config. Protect your APIs with token bucket, sliding window, fixed window, and leaky bucket algorithms.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#f59e0b',
    orientation: 'portrait-primary',
    scope: '/',
    id: 'limitly',
    categories: ['developer tools', 'productivity'],
    icons: [
      {
        src: '/limitly-logo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [],
    related_applications: [],
    prefer_related_applications: false,
    lang: 'en',
    dir: 'ltr',
  };
}
