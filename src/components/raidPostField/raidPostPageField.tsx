import RevaildatePostTageButton from '@/components/button/revalidatePostTageButton'
import RaidPostList from '@/components/raidPostField/raidPostPage/raidPostList'
import Link from 'next/link'
import { converToKoranTime1 } from '@/components/utils/converToKoreanTime'
import React from 'react'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  user_id: string
  post_position: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  character_classicon: string
  raid_level: string
  raid_gateway: string
  approval: number
  rejected_count: number
  nickname: string
}

const fetchPostsAllFetch = async (): Promise<RaidPost[]> => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/raidPostAPI/raidPostGet?posts_position=all`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['wePost'] },
      },
    )

    const data = await response.json()
    if (response.ok) {
      return data.postRows.map((item: RaidPost) => {
        item.raid_time = converToKoranTime1(item.raid_time)
        return item
      })
    } else {
      return []
    }
  } catch (error) {
    console.error('PostsAll Get Error' + error)
  }
  return []
}

export default async function RaidPostPageField() {
  const postAllposts = await fetchPostsAllFetch()

  return (
    <div className='flex h-full w-full flex-col items-center justify-center rounded-md'>
      <div className='flex h-12 w-full items-center justify-end gap-4 sm:justify-between'>
        <div className='flex hidden items-center gap-4 text-lg font-semibold sm:flex'>
          <span>로아 팁 :</span>
          <Link className='text-base font-medium' href={'/raidpost/tip/엘릭서'}>
            엘릭서 옵션
          </Link>
        </div>

        <div className='flex w-full justify-end gap-4 sm:w-auto'>
          <RevaildatePostTageButton />
          <Link
            href={'/raidpost/create?redirect=/raidpost'}
            className='rounded-md bg-gray-900 p-2 px-4 text-white'
          >
            모집 글 등록
          </Link>
        </div>
      </div>
      <RaidPostList raidPost={postAllposts} />
    </div>
  )
}
