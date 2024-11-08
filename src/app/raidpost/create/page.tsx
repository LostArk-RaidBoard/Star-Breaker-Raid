import RaidCreateField from '@/components/raidPostField/raidCreateField'
import Section from '@/components/utils/section'

export default function RaidPostCreate() {
  return (
    <>
      <Section>
        <main className='flex w-full flex-col items-center'>
          <RaidCreateField />
        </main>
      </Section>
    </>
  )
}
