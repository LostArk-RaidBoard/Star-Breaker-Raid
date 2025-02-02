'use client'

import { homework } from '@/app/action'
import useHomeworkStore, { useHomeworkExpeditionStore } from '@/store/homeworkCheckStore'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function HomeworkUpdateButton() {
  const { homeworkList } = useHomeworkStore()
  const { homeworkExpeditionList } = useHomeworkExpeditionStore()
  const [message, setMessage] = useState('')
  const [keep, setKeep] = useState(false)
  const { data: session } = useSession()

  const contentList = {
    homeworkList: homeworkList,
    homeworkExpeditionList: homeworkExpeditionList,
  }

  const UpdateHandler = async () => {
    setKeep(true)
    if (!session || !session.user) {
      setMessage('로그인 해주세요.')

      return
    }

    if (session && session.user && session.user.nickName === '') {
      setMessage('넥네임이 없습니다.')

      return
    }

    try {
      const response = await fetch('/api/homeworkAPI/homeworkPut', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentList),
      })

      if (response.ok && response.status === 200) {
        homework()
        setMessage('저장 성공')
      } else {
        setMessage('저장 실패')
      }
    } catch (error) {
      console.error(error)

      setMessage('저장 실패')
    }

    setKeep(false)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }
  return (
    <div className='flex w-full flex-row items-center justify-end gap-4'>
      <span
        className={`${message.length > 0 ? 'block' : 'hidden'} ${message === '저장 성공' ? 'text-blue-500' : 'text-red-500'}`}
      >
        {message}
      </span>
      <button
        className='rounded-md bg-gray-900 p-2 px-2 text-white hover:bg-gray-500'
        disabled={keep}
        onClick={() => {
          UpdateHandler()
        }}
      >
        저장하기
      </button>
    </div>
  )
}
