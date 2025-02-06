import Link from 'next/link'
import React from 'react'
import User from '@image/icon/user.svg'
import ClipboardList from '@image/icon/character.svg'

export default function MypageNavigation() {
  return (
    <div className='flex h-12 w-full flex-none flex-row items-center justify-between gap-2 rounded-lg border border-gray-400 bg-white p-4 shadow-lg sm:sticky sm:top-[70px] sm:h-36 sm:w-36 sm:flex-col'>
      {/* 캐릭터 메뉴 */}
      <Link
        href={'/mypage/'}
        className='flex items-center gap-2 rounded-lg p-2 text-gray-800 hover:bg-gray-300 hover:shadow'
        scroll={false}
      >
        <ClipboardList className='h-5 w-5 text-blue-500' />
        <span className='text-base font-medium'>캐릭터</span>
      </Link>

      {/* 내 정보 메뉴 */}
      <Link
        href={'/mypage/myInfo'}
        className='flex items-center gap-2 rounded-lg p-2 text-gray-800 hover:bg-gray-300 hover:shadow'
        scroll={false}
      >
        <User className='h-5 w-5 text-green-500' />
        <span className='text-base font-medium'>내 정보</span>
      </Link>
    </div>
  )
}
