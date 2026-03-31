/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  ...(process.env.PAGES_BASE_PATH ? { basePath: process.env.PAGES_BASE_PATH } : {}),
}

module.exports = nextConfig
