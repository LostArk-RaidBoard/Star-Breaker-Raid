import RaidPostPageField from '@/components/raidPostField/raidPostPageField'
import Section from '@/components/utils/section'
import React from 'react'

export default function Home() {
  return (
    <>
      <Section>
        <main className='z-0 flex min-h-screen w-full flex-col items-center'>
          <RaidPostPageField />
        </main>
      </Section>
    </>
  )
}
