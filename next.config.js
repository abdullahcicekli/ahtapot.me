/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
