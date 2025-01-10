'use client'
import { useEffect, useState } from 'react'
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
  limitLevel: number
  updateCharacterSelect: CharacterInfo | undefined
  setUpdateCharacterSelect: (character: CharacterInfo) => void
}

export default function UpdateRaidCharacterSelect({
  createPostCharacter,
  limitLevel,
  updateCharacterSelect,
  setUpdateCharacterSelect,
}: Props) {
  const [hidden, setHidden] = useState(true)
  const handlerHidden = () => {
    setHidden(!hidden)
  }

  const handler = (name: string) => {
    if (name === '캐릭터 미정') {
      setUpdateCharacterSelect(undetermined)
      setHidden(!hidden)
    } else {
      const selectedCharacter = createPostCharacter.find((char) => char.character_name === name)
      if (selectedCharacter) {
        setUpdateCharacterSelect(selectedCharacter)
        setHidden(!hidden)
      }
    }
  }

  useEffect(() => {
    const raidLevel = limitLevel
    var maxCharacterLevel = 0

    createPostCharacter.map((char) => {
      const characterLevel = parseFloat(char.character_level.replace(/,/g, ''))

      if (characterLevel > maxCharacterLevel) {
        maxCharacterLevel = characterLevel
      }

      if (raidLevel > characterLevel) {
        char.disable = true
      } else {
        char.disable = false
      }
    })

    if (raidLevel > maxCharacterLevel) {
      setUpdateCharacterSelect(noCharacters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col'>
      <label className='text-lg font-semibold'>• 캐릭터 선택</label>
      {createPostCharacter.length > 0 && updateCharacterSelect ? (
        <div className='relative w-full flex-col rounded-md bg-gray-900'>
          <button
            className='flex h-16 w-full items-center justify-between rounded-md border border-gray-700 px-2 shadow-md'
            onClick={handlerHidden}
          >
            <div className='flex items-center gap-4'>
              <div className='h-12 w-12 overflow-hidden rounded-full'>
                <Image
                  src={updateCharacterSelect.class_image}
                  alt={updateCharacterSelect.character_name}
                  width={70}
                  height={70}
                  className='h-full w-full object-cover'
                />
              </div>
              <Image
                src={updateCharacterSelect.class_icon_url}
                alt={updateCharacterSelect.character_name}
                width={40}
                height={40}
                className='p-1'
              />
              <span className='text-lg text-white'>{updateCharacterSelect.character_name}</span>
              <span className='hidden text-lg text-black text-white sm:block'>
                {updateCharacterSelect.character_level}
              </span>
            </div>
            <Under className='h-4 w-4 text-white' strokeWidth={3} />
          </button>
          <div
            className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md bg-gray-600 text-white shadow-md ${hidden ? 'hidden' : ''}`}
          >
            <div
              key={'캐릭터 미정'}
              className={`flex cursor-pointer items-center gap-4 rounded-md p-2 text-white hover:bg-gray-400 hover:text-black ${updateCharacterSelect.character_name === '캐릭터 없음' ? 'hidden' : ''}`}
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
            {createPostCharacter.map((char) => (
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
