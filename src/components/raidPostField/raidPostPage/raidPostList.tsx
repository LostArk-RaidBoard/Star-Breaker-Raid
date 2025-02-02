'use client'

import PaginationSub from '@/components/utils/paginationSub'
import { usePageinationSub } from '@/store/pageinationSubStore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  user_id: string
  post_position: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  character_classicon: string
  raid_level: string
  raid_gateway: string
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
    } else {
      const filteredPosts = raidPost.filter(
        (post) => post.raid_type === selectMenu || post.post_position === selectMenu,
      )
      setShowRaidPost(filteredPosts)
    }
  }, [selectMenu, raidPost])

  return (
    <div className='flex h-full w-full flex-col'>
      {/* 필터 버튼 메뉴 */}
      <div className='flex flex-wrap items-center justify-center gap-2 p-4 sm:justify-start'>
        {['all', 'teacher', 'user', '학원', '트라이', '클경', '반숙', '숙련'].map((menu) => (
          <button
            key={menu}
            aria-label={`${menu} 선택 버튼`}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              selectMenu === menu ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'
            } transition hover:bg-blue-500 hover:text-white`}
            onClick={() => setSelectMenu(menu)}
          >
            {menu === 'all' ? '전체' : menu}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className='mb-4 w-full overflow-hidden rounded-lg shadow-lg'>
        {/* 테이블 헤더 */}
        <div className='grid h-12 w-full grid-cols-6 bg-gray-800 text-sm font-semibold text-white sm:grid-cols-9'>
          <div className='flex items-center justify-center'>칭호</div>
          <div className='hidden items-center justify-center sm:flex'>공대장</div>
          <div className='hidden items-center justify-center sm:flex'>캐릭터</div>
          <div className='flex items-center justify-center'>타입</div>
          <div className='col-span-2 flex items-center justify-center'>레이드 명칭</div>
          <div className='col-span-2 flex items-center justify-center'>레이드 시간</div>
          <div className='hidden items-center justify-center sm:flex'>승인 인원</div>
        </div>

        {/* 테이블 데이터 */}
        {currentItems.length > 0 ? (
          currentItems.map((item: RaidPost, index) => (
            <Link
              href={`/raidpost/${item.post_id}?redirect=/raidpost`}
              key={item.post_id}
              className={`grid h-12 w-full grid-cols-6 text-sm text-gray-900 transition sm:grid-cols-9 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-blue-100`}
            >
              <div className='flex items-center justify-center'>{item.post_position}</div>
              <div className='hidden items-center justify-center sm:flex'>{item.nickname}</div>
              <div className='hidden items-center justify-center sm:flex'>
                {item.character_name}
              </div>
              <div className='flex items-center justify-center'>{item.raid_type}</div>
              <div className='col-span-2 flex items-center justify-center gap-2'>
                {item.raid_name} {item.raid_level}
                <span className='hidden sm:block'>{item.raid_gateway}</span>
              </div>
              <div className='col-span-2 flex items-center justify-center'>{item.raid_time}</div>
              <div className='hidden items-center justify-center sm:flex'>
                {item.approval}({item.rejected_count})/{item.raid_limitperson}
              </div>
            </Link>
          ))
        ) : (
          <div className='flex items-center justify-center py-4 text-gray-500'>
            해당 모집 글이 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <PaginationSub />
    </div>
  )
}
