import PostPageField from '@/components/raidPostField/PostPageField'
import Section from '@/components/utils/section'
import React from 'react'

export default function Home() {
  return (
    <>
      <Section>
        <main className='z-0 flex min-h-screen w-full flex-col items-center'>
          <PostPageField />
        </main>
      </Section>
    </>
  )
}
