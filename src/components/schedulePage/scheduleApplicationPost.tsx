'use client'

import Pagination from '@/components/utils/pagination'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { usePageination } from '@/store/pageinationStore'
import { applicationListTage, applicationTage, wePostTage } from '@/app/action'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  character_name: string
  character_classicon: string
  raid_level: string
  approval: boolean
  nickname: string
}

type Props = {
  userId: string
  applicationPostGet: RaidPost[]
}

export default function ScheduleApplicationPost({ userId, applicationPostGet }: Props) {
  const { currentPage, itemsPerPage, setDataLength, setItemsPerPage, setCurrentPage } =
    usePageination()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = applicationPostGet.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    setDataLength(applicationPostGet.length)
    setCurrentPage(1)
    setItemsPerPage(5)
  }, [applicationPostGet, setDataLength, setCurrentPage, setItemsPerPage])

  const deleteApplicationHandler = async (post_id: number, raid_name: string) => {
    try {
      const response = await fetch(
        `/api/applicationAPI/applicationDelete?post_id=${post_id}&user_id=${userId}&raid_name=${raid_name}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok && response.status === 200) {
        applicationTage()
        wePostTage()
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    applicationListTage() // 초기 데이터 fetch
  }, [])

  return (
    <div className='flex h-full basis-1/2 flex-col rounded-lg border border-gray-400 bg-transparent p-5 shadow-lg'>
      <h2 className='mb-4 text-lg font-extrabold text-gray-900'>참여 신청한 모집 글</h2>

      {/* 모집 글 목록 */}
      <div className='flex flex-col'>
        {/* 테이블 헤더 */}
        <div className='grid grid-cols-8 items-center border-b border-gray-300 pb-2 text-sm font-bold text-gray-900 sm:grid-cols-12'>
          <span className='col-span-3'>레이드</span>
          <span className='col-span-4 hidden sm:block'>시간</span>
          <span className='col-span-3 text-center'>공대장</span>
          <span className='col-span-2 text-center'>취소</span>
        </div>

        {/* 모집 글 리스트 */}
        <div className='divide-y divide-gray-300'>
          {currentItems.length > 0 ? (
            currentItems.map((item, key) => (
              <div
                key={`scheduleAp-${item.post_id}-${key}`}
                className={`grid grid-cols-8 items-center gap-4 px-2 py-3 transition-transform hover:shadow-sm sm:grid-cols-12 ${item.approval ? 'bg-indigo-100 hover:bg-indigo-200' : 'hover:bg-gray-200'}`}
              >
                {/* 레이드 이름 */}
                <Link
                  href={`/raidpost/${item.post_id}?redirect=/schedule`}
                  className='col-span-6 grid grid-cols-6 truncate text-base font-medium text-gray-900 sm:col-span-10 sm:grid-cols-10'
                  scroll={false}
                >
                  <div className='col-span-3'>
                    {item.raid_name}{' '}
                    <span className='text-sm text-gray-500'>({item.raid_level})</span>
                  </div>

                  {/* 시간 */}
                  <span className='col-span-4 hidden text-sm text-gray-600 sm:block'>
                    {item.raid_time}
                  </span>

                  {/* 공대장 정보 */}
                  <div className='col-span-3 flex items-center justify-center gap-2'>
                    <Image
                      src={item.character_classicon}
                      alt='캐릭터 아이콘'
                      width={24}
                      height={24}
                      className='rounded-full border border-gray-300'
                    />
                    <span className='truncate text-sm font-medium text-gray-900 sm:inline'>
                      {item.nickname}
                    </span>
                  </div>
                </Link>

                {/* 취소 버튼 */}
                <button
                  className='col-span-2 rounded-md bg-red-500 py-1 text-sm font-bold text-white hover:bg-red-600'
                  onClick={() => deleteApplicationHandler(item.post_id, item.raid_name)}
                >
                  취소
                </button>
              </div>
            ))
          ) : (
            <div className='py-3 text-center text-gray-500'>신청한 모집 글이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className='mt-6 flex justify-center'>
        <Pagination />
      </div>

      {/* 하단 안내 메시지 */}
      <p className='mt-4 text-sm text-gray-500'>
        * 참여 신청한 모집 글은 공대장이 승인하면 색상이 변경됩니다.
      </p>
    </div>
  )
}
