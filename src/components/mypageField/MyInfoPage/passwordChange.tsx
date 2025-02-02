'use client'
import InputLayout from '@/components/ui/inputLayout'
import React, { useState } from 'react'

interface Props {
  userId: string
}

export default function PasswordChange({ userId }: Props) {
  const [userPassword, setUserPassword] = useState('')
  const [message, setMessage] = useState('')

  const handlerChange = async (event: React.FormEvent<HTMLFormElement>) => {
    setUserPassword('')
    event.preventDefault() // 폼 제출 기본 동작 방지

    if (userId === '') {
      setMessage('로그인 해주세요')
      return
    }

    if (userPassword.length < 8) {
      setMessage('비밀번호는 최소 8 글자입니다.')
      return
    }

    if (userPassword.length > 32) {
      setMessage('비밀번호는 최대 32 글자입니다.')
      return
    }

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, userPassword }),
      })
      const data = await response.json()
      if (response.ok) {
        if (response.status === 200) {
          setMessage(data.message)
        }

        if (response.status === 400) {
          setMessage(data.message)
          return
        }

        setTimeout(() => {
          setMessage('')
        }, 3000)
      } else {
        setMessage(data.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='flex w-full flex-col rounded-lg border border-gray-400 bg-white p-6 shadow-lg'>
      <h2 className='mb-4 text-xl font-bold text-gray-900'>비밀번호 변경</h2>

      <form className='flex flex-col space-y-4' onSubmit={handlerChange}>
        <span className='text-sm text-gray-600'>새 비밀번호를 입력해 주세요</span>

        <InputLayout
          setType={'password'}
          setName={'password'}
          setPlaceholder={'비밀번호 최소 8 ~ 최대 32'}
          setCSS={'h-12 rounded-md  p-3 text-base'}
          setValue={setUserPassword}
          value={userPassword}
        />

        <span
          className={`${message.length === 0 ? 'hidden' : 'block'} text-center text-sm font-medium ${
            message === '비밀번호 재설정 성공' ? 'text-blue-500' : 'text-red-500'
          }`}
        >
          {message}
        </span>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='w-28 rounded-md bg-gray-900 py-2 text-sm font-semibold text-white hover:bg-gray-500'
          >
            변경
          </button>
        </div>
      </form>
    </div>
  )
}
