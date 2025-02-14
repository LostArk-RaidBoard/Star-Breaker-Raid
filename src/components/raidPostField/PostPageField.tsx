'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageNavigation from '@/components/utils/PageNavigationSub'
import { usePageinationSub } from '@/store/pageinationSubStore'
import { converToKoranTime1 } from '@/components/utils/converToKoreanTime'
import { fetcher } from '@/components/utils/fetcher'
import Loading from '@image/icon/loading.svg'

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

export default function PostPageField() {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageinationSub()
  const [search, setSearch] = useState('') // 검색어 상태
  const [searchInput, setSearchInput] = useState('') // 입력 필드 상태
  const [sorted, setSorted] = useState(false)

  // ✅ SWR을 사용한 데이터 패칭 (자동 갱신, 포커스 시 갱신, 캐싱)
  const { data, isLoading } = useSWR(
    `/api/raidPostAPI/raidPostGet?search=${encodeURIComponent(search.trim() !== '' ? search : 'all')}`,
    fetcher,
    {
      refreshInterval: 5000, // 5초마다 자동 갱신
      revalidateOnFocus: true, // 포커스 시 자동 갱신
      revalidateOnReconnect: true, // 네트워크 복구 시 자동 갱신
    },
  )

  // ✅ useMemo를 활용하여 showRaidPost 최적화
  const showRaidPost = useMemo(() => {
    return (
      data?.postRows?.map((item: RaidPost) => ({
        ...item,
        raid_time: converToKoranTime1(item.raid_time),
      })) ?? []
    )
  }, [data])

  // ✅ 정렬 기능 (최신순)
  const sortedRaidPost = useMemo(() => {
    return sorted ? [...showRaidPost].sort((a, b) => b.post_id - a.post_id) : showRaidPost
  }, [showRaidPost, sorted])

  // ✅ 현재 페이지 아이템 필터링
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedRaidPost.slice(indexOfFirstItem, indexOfLastItem)

  // ✅ 검색 기능 (버튼 클릭 또는 엔터 입력 시 실행)
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(searchInput) // 현재 입력된 검색어로 업데이트
  }

  const sortHandler = () => {
    setSorted(!sorted)
  }

  useEffect(() => {
    setDataLength(showRaidPost.length)
    setCurrentPage(1)
    setItemsPerPage(15)
  }, [showRaidPost, setDataLength, setCurrentPage, setItemsPerPage])

  return (
    <div className='flex h-full w-full flex-col'>
      {/* 검색창 */}
      <form onSubmit={handleSearch} className='mb-3 flex w-full items-center justify-center'>
        <input
          className='h-12 w-full rounded-md border border-gray-400 bg-gray-50 px-4 text-sm text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-2/5'
          type='text'
          name='postSearchTest'
          autoComplete='off'
          value={searchInput} // 입력 상태 바인딩
          placeholder='검색어를 입력하세요'
          onChange={(e) => setSearchInput(e.target.value)} // 입력 필드 업데이트
        />

        <button
          type='submit'
          className='ml-2 w-24 rounded-md bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-500'
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
          {isLoading ? (
            <div className='flex items-center justify-center py-8'>
              <Loading className='h-12 w-12 text-gray-800' />
            </div>
          ) : currentItems.length > 0 ? (
            currentItems.map((item: RaidPost, index: number) => (
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
