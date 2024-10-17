import HeaderField from '@/components/header/headerField'
import MainField from '@/components/MainField/MainField'

import Section from '@/components/utils/section'

export default function Home() {
  return (
    <Section>
      <main className='flex min-h-screen w-full flex-col items-center'>
        <HeaderField />
        <MainField />
      </main>
    </Section>
  )
}
