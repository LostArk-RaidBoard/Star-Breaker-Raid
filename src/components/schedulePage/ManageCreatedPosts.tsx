'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { createPostTage, wePostTage } from '@/app/action'
import PageNavigation from '@/components/utils/PageNavigationSub'
import { usePageinationSub } from '@/store/pageinationSubStore'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  character_name: string
  raid_limitperson: number
  character_classicon: string
  raid_level: string
  approval: number
  rejected_count: number
}

type Props = {
  createPostGet: RaidPost[]
}

export default function ManageCreatedPosts({ createPostGet }: Props) {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageinationSub()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = createPostGet.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setDataLength(createPostGet.length)
    setCurrentPage(1)
    setItemsPerPage(5)
  }, [createPostGet, setDataLength, setCurrentPage, setItemsPerPage])

  const deleteCreatePostHandler = async (
    post_id: number,
    character_name: string,
    user_id: string,
    raid_name: string,
    schedule: string,
  ) => {
    try {
      const response = await fetch(
        `/api/raidPostAPI/createPost?post_id=${post_id}&character_name=${character_name}&user_id=${user_id}&raid_name=${raid_name}&schedule=${schedule}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok && response.status === 200) {
        createPostTage()
        wePostTage()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex h-full basis-1/2 flex-col rounded-lg border border-gray-400 bg-transparent p-5 shadow-lg'>
      <h2 className='mb-4 text-lg font-extrabold text-gray-900'>등록한 모집 글</h2>

      {/* 모집 글 목록 */}
      <div className='flex flex-col'>
        {/* 테이블 헤더 */}
        <div className='grid grid-cols-8 items-center border-b border-gray-300 pb-2 text-sm font-bold text-gray-900 sm:grid-cols-12'>
          <span className='col-span-3'>레이드</span>
          <span className='col-span-3 hidden sm:block'>시간</span>
          <span className='col-span-4'>캐릭터</span>
          <span className='col-span-1 hidden text-center sm:block'>인원</span>
          <span className='col-span-1 text-center'>닫기</span>
        </div>

        {/* 모집 글 리스트 */}
        <div className='divide-y divide-gray-300'>
          {currentItems.length > 0 ? (
            currentItems.map((item, key) => (
              <div
                key={`createAp-${item.post_id}-${item.raid_time}-${item.raid_name}-${key}`}
                className='grid grid-cols-8 items-center gap-2 py-3 hover:bg-gray-200 hover:shadow-sm sm:grid-cols-12'
              >
                <Link
                  href={`/raidpost/${item.post_id}?redirect=/schedule`}
                  className='col-span-7 grid grid-cols-7 gap-2 sm:col-span-11 sm:grid-cols-11'
                  scroll={false}
                >
                  {/* 레이드 이름 */}
                  <div className='col-span-3 truncate text-sm font-medium text-gray-900'>
                    {item.raid_name}{' '}
                    <span className='text-xs text-gray-500'>({item.raid_level})</span>
                  </div>

                  {/* 시간 */}
                  <span className='col-span-3 hidden truncate text-sm text-gray-600 sm:block'>
                    {item.raid_time}
                  </span>

                  {/* 공대장 정보 */}
                  <div className='col-span-4 flex items-center gap-1'>
                    <Image
                      src={item.character_classicon}
                      alt='캐릭터 아이콘'
                      width={24}
                      height={24}
                      className='rounded-full border border-gray-300'
                    />
                    <span className='truncate text-sm font-medium text-gray-900'>
                      {item.character_name}
                    </span>
                  </div>

                  {/* 인원 정보 */}
                  <span className='col-span-1 hidden text-center text-sm font-medium text-gray-900 sm:block'>
                    {item.approval}({item.rejected_count})/{item.raid_limitperson}
                  </span>
                </Link>

                {/* 닫기 버튼 */}
                <button
                  className='col-span-1 rounded-md bg-red-500 py-1 text-sm font-bold text-white hover:bg-red-600'
                  onClick={() => {
                    deleteCreatePostHandler(
                      item.post_id,
                      item.character_name,
                      item.user_id,
                      item.raid_name,
                      item.raid_time,
                    )
                  }}
                >
                  닫기
                </button>
              </div>
            ))
          ) : (
            <div className='py-3 text-center text-gray-500'>등록된 모집 글이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className='mt-6 flex justify-center'>
        <PageNavigation />
      </div>

      {/* 하단 안내 메시지 */}
      <p className='mt-4 text-sm text-gray-500'>
        * 인원에는 승인 대기 중인 인원이 소괄호로 표시됩니다.
      </p>
    </div>
  )
}
