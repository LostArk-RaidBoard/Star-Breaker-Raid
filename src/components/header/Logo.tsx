import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <div className='flex items-center text-white'>
      <Link href='/' className='relative h-7 w-7' scroll={false}>
        <Image
          src={'/logo/favicon.png'}
          alt='Logo 이미지'
          fill
          sizes='28'
          className='object-contain' // 비율 유지
        ></Image>
      </Link>
    </div>
  )
}
