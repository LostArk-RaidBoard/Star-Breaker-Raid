'use client'
import Image from 'next/image'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Pagination from '@/components/utils/pagination'
import { usePageination } from '@/store/pageinationStore'
import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'
import { useSession } from 'next-auth/react'

interface RaidMyPost {
  post_id: number
  raid_name: string
  raid_time: any
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  character_image: string
  approval: boolean
  applicant_count: number
}

export default function MainWePosts() {
  const [wePostsRows, setWePostsRows] = useState<RaidMyPost[]>([])
  const { data: session } = useSession()
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
    const fetchWePosts = async (userId: string) => {
      try {
        const response = await fetch(`${process.env.API_URL}/api/mainMyPost?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error('Failed to fetch data')

        const data = await response.json()
        const formattedData = data.postRows.map((post: RaidMyPost) => ({
          ...post,
          raid_time: convertToKoreanTime(post.raid_time),
        }))
        setWePostsRows(formattedData)
      } catch (error) {
        console.error('fetchWePosts Error:', error)
        setWePostsRows([])
      }
    }

    if (session?.user?.id) {
      fetchWePosts(session.user.id)
    }
  }, [session])

  return (
    <div className='flex h-full w-full flex-col md:w-1/2'>
      <div className='bg-[#f9fafb]'>
        <span className='rounded-t-md bg-yellow-200 px-2 pb-1 text-sm'>레이드 일정</span>
      </div>
      <div className='h-full rounded-b-md rounded-r-md bg-gray-300'>
        <div className='grid grid-cols-8 rounded-tr-md bg-gray-200 px-1'>
          <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
            <Fire className='h-4 w-4' />
            레이드
          </div>
          <div className='col-span-2 flex items-center justify-center gap-1 overflow-hidden whitespace-nowrap px-1'>
            <Megaphone className='h-4 w-4' />
            공대장
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
          {currentItems.map((item) => (
            <Link
              key={item.post_id}
              href={`/raidpost/${item.post_id}?redirect=/`}
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
          <Pagination />
        </div>
      </div>
    </div>
  )
}
