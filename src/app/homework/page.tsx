import HeaderLayout from '@/components/header/HeaderLayout'
import HomeworkDashboard from '@/components/homeworkField/HomeworkDashboard'
import Section from '@/components/utils/section'
import React from 'react'

export default function SchedulePage() {
  return (
    <>
      <HeaderLayout />
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <HomeworkDashboard />
        </main>
      </Section>
    </>
  )
}
