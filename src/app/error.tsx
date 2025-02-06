'use client' // Error boundaries must be Client Components

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import React from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

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
      <h2 className='mt-4 text-xl'>문제가 발생했습니다!</h2>
      <div className='flex flex-row gap-4'>
        <Link href={'/'} className='mt-4 rounded-md border bg-gray-800 px-4 py-3 text-gray-100'>
          메인으로 돌아가기
        </Link>
        <button
          className='mt-4 rounded-md border bg-gray-800 px-4 py-3 text-gray-100'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          재시도
        </button>
      </div>
    </div>
  )
}
