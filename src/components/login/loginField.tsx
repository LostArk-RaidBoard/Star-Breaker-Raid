'use client'
import InputLayout from '@/components/ui/inputLayout'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginField() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className='flex h-full w-full flex-col items-center justify-center sm:mt-20'>
      <span className='text-2xl'>Login</span>
      <form className='flex h-full w-full flex-col items-center justify-center'>
        <InputLayout
          setType={'email'}
          setName={'set_email'}
          setPlaceholder={'email'}
          setCSS={'w-[400px] rounded-md mt-8'}
          setValue={setEmail}
          value={email}
        />
        <InputLayout
          setType={'password'}
          setName={'set_password'}
          setPlaceholder={'password'}
          setCSS={'w-[400px] rounded-md mt-4'}
          setValue={setPassword}
          value={password}
        />
        <button className='mt-8 h-12 w-[400px] rounded-md bg-gray-900 text-white'>로그인</button>
      </form>
    </div>
  )
}
