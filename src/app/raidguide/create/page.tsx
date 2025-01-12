import HeaderField from '@/components/header/headerField'
import RaidGuideCreateField from '@/components/raidGuideField/raidGuideCreateField'
import Section from '@/components/utils/section'
import React from 'react'

export default function RaidGuideCreate() {
  return (
    <>
      <HeaderField />
      <Section>
        <main className='flex h-full w-full flex-col items-center gap-4'>
          <RaidGuideCreateField />
        </main>
      </Section>
    </>
  )
}
