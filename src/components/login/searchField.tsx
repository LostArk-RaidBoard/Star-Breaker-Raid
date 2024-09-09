'use client'

import InputLayout from '@/components/ui/inputLayout'
import Link from 'next/link'
import { useState } from 'react'

export default function SearchField() {
  const [birthday, setBirthday] = useState('')
  const [userName, setUserName] = useState('')
  const [fetchState, setFetchState] = useState(0)
  const dbUser = 'sjsjsj'
  const dbPassword = 'wqwere'
  return (
    <div className='flex h-full w-full flex-col items-center justify-center sm:mt-20'>
      <span className='text-2xl'>아이디 & 비밀번호 찾기</span>
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
      <div
        className={`mt-2 flex w-[400px] flex-col justify-start p-2 ${fetchState == 0 ? 'hidden' : ''}`}
      >
        <span className=''>아이디 : {dbUser}</span>
        <span className=''>비밀번호 : {dbPassword}</span>
      </div>
      <button className='mt-8 h-12 w-[400px] rounded-md bg-gray-900 text-white'>찾기</button>
      <Link
        href='/login'
        className='mt-4 flex h-12 w-[400px] items-center justify-center rounded-md bg-gray-900 text-white'
      >
        로그인 돌아가기
      </Link>
    </div>
  )
}
