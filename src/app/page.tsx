import HeaderField from '@/components/header/headerField'
import MainField from '@/components/MainField/MainField'

import Screen from '@/components/screen'

export default function Home() {
  return (
    <Screen>
      <main className='flex min-h-screen w-full flex-col items-center'>
        <HeaderField />
        <MainField />
      </main>
    </Screen>
  )
}
