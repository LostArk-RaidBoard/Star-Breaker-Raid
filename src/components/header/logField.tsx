'use client'
import Login from '@image/icon/login.svg'
import Logout from '@image/icon/logout.svg'
import Link from 'next/link'
import { useState } from 'react'

export default function LogField() {
  const [isCertified, setIsCertified] = useState(false)

  return (
    <div className='flex h-12 w-24 items-center justify-center text-lg text-gray-800'>
      <button className={`${isCertified ? 'hidden' : ''}`}>
        <Link href='/login' className='flex items-center justify-center gap-1'>
          <span>로그인</span> <Login className='h-7 w-7' />
        </Link>
      </button>
      <button className={`flex items-center justify-center gap-1 ${isCertified ? '' : 'hidden'}`}>
        <span>로그아웃</span> <Logout className='h-7 w-7' />
      </button>
    </div>
  )
}
