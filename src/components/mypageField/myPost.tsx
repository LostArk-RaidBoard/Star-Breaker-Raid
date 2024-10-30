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
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  approval: boolean
}

interface RaidCreatePost {
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
  applicant_count: number
}

interface Props {
  userId: string
  applicationPostGet: RaidPost[]
  createPostGet: RaidCreatePost[]
}

export default function MyPost({ userId, applicationPostGet, createPostGet }: Props) {
  const { data: session } = useSession()

  return (
    <>
      {session && session?.user.id ? (
        <div className='flex w-full flex-col rounded-md border p-4 shadow-lg sm:mt-8'>
          <div className='flex flex-col gap-4 md:h-[380px] md:flex-row'>
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
