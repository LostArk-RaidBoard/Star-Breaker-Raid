import HeaderField from '@/components/header/headerField'
import SchedulePostField from '@/components/schedulePage/schedulePostField'
import Section from '@/components/utils/section'
import React from 'react'

export default function SchedulePage() {
  return (
    <>
      <HeaderField />
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <SchedulePostField />
        </main>
      </Section>
    </>
  )
}
