import RaidCreateForm from '@/components/raidPostField/raidPostCreate/RaidCreateForm'
import Section from '@/components/utils/section'
import React from 'react'

export default function RaidPostCreate() {
  return (
    <>
      <Section>
        <main className='flex w-full flex-col items-center'>
          <RaidCreateForm />
        </main>
      </Section>
    </>
  )
}
