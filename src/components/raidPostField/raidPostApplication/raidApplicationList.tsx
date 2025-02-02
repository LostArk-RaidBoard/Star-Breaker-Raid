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
}

interface ApplicationList {
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

export default function RaidApplicationList({
  postId,
  applicationList,
  post_user,
  raid_name,
}: Props) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [conflict, setConflict] = useState(false)

  const applicationDelteHandler = async (userId: string) => {
    try {
      const response = await fetch(
        `/api/applicationAPI/applicationDelete?post_id=${postId}&user_id=${userId}`,
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
    <>
      <div className='flex h-auto w-full flex-col items-center justify-center gap-4'>
        {applicationList.length > 0 ? (
          <div className='flex w-full flex-col gap-4'>
            {applicationList.map((char, key) => (
              <div
                className='flex w-full flex-col items-center justify-center gap-2 rounded-md border border-gray-400 p-2 text-lg shadow-lg lg:flex-row lg:gap-8'
                key={key}
              >
                <div className='flex items-center gap-4'>
                  <Image src={char.character_image} alt={'이미지'} height={40} width={40} />
                  <Image
                    src={char.character_icon}
                    alt={'아이콘'}
                    height={30}
                    width={30}
                    className='hidden md:block'
                  />
                  <span>{char.character_name}</span>
                  <span className='hidden sm:block'>{char.character_level}</span>
                  <Image
                    src={'/엘릭서.png'}
                    alt={'엘릭서'}
                    height={30}
                    width={30}
                    className='hidden sm:block'
                  />
                  <span className='hidden sm:block'>{char.elixir}</span>
                  <Image
                    src={'/초월.png'}
                    alt={'초월'}
                    height={30}
                    width={30}
                    className='hidden sm:block'
                  />
                  <span className='hidden sm:block'>{char.transcendence}</span>
                </div>

                <span>의견 : {char.hope}</span>
                <span className={`${char.approval ? 'text-blue-500' : 'text-red-500'}`}>
                  {char.approval ? '승인 완료' : '승인 대기 중'}
                </span>
                {session && session.user.id ? (
                  <>
                    <button
                      className={`flex w-24 items-center justify-center rounded-md bg-gray-900 p-1 p-2 px-2 px-4 text-base text-white ${post_user === session.user.id ? '' : 'hidden'}`}
                      disabled={loading}
                      onClick={() => {
                        checkUpdateHandler(char.user_id, char.character_name, char.approval)
                      }}
                    >
                      <span className={`${char.approval === true ? 'hidden' : ''}`}>
                        <span className={`${loading ? 'hidden' : ''}`}>승인</span>
                        <span className={`${loading ? '' : 'hidden'}`}>로딩...</span>
                      </span>
                      <span className={`${char.approval === true ? '' : 'hidden'}`}>
                        <span className={`${loading ? 'hidden' : ''}`}>승인 취소</span>
                        <span className={`${loading ? '' : 'hidden'}`}>로딩...</span>
                      </span>
                    </button>
                    <button
                      className={`flex w-24 items-center justify-center rounded-md bg-gray-900 p-1 px-2 text-white ${char.user_id === session.user.id ? '' : 'hidden'}`}
                      onClick={() => {
                        applicationDelteHandler(char.user_id)
                      }}
                    >
                      신청 취소
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='text-lg'>신청자가 아직 없습니다.</div>
        )}
      </div>
      {conflict && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30'>
          <div className='flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
            <h2 className='text-lg'>* 최대 승인 인원을 넘었습니다.</h2>
            <button
              className='mt-2 h-8 w-24 rounded-md bg-gray-900 text-white'
              onClick={() => {
                setConflict(false)
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  )
}
