'use client'
import FormatDate from '@/components/utils/\bformatDate'
import Pagination from '@/components/utils/pagination'
import Link from 'next/link'
import Image from 'next/image'
import Hand from '@image/icon/hand.svg'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import { useEffect, useState } from 'react'
import { usePageination } from '@/store/pageinationStore'

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
}

export default function MypageApplicationPost({ userId }: Props) {
  const [applicationPost, setApplicationPost] = useState<RaidPost[]>([])
  const [trigger, seTrigger] = useState(true)
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageination()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = applicationPost.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setDataLength(applicationPost.length)
    setCurrentPage(1)
    setItemsPerPage(5)
  }, [applicationPost, setDataLength, setCurrentPage, setItemsPerPage])

  const applicationPostGetHandler = async () => {
    try {
      const response = await fetch(`/api/mypagePostGet?user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok && response.status === 201) {
        setApplicationPost(data.postRows)
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteApplicationHandler = async (post_id: number) => {
    try {
      const response = await fetch(`/api/applicationDelete?post_id=${post_id}&user_id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok && response.status === 201) {
        seTrigger(!trigger)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userId) {
      applicationPostGetHandler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, trigger])
  return (
    <div className='flex basis-1/2 flex-col gap-4 p-4'>
      <span className='text-lg'>참여 신청한 모집글</span>
      <div className='grid grid-cols-8 rounded-md border px-1'>
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
          <Hand className='hidden h-4 w-4 md:block' />
          신청 취소
        </div>
      </div>
      <div className='flex w-full flex-col gap-3'>
        {currentItems.map((item) => (
          <div key={item.post_id} className='grid h-9 grid-cols-8 rounded-md border bg-gray-100'>
            <Link href={`/raidpost/${item.post_id}`} className='col-span-6 grid grid-cols-6'>
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
            </Link>
            <div className='col-span-2 flex items-center justify-center overflow-ellipsis whitespace-nowrap px-1'>
              <span className='overflow-hidden truncate whitespace-nowrap'>
                <button
                  className='rounded-md bg-gray-900 p-1 px-2 text-sm text-white'
                  onClick={() => {
                    deleteApplicationHandler(item.post_id)
                  }}
                >
                  신청 취소
                </button>
              </span>
            </div>
          </div>
        ))}
        <Pagination />
      </div>
    </div>
  )
}