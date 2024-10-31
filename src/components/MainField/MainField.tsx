import SiteLink from '@/components/MainField/SiteLink'
import MainPost from '@/components/MainField/MainPost'
import MainRaidGuide from '@/components/MainField/MainRaidGuide'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export default async function MainField() {
  const session = await getServerSession(authOptions)
  let userId = ''
  if (session && session.user.id) {
    userId = session.user.id
  }
  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-[1000px] w-full flex-col gap-4 md:h-[400px] md:flex-row'>
        <MainPost />
      </div>
      <div className='mt-8 h-24 w-full overflow-hidden'>
        <SiteLink />
      </div>
      <div className='mt-8 w-full'>
        <MainRaidGuide userId={userId} />
      </div>
    </div>
  )
}
