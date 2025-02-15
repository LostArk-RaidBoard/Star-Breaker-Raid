'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function GoogleLoginButton() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignIn = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/' }) // redirect를 true로 설정하여 로그인 후 리다이렉션
  }

  useEffect(() => {
    if (status === 'loading') return

    if (session) {
      router.push('/')
    }
  }, [session, status, router])

  return (
    <div className='flex w-full items-center justify-center'>
      <button
        type='button' // type을 'button'으로 변경
        onClick={handleSignIn} // 버튼 클릭 시 handleSignIn 호출
        className='mt-4 flex h-12 w-[90%] items-center justify-center rounded-md border border-black bg-gray-100 sm:w-[400px]'
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src='/image/google.png'
            alt='google'
            fill // fill을 사용하여 부모 div에 맞게 조정
            style={{ objectFit: 'contain' }} // 비율 유지
            priority // LCP 최적화를 위한 priority 속성 추가
          />
        </div>
      </button>
    </div>
  )
}
