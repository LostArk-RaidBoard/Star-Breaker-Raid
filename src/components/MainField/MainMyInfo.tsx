'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@image/icon/loading.svg'
import GoldImage from '@image/image/골드.png'
import CircleCheck from '@image/icon/circlecheck.svg'
import { useSession } from 'next-auth/react'
import formatNumber from '@/components/utils/FormatNumber'

interface Myinfo {
  character_count: number
  raid_gold: number
  role: string
  schedule_count: number
  user_id: string
  daycontent: boolean
  gathering: boolean
  wisdom: boolean
}

/**
 * MainMyInfo
 * @returns 메인 화면의 나의 정보를 출력해주는 칸 입니다.
 */
export default function MainMyInfo() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [mainNickName, setMainNickName] = useState('마이페이지-내정보 설정')
  const [myInfoState, setMyInfoState] = useState<Myinfo>({
    character_count: 0,
    raid_gold: 0,
    role: '',
    schedule_count: 0,
    user_id: '',
    daycontent: false,
    gathering: false,
    wisdom: false,
  })

  useEffect(() => {
    const mainFetchHandler = async (userId: string) => {
      try {
        const response = await fetch(`/api/mainAPI/mainMyInfo?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok && response.status === 200) {
          const data = await response.json()
          setMyInfoState(data.postRows)
        }
      } catch (error) {
        console.error('MainInfo Fetch error : ' + error)
      }
    }

    const fetchData = async () => {
      if (status === 'loading') {
        setLoading(true)
      } else {
        if (session && session.user.id) {
          await mainFetchHandler(session.user.id)
          setMainNickName(session.user.nickName || '마이페이지-내정보 설정')
        }
        setLoading(false)
      }
    }
    // MainMyInfo 정보 fetch
    fetchData()
  }, [session, status])

  return (
    <>
      {loading && (
        <div className='absolute inset-0 z-30 flex items-center justify-center rounded-md bg-gray-600 bg-opacity-90'>
          <Loading className='h-12 w-12 text-gray-100' />
        </div>
      )}
      {session && session.user.id && myInfoState ? (
        <div className='flex h-full w-full flex-col justify-between text-white'>
          {/* 상단 섹션 */}
          <div className='flex items-center gap-3'>
            <Image
              src={session.user.role === 'teacher' ? '/asset/금색배찌.png' : '/asset/은색배찌.png'}
              alt='닉네임 이미지'
              width={35}
              height={35}
              className='rounded-full'
            />
            <span className='text-xl font-semibold'>{mainNickName}</span>
          </div>

          {/* 정보 섹션 */}
          <div className='mt-2 grid gap-3 text-sm'>
            <div className='flex justify-between'>
              <span>캐릭터 수:</span>
              <span>{myInfoState.character_count}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>레이드 횟수:</span>
              <div className='flex items-center'>
                <Image
                  src={'/image/카제로스레이드.png'}
                  alt='레이드 이미지'
                  width={20}
                  height={20}
                  className='p-1'
                />
                {myInfoState.schedule_count} /{' '}
                {myInfoState.character_count > 6 ? 18 : myInfoState.character_count * 3}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span>이번 주 레이드 골드 수익:</span>
              <div className='flex items-center'>
                <Image src={GoldImage} alt='골드 이미지' width={20} height={20} className='p-1' />
                {formatNumber(myInfoState.raid_gold)}
              </div>
            </div>
            <div className='flex justify-between'>
              <span>생활:</span>
              <CircleCheck
                className={`h-4 w-4 ${myInfoState.gathering ? 'text-green-500' : 'text-red-500'}`}
              />
            </div>
            <div className='flex justify-between'>
              <span>영지:</span>
              <CircleCheck
                className={`h-4 w-4 ${myInfoState.wisdom ? 'text-green-500' : 'text-red-500'}`}
              />
            </div>
            <div className='flex justify-between'>
              <span>카오스 게이트 or 필드 보스:</span>
              <CircleCheck
                className={`h-4 w-4 ${myInfoState.daycontent ? 'text-green-500' : 'text-red-500'}`}
              />
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className='mt-4 flex justify-between'>
            <Link
              href={'/schedule'}
              className='mr-2 flex flex-1 items-center justify-center rounded-md bg-blue-500 p-2 text-sm font-medium text-white shadow-md hover:bg-blue-600'
            >
              일정 관리
            </Link>
            <Link
              href={'/raidpost/create?redirect=/'}
              className='ml-2 flex flex-1 items-center justify-center rounded-md bg-gray-500 p-2 text-sm font-medium text-white shadow-md hover:bg-gray-600'
            >
              모집 글 등록
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex h-full w-full items-center justify-center text-white'>
          <span>** 로그인 해주세요 **</span>
        </div>
      )}
    </>
  )
}
