import React from 'react'
import Link from 'next/link'
import { converToKoranTime1 } from '@/components/utils/converToKoreanTime'
import RaidPostList from '@/components/raidPostField/raidPostPage/raidPostList'
import RevaildatePostTageButton from '@/components/button/revalidatePostTageButton'

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
    <div className='flex h-full w-full flex-col'>
      {/* 상단 헤더 */}
      <div className='mb-6 flex items-center justify-between'>
        {/* 우측 버튼 그룹 */}
        <div className='flex items-center gap-4'>
          <RevaildatePostTageButton />
          <Link
            href={'/raidpost/create?redirect=/raidpost'}
            scroll={false}
            className='rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-500'
          >
            모집 글 등록
          </Link>
        </div>
      </div>

      {/* 모집 글 리스트 */}
      <RaidPostList raidPost={postAllposts} />
    </div>
  )
}
