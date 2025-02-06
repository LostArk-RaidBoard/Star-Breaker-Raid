'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function SignupForm() {
  const [userName, setUserName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  const [signupResult, setSignupResult] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 폼 제출 시 페이지 리로드 방지

    if (userName.length === 0) {
      setErrorMessage('이름을 입력해주세요')
      setSignupResult(2)
      return
    }

    if (userPassword !== userPassword2) {
      setErrorMessage('비밀번호와 확인 비밀번호가 다릅니다.')
      setSignupResult(2)
      return
    }

    if (userPassword.length < 8) {
      setErrorMessage('비밀번호는 최소 8 글자입니다.')
      setSignupResult(2)
      return
    }

    if (userPassword.length > 32) {
      setErrorMessage('비밀번호는 최대 32 글자입니다.')
      setSignupResult(2)
      return
    }

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(userEmail)) {
      setErrorMessage('유효한 이메일 주소를 입력하세요.')
      setSignupResult(2)
      return
    }

    // 생년월일 형식 검증
    if (birthday.length !== 8 || isNaN(parseInt(birthday, 10))) {
      setErrorMessage('생년월일은 YYYYMMDD 형식으로 입력해야 합니다.')
      setSignupResult(2)
      return
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, birthday, userEmail, userPassword }),
      })

      const data = await res.json()
      if (res.ok) {
        setSignupResult(1) // 회원가입 성공
      } else {
        setErrorMessage(data.message)
        setSignupResult(2) // 회원가입 실패
      }
    } catch (error) {
      console.error(error)
      setSignupResult(2) // 회원가입 실패
    }
  }

  return (
    <form
      className='flex h-full w-full flex-col items-center justify-center sm:mt-[10vh]'
      onSubmit={handleSubmit}
    >
      <span className='text-2xl'>회원가입</span>
      <span className='mt-8 flex w-[90%] justify-start text-lg sm:w-[400px]'>이름 입력</span>
      <input
        type='text'
        name='userName'
        placeholder='이름'
        className='h-12 w-[90%] rounded-md border border-gray-400 px-1 sm:w-[400px]'
        value={userName}
        autoComplete='off'
        onChange={(e) => setUserName(e.target.value)}
      />
      <span className='mt-4 flex w-[90%] justify-start text-lg sm:w-[400px]'>생년월일 입력</span>
      <input
        type='number'
        name='birthday'
        placeholder='19000101'
        className='h-12 w-[90%] rounded-md border border-gray-400 px-1 sm:w-[400px]'
        value={birthday}
        autoComplete='off'
        onChange={(e) => setBirthday(e.target.value)}
      />
      <span className='mt-4 flex w-[90%] justify-start text-lg sm:w-[400px]'>Email 입력</span>
      <input
        type='email'
        name='userEmail'
        placeholder='email'
        className='h-12 w-[90%] rounded-md border border-gray-400 px-1 sm:w-[400px]'
        value={userEmail}
        autoComplete='off'
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <span className='mt-4 flex w-[90%] justify-start text-lg sm:w-[400px]'>Password 입력</span>
      <input
        type='password'
        name='userPassword'
        placeholder='비밀번호 최소 8 ~ 최대 32'
        className='h-12 w-[90%] rounded-md border border-gray-400 px-1 sm:w-[400px]'
        value={userPassword}
        autoComplete='off'
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <span className='mt-4 flex w-[90%] justify-start text-lg sm:w-[400px]'>
        Password 2차 인증
      </span>
      <input
        type='password'
        name='userPassword2'
        placeholder='비밀번호 확인'
        className='h-12 w-[90%] rounded-md border border-gray-400 px-1 sm:w-[400px]'
        value={userPassword2}
        autoComplete='off'
        onChange={(e) => setUserPassword2(e.target.value)}
      />
      <div
        className={`${signupResult === 0 ? 'hidden' : ''} mt-4 flex w-full items-center justify-center`}
      >
        <span className={`${signupResult == 1 ? '' : 'hidden'}`}>회원가입 성공</span>
        <span className={`${signupResult == 2 ? '' : 'hidden'} text-red-500`}>
          회원가입 실패 : {errorMessage}
        </span>
      </div>
      <button
        type='submit'
        className='mt-8 h-12 w-[90%] rounded-md bg-gray-900 text-white sm:w-[400px]'
      >
        회원가입
      </button>
      <Link
        href='/login'
        className='mt-4 flex h-12 w-[90%] items-center justify-center rounded-md bg-gray-900 text-white sm:w-[400px]'
      >
        로그인 돌아가기
      </Link>
    </form>
  )
}
