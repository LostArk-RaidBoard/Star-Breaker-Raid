'use client'
import Login from '@image/icon/login.svg'
import Logout from '@image/icon/logout.svg'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function LogField() {
  const { data: session } = useSession()

  console.log(session?.user.id)
  console.log(session?.user.role)

  return (
    <div className='flex h-12 w-24 items-center justify-center text-lg text-gray-800'>
      {session && session.user ? (
        <button className={`flex items-center justify-center gap-1`} onClick={() => signOut()}>
          <span>로그아웃</span> <Logout className='h-7 w-7' />
        </button>
      ) : (
        <button className={``}>
          <Link href='/login' className='flex items-center justify-center gap-1'>
            <span>로그인</span> <Login className='h-6 w-6' />
          </Link>
        </button>
      )}
    </div>
  )
}
