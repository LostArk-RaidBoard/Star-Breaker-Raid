import HeaderField from '@/components/header/headerField'
import RaidGuideCreateField from '@/components/raidGuideField/raidGuideCreateField'
import Section from '@/components/utils/section'

export default function RaidGuideCreate() {
  return (
    <Section>
      <main className='flex h-full w-full flex-col items-center gap-4'>
        <HeaderField />
        <RaidGuideCreateField />
      </main>
    </Section>
  )
}
