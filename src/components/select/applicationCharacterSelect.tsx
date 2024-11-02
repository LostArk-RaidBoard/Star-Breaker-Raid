'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Under from '@image/icon/under.svg'
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
interface Props {
  raidLimitLevel: number
  userId: string
}

const noCharacters = {
  character_name: '캐릭터 없음',
  server_name: '캐릭터 없음',
  user_id: '캐릭터 없음',
  character_level: '캐릭터 없음',
  character_class: '캐릭터 없음',
  class_image: '/icon/ellipsis.svg',
  class_icon_url: '/icon/ellipsis.svg',
  transcendence: 0,
  elixir: 0,
  leap: 0,
  enlightenment: 0,
  evolution: 0,
  disable: false,
}

export default function ApplicationCharacterSelect({ raidLimitLevel, userId }: Props) {
  const { characterAllList, setCharacterAllList, setCharacterInfo, characterInfo } =
    useCharacterInfoList()
  const { setRaidLimitLevel } = useRaidSelect()
  const [hidden, setHidden] = useState(true)
  const handlerHidden = () => {
    setHidden(!hidden)
  }

  const handler = (name: string) => {
    const selectedCharacter = characterAllList.find((char) => char.character_name === name)
    if (selectedCharacter) {
      setCharacterInfo([selectedCharacter])
      setHidden(!hidden)
    }
  }

  const raidLevelHandler = (characterRiadArray: CharacterInfo[]) => {
    const raidLevel = raidLimitLevel
    setRaidLimitLevel(raidLevel)

    // 최대 캐릭터 레벨 초기화
    let maxCharacterLevel = 0

    const updatedCharacterList = characterRiadArray.map((char) => {
      const characterLevel = parseFloat(char.character_level.replace(/,/g, ''))

      if (characterLevel > maxCharacterLevel) {
        maxCharacterLevel = characterLevel
      }

      // disable 상태 설정
      char.disable = raidLevel > characterLevel

      return char // 업데이트된 캐릭터 객체 반환
    })

    setCharacterAllList(updatedCharacterList)
  }

  useEffect(() => {
    const fetchCharacterData = async () => {
      const characterGetHandler = async (userId: string) => {
        const characterGetArray: CharacterInfo[] = await UtileCharacterDataFetch(userId)
        return characterGetArray
      }

      if (characterInfo.length > 0 && characterAllList.length > 0) {
        raidLevelHandler(characterAllList)
        const isCharacterEnabled = characterAllList.find(
          (char) => char.character_name === characterInfo[0].character_name && !char.disable,
        )
        if (isCharacterEnabled) {
        } else {
          if (characterAllList.length > 0) {
            setCharacterInfo([characterAllList[0]])
          } else {
            setCharacterInfo([noCharacters])
          }
        }
      } else {
        const characterReFetch: CharacterInfo[] = await characterGetHandler(userId)
        if (characterReFetch.length > 0) {
          raidLevelHandler(characterReFetch)
          if (characterReFetch[0].disable) {
            setCharacterInfo([noCharacters])
          } else {
            setCharacterInfo([characterReFetch[0]])
          }
        } else {
          setCharacterInfo([noCharacters])
        }
      }
    }

    fetchCharacterData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='relative w-full flex-col rounded-md bg-gray-900 xl:w-1/2'>
      <button
        className='flex h-16 w-full items-center justify-between rounded-md border border-gray-500 px-1 shadow-md'
        onClick={handlerHidden}
      >
        {characterInfo.length > 0 && (
          <div className='flex items-center gap-4'>
            <div className='h-12 w-12 overflow-hidden rounded-full'>
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
            <span className='hidden text-lg text-black text-white sm:flex'>
              {characterInfo[0].character_level}
            </span>
            <div className='flex hidden items-center text-white sm:flex'>
              <Image src={'/엘릭서.png'} alt={'엘릭서'} width={30} height={30} className='p-1' />
              <span>{characterInfo[0].elixir}</span>
            </div>
            <div className='flex hidden items-center text-white sm:flex'>
              <Image src={'/초월.png'} alt={'초월'} width={30} height={30} className='p-1' />
              <span>{characterInfo[0].transcendence}</span>
            </div>
          </div>
        )}
        <Under className='h-4 w-4 text-white' />
      </button>
      <div
        className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md bg-gray-300 text-white shadow-md ${hidden ? 'hidden' : ''}`}
      >
        {characterAllList.map((char) => (
          <div
            key={char.character_name}
            className={`flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-200 ${char.disable ? 'hidden' : ''}`}
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
            <span className='text-black'>{char.character_name}</span>
            <span className='hidden text-black sm:block'>{char.character_level}</span>
            <div className='flex hidden items-center text-white sm:flex'>
              <Image src={'/엘릭서.png'} alt={'엘릭서'} width={30} height={30} className='p-1' />
              <span>{char.elixir}</span>
            </div>
            <div className='flex hidden items-center text-white sm:flex'>
              <Image src={'/초월.png'} alt={'초월'} width={30} height={30} className='p-1' />
              <span>{char.transcendence}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
