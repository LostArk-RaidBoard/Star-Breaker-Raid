import HeaderField from '@/components/header/headerField'
import RaidGuidedIdField from '@/components/raidGuideField/raidGuideIdField'
import Section from '@/components/utils/section'

interface IdParams {
  params: { id: string }
}

export default async function Raidguide({ params: { id } }: IdParams) {
  return (
    <Section>
      <main className='flex h-full w-full flex-col items-center gap-4'>
        <HeaderField />
        <RaidGuidedIdField />
      </main>
    </Section>
  )
}
