'use client'

import { homework } from '@/app/action'
import useHomeworkStore, { useHomeworkExpeditionStore } from '@/store/homeworkCheckStore'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function HomeworkUpdateButton() {
  const { homeworkList } = useHomeworkStore()
  const { homeworkExpeditionList } = useHomeworkExpeditionStore()
  const [message, setMessage] = useState('')
  const [state, setState] = useState(0)
  const { data: session } = useSession()

  const contentList = {
    homeworkList: homeworkList,
    homeworkExpeditionList: homeworkExpeditionList,
  }

  const UpdateHandler = async () => {
    if (!session || !session.user) {
      setMessage('로그인 해주세요.')
      setState(2)

      return
    }

    if (session && session.user && session.user.nickName === '') {
      setMessage('넥네임이 없습니다.')
      setState(2)
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
        setState(1)
        homework()
        setMessage('저장 성공')
      } else {
        setState(2)
        setMessage('저장 실패')
      }
    } catch (error) {
      console.error(error)
      setState(2)
      setMessage('저장 실패')
    }
  }
  return (
    <div className='flex w-full flex-col items-end'>
      <button
        className='rounded-md bg-gray-900 p-2 px-2 text-white hover:bg-gray-500'
        onClick={() => {
          UpdateHandler()
        }}
      >
        저장하기
      </button>

      <span className={`${state === 1 ? 'block' : 'hidden'} text-blue-500`}>{message}</span>
      <span className={`${state === 2 ? 'block' : 'hidden'} text-red-500`}>{message}</span>
    </div>
  )
}
