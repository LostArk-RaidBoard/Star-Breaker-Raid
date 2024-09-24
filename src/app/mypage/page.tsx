import HeaderField from '@/components/header/headerField'
import MypageField from '@/components/mypageField/mypageField'
import Section from '@/components/utils/section'

export default function Mypage() {
  return (
    <Section>
      <main className='flex w-full flex-col items-center'>
        <HeaderField />
        <MypageField />
      </main>
    </Section>
  )
}
