'use client'
import InputLayout from '@/components/ui/inputLayout'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SignInResult {
  error?: string
}

export default function LoginField() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 폼 제출 시 페이지 새로 고침 방지
    setError('') // 이전 에러 메시지 초기화

    // 이메일 및 비밀번호 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력하세요.')
      return
    }

    const result = (await signIn('credentials', {
      email,
      password,
      redirect: false, // 리다이렉트 방지
    })) as SignInResult | undefined

    if (result?.error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.')
    } else {
      router.push('/')
    }
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center sm:mt-20'>
      <span className='text-2xl'>Login</span>
      <form
        className='flex h-full w-full flex-col items-center justify-center'
        onSubmit={handleLogin}
      >
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
        {error && <span className='mt-4 text-red-500'>{error}</span>}
        <button className='mt-8 h-12 w-[400px] rounded-md bg-gray-900 text-white' type='submit'>
          로그인
        </button>
      </form>
    </div>
  )
}
