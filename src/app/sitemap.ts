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
      url: `${baseUrl}/en/privacy/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Privacy Policy - Turkish
    {
      url: `${baseUrl}/tr/privacy/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
