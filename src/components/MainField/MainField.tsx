import SiteLink from '@/components/MainField/SiteLink'
import MainRaidGuide from '@/components/MainField/MainRaidGuide'
import { auth } from '@/auth'
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
      <div className='flex w-full flex-col gap-6 xl:h-[380px] xl:flex-row'>
        {/* 나의 정보 섹션 */}
        <div className='relative z-50 flex h-[300px] w-full rounded-lg bg-gray-800 p-4 shadow-lg xl:h-full xl:w-[400px]'>
          <MainMyInfo />
        </div>

        {/* 오늘의 일정 및 인증 레이드 섹션 */}
        <div className='flex w-full flex-col gap-6 md:flex-row xl:flex-grow'>
          {/* 오늘의 일정 */}
          <MainMyPostsSchedule userId={userId} />
        </div>
      </div>

      {/* 로아 관련 사이트 */}
      <div className='mt-8 h-24 w-full overflow-hidden'>
        <SiteLink />
      </div>

      {/* 관심 레이드 */}
      <div className='mt-8 w-full'>
        <MainRaidGuide userId={userId} />
      </div>
    </div>
  )
}
