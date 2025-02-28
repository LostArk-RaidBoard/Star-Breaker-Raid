/** @type {import('next').NextConfig} */
const nextConfig = {
  // svg 파일 처리 webpack tjfwjd
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  // CORS 문제해결
  async rewrites() {
    return [
      {
        source: '/lostark/:path*',
        destination: 'https://developer-lostark.game.onstove.com/:path*',
      },
    ]
  },

  // 이미지 캐시 및 출처 허용
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-lostark.game.onstove.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload3.inven.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.inven.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 보안을 위해서 헤더 설정 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },

  // env 설정
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,

    // next-auth env
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    GOOGLE_API: process.env.GOOGLE_API,
    API_URL: process.env.API_URL,
    LostArk_Token: process.env.LostArk_Token,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    // TIMEZONE_OFFSET
    TIMEZONE_OFFSET: process.env.TIMEZONE_OFFSET,
  },
}

module.exports = nextConfig
