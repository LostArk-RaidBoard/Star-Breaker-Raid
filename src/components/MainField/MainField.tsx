import SiteLink from '@/components/MainField/SiteLink'
import MainRaidGuide from '@/components/MainField/MainRaidGuide'
import { auth } from '@/auth'
import MainTeacherPosts from '@/components/MainField/MainTeacherPost'
import MainMyPostsSchedule from '@/components/MainField/MainMySchedule'
import MainMyInfo from '@/components/MainField/MainMyInfo'
import React from 'react'

export default async function MainField() {
  let userId = 'no'

  const session = await auth()
  if (session && session.user.id) {
    userId = session.user.id
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-[880px] w-full flex-col gap-4 md:h-[550px] xl:h-[330px] xl:flex-row'>
        <div className='relative z-50 flex h-[210px] w-full grow flex-col justify-start rounded-md bg-gray-900 p-2 shadow-lg md:h-[220px] xl:h-full xl:w-[400px] xl:p-4'>
          <MainMyInfo />
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
