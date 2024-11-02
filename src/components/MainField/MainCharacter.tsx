'use client'
import CharacterSelect from '@/components/select/CharacterSelect'
import { useCharacterInfoList } from '@/store/characterStore'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@image/icon/loading.svg'
import { useSession } from 'next-auth/react'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'

interface CharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  transcendence: number
  leap: number
  evolution: number
  enlightenment: number
  elixir: number
  class_icon_url: string
  disable: boolean
}

interface MainCharacter {
  mainCharacter: CharacterInfo[]
}

/**
 * nickName
 * @returns user의 nickname 반환
 */
const fetchNickFetch = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mainGetNickName?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    if (response.ok) {
      return data.nickName[0]?.nickname ?? ''
    } else {
      return ''
    }
  } catch (error) {
    console.error('NickName Fetch Error' + error)
  }
  return ''
}

export default function MainCharacter() {
  const { data: session } = useSession()
  const { characterInfo, setCharacterAllList } = useCharacterInfoList()
  const [loading, setLoading] = useState(false)
  const [nickName, setNickName] = useState('마이페이지-내정보-닉네임 설정')

  useEffect(() => {
    setLoading(true)
    const fetchCharacterData = async () => {
      if (session && session.user.id) {
        const userId = session.user.id
        const getCharacterList = await UtileCharacterDataFetch(userId) // await 추가
        setCharacterAllList(getCharacterList)
        const nickName = await fetchNickFetch(session.user.id)
        if (nickName != '') {
          setNickName(nickName)
        }
      } else {
      }
      setLoading(false)
    }

    fetchCharacterData() // 비동기 함수 호출
  }, [session, setCharacterAllList])

  return (
    <>
      {loading && ( // 로딩 상태에 따라 전체 div에 로딩 화면 표시
        <div className='absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-90'>
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
            <span>{nickName}</span>
          </div>
          <CharacterSelect />
          {characterInfo[0] ? (
            <>
              <div className='mt-2 flex w-full flex-col items-center text-white md:flex-row md:gap-4 xl:mt-4 xl:w-full xl:flex-col'>
                <div className='flex flex-row gap-4'>
                  <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                    <Image src={'/장비.png'} alt='장비' width={30} height={30} className='p-1' />
                    <span>{characterInfo[0].character_level}</span>
                  </div>
                  <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                    <Image
                      src={'/엘릭서.png'}
                      alt='엘릭서 이미지'
                      width={30}
                      height={30}
                      className='p-1'
                    />
                    <span>{characterInfo[0].elixir}</span>
                  </div>
                  <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                    <Image
                      src={'/초월.png'}
                      alt='초월 이미지'
                      width={30}
                      height={30}
                      className='p-1'
                    />
                    {characterInfo[0].transcendence}
                  </div>
                </div>
                <div className='flex hidden flex-col gap-3 text-base md:flex md:flex-row'>
                  <div className='flex items-center gap-2'>
                    <span className='rounded-md border border-[#726a54] bg-[#45423a] px-1'>
                      진화
                    </span>
                    <span>{characterInfo[0].evolution}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='rounded-md border border-[#50707c] bg-[#35454d] px-1'>
                      깨달음
                    </span>
                    <span>{characterInfo[0].enlightenment}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='rounded-md border border-[#637241] bg-[#3e4631] px-1'>
                      도약
                    </span>
                    <span>{characterInfo[0].leap}</span>
                  </div>
                </div>
              </div>
              <button className='mt-1 w-full md:mt-4 xl:mt-12'>
                <Link href={'/raidpost/create'} className='rounded-md bg-gray-200 p-2 shadow-lg'>
                  모집 글 등록
                </Link>
              </button>
            </>
          ) : (
            <p className='h-full w-full text-pretty text-white'>
              <span className='font-bold'>마이페이지</span>에서 캐릭터를 추가해주세요
            </p>
          )}
        </div>
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center text-white'>
          <span>** 로그인 해주세요 **</span>
          <span>캐릭터 정보 창 입니다.</span>
          <span className='mt-2'>로그인 후</span>
          <span className='text-wrap'>마이페이지, 캐릭터 추가!!</span>
        </div>
      )}
    </>
  )
}
