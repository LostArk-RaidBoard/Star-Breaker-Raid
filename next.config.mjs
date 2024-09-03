/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  async rewrites() {
    return [
      {
        source: '/lostark/:path*',
        destination: 'https://developer-lostark.game.onstove.com/:path*',
      },
    ]
  },
}

export default nextConfig
