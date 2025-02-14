import Image from 'next/image'
import RaidPostNotice from '@/components/raidPostField/raidPostApplication/RaidPostNotice'
import { converToKoranTime1 } from '@/components/utils/converToKoreanTime'
import React from 'react'

interface Post {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  character_image: string
  nickname: string
  raid_level: string
  raid_gateway: string
}

interface RaidPostProps {
  postData: Post
}

export default async function PostDetails({ postData }: RaidPostProps) {
  const formatTime = converToKoranTime1(postData.raid_time)

  return (
    <div className='w-full rounded-xl border border-gray-700 shadow-lg'>
      <div className='flex flex-col gap-8 p-8 md:flex-row md:gap-12'>
        {/* 좌측 정보 섹션 */}
        <div className='flex flex-col gap-6 md:w-1/2'>
          <div className='flex items-center justify-center rounded-xl bg-gray-800 p-6 text-3xl font-extrabold text-gray-100 shadow-md'>
            <span className='text-blue-400'>⚡</span> {postData.raid_name} {postData.raid_level}{' '}
            {postData.raid_gateway} <span className='text-blue-400'>⚡</span>
          </div>

          {/* 공대장 */}
          <div className='flex items-center gap-4 rounded-xl'>
            <span className='text-xl font-semibold text-gray-900'>공대장:</span>
            <span className='text-xl font-extrabold text-gray-900'>
              {postData.nickname || postData.user_id}
            </span>
          </div>

          <div className='flex items-center gap-6 rounded-lg bg-gray-800 p-4'>
            <Image
              src={postData.character_image}
              alt='공대장'
              width={50}
              height={50}
              className='rounded-full border border-gray-600'
            />
            <Image
              src={postData.character_classicon}
              alt='공대장'
              width={40}
              height={40}
              className='hidden rounded-full border border-gray-600 sm:block'
            />
            <div className='flex flex-col'>
              <span className='text-lg font-medium text-gray-100'>{postData.character_name}</span>
              <span className='text-sm text-gray-400'>{postData.character_level} Lv</span>
            </div>
          </div>
          <InfoRow label='🕒 레이드 시간' value={formatTime} />
          <InfoRow label='⏳ 최대 시간' value={postData.raid_maxtime} />
        </div>

        {/* 우측 공대장 섹션 */}
        <div className='flex flex-col gap-6 md:w-1/2'>
          <div className='space-y-5'>
            <InfoRow label='🗺️ 레이드 타입' value={postData.raid_type} />
            <InfoRow label='📈 최소 레벨' value={`${postData.limit_level} Lv`} />
            <InfoRow label='👥 최대 정원' value={`${postData.raid_limitperson} 명`} />
          </div>
          <InfoRow
            label='🏅 칭호'
            value={postData.post_position === 'teacher' ? 'Teacher' : 'User'}
          />

          <div className='flex flex-col gap-2'>
            <span className='text-lg font-semibold text-gray-500'>📢 레이드 공지</span>
            <RaidPostNotice postNoti={postData.noti} />
          </div>
        </div>
      </div>
    </div>
  )
}

{
  /* 재사용 가능한 InfoRow 컴포넌트 */
}
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-center gap-3 text-lg'>
      <span className='font-semibold text-gray-500'>{label}:</span>
      <span className='font-medium text-gray-900'>{value}</span>
    </div>
  )
}
