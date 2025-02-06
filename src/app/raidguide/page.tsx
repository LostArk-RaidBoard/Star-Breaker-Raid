import HeaderLayout from '@/components/header/HeaderLayout'
import RaidGuideDashboard from '@/components/raidGuideField/RaidGuideDashboard'
import Section from '@/components/utils/section'
import React from 'react'

export default function RaidGuide() {
  return (
    <>
      <HeaderLayout />
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <RaidGuideDashboard />
        </main>
      </Section>
    </>
  )
}
