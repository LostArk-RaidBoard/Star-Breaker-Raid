import TipFleid from '@/components/raidPostField/raidPostPage/tipFleid'
import Section from '@/components/utils/section'
interface Props {
  params: { id: string }
}

export default function TipPage({ params: { id } }: Props) {
  return (
    <>
      <Section>
        <main className='flex min-h-screen w-full flex-col items-center'>
          <TipFleid id={id} />
        </main>
      </Section>
    </>
  )
}
