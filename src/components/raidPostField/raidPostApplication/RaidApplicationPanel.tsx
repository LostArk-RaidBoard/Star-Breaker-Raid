'use client'

import { applicationListTage, wePostTage } from '@/app/action'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Props {
  postId: number
  post_user: string
  applicationList: ApplicationList[]
  raid_name: string
  schedule: Date
}

interface ApplicationList {
  leap: number
  evolution: number
  enlightenment: number
  applicants_id: number
  user_id: string
  character_name: string
  hope: string
  post_id: number
  character_image: string
  character_icon: string
  elixir: number
  transcendence: number
  approval: boolean
  character_level: string
}

const loadingMotion = (
  <svg
    className='h-6 w-6 animate-spin text-white'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
  </svg>
)

export default function RaidApplicationPanel({
  postId,
  applicationList,
  post_user,
  raid_name,
  schedule,
}: Props) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [conflict, setConflict] = useState(false)

  const applicationDelteHandler = async (userId: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/applicationAPI/applicationDelete?post_id=${postId}&user_id=${userId}&schedule=${schedule}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok && response.status === 200) {
        applicationListTage()
        wePostTage()
      }
    } catch (error) {
      console.error('applicationDelete Error :' + error)
    }
    setLoading(false)
  }

  const checkUpdateHandler = async (
    userId: string,
    characterName: string,
    characterCheck: boolean,
  ) => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/applicationAPI/applicationUpdate?postId=${postId}&userId=${userId}&characterName=${characterName}&characterCheck=${characterCheck}&raid_name=${raid_name}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (res && res.status === 200) {
        applicationListTage()
      } else if (res.status === 409) {
        setConflict(true)
        setLoading(false)
      }
      if (!res.ok) {
        setLoading(false)
      }
    } catch (error) {
      console.error('ApplicationStateUpdate :' + error)
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(false)
  }, [applicationList])

  return (
    <div className='rounded-xl border border-gray-400 p-6 shadow-lg'>
      <div className='flex flex-col gap-6'>
        {applicationList.length > 0 ? (
          applicationList.map((char, key) => (
            <div
              className='flex flex-col justify-between gap-4 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow transition-all md:flex-row md:items-center md:gap-6'
              key={key}
            >
              {/* 캐릭터 정보 */}
              <div className='flex flex-none items-center gap-4'>
                <Image
                  src={char.character_image}
                  alt='캐릭터 이미지'
                  height={60}
                  width={60}
                  className='rounded-full border border-gray-600'
                />
                <div className='flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-4'>
                  <div className='flex flex-col'>
                    <span className='text-lg font-bold text-white'>{char.character_name}</span>
                    <span className='text-sm text-gray-400'>{char.character_level} Lv</span>
                  </div>
                  <div className='flex flex-row items-center gap-6'>
                    <div className='flex flex-col items-center gap-2'>
                      <div className='flex items-center gap-2'>
                        <Image src={'/엘릭서.png'} alt='엘릭서' height={20} width={20} />
                        <span className='text-sm text-gray-300'>{char.elixir}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Image src={'/초월.png'} alt='초월' height={20} width={20} />
                        <span className='text-sm text-gray-300'>{char.transcendence}</span>
                      </div>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                      <div className='flex items-center gap-2'>
                        <span className='overflow-hidden truncate whitespace-nowrap rounded-md border border-[#726a54] bg-[#45423a] px-1 text-xs text-gray-100'>
                          진화
                        </span>
                        <span className='text-sm text-gray-300'>{char.evolution}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='overflow-hidden truncate whitespace-nowrap rounded-md border border-[#50707c] bg-[#35454d] px-1 text-xs text-gray-100'>
                          깨달음
                        </span>
                        <span className='text-sm text-gray-300'>{char.enlightenment}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='overflow-hidden truncate whitespace-nowrap rounded-md border border-[#637241] bg-[#3e4631] px-1 text-xs text-gray-100'>
                          도약
                        </span>
                        <span className='text-sm text-gray-300'>{char.leap}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 의견 및 상태 */}
              </div>

              <span className='ml-8 grow text-sm text-gray-300'>{char.hope || '의견 없음'}</span>

              <div className='flex items-center justify-center gap-4'>
                <span
                  className={`text-sm font-medium ${char.approval ? 'text-green-400' : 'text-red-400'}`}
                >
                  {char.approval ? '승인 완료' : '승인 대기 중'}
                </span>

                {/* 승인 및 취소 버튼 */}

                <div className='flex items-center gap-4'>
                  {session?.user.id === post_user && (
                    <button
                      className='rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50'
                      disabled={loading}
                      onClick={() =>
                        checkUpdateHandler(char.user_id, char.character_name, char.approval)
                      }
                    >
                      {loading ? loadingMotion : char.approval ? '승인 취소' : '승인'}
                    </button>
                  )}
                  {session && session.user.id === char.user_id && (
                    <button
                      className='rounded bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-500'
                      onClick={() => applicationDelteHandler(char.user_id)}
                    >
                      {loading ? loadingMotion : '신청 취소'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-lg text-gray-400'>신청자가 아직 없습니다.</div>
        )}
      </div>

      {/* 충돌 모달 */}
      {conflict && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='text-lg font-semibold text-gray-900'>* 최대 승인 인원을 넘었습니다.</h2>
            <button
              className='mt-4 h-10 w-28 rounded bg-gray-800 text-gray-100 hover:bg-gray-700'
              onClick={() => setConflict(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
