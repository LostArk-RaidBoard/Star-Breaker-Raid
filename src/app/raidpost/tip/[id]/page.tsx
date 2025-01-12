import TipFleid from '@/components/raidPostField/raidPostPage/tipFleid'
import Section from '@/components/utils/section'
import React from 'react'

type Params = Promise<{ id: string }>

export default async function TipPage({ params }: { params: Params }) {
  const { id } = await params
  return (
    <>
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <TipFleid id={id} />
        </main>
      </Section>
    </>
  )
}
