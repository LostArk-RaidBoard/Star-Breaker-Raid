import RaidPostUpdate from '@/components/raidPostField/raidPostUpdate/raidPostUpdate'
import Section from '@/components/utils/section'

interface raidPost {
  params: { id: number }
}

export default function PostUpdate({ params: { id } }: raidPost) {
  return (
    <>
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <RaidPostUpdate postId={id} />
        </main>
      </Section>
    </>
  )
}
