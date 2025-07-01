/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Support both App Router and Pages Router
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Compression
  compress: true,
  // Power by header
  poweredByHeader: false,
  // Generate ETags
  generateEtags: true,
  // Trailing slash
  trailingSlash: false,
  // Redirects
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },
  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add any custom webpack configuration here
    return config;
  },
};

module.exports = nextConfig;