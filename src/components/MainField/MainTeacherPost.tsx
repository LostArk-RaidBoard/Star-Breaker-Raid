'use client'
import useSWR from 'swr'
import Image from 'next/image'
import Clock from '@image/icon/clock.svg'
import Link from 'next/link'
import Loading from '@image/icon/loading.svg'
import React from 'react'
import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'
import { fetcher } from '@/components/utils/fetcher'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  user_id: string
  post_position: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  character_classicon: string
  raid_level: string
  raid_gateway: string
  approval: number
  rejected_count: number
  nickname: string
}

export default function MainTeacherPosts() {
  const { data, isLoading } = useSWR(
    '/api/mainAPI/mainTeacherPostGet?posts_position=teacher',
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  )

  const teacherPostsRows =
    data?.postRows?.map((item: RaidPost) => ({
      ...item,
      raid_time: convertToKoreanTime(item.raid_time),
    })) ?? []

  return (
    <div className='flex h-[350px] w-full flex-col rounded-lg bg-gray-600 p-4 shadow-lg xl:h-full'>
      {/* 상단 헤더 */}
      <div className='mb-2 text-sm font-bold text-white'>Teacher 레이드</div>

      {/* 레이드 목록 */}
      <div className='custom-scrollbar h-full space-y-3 overflow-y-auto overflow-x-hidden p-3'>
        {isLoading || !data ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Loading className='h-12 w-12 text-gray-100' />
          </div>
        ) : teacherPostsRows.length === 0 ? (
          <div className='text-center text-gray-400'>모집 글이 없습니다.</div>
        ) : (
          teacherPostsRows.map((item: RaidPost, key: number) => (
            <Link
              key={key}
              href={`/raidpost/${item.post_id}?redirect=/`}
              className='flex flex-col gap-2 rounded-lg bg-gray-800 p-3 shadow-sm transition-transform hover:scale-105 hover:shadow-md'
            >
              {/* 레이드 이름 및 레벨 */}
              <div className='flex items-center justify-between text-sm'>
                <div className='font-medium text-white'>
                  {item.raid_name} <span className='text-gray-400'>({item.raid_level})</span>
                </div>
                <div className='rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white'>
                  {item.raid_type}
                </div>
              </div>

              {/* 캐릭터 정보 */}
              <div className='flex items-center gap-2 text-sm'>
                <Image
                  src={item.character_classicon}
                  alt='아이콘'
                  width={24}
                  height={24}
                  className='rounded-full border border-gray-700 bg-gray-900 shadow-sm'
                />
                <span className='truncate text-gray-300'>{item.nickname}</span>
              </div>

              {/* 시간 및 인원 */}
              <div className='flex justify-between text-xs text-gray-400'>
                <div className='flex items-center gap-1'>
                  <Clock className='h-4 w-4 text-gray-500' /> {item.raid_time}
                </div>
                <div>
                  <span className='font-medium text-gray-300'>인원:</span> {item.approval}/
                  {item.raid_limitperson}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
