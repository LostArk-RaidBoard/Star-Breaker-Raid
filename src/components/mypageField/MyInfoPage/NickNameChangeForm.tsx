'use client'
import { myInfoTage } from '@/app/action'
import InputLayout from '@/components/ui/inputLayout'
import React, { useState } from 'react'

interface Props {
  userId: string
}

export default function NickNameChangeForm({ userId }: Props) {
  const [nickName, setNickName] = useState('')
  const [message, setMessage] = useState('')

  const nickNameHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 폼 제출 기본 동작 방지
    setNickName('')
    if (userId === '') {
      setMessage('로그인 해주세요')
      return
    }

    if (nickName === '') {
      setMessage('닉네임을 입력해주세요')
      return
    }

    try {
      const response = await fetch(
        `/api/mypageAPI/mypageNickNamePost?user_id=${userId}&nickName=${nickName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
        myInfoTage()
        setTimeout(() => {
          setMessage('')
        }, 3000)
        return
      } else {
        setMessage(data.message)
        return
      }
    } catch (error) {
      console.error('NickName fetch Error :' + error)
      setMessage('오류가 일어났습니다.')
    }
    return
  }
  return (
    <div className='flex w-full flex-col rounded-lg border border-gray-400 bg-white p-6 shadow-lg'>
      <h2 className='mb-4 text-xl font-bold text-gray-900'>닉네임 설정</h2>

      <form className='flex flex-col space-y-4' onSubmit={nickNameHandler}>
        {/* 닉네임 안내 메시지 */}
        <span className='text-sm text-gray-600'>새 닉네임을 입력해 주세요</span>

        {/* 입력 필드 */}
        <InputLayout
          setType={'text'}
          setName={'nickname'}
          setPlaceholder={'닉네임 입력'}
          setCSS={'h-12 rounded-md p-3 text-base '}
          setValue={setNickName}
          value={nickName}
        />

        {/* 메시지 출력 */}
        <span
          className={`${
            message.length === 0 ? 'hidden' : 'block'
          } text-center text-sm font-medium ${
            message === '설정 완료' ? 'text-blue-500' : 'text-red-500'
          }`}
        >
          {message}
        </span>

        {/* 설정 버튼 */}
        <div className='flex justify-center'>
          <button
            type='submit'
            className='w-28 rounded-md bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-500'
          >
            설정
          </button>
        </div>
      </form>
    </div>
  )
}
