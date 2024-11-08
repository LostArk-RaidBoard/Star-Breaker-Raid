import RaidListField from '@/components/raidPostField/raidListField'
import Section from '@/components/utils/section'

interface raidPost {
  params: { id: number }
}

export default function Raidpost({ params: { id } }: raidPost) {
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
