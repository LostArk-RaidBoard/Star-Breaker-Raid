'use client'
import Image from 'next/image'
import User from '@image/icon/user.svg'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import Link from 'next/link'
import { useEffect } from 'react'
import { usePageinationSub } from '@/store/pageinationSubStore'
import PaginationSub from '@/components/utils/paginationSub'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: any
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

interface Props {
  teacherPostsRows: RaidPost[]
}

export default function MainTeacherPosts({ teacherPostsRows }: Props) {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageinationSub()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = teacherPostsRows.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    if (teacherPostsRows) {
      setDataLength(teacherPostsRows.length)
      setCurrentPage(1)
      setItemsPerPage(5)
    }
  }, [teacherPostsRows, setDataLength, setCurrentPage, setItemsPerPage])

  return (
    <div className='h-full w-full rounded-md bg-gray-300 shadow-lg md:w-1/2'>
      <div className='grid grid-cols-8 text-nowrap rounded-t-md bg-gray-200 px-1'>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Fire className='h-4 w-4' />
          레이드
        </div>
        <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Megaphone className='h-4 w-4' /> 선생님
        </div>
        <div className='col-span-3 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          <Clock className='h-4 w-4' />
          시간
        </div>
        <div className='col-span-1 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
          인원
        </div>
      </div>
      <div className='mt-2 flex w-full flex-col gap-3 p-1'>
        {currentItems.map((item, key) => (
          <Link
            key={key}
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
                className='h-6 w-6'
              />
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {item.character_name}
              </span>
            </div>
            <div className='col-span-3 flex items-center justify-center overflow-hidden whitespace-nowrap border-r border-gray-500 px-1'>
              <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_time}</span>
            </div>
            <div className='col-span-1 flex items-center justify-center overflow-ellipsis whitespace-nowrap px-1'>
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {item.applicant_count}/{item.raid_limitperson}
              </span>
            </div>
          </Link>
        ))}
        <PaginationSub />
      </div>
    </div>
  )
}
