'use client'
import { myInfoTage } from '@/app/action'
import InputLayout from '@/components/ui/inputLayout'

import { useState } from 'react'

interface Props {
  userId: string
}

export default function MyInfoNickName({ userId }: Props) {
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
        `/api/mypageNickNamePost?user_id=${userId}&nickName=${nickName}`,
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
    <div className='h-full w-full rounded-md border border-gray-200 p-4 shadow-lg'>
      <span className='text-lg'>• 닉네임 설정</span>
      <form className='mt-2 flex w-full flex-col' onSubmit={nickNameHandler}>
        <span className='overflow-hidden truncate whitespace-nowrap'>닉네임 입력해 주세요</span>
        <InputLayout
          setType={'text'}
          setName={'text'}
          setPlaceholder={'닉네임 입력'}
          setCSS={' mt-2 h-12 rounded-md'}
          setValue={setNickName}
          value={nickName}
        />
        <span
          className={`${message.length === 0 ? 'hidden' : 'block'} mt-1 flex justify-center overflow-hidden truncate whitespace-nowrap ${message === '설정 완료' ? 'text-black' : 'text-red-500'}`}
        >
          {message}
        </span>
        <div className='flex w-full justify-center'>
          <button
            type='submit' // 버튼을 폼 제출로 설정
            className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'
          >
            설정
          </button>
        </div>
      </form>
    </div>
  )
}
