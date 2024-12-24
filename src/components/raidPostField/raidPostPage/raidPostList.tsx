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
  approval: number
  rejected_count: number
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
    if (showRaidPost) {
      setDataLength(showRaidPost.length)
      setCurrentPage(1)
      setItemsPerPage(13)
    }
  }, [raidPost, showRaidPost, setDataLength, setCurrentPage, setItemsPerPage])

  useEffect(() => {
    if (selectMenu === 'all') {
      setShowRaidPost(raidPost)
    } else if (
      selectMenu === '학원' ||
      selectMenu === '트라이' ||
      selectMenu === '클경' ||
      selectMenu === '반숙' ||
      selectMenu === '숙련'
    ) {
      const filteredPosts = raidPost.filter((post) => post.raid_type === selectMenu)
      setShowRaidPost(filteredPosts)
    } else {
      const filteredPosts = raidPost.filter((post) => post.post_position === selectMenu)
      setShowRaidPost(filteredPosts)
    }
  }, [selectMenu, raidPost])

  return (
    <div className='flex h-full w-full flex-col'>
      <div
        id='Postbar'
        className='flex h-20 w-full flex-col items-center justify-center bg-gray-200 sm:h-12 sm:flex-row sm:justify-start sm:px-3'
      >
        <div className='flex flex-row items-center'>
          <button
            aria-label='전체 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === 'all' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('all')
            }}
          >
            전체
          </button>
          <button
            aria-label='선생님 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === 'teacher' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('teacher')
            }}
          >
            선생님
          </button>
          <button
            aria-label='유저 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === 'user' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('user')
            }}
          >
            유저
          </button>
          <button
            aria-label='학원 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === '학원' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('학원')
            }}
          >
            학원
          </button>
        </div>
        <div className='flex flex-row items-center'>
          <button
            aria-label='트라이 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === '트라이' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('트라이')
            }}
          >
            트라이
          </button>
          <button
            aria-label='클경 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === '클경' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('클경')
            }}
          >
            클경
          </button>
          <button
            aria-label='반숙 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === '반숙' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('반숙')
            }}
          >
            반숙
          </button>
          <button
            aria-label='숙련 선택 버튼'
            className={`flex w-20 items-center justify-center rounded-md text-lg ${selectMenu === '숙련' ? 'bg-gray-900 text-white' : ''} `}
            onClick={() => {
              setSelectMenu('숙련')
            }}
          >
            숙련
          </button>
        </div>
      </div>
      <div className='mb-4 flex h-full w-full flex-col items-center'>
        <div className='grid h-12 w-full grid-cols-6 rounded-md border-b font-bold sm:grid-cols-9'>
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
            <span className='overflow-hidden truncate whitespace-nowrap'>승인 인원 (대기)</span>
          </div>
        </div>
        {currentItems.map((item: RaidPost) => (
          <Link
            href={`/raidpost/${item.post_id}?redirect=/raidpost`}
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
                {item.approval}({item.rejected_count}) / {item.raid_limitperson}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <PaginationSub />
    </div>
  )
}
