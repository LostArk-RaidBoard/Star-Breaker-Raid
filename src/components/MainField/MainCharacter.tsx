'use client'
import CharacterSelect from '@/components/select/CharacterSelect'
import { useCharacterInfoList } from '@/store/characterStore'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@image/icon/loading.svg'
import { useSession } from 'next-auth/react'
import submit from '@/app/action'

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
  userId: string
}

export default function MainCharacter({ mainCharacter, userId }: MainCharacter) {
  const { data: session } = useSession()
  const { characterInfo, setCharacterAllList, characterAllList } = useCharacterInfoList()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (userId === '' && session?.user.id) {
        await submit()
      }
      setCharacterAllList(mainCharacter)
    }

    fetchData()
  }, [session, mainCharacter, userId, setCharacterAllList]) // 의존성 배열에 userId 추가

  useEffect(() => {
    setLoading(true)

    if (mainCharacter.length > 0 && session?.user.id) {
      setLoading(false)
    } else {
      // 2초 후에 로딩 상태를 false로 변경
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2000)

      // 컴포넌트가 언마운트될 때 타이머 정리
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='relative flex h-48 w-full flex-col justify-between rounded-md bg-gray-900 p-4 shadow-lg md:h-full md:max-w-[25vh]'>
        {loading && ( // 로딩 상태에 따라 전체 div에 로딩 화면 표시
          <div className='absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-90'>
            <Loading className='h-12 w-12 animate-spin text-white' />
          </div>
        )}
        {session && session.user.id ? (
          <>
            <CharacterSelect />
            {characterInfo[0] ? (
              <>
                <div className='flex w-full flex-col text-white'>
                  <div className='flex items-center gap-2'>
                    <Image src={'/장비.png'} alt='장비' width={30} height={30} className='p-1' />
                    <span>장비 레벨 : {characterInfo[0].character_level}</span>
                  </div>
                  <div className='mt-1 flex hidden flex-col gap-3 text-base md:block'>
                    <div className='flex items-center gap-2'>
                      <Image
                        src={'/엘릭서.png'}
                        alt='엘릭서 이미지'
                        width={30}
                        height={30}
                        className='hidden p-1 sm:block'
                      />
                      <span>엘릭서 : {characterInfo[0].elixir}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Image
                        src={'/초월.png'}
                        alt='초월 이미지'
                        width={30}
                        height={30}
                        className='hidden p-1 sm:block'
                      />
                      초월 : {characterInfo[0].transcendence}
                    </div>
                    <div className='mt-2 flex items-center gap-2'>
                      <span className='rounded-md border border-[#726a54] bg-[#45423a] px-1'>
                        진화
                      </span>
                      <span>{characterInfo[0].evolution}</span>
                    </div>
                    <div className='mt-3 flex items-center gap-2'>
                      <span className='rounded-md border border-[#50707c] bg-[#35454d] px-1'>
                        깨달음
                      </span>
                      <span>{characterInfo[0].enlightenment}</span>
                    </div>
                    <div className='mt-3 flex items-center gap-2'>
                      <span className='rounded-md border border-[#637241] bg-[#3e4631] px-1'>
                        도약
                      </span>
                      <span>{characterInfo[0].leap}</span>
                    </div>
                  </div>
                </div>
                <button className='flex w-full items-center justify-center'>
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
          </>
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center text-white'>
            <span>** 로그인 해주세요 **</span>
            <span>캐릭터 정보 창 입니다.</span>
            <span className='mt-2'>로그인 후</span>
            <span className='text-wrap'>마이페이지, 캐릭터 추가!!</span>
          </div>
        )}
      </div>
    </>
  )
}
