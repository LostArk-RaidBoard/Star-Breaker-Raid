'use client'
import Image from 'next/image'
import Xmark from '@image/icon/xmark.svg'
import React, { useEffect, useState } from 'react'
import Loading from '@image/icon/loading.svg'
import SaveCharacterFetch from '@/components/mypageField/saveFetch'
import submit from '@/app/action'
import { useSession } from 'next-auth/react'
import { useTrigger } from '@/store/triggerStore'

interface SaveCharacterInfo {
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

interface Props {
  userId: string
  dbCharacter: CharacterInfo[]
}

type Stats = {
  Type: string
  Value: string
  Tooltip: [string]
}

type Tendencies = {
  Type: string
  Point: number
  MaxPoint: number
}

interface CharacterProfiles {
  CharacterImage: string
  ExpeditionLevel: number
  PvpGradeName: string
  TownLevel: string
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: number
  TotalSkillPoint: number
  Stats: Stats[]
  Tendencies: Tendencies[]
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
}

/**
 * DB에 저장된 캐릭터
 * @param param0
 * @returns
 */
export default function DBCharacterField({ userId, dbCharacter }: Props) {
  const [characterList, setCharacterList] = useState<SaveCharacterInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [saveState, setSaveState] = useState(0)
  const { trigger } = useTrigger()
  const { data: session } = useSession()

  useEffect(() => {
    setLoading(true)

    setTimeout(function () {
      if (loading === true) {
        setLoading(false)
      }
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  useEffect(() => {
    if (dbCharacter.length > 0) {
      setCharacterList(dbCharacter)
    } else {
      setCharacterList([])
    }
  }, [dbCharacter])

  useEffect(() => {
    setLoading(false)
    if (userId === '' && session?.user.id) {
      submit()
    }

    if (userId.length > 0 && dbCharacter.length === 0) {
      submit()
    }
  }, [dbCharacter.length, session, userId])

  const characterDeleteHandler = async (character_name: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/characterDelete?characterName=${character_name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        submit()
      }
    } catch (error) {
      console.error('mypage Character Delete Error :' + error)
    }
  }

  const updateItemHandler = async () => {
    setLoading(true)
    const resultList = []
    for (const item of characterList) {
      try {
        const response = await fetch(
          `/lostark/armories/characters/${item.character_name}/profiles`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: `bearer ${process.env.LostArk_Token}`,
            },
          },
        )
        const data: CharacterProfiles = await response.json()
        if (response.ok) {
          const characterList = {
            CharacterClassName: data.CharacterClassName,
            CharacterLevel: data.CharacterLevel,
            CharacterName: data.CharacterName,
            ItemAvgLevel: data.ItemAvgLevel,
            ItemMaxLevel: data.ItemMaxLevel,
            ServerName: data.ServerName,
            CharacterClassIcon: item.class_icon_url,
            CharacterImage: item.class_image,
          }
          resultList.push(await SaveCharacterFetch(characterList, userId)) // 함수로 호출
          submit()
        }
      } catch (error) {
        console.error('Mypage Character Update Error :' + error)
      }
    }
    if (resultList.includes(false)) {
      setSaveState(2)

      submit()
      setTimeout(function () {
        setLoading(false)
      }, 1000)
    } else {
      setSaveState(1)
      setLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(function () {
      setSaveState(0)
    }, 3000)
  }, [saveState])

  return (
    <div className='mt-4 flex flex-col'>
      <span className='w-full text-lg font-semibold'>• 캐릭터</span>

      {/* DB에 저장된 캐릭터 */}
      <div className='relative mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
        {/* 캐릭터 창 */}
        {characterList.map((character) => (
          <div
            key={character.character_name}
            className='flex h-36 items-center justify-between gap-4 rounded-md bg-gray-900 px-3 text-white'
          >
            <div className='flex flex-col gap-1 overflow-hidden truncate whitespace-nowrap'>
              <div className='flex items-center gap-4 overflow-hidden truncate whitespace-nowrap'>
                <div className='h-12 w-12 flex-none overflow-hidden rounded-full'>
                  <Image
                    src={character.class_image}
                    alt={'이미지'}
                    width={70}
                    height={70}
                    className='h-full w-full object-cover'
                  />
                </div>

                <div className='grow flex-col overflow-hidden'>
                  <div className='flex items-center gap-1 overflow-hidden truncate whitespace-nowrap'>
                    <Image
                      src={character.class_icon_url}
                      alt={'이미지'}
                      width={30}
                      height={30}
                      className='p-1'
                    />

                    <span className='overflow-hidden truncate whitespace-nowrap'>
                      {character.character_name}
                    </span>
                    <span className='ml-1 hidden overflow-hidden truncate whitespace-nowrap sm:block'>
                      {character.server_name}
                    </span>
                  </div>
                  <div className='flex items-center gap-1 overflow-hidden truncate whitespace-nowrap'>
                    <Image src={'/장비.png'} alt='장비' width={30} height={30} className='p-1' />
                    <span className='overflow-hidden truncate whitespace-nowrap'>
                      {character.character_level}
                    </span>
                  </div>
                  <div className='flex gap-2 overflow-hidden truncate whitespace-nowrap'>
                    <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                      <Image
                        src={'/엘릭서.png'}
                        alt='엘릭서'
                        width={30}
                        height={30}
                        className='p-1'
                      />
                      <span>{character.elixir}</span>
                    </div>
                    <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                      <Image
                        src={'/초월.png'}
                        alt='초파고'
                        width={30}
                        height={30}
                        className='p-1'
                      />
                      <span>{character.transcendence}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex w-full items-center justify-between gap-4 overflow-hidden truncate whitespace-nowrap text-sm'>
                <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                  <span className='overflow-hidden truncate whitespace-nowrap rounded-md border border-[#726a54] bg-[#45423a] px-1'>
                    진화
                  </span>
                  <span>{character.evolution}</span>
                </div>
                <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                  <span className='overflow-hidden truncate whitespace-nowrap rounded-md border border-[#50707c] bg-[#35454d] px-1'>
                    깨달음
                  </span>
                  <span>{character.enlightenment}</span>
                </div>
                <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                  <span className='overflow-hidden truncate whitespace-nowrap rounded-md border border-[#637241] bg-[#3e4631] px-1'>
                    도약
                  </span>
                  <span>{character.leap}</span>
                </div>
              </div>
            </div>
            <Xmark
              className='h-5 w-5 flex-none rounded-sm border border-gray-400 bg-gray-100 stroke-[4px] text-red-500 hover:cursor-pointer hover:bg-gray-500'
              onClick={() => {
                characterDeleteHandler(character.character_name)
              }}
            />
          </div>
        ))}

        {loading && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80'>
            <Loading className='h-12 w-12 animate-spin text-white' />
          </div>
        )}
      </div>
      <div className='mt-2 flex flex-col items-center justify-center'>
        <span className={`${saveState === 1 ? '' : 'hidden'} text-blue-500`}>업데이트 성공</span>
        <span className={`${saveState === 2 ? '' : 'hidden'} text-red-500`}>업데이트 실패</span>
        <button
          className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'
          onClick={updateItemHandler}
        >
          업데이트
        </button>
      </div>
    </div>
  )
}
