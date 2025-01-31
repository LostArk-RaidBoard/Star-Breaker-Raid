'use client'
import Image from 'next/image'
import Clock from '@image/icon/clock.svg'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'

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
  const [teacherPostsRows, setTeacherPostsRows] = useState<RaidPost[]>([])

  useEffect(() => {
    const fetchTeacherPosts = async () => {
      try {
        const response = await fetch(`/api/raidPostAPI/raidPostGet?posts_position=teacher`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        const formatTime = data.postRows.map((item: RaidPost) => {
          item.raid_time = convertToKoreanTime(item.raid_time)
          return item
        })
        setTeacherPostsRows(formatTime) // 데이터를 상태에 저장
      } catch (error) {
        console.error('fetchTeacherPost Error:', error)
      }
    }

    fetchTeacherPosts()
  }, [])

  return (
    <div className='flex h-[350px] w-full flex-col rounded-lg bg-gray-900 p-4 shadow-lg md:h-[330px]'>
      {/* 상단 헤더 */}
      <div className='mb-2 text-sm font-bold text-white'>개설된 레이드</div>

      {/* 레이드 목록 */}
      <div className='custom-scrollbar space-y-3 overflow-y-auto overflow-x-hidden p-3'>
        {teacherPostsRows.map((item, key) => (
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
        ))}
      </div>
    </div>
  )
}
