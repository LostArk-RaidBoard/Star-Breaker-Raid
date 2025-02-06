'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import PageNavigation from '@/components/utils/PageNavigationSub'
import { usePageinationSub } from '@/store/pageinationSubStore'
import { converToKoranTime1 } from '@/components/utils/converToKoreanTime'

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

const fetchPostsAllFetch = async (search: string) => {
  const searchParam = search.trim() !== '' ? search : 'all'
  try {
    const response = await fetch(
      `/api/raidPostAPI/raidPostGet?search=${encodeURIComponent(searchParam)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = await response.json()
    if (response.ok) {
      return data.postRows.map((item: RaidPost) => {
        item.raid_time = converToKoranTime1(item.raid_time)
        return item
      })
    } else {
      return []
    }
  } catch (error) {
    console.error('PostsAll Get Error' + error)
  }
  return []
}

export default function PostPageField() {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageinationSub()
  const [showRaidPost, setShowRaidPost] = useState<RaidPost[]>([])
  const [search, setSearch] = useState('')
  const [sorted, setSorted] = useState(false)
  const [loading, setLoading] = useState(false)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = showRaidPost.slice(indexOfFirstItem, indexOfLastItem)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const filteredPosts = await fetchPostsAllFetch(search)
    setShowRaidPost(filteredPosts)
    setLoading(false)
  }

  const sortHandler = () => {
    setSorted(!sorted)
  }

  useEffect(() => {
    if (sorted) {
      // 내림차순 정렬
      const sortedPosts = [...showRaidPost].sort((a, b) => b.post_id - a.post_id)
      setShowRaidPost(sortedPosts)
    } else {
      // 원래 데이터 순서 유지 (초기 상태로 다시 fetch)
      const fetchHandler = async () => {
        const fetchPost = await fetchPostsAllFetch('')
        setShowRaidPost(fetchPost)
      }
      fetchHandler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted])

  useEffect(() => {
    if (showRaidPost) {
      setDataLength(showRaidPost.length)
      setCurrentPage(1)
      setItemsPerPage(15)
    }
  }, [showRaidPost, setDataLength, setCurrentPage, setItemsPerPage])

  useEffect(() => {
    const fetchHandler = async () => {
      const fetchPost = await fetchPostsAllFetch('')
      setShowRaidPost(fetchPost)
      setLoading(false)
    }
    setLoading(true)
    fetchHandler()
  }, [])

  return (
    <div className='flex h-full w-full flex-col'>
      {/* 검색창 */}
      <form onSubmit={handleSearch} className='mb-3 flex w-full items-center justify-center'>
        <input
          className='h-12 w-full rounded-md border border-gray-400 bg-gray-50 px-4 text-sm text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-2/5'
          type='text'
          name='postSearchTest'
          autoComplete='off'
          value={search}
          placeholder='검색어를 입력하세요'
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type='submit'
          className='h- ml-2 w-24 rounded-md bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-500'
        >
          검색
        </button>
      </form>

      <div className='mb-2 flex items-center justify-end gap-4'>
        {/* 우측 버튼 그룹 */}
        <button
          className={`${sorted ? 'bg-blue-500' : 'bg-gray-800'} rounded-md px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-500`}
          onClick={sortHandler}
        >
          등록 최신순
        </button>

        <Link
          href={'/raidpost/create?redirect=/raidpost'}
          scroll={false}
          className='rounded-md bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-100 transition hover:bg-gray-500'
        >
          모집 글 등록
        </Link>
      </div>

      {/* 모집 글 리스트 */}
      <div className='flex h-full w-full flex-col'>
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
          {loading ? (
            <div className='flex items-center justify-center py-8 text-lg font-semibold text-gray-500'>
              로딩중...
            </div>
          ) : currentItems.length > 0 ? (
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
        <PageNavigation />
      </div>
    </div>
  )
}
