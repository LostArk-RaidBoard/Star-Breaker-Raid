'use client'
import Image from 'next/image'
import User from '@image/icon/user.svg'
import Clock from '@image/icon/clock.svg'
import Fire from '@image/icon/fire.svg'
import Megaphone from '@image/icon/megaphone.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Pagination from '@/components/utils/pagination'
import { usePageination } from '@/store/pageinationStore'
import { usePathname } from 'next/navigation'

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

export default function MainWePosts() {
  const { data: session } = useSession()
  const [postsRows, setPostRows] = useState<RaidPost[]>([])
  const [applicationsCount, setApplicationsCount] = useState<{ [key: number]: number }>({})
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageination()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = postsRows.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setDataLength(postsRows.length)
    setCurrentPage(1)
    setItemsPerPage(7)
  }, [postsRows, setDataLength, setCurrentPage, setItemsPerPage])

  const postsFetch = async () => {
    try {
      const response = await fetch(`/api/raidPostGet?posts_position=user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok && response.status === 201) {
        setPostRows(data.postRows)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchApplicationsCount = async () => {
    const counts: { [key: number]: number } = {}
    const promises = postsRows.map(async (item) => {
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
    setApplicationsCount(counts)
  }

  const pathname = usePathname()
  useEffect(() => {
    if (pathname === '/') {
      postsFetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    if (postsRows.length > 0) {
      fetchApplicationsCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsRows])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const optionsDate: Intl.DateTimeFormatOptions = {
      weekday: 'short',
    }
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
    const day = date.toLocaleDateString('ko-KR', optionsDate)
    const time = date.toLocaleTimeString('ko-KR', optionsTime)
    return `${day}, ${time}`
  }

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
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {formatDate(item.raid_time)}
              </span>
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
