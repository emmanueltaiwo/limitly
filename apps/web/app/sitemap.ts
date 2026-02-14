import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const BASE_URL = 'https://limitly.xyz';

export default function sitemap(): MetadataRoute.Sitemap {
  const docParams = source.generateParams();

  const docUrls: MetadataRoute.Sitemap = docParams.map(({ slug }) => ({
    url: `${BASE_URL}/docs/${slug.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: slug.length === 1 ? 0.9 : 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/llms-full.txt`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...docUrls];
}
