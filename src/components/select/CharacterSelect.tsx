'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Under from '@image/icon/under.svg'
import { useCharacterInfoList } from '@/store/characterStore'

export default function CharacterSelect() {
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
    if (characterAllList.length > 0) {
      setCharacterInfo([characterAllList[0]])
    }
    if (characterAllList.length === 0) {
      setCharacterInfo([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterAllList])

  return (
    <div className='relative'>
      {characterInfo[0] ? (
        <>
          <button
            className='flex h-16 w-full items-center justify-between rounded-md border border-gray-300 px-1 shadow-md'
            onClick={handlerHidden}
          >
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
              <span className='text-lg text-white'>{characterInfo[0].character_name}</span>
            </div>
            <Under className='h-4 w-4 text-white' />
          </button>
          <div
            className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md bg-white shadow-md ${hidden ? 'hidden' : ''}`}
          >
            {characterAllList.map((char) => (
              <div
                key={char.character_name}
                className='flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-200'
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
                <span className='text-black'>{char.character_name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span className='text-white'>캐릭터가 없습니다.</span>
      )}
    </div>
  )
}
