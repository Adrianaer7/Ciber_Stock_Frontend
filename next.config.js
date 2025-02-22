/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: process.env.backendURL
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
}
module.exports = nextConfig
