'use client'
import Image from 'next/image'
import Xmark from '@image/icon/xmark.svg'
import { useEffect, useState } from 'react'
import CharacterSorted from '@/components/utils/characterSorted'
import Loading from '@image/icon/loading.svg'
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
}

interface Props {
  userId: string
}

/**
 * DB에 저장된 캐릭터
 * @param param0
 * @returns
 */
export default function DBCharacterField({ userId }: Props) {
  const { trigger, setTrigger } = useTrigger()
  const [characterList, setCharacterList] = useState<SaveCharacterInfo[]>([])
  const [loading, setLoading] = useState(false)

  const dataFetch = async () => {
    try {
      const response = await fetch(`/api/characterGet?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (response.ok && data.result) {
        const getCharacterList = data.result
        const characterSorted = CharacterSorted(getCharacterList)
        setCharacterList(characterSorted)
      }
    } catch (error) {
      console.error(error)
      setCharacterList([])
    }
  }

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
        setTrigger(!trigger)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    dataFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dataFetch()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return (
    <div className='mt-4 flex flex-col'>
      <span className='text-xl'>캐릭터</span>

      {/* DB에 저장된 캐릭터 */}
      <div className='relative mt-2 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
                        className='hidden p-1 sm:block'
                      />
                      <span>{character.elixir}</span>
                    </div>
                    <div className='flex items-center gap-2 overflow-hidden truncate whitespace-nowrap'>
                      <Image
                        src={'/초월.png'}
                        alt='초파고'
                        width={30}
                        height={30}
                        className='hidden p-1 sm:block'
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
    </div>
  )
}