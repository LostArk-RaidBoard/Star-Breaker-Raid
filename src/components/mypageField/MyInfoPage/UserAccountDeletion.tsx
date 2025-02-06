'use client'
import InputLayout from '@/components/ui/inputLayout'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'

interface Props {
  userId: string
}

export default function UserAccountDeletion({ userId }: Props) {
  const [inputDelete, setInputDelete] = useState('')
  const [message, setMessage] = useState('')

  const handlerDelete = async () => {
    setInputDelete('')
    if (userId === '') {
      setMessage('로그인 해주세요')
      return
    }

    if (inputDelete != '탈퇴하기') {
      setMessage('잘못 입력하셨습니다.')
      return
    }
    setMessage('')
    try {
      const response = await fetch(`/api/mypageAPI/userDelete?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        if (response.status === 200) {
          signOut({ callbackUrl: '/' })
        } else {
          const data = await response.json()
          setMessage(data.message)
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage('탈퇴하기 실패')
      }
    }
  }
  return (
    <div className='flex w-full flex-col rounded-lg border border-gray-400 bg-white p-6 shadow-lg'>
      <span className='mb-4 text-xl font-bold text-gray-900'>회원 탈퇴</span>

      <div className='flex flex-col space-y-4'>
        <span className='text-sm text-gray-600'>
          &#39;탈퇴하기&#39; 입력 후 탈퇴 버튼을 눌러주세요
        </span>

        <InputLayout
          setType={'text'}
          setName={'text'}
          setPlaceholder={'탈퇴하기 입력해 주세요'}
          setCSS={'h-12 rounded-md  p-3 text-base'}
          setValue={setInputDelete}
          value={inputDelete}
        />
        <span
          className={`${message.length === 0 ? 'hidden' : 'block'} mt-1 flex justify-center overflow-hidden truncate whitespace-nowrap text-red-500`}
        >
          {message}
        </span>
        <div className='flex justify-center'>
          <button
            className='w-28 rounded-md bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-100 hover:bg-gray-500'
            onClick={handlerDelete}
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  )
}
