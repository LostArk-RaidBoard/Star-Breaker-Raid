import HeaderField from '@/components/header/headerField'
import RaidGuideField from '@/components/raidGuideField/raidGuideField'
import Section from '@/components/utils/section'

export default function RaidGuide() {
  return (
    <Section>
      <main className='flex min-h-screen w-full flex-col items-center'>
        <HeaderField />
        <RaidGuideField />
      </main>
    </Section>
  )
}
