'use client'

import InputLayout from '@/components/ui/inputLayout'
import Link from 'next/link'
import { useState } from 'react'

export default function SearchField() {
  const [birthday, setBirthday] = useState('')
  const [userName, setUserName] = useState('')

  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [fetchState, setFetchState] = useState(0)
  const [dbUser, setDbUser] = useState('')
  const [message, setMessage] = useState('')

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userName.length === 0 || birthday.length === 0) {
      setFetchState(5)

      return
    }

    try {
      const response = await fetch(
        `/api/search?userName=${encodeURIComponent(userName)}&birthday=${encodeURIComponent(birthday)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()
      if (response.ok) {
        if (response.status === 201) {
          setFetchState(1)
          setDbUser(data.userIdRow[0].user_id) // 수정된 부분
          return
        }

        if (response.status === 400) {
          setFetchState(2)
          setDbUser('')
          return
        }
      } else {
        setFetchState(2)
      }
    } catch (e) {
      console.error(e)
      setFetchState(2)
    }
  }

  const handlerPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userId.length === 0 || userPassword.length === 0) {
      setFetchState(6)
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(userId)) {
      setMessage('유효한 이메일 주소를 입력하세요.')
      setFetchState(4)
      return
    }

    if (userPassword.length < 8) {
      setMessage('비밀번호는 최소 8 글자입니다.')
      setFetchState(4)
      return
    }

    if (userPassword.length > 32) {
      setMessage('비밀번호는 최대 32 글자입니다.')
      setFetchState(4)
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
          setFetchState(3)
          return
        }

        if (response.status === 400) {
          setFetchState(4)
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
    <div className='flex h-full w-full flex-col items-center justify-center sm:mt-20'>
      <span className='text-2xl'>아이디 & 비밀번호 변경</span>
      <form className='flex flex-col items-center justify-center' onSubmit={handlerSubmit}>
        <span className='mt-8 flex w-[400px] justify-start text-lg'>이름 입력</span>
        <InputLayout
          setType={'text'}
          setName={'set_text'}
          setPlaceholder={'이름'}
          setCSS={'w-[400px] h-12 rounded-md'}
          setValue={setUserName}
          value={userName}
        />
        <span className='mt-4 flex w-[400px] justify-start text-lg'>생년월일 입력</span>
        <InputLayout
          setType={'number'}
          setName={'birthday'}
          setPlaceholder={'19000101'}
          setCSS={'w-[400px] h-12 rounded-md'}
          setValue={setBirthday}
          value={birthday}
        />
        <div className={`mt-1 flex w-[400px] flex-col justify-start p-2`}>
          <span className={`${fetchState == 1 ? '' : 'hidden'}`}>아이디 : {dbUser}</span>
          <span className={`${fetchState == 2 ? '' : 'hidden'}`}>가입한 이력이 없습니다.</span>
          <span className={`${fetchState == 5 ? '' : 'hidden'} text-red-500`}>
            이름과 생년월일을 꼭 입력해주세요
          </span>
        </div>
        <button type='submit' className='mt-4 h-12 w-[400px] rounded-md bg-gray-900 text-white'>
          아이디 찾기
        </button>
      </form>
      <form className='mt-4 flex flex-col items-center justify-center' onSubmit={handlerPost}>
        <span className='mt-4 flex w-[400px] justify-start text-lg'>아이디 입력</span>
        <InputLayout
          setType={'text'}
          setName={'text'}
          setPlaceholder={'Email'}
          setCSS={'w-[400px] h-12 rounded-md'}
          setValue={setUserId}
          value={userId}
        />
        <span className='mt-4 flex w-[400px] justify-start text-lg'>비밀번호 입력</span>
        <InputLayout
          setType={'password'}
          setName={'password'}
          setPlaceholder={'password'}
          setCSS={'w-[400px] h-12 rounded-md'}
          setValue={setUserPassword}
          value={userPassword}
        />
        <div className={`flex w-[400px] flex-col justify-start p-2`}>
          <span className={`${fetchState == 3 ? '' : 'hidden'}`}>비밀번호 재설정 성공</span>
          <span className={`${fetchState == 4 ? '' : 'hidden'} text-red-500`}>
            실패 : {message}
          </span>
          <span className={`${fetchState == 6 ? '' : 'hidden'} text-red-500`}>
            아이디, 비밀번호를 꼭 입력해주세요
          </span>
        </div>
        <button className='mt-4 h-12 w-[400px] rounded-md bg-gray-900 text-white'>
          비밀번호 재설정
        </button>
      </form>

      <Link
        href='/login'
        className='mt-4 flex h-12 w-[400px] items-center justify-center rounded-md bg-gray-900 text-white'
      >
        로그인 돌아가기
      </Link>
    </div>
  )
}
