import HeaderField from '@/components/header/headerField'
import MainField from '@/components/MainField/MainField'
import React from 'react'
import Section from '@/components/utils/section'

export default function Home() {
  return (
    <>
      <HeaderField />
      <Section>
        <main className='z-0 flex min-h-screen w-full flex-col items-center'>
          <MainField />
        </main>
      </Section>
    </>
  )
}
