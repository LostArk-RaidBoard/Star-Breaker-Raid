import HeaderLayout from '@/components/header/HeaderLayout'
import RaidGuideEditor from '@/components/raidGuideField/RaidGuideEditor'
import Section from '@/components/utils/section'
import React from 'react'

export default function RaidGuideCreate() {
  return (
    <>
      <HeaderLayout />
      <Section>
        <main className='flex h-full w-full flex-col items-center gap-4'>
          <RaidGuideEditor />
        </main>
      </Section>
    </>
  )
}
