'use server'
import SiteLink from '@/components/MainField/SiteLink'
import MainRaidGuide from '@/components/MainField/MainRaidGuide'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import MainCharacter from '@/components/MainField/MainCharacter'
import MainTeacherPosts from '@/components/MainField/MainTeacherPost'
import MainMyPostsSchedule from '@/components/MainField/MainMySchedule'

export default async function MainField() {
  let userId = 'no'
  let userNickName = ''

  const session = await getServerSession(authOptions)
  if (session && session.user.id) {
    userId = session.user.id
    userNickName = session.user.nickName
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-[880px] w-full flex-col gap-4 md:h-[550px] xl:h-[330px] xl:flex-row'>
        <div className='relative z-50 flex h-[210px] w-full grow flex-col justify-start rounded-md bg-gray-900 p-2 shadow-lg md:h-[220px] xl:h-full xl:w-[400px] xl:p-4'>
          <MainCharacter />
        </div>

        <div className='flex h-[650px] w-full flex-col gap-4 md:h-[330px] md:flex-row xl:h-full'>
          <MainTeacherPosts />
          <MainMyPostsSchedule userId={userId} />
        </div>
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
