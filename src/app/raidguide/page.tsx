import HeaderField from '@/components/header/headerField'
import RaidGuideField from '@/components/raidGuideField/raidGuideField'
import Section from '@/components/utils/section'
import React from 'react'

export default function RaidGuide() {
  return (
    <>
      <HeaderField />
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <RaidGuideField />
        </main>
      </Section>
    </>
  )
}
