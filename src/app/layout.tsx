import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer/Footer'
import Providers from '@/components/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

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
    <html lang='ko' className={`${inter.variable} ${roboto_mono.variable}`}>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#121826' />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
