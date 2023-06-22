/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org'],
  },
}
