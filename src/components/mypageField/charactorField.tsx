'use client'
import InputLayout from '@/components/ui/inputLayout'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function CharactorField() {
  const { data: session } = useSession()
  const [character, setCharacter] = useState('')
  const [mainCharacter, setMainCharacter] = useState('')

  return (
    <>
      {session && session?.user.id ? (
        <div className='flex h-full w-full flex-col p-4'>
          <span className='text-lg'>캐릭터 관리</span>
          <div className='mt-2 flex w-full flex-col gap-4 sm:flex-row'>
            <div className='flex w-full flex-col sm:w-[50%]'>
              <span className='text-lg'>• 모든 캐릭터 가져오기</span>
              <div className='ml-2 flex flex-col'>
                <span className='mt-2'>대표 캐릭터 입력하기</span>
                <InputLayout
                  setType={'text'}
                  setName={'text_character'}
                  setPlaceholder={'대표 캐릭터 입력'}
                  setCSS={'rounded-md h-12 max-w-[400px] '}
                  setValue={setMainCharacter}
                  value={mainCharacter}
                />
                <button className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'>
                  확인
                </button>
              </div>
            </div>
            <div className='sm: flex w-full flex-col sm:w-[50%]'>
              <span className='text-lg'>• 한 캐릭터 가져오기</span>
              <div className='ml-2 flex flex-col'>
                <span className='mt-2'>캐릭터명 입력하기</span>
                <InputLayout
                  setType={'text'}
                  setName={'text_character'}
                  setPlaceholder={'캐릭터명 입력'}
                  setCSS={'rounded-md h-12 max-w-[400px] '}
                  setValue={setCharacter}
                  value={character}
                />
                <button className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'>
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex h-full w-full justify-center text-xl'>로그인 해주세요</div>
      )}
    </>
  )
}
