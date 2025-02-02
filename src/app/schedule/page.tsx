import React from 'react'
import Section from '@/components/utils/section'
import HeaderField from '@/components/header/headerField'
import SchedulePageField from '@/components/schedulePage/SchedulePage'

export default function SchedulePage() {
  return (
    <>
      <HeaderField />
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <SchedulePageField />
        </main>
      </Section>
    </>
  )
}
