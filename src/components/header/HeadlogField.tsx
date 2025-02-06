'use client'
import Login from '@image/icon/login.svg'
import Logout from '@image/icon/logout.svg'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function HeadLogField() {
  const { data: session } = useSession()

  return (
    <div className='flex h-full items-center justify-center text-base font-medium font-semibold sm:text-lg'>
      {session && session.user ? (
        <button
          className={`flex flex-row items-center justify-center gap-1 transition-colors hover:text-blue-600`}
          onClick={() => signOut({ callbackUrl: '/' })}
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
