'use client'
import FormatDate from '@/components/utils/\bformatDate'
import Link from 'next/link'
import Image from 'next/image'
import User from '@image/icon/user.svg'
import Hand from '@image/icon/hand.svg'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import { useEffect, useState } from 'react'

import { usePageinationSub } from '@/store/pageinationSubStore'
import PaginationSub from '@/components/utils/paginationSub'
import { createPostTage } from '@/app/action'

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

type Props = {
  userId: string
  createPostGet: RaidPost[]
}

export default function MypageCreatePost({ userId, createPostGet }: Props) {
  const [myPostApplicationsCount, setMyPostApplicationsCount] = useState<{ [key: number]: number }>(
    {},
  )
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
      const data = await response.json()
      if (response.ok && response.status === 201) {
        createPostTage()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchApplicationsCount = async () => {
    const counts: { [key: number]: number } = {}
    const promises = createPostGet.map(async (item) => {
      const response = await fetch(`/api/applicationCount?post_id=${item.post_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        counts[item.post_id] = data.count + 1 || 0
      } else {
        counts[item.post_id] = 1
      }
    })
    await Promise.all(promises)
    setMyPostApplicationsCount(counts)
  }

  useEffect(() => {
    if (createPostGet.length > 0) {
      fetchApplicationsCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPostGet])

  return (
    <div className='flex basis-1/2 flex-col gap-4 overflow-x-auto p-4'>
      <span className='text-lg'>등록한 모집글</span>
      <div className='grid grid-cols-10 rounded-md border px-1'>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Fire className='hidden h-4 w-4 md:block' />
          레이드
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Megaphone className='hidden h-4 w-4 md:block' />
          공대장
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Clock className='hidden h-4 w-4 md:block' />
          시간
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <User className='h-4 w-4' />
          인원
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Hand className='hidden h-4 w-4 md:block' />
          모집글 닫기
        </div>
      </div>
      <div className='flex w-full flex-col gap-3 scroll-auto'>
        {currentItems.map((item) => (
          <div key={item.post_id} className='grid h-9 grid-cols-10 rounded-md border bg-gray-100'>
            <Link href={`/raidpost/${item.post_id}`} className='col-span-8 grid grid-cols-8'>
              <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_name}</span>
              </div>
              <div className='col-span-2 flex w-full items-center justify-center gap-1 overflow-hidden whitespace-nowrap border-r px-1'>
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
              <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>
                  {FormatDate(item.raid_time)}
                </span>
              </div>
              <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>
                  {myPostApplicationsCount[item.post_id] || 1}/{item.raid_limitperson}
                </span>
              </div>
            </Link>
            <div className='col-span-2 flex items-center justify-center overflow-ellipsis whitespace-nowrap px-1'>
              <span className='overflow-hidden truncate whitespace-nowrap'>
                <button
                  className='rounded-md bg-gray-900 p-1 px-2 text-sm text-white'
                  onClick={() => {
                    deleteCreatePostHandler(item.post_id)
                  }}
                >
                  모집글 닫기
                </button>
              </span>
            </div>
          </div>
        ))}
        <PaginationSub />
      </div>
    </div>
  )
}
