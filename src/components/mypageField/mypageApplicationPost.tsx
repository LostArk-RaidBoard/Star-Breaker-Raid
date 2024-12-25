'use client'

import Pagination from '@/components/utils/pagination'
import Link from 'next/link'
import Image from 'next/image'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import { useEffect } from 'react'
import { usePageination } from '@/store/pageinationStore'
import { applicationListTage, applicationTage, wePostTage } from '@/app/action'

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
  approval: boolean
}

type Props = {
  userId: string
  applicationPostGet: RaidPost[]
}

export default function MypageApplicationPost({ userId, applicationPostGet }: Props) {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageination()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = applicationPostGet.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setDataLength(applicationPostGet.length)
    setCurrentPage(1)
    setItemsPerPage(5)
  }, [applicationPostGet, setDataLength, setCurrentPage, setItemsPerPage])

  const deleteApplicationHandler = async (post_id: number, raid_name: string) => {
    try {
      const response = await fetch(
        `/api/applicationDelete?post_id=${post_id}&user_id=${userId}&raid_name=${raid_name}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok && response.status === 200) {
        applicationTage()
        wePostTage()
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    applicationListTage() // 초기 데이터 fetch
  }, [])

  return (
    <div className='flex h-full basis-1/2 flex-col'>
      <span className='text-lg'>• 참여 신청한 모집글</span>
      <div className='mt-4 grid grid-cols-8 rounded-md border px-1'>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Fire className='hidden h-4 w-4 md:block' />
          레이드
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Megaphone className='hidden h-4 w-4 md:block' />
          공대장
        </div>
        <div className='col-span-3 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Clock className='hidden h-4 w-4 md:block' />
          시간
        </div>
        <div className='col-span-1 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          취소
        </div>
      </div>
      <div className='mt-2 flex h-full w-full flex-col gap-3'>
        {currentItems.map((item) => (
          <div
            key={item.post_id}
            className={`grid h-9 grid-cols-8 rounded-md border border-gray-300 ${item.approval ? 'bg-blue-100' : 'bg-gray-100'} `}
          >
            <Link
              href={`/raidpost/${item.post_id}?redirect=/mypage/mypost`}
              className='col-span-7 grid grid-cols-7'
            >
              <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-300 px-1'>
                <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_name}</span>
              </div>
              <div className='col-span-2 flex w-full items-center justify-center gap-1 overflow-hidden whitespace-nowrap border-r border-gray-300 px-1'>
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
            </Link>

            <button
              className='col-span-1 overflow-hidden truncate whitespace-nowrap rounded-r-md bg-gray-900 text-sm text-white'
              onClick={() => {
                deleteApplicationHandler(item.post_id, item.raid_name)
              }}
            >
              취소
            </button>
          </div>
        ))}
        <Pagination />
      </div>
      <span className='hidden text-sm sm:block'>
        * 참여 신청한 모집글은 공대장이 승인하면 배경색이 파란색으로 변경됩니다.
      </span>
    </div>
  )
}
