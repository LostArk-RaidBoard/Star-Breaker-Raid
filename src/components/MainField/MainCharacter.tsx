'use client'
import Link from 'next/link'
import Image from 'next/image'
import CharacterSelect from '@/components/select/CharacterSelect'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function MainCharacter() {
  const { data: session } = useSession()

  const [transcendence, setTranscendence] = useState(0)
  const [equipment, setEquipment] = useState(0)
  const [elixir, setElixir] = useState(0)
  const [jump, setJump] = useState(0)
  const [enlightenment, setEnlightenment] = useState(0)
  const [evolution, setEvolution] = useState(0)

  return (
    <div className='flex h-44 w-full flex-col justify-between rounded-md bg-gray-900 p-4 shadow-lg md:h-full md:w-[300px]'>
      {session ? (
        session.user && session.user.id ? (
          <>
            <div className='flex w-full flex-col text-white'>
              <CharacterSelect
                setEquipment={setEquipment}
                setTranscendence={setTranscendence}
                setElixir={setElixir}
                setJump={setJump}
                setEnlightenment={setEnlightenment}
                setEvolution={setEvolution}
              />

              <div className='mt-4 flex items-center gap-2'>
                <Image src={'/장비.png'} alt='장비' width={30} height={30} className='p-1' />
                <span>장비 레벨 : {equipment}</span>
              </div>
              <div className='mt-1 flex hidden flex-col gap-3 text-base md:block'>
                <div className='flex items-center gap-2'>
                  <Image
                    src={'/엘릭서.png'}
                    alt='엘릭서'
                    width={30}
                    height={30}
                    className='hidden p-1 sm:block'
                  />
                  <span>엘릭서 : {elixir}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    src={'/초월.png'}
                    alt='초파고'
                    width={30}
                    height={30}
                    className='hidden p-1 sm:block'
                  />
                  초월 : {transcendence}
                </div>
                <div className='mt-2 flex items-center gap-2'>
                  <span className='rounded-md border border-[#726a54] bg-[#45423a] px-1'>진화</span>
                  <span>{evolution}</span>
                </div>
                <div className='mt-3 flex items-center gap-2'>
                  <span className='rounded-md border border-[#50707c] bg-[#35454d] px-1'>
                    깨달음
                  </span>
                  <span>{enlightenment}</span>
                </div>
                <div className='mt-3 flex items-center gap-2'>
                  <span className='rounded-md border border-[#637241] bg-[#3e4631] px-1'>도약</span>
                  <span>{jump}</span>
                </div>
              </div>
            </div>
            <button className='mb-4 flex hidden w-full justify-center md:block'>
              <Link href={'/raidpost/create'} className='rounded-md bg-gray-200 p-2 shadow-lg'>
                레이드 개설
              </Link>
            </button>
          </>
        ) : (
          <span className='text-white'>마이페이지에서 캐릭터를 추가해주세요</span>
        )
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-center text-white'>
          <span>** 로그인 해주세요 **</span>
          <span>캐릭터 정보 창 입니다.</span>
          <span className='mt-2'>로그인 후</span>
          <span className='text-wrap'>마이페이지, 캐릭터 추가!!</span>
        </div>
      )}
    </div>
  )
}
