import HeaderField from '@/components/header/headerField'
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <HeaderField />
      {children}
    </div>
  )
}
