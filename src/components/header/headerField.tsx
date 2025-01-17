import LogField from '@/components/header/HeadlogField'
import Logo from '@/components/header/Logo'

import NaviBar from '@/components/header/NaviBar'
import Link from 'next/link'
import Book from '@image/icon/book.svg'
import React from 'react'
import MHeaderField from '@/components/header/mobile/mHeaderField'

export default function HeaderField() {
  return (
    <div className='sticky top-0 z-50 flex h-8 w-full items-center border-b border-gray-200 bg-white shadow-sm shadow-black sm:h-12 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-44'>
      <nav className='flex hidden h-full w-full items-center justify-between sm:flex'>
        <div className='flex h-full items-center gap-8'>
          <Logo />
          <NaviBar />
        </div>
        <div className='flex items-center justify-center gap-4'>
          <Link
            href={
              'https://turquoise-ruby-e63.notion.site/Star-Breaker-Raid-17650b18d95780c39815d872a0cca2f6'
            }
            className='flex items-center justify-center gap-2 rounded-md text-lg font-medium hover:border-blue-500 hover:text-blue-500'
          >
            가이드
            <Book className='h-6 w-6' strokeWidth={2} />
          </Link>
          <LogField />
        </div>
      </nav>
      <MHeaderField />
    </div>
  )
}
