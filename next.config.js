/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  turbopack: {
    root: ".",
  },
};

module.exports = nextConfig;
