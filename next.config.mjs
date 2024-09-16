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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-lostark.game.onstove.com', // 여기서 원하는 호스트명 삽입
        port: '',
        pathname: '/**', // 모든 경로를 포함
      },
    ],
  },
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
}

export default nextConfig
