'use client'

import { useSession } from 'next-auth/react'
import MypageApplicationPost from '@/components/mypageField/mypageApplicationPost'
import MypageCreatePost from '@/components/mypageField/mypageCreatePost'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  fixed: boolean
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
}

interface Props {
  userId: string
  applicationPostGet: RaidPost[]
  createPostGet: RaidPost[]
}

export default function MyPost({ userId, applicationPostGet, createPostGet }: Props) {
  const { data: session } = useSession()

  return (
    <>
      {session && session?.user.id ? (
        <div className='flex w-full flex-col p-4'>
          <span className='text-lg'>내 모집글 관리</span>
          <div className='flex flex-col gap-4 md:flex-row'>
            <MypageApplicationPost userId={userId} applicationPostGet={applicationPostGet} />
            <MypageCreatePost createPostGet={createPostGet} />
          </div>
        </div>
      ) : (
        <div className='flex h-20 w-full items-center justify-center text-xl'></div>
      )}
    </>
  )
}
