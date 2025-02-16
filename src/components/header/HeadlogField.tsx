'use client'
import Login from '@image/icon/login.svg'
import Logout from '@image/icon/logout.svg'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Cookies from 'js-cookie'

export default function HeadLogField() {
  const { data: session } = useSession()

  const handleLogout = async () => {
    try {
      if (!session?.user.id) return // userId가 없으면 실행하지 않음

      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': session.user.id,
        },
      })

      // ✅ 클라이언트 캐시 삭제 (ETag 및 데이터)
      if (session?.user.id) {
        Cookies.remove(`mainMyInfoETag-${session.user.id}`)
        Cookies.remove(`mainMyInfoData-${session.user.id}`)
        Cookies.remove(`mainMySchedule-${session.user.id}ETag`)
        Cookies.remove(`mainMySchedule-${session.user.id}Data`)
      }

      // ✅ NextAuth 로그아웃 처리 및 리다이렉트
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  return (
    <div className='flex h-full items-center justify-center text-base font-medium font-semibold sm:text-lg'>
      {session && session.user ? (
        <button
          className={`flex flex-row items-center justify-center gap-1 transition-colors hover:text-blue-600`}
          onClick={handleLogout}
        >
          <span>로그아웃</span>
          <Logout className='h-6 w-6' strokeWidth={2} />
        </button>
      ) : (
        <button className={`hover:text-blue-500`}>
          <Link
            href={`/login`}
            className='flex flex-row items-center justify-center gap-1'
            scroll={false}
          >
            <span>로그인</span>
            <Login className='h-6 w-6' strokeWidth={2} />
          </Link>
        </button>
      )}
    </div>
  )
}
