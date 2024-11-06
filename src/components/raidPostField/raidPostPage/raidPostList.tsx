'use client'

import PaginationSub from '@/components/utils/paginationSub'
import { usePageinationSub } from '@/store/pageinationSubStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
  nickname: string
}

interface Props {
  raidPost: RaidPost[]
}

export default function RaidPostList({ raidPost }: Props) {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageinationSub()
  const [selectMenu, setSelectMenu] = useState('all')
  const [showRaidPost, setShowRaidPost] = useState<RaidPost[]>([])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = showRaidPost.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    if (raidPost.length > 0 && showRaidPost.length === 0) {
      setShowRaidPost(raidPost)
    }

    if (showRaidPost) {
      setDataLength(showRaidPost.length)
      setCurrentPage(1)
      setItemsPerPage(13)
    }
  }, [raidPost, showRaidPost, setDataLength, setCurrentPage, setItemsPerPage])

  useEffect(() => {
    if (selectMenu === 'all') {
      setShowRaidPost(raidPost)
    } else {
      const filteredPosts = raidPost.filter((post) => post.post_position === selectMenu)
      setShowRaidPost(filteredPosts)
    }
  }, [selectMenu, raidPost])

  return (
    <div className='mt-4 flex h-full w-full flex-col'>
      <div id='Postbar' className='flex w-full flex-row gap-4'>
        <button
          className={`w-24 rounded-md text-lg ${selectMenu === 'all' ? 'bg-gray-200' : ''} `}
          onClick={() => {
            setSelectMenu('all')
          }}
        >
          전체
        </button>
        <button
          className={`w-24 rounded-md text-lg ${selectMenu === 'teacher' ? 'bg-gray-200' : ''} `}
          onClick={() => {
            setSelectMenu('teacher')
          }}
        >
          선생님
        </button>
        <button
          className={`w-24 rounded-md text-lg ${selectMenu === 'user' ? 'bg-gray-200' : ''} `}
          onClick={() => {
            setSelectMenu('user')
          }}
        >
          유저
        </button>
      </div>
      <div className='mb-4 flex h-full w-full flex-col items-center'>
        <div className='mt-4 grid h-12 w-full grid-cols-6 rounded-md border-b border-t font-bold sm:grid-cols-9'>
          <div className='flex items-center justify-center'>
            <span className='overflow-hidden truncate whitespace-nowrap'>role</span>
          </div>
          <div className='flex items-center justify-center'>
            <span className='overflow-hidden truncate whitespace-nowrap'>공대장</span>
          </div>
          <div className='flex hidden items-center justify-center sm:flex'>
            <span className='overflow-hidden truncate whitespace-nowrap'>공대장 캐릭터</span>
          </div>
          <div className='flex hidden items-center justify-center sm:flex'>
            <span className='overflow-hidden truncate whitespace-nowrap'>타입</span>
          </div>
          <div className='col-span-2 flex items-center justify-center'>
            <span className='overflow-hidden truncate whitespace-nowrap'>레이드 명칭</span>
          </div>

          <div className='col-span-2 flex items-center justify-center'>
            <span className='overflow-hidden truncate whitespace-nowrap'>레이드 시간</span>
          </div>
          <div className='flex hidden items-center justify-center sm:flex'>
            <span className='overflow-hidden truncate whitespace-nowrap'>인원</span>
          </div>
        </div>
        {currentItems.map((item: RaidPost) => (
          <Link
            href={`/raidpost/${item.post_id}`}
            key={item.post_id}
            className='grid h-12 w-full grid-cols-6 rounded-md border-b text-sm hover:bg-gray-200 sm:grid-cols-9 sm:text-base'
          >
            <div className='flex items-center justify-center overflow-hidden whitespace-nowrap'>
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {item.post_position}
              </span>
            </div>
            <div className='flex items-center justify-center overflow-hidden whitespace-nowrap'>
              <span className='overflow-hidden truncate whitespace-nowrap'>{item.nickname}</span>
            </div>
            <div className='flex hidden items-center justify-center overflow-hidden whitespace-nowrap sm:flex'>
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {item.character_name}
              </span>
            </div>
            <div className='flex hidden items-center justify-center overflow-hidden whitespace-nowrap sm:flex'>
              <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_type}</span>
            </div>
            <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap'>
              <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_name}</span>
            </div>

            <div className='col-span-2 flex items-center justify-center overflow-hidden whitespace-nowrap'>
              <span className='overflow-hidden truncate whitespace-nowrap'>{item.raid_time}</span>
            </div>
            <div className='flex hidden items-center justify-center overflow-hidden whitespace-nowrap sm:flex'>
              <span className='overflow-hidden truncate whitespace-nowrap'>
                {item.applicant_count}/{item.raid_limitperson}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <PaginationSub />
    </div>
  )
}
