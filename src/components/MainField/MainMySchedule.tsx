'use client'
import Image from 'next/image'
// import Clock from '@image/icon/clock.svg'
import React, { useEffect, useState } from 'react'
import { convertToKoreanTime2 } from '@/components/utils/converToKoreanTime'
import GoldImage from '@image/asset/골드.png'

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
  const [todayPostsRows, setTodayPostsRows] = useState<TodaySchedule[]>([])

  useEffect(() => {
    const fetchMainMyPostsSchedule = async (userId: string) => {
      try {
        const response = await fetch(`/api/mainAPI/mainMySchedule?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error('Failed to fetch data')

        const data = await response.json()
        const formatTime = data.postRows.map((item: TodaySchedule) => {
          item.schedule_time = convertToKoreanTime2(item.schedule_time)
          return item
        })
        setTodayPostsRows(formatTime)
      } catch (error) {
        console.error('fetchWePosts Error:', error)
        setTodayPostsRows([])
      }
    }

    if (userId != '') {
      fetchMainMyPostsSchedule(userId)
    }
  }, [userId])

  return (
    <div className='flex h-[350px] w-full flex-col rounded-lg bg-gray-600 p-4 shadow-lg md:h-full'>
      {/* 상단 헤더 */}
      <div className='mb-2 text-sm font-bold text-white'>오늘의 일정</div>

      {/* 스크롤 가능한 목록 */}
      <div className='custom-scrollbar space-y-3 overflow-y-auto overflow-x-hidden p-2'>
        {todayPostsRows.length === 0 ? (
          <div className='text-center text-gray-400'>오늘의 일정이 없습니다.</div>
        ) : (
          todayPostsRows.map((item, index) => (
            <div
              key={index}
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
