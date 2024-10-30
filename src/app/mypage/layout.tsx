import HeaderField from '@/components/header/headerField'
import MypageMenu from '@/components/mypageField/mypageMenu'
import Section from '@/components/utils/section'

export default function MypageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Section>
      <main className='flex w-full flex-col items-center'>
        <HeaderField />
        <div className='flex w-full flex-col gap-4 sm:flex-row'>
          <MypageMenu />
          {children}
        </div>
      </main>
    </Section>
  )
}
