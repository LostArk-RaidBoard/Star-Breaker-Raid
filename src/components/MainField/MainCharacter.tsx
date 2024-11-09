'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@image/icon/loading.svg'
import { useSession } from 'next-auth/react'
import Under from '@image/icon/under.svg'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'

interface CharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  class_icon_url: string
  transcendence: number
  elixir: number
  leap: number
  enlightenment: number
  evolution: number
  disable: boolean
}

export default function MainCharacter() {
  const { data: session } = useSession()
  const [mainNickName, setMainNickName] = useState('마이페이지-내정보-닉네임 설정')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [getCharacterList, setGetCharaacterList] = useState<CharacterInfo[]>([])

  const { setCharacterInfo, characterInfo, setCharacterAllList, characterAllList } =
    useCharacterInfoList()
  const [hidden, setHidden] = useState(true)
  const handler = (name: string) => {
    const selectedCharacter = characterAllList.find((char) => char.character_name === name)
    if (selectedCharacter) {
      setCharacterInfo([selectedCharacter])
      setHidden(!hidden)
    }
  }
  const handlerHidden = () => {
    setHidden(!hidden)
  }

  useEffect(() => {
    const characterHandelr = async () => {
      const getCharacterList: CharacterInfo[] = await UtileCharacterDataFetch(userId)
      setGetCharaacterList(getCharacterList)
    }
    setLoading(true)
    if (session && session.user.id) {
      if (session.user.nickName != '') {
        setMainNickName(session.user.nickName)
        setUserId(session.user.id)
      }
      characterHandelr()
      console.log(characterAllList)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, userId])

  useEffect(() => {
    if (getCharacterList.length > 0) {
      setCharacterInfo([characterAllList[0]])
      setCharacterAllList(getCharacterList)
    }
  }, [characterAllList, getCharacterList, setCharacterAllList, setCharacterInfo])

  return (
    <>
      {loading && ( // 로딩 상태에 따라 전체 div에 로딩 화면 표시
        <div className='absolute inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-90'>
          <Loading className='h-12 w-12 animate-spin text-white' />
        </div>
      )}
      {userId != '' ? (
        <div className='flex h-full w-full flex-col'>
          <div className='flex items-center gap-2 text-white'>
            <Image
              src={'/icon/nickNameIcon.png'}
              alt='닉네임 이미지'
              width={30}
              height={30}
              className='p-1'
            />
            <span>{mainNickName}</span>
          </div>
          <div className='relative mt-3 w-full'>
            {characterInfo[0] ? (
              <>
                <button
                  className='flex h-16 w-full items-center justify-between rounded-md border border-gray-300 px-1 shadow-md'
                  onClick={handlerHidden}
                >
                  <div className='flex w-full items-center gap-4 overflow-hidden truncate whitespace-nowrap'>
                    <div className='h-12 w-12 overflow-hidden rounded-full'>
                      <Image
                        src={characterInfo[0].class_image}
                        alt='클래스 캐릭터 이미지'
                        width={70}
                        height={70}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <span className='overflow-hidden truncate whitespace-nowrap text-lg text-white'>
                      {characterInfo[0].character_name}
                    </span>
                  </div>
                  <Under className='h-4 w-4 text-white' />
                </button>
                <div
                  className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md bg-white shadow-md ${hidden ? 'hidden' : ''}`}
                >
                  {characterAllList.map((char) => (
                    <div
                      key={char.character_name}
                      className='flex cursor-pointer items-center gap-4 p-2 hover:rounded-md hover:bg-gray-200'
                      onClick={() => handler(char.character_name)}
                    >
                      <div className='h-12 w-12 overflow-hidden rounded-full'>
                        <Image
                          src={char.class_image}
                          alt='클래스 캐릭터 이미지'
                          width={70}
                          height={70}
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <span className='text-black'>{char.character_name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <span className='text-white'>캐릭터가 없습니다.</span>
            )}
          </div>
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
              <button className='mt-4 w-full xl:mt-10'>
                <Link
                  href={'/raidpost/create?redirect=/'}
                  className='rounded-md bg-gray-200 p-2 shadow-lg'
                >
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
