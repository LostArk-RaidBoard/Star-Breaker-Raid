import HeaderLayout from '@/components/header/HeaderLayout'
import MypageNavigation from '@/components/mypageField/MypageNavigation'
import Section from '@/components/utils/section'
import React from 'react'

export default function MypageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderLayout />
      <Section>
        <main className='flex min-h-screen w-full flex-col gap-3 sm:flex-row'>
          <MypageNavigation />
          {children}
        </main>
      </Section>
    </>
  )
}
