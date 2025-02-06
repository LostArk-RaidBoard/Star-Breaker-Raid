import Link from 'next/link'
import React from 'react'

export default function NaviBar() {
  return (
    <div className='flex h-full w-auto items-center justify-center gap-8 text-lg lg:text-xl'>
      {/* 메인 화면 이동 */}
      <Link href={'/'} scroll={false}>
        <span className='font-semibold transition-colors hover:text-blue-600'>메인</span>
      </Link>

      {/* 모집 글 화면 이동 */}
      <Link href={'/raidpost'} scroll={false}>
        <span className='font-semibold transition-colors hover:text-blue-600'>모집 글</span>
      </Link>

      {/* 공략 화면 이동 */}
      <Link href={'/raidguide'} scroll={false}>
        <span className='font-semibold transition-colors hover:text-blue-600'>공략</span>
      </Link>

      {/* 일정 화면 이동 */}
      <Link href={'/schedule'} scroll={false}>
        <span className='font-semibold transition-colors hover:text-blue-600'>일정</span>
      </Link>

      {/* 숙제 화면 이동 */}
      <Link href={'/homework'} scroll={false}>
        <span className='font-semibold transition-colors hover:text-blue-600'>숙제</span>
      </Link>

      {/* 마이페이지 화면 이동 */}
      <Link href={'/mypage'} scroll={false}>
        <span className='font-semibold transition-colors hover:text-blue-600'>마이페이지</span>
      </Link>
    </div>
  )
}
