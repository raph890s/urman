/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr'],
  },
};

module.exports = nextConfig;
