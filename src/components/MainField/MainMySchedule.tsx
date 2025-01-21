'use client'
import Image from 'next/image'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import React, { useEffect, useState } from 'react'
import Pagination from '@/components/utils/pagination'
import { usePageination } from '@/store/pageinationStore'
import { convertToKoreanTime2 } from '@/components/utils/converToKoreanTime'
import GoldImage from '@image/asset/골드.png'

interface TodaySchedule {
  user_id: string
  schedule_time: string
  raid_gold: number
  character_name: string
  raid_name: string
}

interface Props {
  userId: string
}

export default function MainMyPostsSchedule({ userId }: Props) {
  const [wePostsRows, setWePostsRows] = useState<TodaySchedule[]>([])
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageination()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = wePostsRows.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    if (wePostsRows) {
      setDataLength(wePostsRows.length)
      setCurrentPage(1)
      setItemsPerPage(5)
    }
  }, [wePostsRows, setDataLength, setCurrentPage, setItemsPerPage])

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
        setWePostsRows(formatTime)
      } catch (error) {
        console.error('fetchWePosts Error:', error)
        setWePostsRows([])
      }
    }

    if (userId != '') {
      fetchMainMyPostsSchedule(userId)
    }
  }, [userId])

  return (
    <div className='flex h-full w-full flex-col md:w-1/2'>
      <div className='bg-[#f9fafb]'>
        <span className='rounded-t-md bg-blue-950 px-2 pb-1 text-sm text-white'>today 일정</span>
      </div>
      <div className='h-full rounded-b-md rounded-r-md bg-blue-200'>
        <div className='grid grid-cols-8 rounded-tr-md bg-blue-950 px-1 text-white'>
          <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
            <Fire className='h-4 w-4' />
            레이드
          </div>
          <div className='col-span-3 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
            캐릭터
          </div>
          <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
            <Clock className='h-4 w-4' />
            시간
          </div>
          <div className='col-span-1 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
            <Image
              src={GoldImage}
              alt='골드 이미지'
              width={20}
              height={20}
              style={{ width: '80%', height: 'auto' }}
            />
            골드
          </div>
        </div>
        <div className='mt-2 flex w-full flex-col gap-3 p-1'>
          {currentItems.map((item, index) => (
            <div
              key={index}
              className='grid h-9 grid-cols-8 rounded-md border border-gray-900 bg-gray-100 p-1'
            >
              <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-500 px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_name}</span>
              </div>
              <div className='col-span-3 flex w-full items-center justify-center gap-1 overflow-hidden whitespace-nowrap border-r border-gray-500 px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>
                  {item.character_name}
                </span>
              </div>
              <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-500 px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>
                  {item.schedule_time}
                </span>
              </div>
              <div className='col-span-1 flex items-center justify-center overflow-ellipsis whitespace-nowrap px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_gold}</span>
              </div>
            </div>
          ))}
          <Pagination />
        </div>
      </div>
    </div>
  )
}
