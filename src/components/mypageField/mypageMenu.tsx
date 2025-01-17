import Link from 'next/link'
import React from 'react'

export default function MypageMenu() {
  return (
    <div className='flex h-12 w-full flex-row flex-nowrap justify-between gap-4 rounded-md border border-gray-400 bg-gray-300 p-4 text-lg sm:sticky sm:top-[70px] sm:h-28 sm:w-36 sm:flex-col'>
      <div className='flex w-full items-center justify-center sm:justify-start'>
        <Link href={'/mypage/'}>캐릭터</Link>
      </div>

      <div className='flex w-full items-center justify-center sm:justify-start'>
        <Link href={'/mypage/myInfo'}>내 정보</Link>
      </div>
    </div>
  )
}
