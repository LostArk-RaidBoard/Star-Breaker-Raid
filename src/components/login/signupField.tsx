'use client'

import InputLayout from '@/components/ui/inputLayout'
import Link from 'next/link'
import { useState } from 'react'

export default function SignupField() {
  const [userName, setUserName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  return (
    <div className='flex h-full w-full flex-col items-center justify-center sm:mt-20'>
      <span className='text-2xl'>회원가입</span>
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
        setName={'set_number'}
        setPlaceholder={'생년월일'}
        setCSS={'w-[400px] h-12 rounded-md'}
        setValue={setBirthday}
        value={birthday}
      />
      <span className='mt-4 flex w-[400px] justify-start text-lg'>Email 입력</span>
      <InputLayout
        setType={'email'}
        setName={'set_email'}
        setPlaceholder={'Email'}
        setCSS={'w-[400px] h-12 rounded-md'}
        setValue={setUserEmail}
        value={userEmail}
      />
      <span className='mt-4 flex w-[400px] justify-start text-lg'>Password 입력</span>
      <InputLayout
        setType={'password'}
        setName={'set_password'}
        setPlaceholder={'비밀번호'}
        setCSS={'w-[400px] h-12 rounded-md'}
        setValue={setUserPassword}
        value={userPassword}
      />
      <span className='mt-4 flex w-[400px] justify-start text-lg'>Password 2차 인증</span>
      <InputLayout
        setType={'password'}
        setName={'set_password2'}
        setPlaceholder={'2차 비밀번호'}
        setCSS={'w-[400px] h-12 rounded-md'}
        setValue={setUserPassword2}
        value={userPassword2}
      />
      <button className='mt-8 h-12 w-[400px] rounded-md bg-gray-900 text-white'>회원가입</button>
      <Link
        href='/login'
        className='mt-4 flex h-12 w-[400px] items-center justify-center rounded-md bg-gray-900 text-white'
      >
        로그인 돌아가기
      </Link>
    </div>
  )
}
