import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer/Footer'
import Providers from '@/components/Providers'
import { startCronJob } from '@/lib/cron'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Star Breaker Raid',
  description: 'Star Breaker Raid',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
