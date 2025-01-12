import Link from 'next/link'
import React from 'react'

export default function NaviBar() {
  return (
    <div className='flex h-8 w-auto items-center justify-center gap-12 text-base sm:text-lg'>
      <Link href={'/'} scroll={false}>
        <span className='text-xl font-medium antialiased hover:text-blue-500'>메인</span>
      </Link>
      <Link href={'/raidguide'} scroll={false}>
        <span className='text-xl font-medium antialiased hover:text-blue-500'>공략</span>
      </Link>
      <Link href={'/raidpost'} scroll={false}>
        <span className='text-xl font-medium antialiased hover:text-blue-500'>모집 글</span>
      </Link>
      <Link href={'/mypage'} scroll={false}>
        <span className='text-xl font-medium antialiased hover:text-blue-500'>마이페이지</span>
      </Link>
    </div>
  )
}
