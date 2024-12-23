'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@image/icon/loading.svg'
import { useSession } from 'next-auth/react'

export default function MainMyInfo() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [mainNickName, setMainNickName] = useState('마이페이지-내정보-닉네임 설정')

  useEffect(() => {
    const mainFetchHandler = async (userId: string) => {
      // 여기에 사용자 정보를 가져오는 API 호출을 추가합니다.
      // 예시: const response = await fetch(`/api/user/${userId}`);
      // const data = await response.json();
      // return data;
    }

    const fetchData = async () => {
      if (status === 'loading') {
        setLoading(true)
      } else {
        setLoading(false)
        if (session && session.user) {
          const fetchdata = await mainFetchHandler(session.user.id)

          setMainNickName(session.user.nickName || '마이페이지-내정보-닉네임 설정')
        }
      }
    }

    fetchData()
  }, [session, status])

  return (
    <>
      {loading && (
        <div className='absolute inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-90'>
          <Loading className='h-12 w-12 animate-spin text-white' />
        </div>
      )}
      {session && session.user.id ? (
        <div className='flex h-full w-full flex-col'>
          <div className='flex items-center gap-2 text-white'>
            <Image
              src={'/icon/nickNameIcon.png'}
              alt='닉네임 이미지'
              width={30}
              height={30}
              className='p-1'
            />
            <span>{mainNickName}님</span>
          </div>
          <div className='mt-2 flex w-full flex-col items-center text-white md:flex-row md:gap-4 xl:mt-4 xl:w-full xl:flex-col'>
            <button className='mt-4 w-full xl:mt-10'>
              <Link
                href={'/raidpost/create?redirect=/'}
                className='rounded-md bg-gray-200 p-2 shadow-lg'
              >
                모집 글 등록
              </Link>
            </button>
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
