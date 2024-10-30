/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true, // Enable source maps for production

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '', // Optional, leave empty for default ports (80 for http and 443 for https)
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:all*(jpg|jpeg|png|gif|webp|svg|ico|css|js)', // Match image, CSS, JS, etc.
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  webpack(config, { dev, isServer }) {
    if (!dev) {
      config.devtool = 'source-map'; // Generate source maps in production builds
    }
    return config;
  },
};

export default nextConfig;
