import HeaderField from '@/components/header/headerField'
import MypageMenu from '@/components/mypageField/mypageMenu'
import Section from '@/components/utils/section'
import React from 'react'

export default function MypageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderField />
      <Section>
        <main className='flex min-h-screen w-full flex-col gap-3 sm:flex-row'>
          <MypageMenu />
          {children}
        </main>
      </Section>
    </>
  )
}
