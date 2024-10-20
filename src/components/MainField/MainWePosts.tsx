'use client'
import Image from 'next/image'
import User from '@image/icon/user.svg'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Pagination from '@/components/utils/pagination'
import { usePageination } from '@/store/pageinationStore'
import { wePostTage } from '@/app/action'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  fixed: boolean
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
}

interface MainWePostsProps {
  wePostsRows: RaidPost[]
  applicationsCount: { [key: number]: number } // 추가된 props
}

export default function MainWePosts({ wePostsRows, applicationsCount }: MainWePostsProps) {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageination()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = wePostsRows.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setDataLength(wePostsRows.length)
    setCurrentPage(1)
    setItemsPerPage(7)
  }, [wePostsRows, setDataLength, setCurrentPage, setItemsPerPage])

  // 1분마다 wePostTage() 실행하여 데이터 업데이트
  useEffect(() => {
    wePostTage()
    const fetchPosts = async () => {
      await wePostTage()
    }

    fetchPosts() // 초기 데이터 fetch

    const interval = setInterval(fetchPosts, 60000)

    return () => clearInterval(interval) // 컴포넌트 언마운트 시 타이머 정리
  }, [])

  return (
    <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-[45%]'>
      <div className='grid grid-cols-8 rounded-t-md bg-gray-200 px-1'>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Fire className='h-4 w-4' />
          레이드
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Megaphone className='h-4 w-4' />
          공대장
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Clock className='h-4 w-4' />
          시간
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <User className='h-4 w-4' />
          인원
        </div>
      </div>
      <div className='mt-2 flex w-full flex-col gap-3 p-1'>
        {currentItems.map((item) => (
          <Link
            key={item.post_id}
            href={`/raidpost/${item.post_id}`}
            className='grid h-9 grid-cols-8 rounded-md border border-gray-900 bg-gray-100 p-1'
          >
            <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-500 px-1'>
              <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_name}</span>
            </div>
            <div className='col-span-2 flex w-full items-center justify-center gap-1 overflow-hidden whitespace-nowrap border-r border-gray-500 px-1'>
              <Image
                src={item.character_classicon}
                alt='아이콘'
                width={100}
                height={100}
                className='h-6 w-6 fill-yellow-600'
              />
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {item.character_name}
              </span>
            </div>
            <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-500 px-1'>
              <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_time}</span>
            </div>
            <div className='col-span-2 flex items-center justify-center overflow-ellipsis whitespace-nowrap px-1'>
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {applicationsCount[item.post_id] || 1}/{item.raid_limitperson}
              </span>
            </div>
          </Link>
        ))}
        <Pagination />
      </div>
    </div>
  )
}
