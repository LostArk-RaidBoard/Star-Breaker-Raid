import React from 'react'
import Section from '@/components/utils/section'
import HeaderLayout from '@/components/header/HeaderLayout'
import SchedulePageField from '@/components/schedulePage/SchedulePage'

export default function SchedulePage() {
  return (
    <>
      <HeaderLayout />
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <SchedulePageField />
        </main>
      </Section>
    </>
  )
}
