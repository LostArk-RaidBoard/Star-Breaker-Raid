'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Under from '@image/icon/under.svg'

const characters = [
  {
    character_name: '지존박대기1ssssssss',
    character_level: 1641,
    class_image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master_m.png',
    transcendence: 31,
    elixir: 40,
    jump: 20,
    enlightenment: 30,
    evolution: 32,
  },
  {
    character_name: '지존박대기2',
    character_level: 1650,
    class_image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master_m.png',
    transcendence: 32,
    elixir: 42,
    jump: 22,
    enlightenment: 32,
    evolution: 32,
  },
  {
    character_name: '지존박대기3',
    character_level: 1660,
    class_image:
      'https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/elemental_master_m.png',
    transcendence: 33,
    elixir: 43,
    jump: 23,
    enlightenment: 33,
    evolution: 33,
  },
  // 추가 캐릭터를 여기에 추가할 수 있습니다.
]
interface Props {
  setEquipment: (equipment: number) => void
  setTranscendence: (transcendence: number) => void
  setElixir: (elixir: number) => void
  setJump: (jump: number) => void
  setEnlightenment: (enlightenment: number) => void
  setEvolution: (evolution: number) => void
}

export default function CharacterSelect({
  setEquipment,
  setTranscendence,
  setElixir,
  setJump,
  setEnlightenment,
  setEvolution,
}: Props) {
  const [character, setCharacter] = useState(characters[0])
  const [hidden, setHidden] = useState(true)

  const handler = (name: string) => {
    const selectedCharacter = characters.find((char) => char.character_name === name)
    if (selectedCharacter) {
      setCharacter(selectedCharacter)
      setHidden(!hidden)
    }
  }
  const handlerHidden = () => {
    setHidden(!hidden)
  }

  useEffect(() => {
    setEquipment(character.character_level)
    setTranscendence(character.transcendence)
    setElixir(character.elixir),
      setJump(character.jump),
      setEnlightenment(character.enlightenment),
      setEvolution(character.evolution)
  }, [
    character,
    setElixir,
    setEnlightenment,
    setEquipment,
    setEvolution,
    setJump,
    setTranscendence,
  ])

  return (
    <div className='relative'>
      <button
        className='flex h-16 w-full items-center justify-between rounded-md border border-gray-300 px-1 shadow-md'
        onClick={handlerHidden}
      >
        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 overflow-hidden rounded-full'>
            <Image
              src={character.class_image}
              alt={character.character_name}
              width={70}
              height={70}
              className='h-full w-full object-cover'
            />
          </div>
          <span className='text-lg text-white'>{character.character_name}</span>
        </div>
        <Under className='h-4 w-4 text-white' />
      </button>
      <div
        className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md bg-white shadow-md ${hidden ? 'hidden' : ''}`}
      >
        {characters.map((char) => (
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
    </div>
  )
}
