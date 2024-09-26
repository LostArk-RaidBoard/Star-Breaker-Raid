'use client'
import InputLayout from '@/components/ui/inputLayout'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface Props {
  userId: string
}

export default function PasswordChange({ userId }: Props) {
  const { data: session } = useSession()
  const [userPassword, setUserPassword] = useState('')
  const [message, setMessage] = useState('')

  const handlerChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 폼 제출 기본 동작 방지

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
        if (response.status === 201) {
          setMessage(data.message)
          return
        }

        if (response.status === 400) {
          setMessage(data.message)
          return
        }
      } else {
        setMessage(data.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='h-full w-full rounded-md border p-4 shadow-lg sm:w-[50%]'>
      {session && session.user.id ? (
        <>
          <span className='text-lg'>비밀번호 변경</span>

          <form className='mt-2 flex w-full flex-col' onSubmit={handlerChange}>
            <span className='overflow-hidden truncate whitespace-nowrap'>
              변경할 비밀번호를 입력해 주세요 (구글 로그인이면 변경 시 자체 로그인이 가능해집니다)
            </span>
            <InputLayout
              setType={'password'}
              setName={'password'}
              setPlaceholder={'비밀번호 최소 8 ~ 최대 32'}
              setCSS={' mt-2 h-12 rounded-md'}
              setValue={setUserPassword}
              value={userPassword}
            />
            <span
              className={`${message.length === 0 ? 'hidden' : 'block'} mt-1 flex justify-center overflow-hidden truncate whitespace-nowrap text-red-500`}
            >
              {message}
            </span>
            <div className='flex w-full justify-center'>
              <button
                type='submit' // 버튼을 폼 제출로 설정
                className='mt-2 w-24 rounded-md border bg-gray-900 p-1 px-2 text-white hover:bg-gray-500'
              >
                변경
              </button>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
