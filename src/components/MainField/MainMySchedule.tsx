'use client'
import Image from 'next/image'
import GoldImage from '@image/asset/골드.png'
import React from 'react'
import { convertToKoreanTime2 } from '@/components/utils/converToKoreanTime'
import Loading from '@image/icon/loading.svg'
import useSWR from 'swr'
import { fetcher } from '@/components/utils/fetcher'

interface TodaySchedule {
  user_id: string
  schedule_time: string
  raid_gold: number
  character_name: string
  raid_name: string
  raid_level: string
  class_icon_url: string
}

interface Props {
  userId: string
}

export default function MainMyPostsSchedule({ userId }: Props) {
  const { data, isLoading } = useSWR(`/api/mainAPI/mainMySchedule?user_id=${userId}`, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  const todayPostsRows =
    data?.postRows?.map((item: TodaySchedule) => ({
      ...item,
      schedule_time: convertToKoreanTime2(item.schedule_time),
    })) ?? []

  return (
    <div className='flex h-[350px] w-full flex-col rounded-lg bg-gray-600 p-4 shadow-lg xl:h-full'>
      {/* 상단 헤더 */}
      <div className='mb-2 text-sm font-bold text-white'>오늘의 일정</div>

      {/* 스크롤 가능한 목록 */}
      <div className='custom-scrollbar h-full space-y-3 overflow-y-auto overflow-x-hidden p-2'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Loading className='w- h-12 text-gray-100' />
          </div>
        ) : todayPostsRows.length === 0 ? (
          <div className='text-center text-gray-400'>오늘의 일정이 없습니다.</div>
        ) : (
          todayPostsRows.map((item: TodaySchedule) => (
            <div
              key={`${item.character_name}-${item.schedule_time}-${item.raid_name}-${item.user_id}`}
              className='flex flex-col rounded-lg bg-gray-800 p-3 shadow-sm transition-transform hover:shadow-md'
            >
              {/* 레이드 이름과 시간 */}
              <div className='flex items-center justify-between text-sm'>
                <div className='font-medium text-white'>
                  {item.raid_name} <span className='text-gray-400'>({item.raid_level})</span>
                </div>
                {/* 골드 정보 */}
                <div className='mt-2 flex items-center justify-end font-semibold text-yellow-400'>
                  <Image src={GoldImage} alt='골드 아이콘' width={20} height={20} />
                  <span className='ml-2'>{item.raid_gold}</span>
                </div>
              </div>

              {/* 캐릭터 정보 */}
              <div className='mt-1 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Image
                    src={item.class_icon_url}
                    alt='캐릭터 아이콘'
                    width={24}
                    height={24}
                    className='rounded-full border border-gray-700 bg-gray-900 shadow-sm'
                  />
                  <div className='text-sm font-medium text-white'>{item.character_name}</div>
                </div>
                <span className='text-xs text-gray-400'>{item.schedule_time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
