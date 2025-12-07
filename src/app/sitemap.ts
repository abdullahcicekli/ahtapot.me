import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ahtapot.me';
  const lastModified = new Date();

  return [
    // Main pages - English
    {
      url: `${baseUrl}/en/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Main pages - Turkish
    {
      url: `${baseUrl}/tr/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Privacy Policy - English
    {
      url: `${baseUrl}/en/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Privacy Policy - Turkish
    {
      url: `${baseUrl}/tr/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Section anchors for better crawling - English
    {
      url: `${baseUrl}/en/#features`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/#how-it-works`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/#ai-analysis`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/#providers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/#testimonials`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/#feedback`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Section anchors - Turkish
    {
      url: `${baseUrl}/tr/#features`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tr/#how-it-works`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tr/#ai-analysis`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tr/#providers`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tr/#testimonials`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tr/#feedback`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
