import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ahtapot - IOC Analyzer Extension',
    short_name: 'Ahtapot',
    description: 'Free IOC Analyzer Browser Extension for Cyber Security and SOC Analysts',
    start_url: '/en/',
    display: 'standalone',
    background_color: '#1A1A1F',
    theme_color: '#1A1A1F',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
