'use client'
import InputLayout from '@/components/ui/inputLayout'

import { useState } from 'react'
import { signOut } from 'next-auth/react'

interface Props {
  userId: string
}

export default function UserDelete({ userId }: Props) {
  const [inputDelete, setInputDelete] = useState('')
  const [message, setMessage] = useState('')
  const handlerDelete = async () => {
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
      const response = await fetch(`/api/userDelete?userId=${userId}`, {
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
    } catch (e) {
      setMessage('탈퇴하기 실패')
    }
  }
  return (
    <div className='flex w-full flex-col rounded-md border border-gray-400 p-4 shadow-lg'>
      <span className='text-lg font-semibold'>• 회원 탈퇴</span>
      <div className='mt-2 flex w-full flex-col'>
        <span className='overflow-hidden whitespace-nowrap'>
          &#39;탈퇴하기&#39; 입력 후 탈퇴 버튼을 눌러주세요
        </span>
        <InputLayout
          setType={'text'}
          setName={'text'}
          setPlaceholder={'입력해 주세요'}
          setCSS={'w-full mt-2 h-12 rounded-md'}
          setValue={setInputDelete}
          value={inputDelete}
        />
        <span
          className={`${message.length === 0 ? 'hidden' : 'block'} mt-1 flex justify-center overflow-hidden truncate whitespace-nowrap text-red-500`}
        >
          {message}
        </span>
        <div className='flex w-full justify-center'>
          <button
            className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'
            onClick={handlerDelete}
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  )
}
