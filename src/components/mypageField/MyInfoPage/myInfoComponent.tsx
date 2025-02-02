import React from 'react'
import User from '@image/icon/user.svg'
import ClipboardList from '@image/icon/character.svg'
import Award from '@image/icon/award.svg'
import NickName from '@image/icon/nickName.svg'
import CheckCircle from '@image/icon/circlecheck.svg'
import CreateList from '@image/icon/createList.svg'
import Application from '@image/icon/appliction.svg'

interface Props {
  myInfoData: MyinfoFetch
}

interface MyinfoFetch {
  user_id: string
  user_name: string
  birthday: number
  nickname: string
  role: string
  applicants_count: number
  applicants_approval: number
  raid_posts_count: number
  character_count: number
}

export default async function MyInfoComponent({ myInfoData }: Props) {
  return (
    <div className='flex w-full flex-col rounded-lg border border-gray-400 bg-white p-6 shadow-lg'>
      <h2 className='mb-4 text-xl font-extrabold text-gray-900'>내 정보</h2>

      {/* 카드 내용 */}
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {/* 첫 번째 컬럼 */}
        <div className='flex flex-col space-y-3 text-base'>
          <div className='flex items-center gap-2'>
            <User className='h-5 w-5 text-gray-700' />
            <span className='text-gray-700'>아이디: {myInfoData.user_id}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Award className='h-5 w-5 text-yellow-500' />
            <span className='text-gray-700'>칭호: {myInfoData.role}</span>
          </div>
          <div className='flex items-center gap-2'>
            <ClipboardList className='h-5 w-5 text-blue-500' />
            <span className='text-gray-700'>등록된 캐릭터 수: {myInfoData.character_count}</span>
          </div>
          <div className='flex items-center gap-2'>
            <NickName className='h-5 w-5 text-green-500' />
            <span className='text-gray-700'>닉네임: {myInfoData.nickname}</span>
          </div>
        </div>

        {/* 두 번째 컬럼 */}
        <div className='flex flex-col space-y-3 text-base'>
          <div className='flex items-center gap-2'>
            <CreateList className='h-5 w-5 text-blue-500' />
            <span className='text-gray-700'>개설 현황: {myInfoData.raid_posts_count}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Application className='h-5 w-5 text-green-500' />
            <span className='text-gray-700'>신청 현황: {myInfoData.applicants_count}</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckCircle className='h-5 w-5 text-green-600' />
            <span className='text-gray-700'>승인 수: {myInfoData.applicants_approval}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
