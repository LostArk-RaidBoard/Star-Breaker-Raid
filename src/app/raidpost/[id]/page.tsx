import RaidListField from '@/components/raidPostField/raidPostApplication/raidListField'
import Section from '@/components/utils/section'
import React from 'react'

type Params = Promise<{ id: number }>
export default async function Raidpost({ params }: { params: Params }) {
  const { id } = await params
  return (
    <>
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <RaidListField postId={id} />
        </main>
      </Section>
    </>
  )
}
