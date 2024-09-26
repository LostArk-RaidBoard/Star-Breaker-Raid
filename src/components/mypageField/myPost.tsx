'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import MypageApplicationPost from '@/components/mypageField/mypageApplicationPost'
import MypageCreatePost from '@/components/mypageField/mypageCreatePost'

interface Props {
  userId: string
}

export default function MyPost({ userId }: Props) {
  const { data: session } = useSession()

  return (
    <>
      {session && session?.user.id ? (
        <div className='flex w-full flex-col p-4'>
          <span className='text-lg'>내 파티 관리</span>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <MypageApplicationPost userId={userId} />
            <MypageCreatePost userId={userId} />
          </div>
        </div>
      ) : (
        <div className='flex h-20 w-full items-center justify-center text-xl'></div>
      )}
    </>
  )
}
