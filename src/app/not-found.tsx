import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Link href='/' className='relative h-[150px] w-[150px]' scroll={false}>
        <Image
          src={'/logo/favicon.png'}
          alt='Logo 이미지'
          fill
          sizes='(max-width: 640px) 30px, (max-width: 768px) 35px, 50px'
          className='object-contain' // 비율 유지
        ></Image>
      </Link>
      <span className='mt-4 text-xl'>
        <span className='text-3xl'>404</span> 요청하신 페이지는 존재하지 않습니다.
      </span>
      <Link href={'/'} className='mt-4 rounded-md border bg-gray-800 px-4 py-3 text-gray-100'>
        메인으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFound
