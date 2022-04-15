/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/workouts/:path*',
        destination: 'http://localhost:3000/workouts/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
