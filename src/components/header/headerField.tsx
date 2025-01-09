import LogField from '@/components/header/HeadlogField'
import Logo from '@/components/header/Logo'
import MHeaderField from '@/components/header/mHeaderField'
import NaviBar from '@/components/header/NaviBar'
import Link from 'next/link'
import Book from '@image/icon/book.svg'

export default function HeaderField() {
  return (
    <div className='sticky top-0 z-50 flex h-8 w-full items-center border-b border-gray-200 bg-white shadow-sm shadow-black sm:h-16 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-44'>
      <nav className='flex hidden h-8 w-full items-center justify-between sm:flex'>
        <div className='flex items-center gap-8'>
          <Logo />
          <NaviBar />
        </div>
        <div className='flex items-center justify-center gap-4'>
          <Link
            href={
              'https://turquoise-ruby-e63.notion.site/Star-Breaker-Raid-17650b18d95780c39815d872a0cca2f6'
            }
            className='text-md flex items-center justify-center gap-2 rounded-md border-2 border-gray-700 p-2 font-medium'
          >
            가이드
            <Book className='h-5 w-5' strokeWidth={2} />
          </Link>
          <LogField />
        </div>
      </nav>
      <MHeaderField />
    </div>
  )
}
