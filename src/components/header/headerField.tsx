import LogField from '@/components/header/HeadlogField'
import Logo from '@/components/header/Logo'

import NaviBar from '@/components/header/NaviBar'
import Link from 'next/link'
import Book from '@image/icon/book.svg'
import React from 'react'
import MHeaderField from '@/components/header/mobile/mHeaderField'

export default function HeaderField() {
  return (
    <div className='sticky top-0 z-50 flex h-8 w-full items-center border-b border-gray-200 bg-white shadow-sm shadow-black md:h-12 md:px-12'>
      <nav className='flex hidden h-full w-full items-center justify-between md:flex'>
        <div className='flex h-full items-center gap-4'>
          <Logo />
          <NaviBar />
        </div>
        <div className='flex items-center justify-center gap-4'>
          <Link
            href={
              'https://dot-quesadilla-543.notion.site/Star-Breaker-Raid-edbf6874fadb44d3b60dce202b177d39?pvs=4'
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
