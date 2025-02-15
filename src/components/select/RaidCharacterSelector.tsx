'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Under from '@image/icon/under.svg'

const undetermined = {
  character_name: '캐릭터 미정',
  server_name: '캐릭터 미정',
  user_id: '캐릭터 미정',
  character_level: '캐릭터 미정',
  character_class: '캐릭터 미정',
  class_image: '/icon/ellipsis.svg',
  class_icon_url: '/icon/ellipsis.svg',
  transcendence: 0,
  elixir: 0,
  leap: 0,
  enlightenment: 0,
  evolution: 0,
  disable: false,
}

const noCharacters = {
  character_name: '캐릭터 미정',
  server_name: '캐릭터 미정',
  user_id: '캐릭터 미정',
  character_level: '1,000,000',
  character_class: '캐릭터 미정',
  class_image: '/icon/ellipsis.svg',
  class_icon_url: '/icon/ellipsis.svg',
  transcendence: 0,
  elixir: 0,
  leap: 0,
  enlightenment: 0,
  evolution: 0,
  disable: false,
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
  createPostCharacter: CharacterInfo[]
}

export default function RaidCharacterSelector({ createPostCharacter }: Props) {
  const { characterAllList, setCharacterInfo, characterInfo, setCharacterAllList } =
    useCharacterInfoList()
  const [hidden, setHidden] = useState(true)
  const handlerHidden = () => {
    setHidden(!hidden)
  }

  const handler = (name: string) => {
    if (name === '캐릭터 미정') {
      setCharacterInfo([undetermined])
      setHidden(!hidden)
    } else {
      const selectedCharacter = characterAllList.find((char) => char.character_name === name)
      if (selectedCharacter) {
        setCharacterInfo([selectedCharacter])
        setHidden(!hidden)
      }
    }
  }

  useEffect(() => {
    setCharacterAllList(createPostCharacter)

    if (characterAllList.length === 0) {
      setCharacterInfo([noCharacters])
    } else {
      setCharacterInfo([characterAllList[0]])
    }
  }, [createPostCharacter, setCharacterAllList, characterAllList, setCharacterInfo])

  return (
    <div className='p-4'>
      <h2 className='mb-1 text-base font-semibold text-gray-900'>캐릭터 선택</h2>
      {characterAllList.length > 0 && characterInfo.length > 0 ? (
        <div className='relative w-full flex-col rounded-md bg-gray-900'>
          <button
            className='flex h-16 w-full items-center justify-between rounded-md border border-gray-500 px-2 shadow-md'
            onClick={handlerHidden}
          >
            <div className='flex items-center gap-4'>
              <div className='h-14 w-14 overflow-hidden rounded-full'>
                <Image
                  src={characterInfo[0].class_image}
                  alt={characterInfo[0].character_name}
                  width={70}
                  height={70}
                  className='h-full w-full object-cover'
                />
              </div>
              <Image
                src={characterInfo[0].class_icon_url}
                alt={characterInfo[0].character_name}
                width={40}
                height={40}
                className='p-1'
              />
              <span className='text-lg text-white'>{characterInfo[0].character_name}</span>
              <span className='hidden text-lg text-black text-white sm:block'>
                {characterInfo[0].character_level} Lv
              </span>
            </div>
            <Under className='h-4 w-4 text-white' strokeWidth={3} />
          </button>
          <div
            className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md bg-gray-600 text-white shadow-md ${hidden ? 'hidden' : ''}`}
          >
            <div
              key={'캐릭터 미정'}
              className={`flex cursor-pointer items-center gap-4 rounded-md p-2 text-white hover:bg-gray-400 hover:text-black ${characterInfo[0].character_name === '캐릭터 없음' ? 'hidden' : ''}`}
              onClick={() => handler('캐릭터 미정')}
            >
              <div className='h-12 w-12 overflow-hidden rounded-full'>
                <Image
                  src={'/icon/ellipsis.svg'}
                  alt={'캐릭터 미정'}
                  width={70}
                  height={70}
                  className='h-full w-full object-cover'
                />
              </div>
              <Image
                src={'/icon/ellipsis.svg'}
                alt={'캐릭터 미정'}
                width={30}
                height={30}
                className='p-1'
              />
              <span className='flex h-12 items-center'>캐릭터 미정</span>
            </div>
            {characterAllList.map((char) => (
              <div
                key={char.character_name}
                className={`flex cursor-pointer items-center gap-4 rounded-md p-2 text-white hover:bg-gray-400 hover:text-black ${char.disable ? 'hidden' : ''}`}
                onClick={() => handler(char.character_name)}
              >
                <div className='h-12 w-12 overflow-hidden rounded-full'>
                  <Image
                    src={char.class_image}
                    alt={char.character_name}
                    width={70}
                    height={70}
                    className='h-full w-full object-cover'
                  />
                </div>
                <Image
                  src={char.class_icon_url}
                  alt={char.character_name}
                  width={30}
                  height={30}
                  className='p-1'
                />
                <span className=''>{char.character_name}</span>
                <span className='hidden sm:block'>{char.character_level}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex h-14 w-full items-center rounded-md bg-gray-900 px-4 text-white'>
          캐릭터 없음
        </div>
      )}
    </div>
  )
}
