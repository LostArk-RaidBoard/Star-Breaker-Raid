'use client'

import Link from 'next/link'
import Image from 'next/image'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import { useEffect, useState } from 'react'

import { usePageinationSub } from '@/store/pageinationSubStore'
import PaginationSub from '@/components/utils/paginationSub'
import { createPostTage, wePostTage } from '@/app/action'

interface RaidPost {
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
  applicant_count: number
}

type Props = {
  createPostGet: RaidPost[]
}

export default function MypageCreatePost({ createPostGet }: Props) {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageinationSub()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = createPostGet.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setDataLength(createPostGet.length)
    setCurrentPage(1)
    setItemsPerPage(5)
  }, [createPostGet, setDataLength, setCurrentPage, setItemsPerPage])

  const deleteCreatePostHandler = async (post_id: number) => {
    try {
      const response = await fetch(`/api/mypageCreatePost?post_id=${post_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok && response.status === 200) {
        createPostTage()
        wePostTage()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex h-full basis-1/2 flex-col gap-4'>
      <span className='text-lg'>• 등록한 모집글</span>
      <div className='grid grid-cols-10 rounded-md border px-1'>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Fire className='hidden h-4 w-4 md:block' />
          레이드
        </div>
        <div className='col-span-3 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Megaphone className='hidden h-4 w-4 md:block' />
          공대장
        </div>
        <div className='col-span-3 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Clock className='hidden h-4 w-4 md:block' />
          시간
        </div>
        <div className='col-span-1 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          인원
        </div>
        <div className='col-span-1 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          닫기
        </div>
      </div>
      <div className='flex h-full w-full flex-col gap-3 scroll-auto'>
        {currentItems.map((item) => (
          <div
            key={item.post_id}
            className='grid h-9 grid-cols-10 rounded-md border border-gray-300 bg-gray-100'
          >
            <Link
              href={`/raidpost/${item.post_id}?redirect=/mypage/mypost`}
              className='col-span-9 grid grid-cols-9'
            >
              <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-300 px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_name}</span>
              </div>
              <div className='col-span-3 flex w-full items-center justify-center gap-1 overflow-hidden whitespace-nowrap border-r border-gray-300 px-1'>
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
              <div className='col-span-3 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-300 px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_time}</span>
              </div>
              <div className='col-span-1 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-300 px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>
                  {item.applicant_count}/{item.raid_limitperson}
                </span>
              </div>
            </Link>

            <button
              className='col-span-1 flex items-center justify-center overflow-hidden truncate whitespace-nowrap rounded-r-md bg-gray-900 text-sm text-white'
              onClick={() => {
                deleteCreatePostHandler(item.post_id)
              }}
            >
              닫기
            </button>
          </div>
        ))}
        <PaginationSub />
      </div>
    </div>
  )
}
