import HeaderField from '@/components/header/headerField'
import Section from '@/components/utils/section'

interface IdParams {
  params: { id: string }
}

export default async function Raidguide({ params: { id } }: IdParams) {
  console.log(id)
  return (
    <Section>
      <main className='flex min-h-screen w-full flex-col items-center'>
        <HeaderField />
      </main>
    </Section>
  )
}
