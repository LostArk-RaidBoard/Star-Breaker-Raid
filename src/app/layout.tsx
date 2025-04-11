import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer/Footer'
import Providers from '@/components/Providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Star Breaker Raid',
  description: 'Star Breaker Raid',
  icons: {
    icon: '/logo/favicon.ico',
    shortcut: '/logo/favicon.ico', // 추가
    apple: '/logo/favicon.ico', // 추가 (필요시)
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <head>
        <meta name='theme-color' content='#121826' />
        <meta
          name='google-site-verification'
          content='pGaZ6Nj8h7YrLjp_DIIRuNaDzmxlzishbwTeE_id9Co'
        />
      </head>
      <body className={notoSansKr.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
