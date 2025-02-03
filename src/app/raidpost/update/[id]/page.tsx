import UpdatePostPage from '@/components/raidPostField/raidPostUpdate/UpdatePostPage'
import Section from '@/components/utils/section'
import React from 'react'

type Params = Promise<{ id: number }>

export default async function PostUpdate({ params }: { params: Params }) {
  const { id } = await params
  return (
    <>
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <UpdatePostPage postId={id} />
        </main>
      </Section>
    </>
  )
}
