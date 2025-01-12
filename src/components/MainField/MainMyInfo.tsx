'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@image/icon/loading.svg'
import { useSession } from 'next-auth/react'

interface Myinfo {
  character_count: number
  raid_gold: number
  role: string
  schedule_count: number
  user_id: string
  applicant_count: number
  raid_post_count: number
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
    applicant_count: 0,
    raid_post_count: 0,
  })

  useEffect(() => {
    const mainFetchHandler = async (userId: string) => {
      try {
        const response = await fetch(`/api/mainMyInfo?userId=${userId}`, {
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
        <div className='absolute inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-90'>
          <Loading className='h-12 w-12 animate-spin text-white' />
        </div>
      )}
      {session && session.user.id && myInfoState ? (
        <div className='flex h-full w-full flex-col text-white xl:gap-4'>
          <div className='flex items-center gap-2'>
            <Image
              src={'/icon/nickNameIcon.png'}
              alt='닉네임 이미지'
              width={30}
              height={30}
              className='p-1'
            />
            <span>{mainNickName}</span>
          </div>
          <span>캐릭터 수 : {myInfoState.character_count}</span>
          <span className='flex items-center'>
            레이드 횟수 :{' '}
            <Image
              src={'/카제로스레이드.png'}
              alt='카제로스레이드  이미지'
              width={30}
              height={30}
              className='p-1'
            />{' '}
            {myInfoState.schedule_count} /{' '}
            {myInfoState.character_count > 6 ? 18 : myInfoState.character_count * 3}
          </span>

          <span className='flex items-center'>
            이번 주 레이드 골드 수익 :
            <Image
              src={'/골드.png'}
              alt='골드 이미지'
              width={30}
              height={30}
              className='p-1'
            />{' '}
            {myInfoState.raid_gold}
          </span>
          <div className='flex items-center gap-4'>
            <span>모집글 개설 : {myInfoState.raid_post_count} </span>
            <span>모집글 신청 : {myInfoState.applicant_count}</span>
          </div>

          <div className='mt-2 flex w-full items-center justify-center gap-4 text-white md:flex-row xl:mt-4 xl:w-full'>
            <Link
              href={'/mypage/mypost'}
              className='flex items-center justify-center rounded-md bg-gray-200 p-2 text-black shadow-lg'
            >
              일정 관리
            </Link>

            <Link
              href={'/raidpost/create?redirect=/'}
              className='flex items-center justify-center rounded-md bg-gray-200 p-2 text-black shadow-lg'
            >
              모집 글 등록
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center text-white'>
          <span>** 로그인 해주세요 **</span>
        </div>
      )}
    </>
  )
}
