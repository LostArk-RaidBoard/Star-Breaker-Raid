import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SiteLink() {
  return (
    <div className='flex h-full gap-4 overflow-x-auto whitespace-nowrap md:grid md:grid-cols-4 md:gap-4'>
      <Link
        href='https://loa.icepeng.com/refining'
        className='inline-flex h-full min-w-[100px] flex-col flex-nowrap items-center justify-center overflow-hidden rounded-md bg-[#4350af] text-sm font-bold text-white shadow-lg sm:flex-row sm:text-xl'
      >
        <span>Lostark</span> <span>Calculator</span>
      </Link>
      <Link
        href='https://loatool.taeu.kr/'
        className='inline-flex h-full min-w-[100px] items-center justify-center rounded-md bg-[#3b3330] text-sm font-bold text-white shadow-lg sm:text-xl'
      >
        <div className='hidden h-12 w-12 sm:block'>
          <Image
            src={'/loatTool.png'}
            alt='로아도구 로고'
            width={70}
            height={70}
            loading='lazy'
            className='h-full w-full object-cover'
          />
        </div>
        로아도구
      </Link>
      <Link
        href='https://iloa.gg/'
        className='inline-flex h-full min-w-[100px] flex-col items-center justify-center overflow-hidden rounded-md bg-[#16181d] text-white shadow-lg'
      >
        <span className='text-sm font-bold sm:text-xl'>ILOA.GG</span>
        <span className='hidden text-sm sm:block'>로스트아크 종합 정보</span>
      </Link>
      <Link
        href='https://zloa.net/'
        className='inline-flex h-full min-w-[100px] flex-col items-center justify-center overflow-hidden rounded-md bg-[#21263f] text-white shadow-lg'
      >
        <span className='text-sm font-bold sm:text-xl'>ZLOA</span>
      </Link>
    </div>
  )
}
