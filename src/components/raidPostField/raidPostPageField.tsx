import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'
import Link from 'next/link'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: any
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
  applicant_count: number
}

const fetchPostsAllFetch = async (): Promise<RaidPost[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidPostAllGet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['wePost'] },
    })
    console.log('We Post Fetch')
    const data = await response.json()
    if (response.ok) {
      return data.postRows.map((post: RaidPost) => ({
        ...post,
        raid_time: convertToKoreanTime(post.raid_time), // 한국 시간으로 변환
      }))
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
      <div className='flex w-full justify-end gap-4 border-b-2 border-gray-900 py-4'>
        <Link href={'/raidpost'} className='rounded-md bg-gray-900 p-2 px-4 text-white shadow-lg'>
          목록
        </Link>
        <Link
          href={'/raidpost/create'}
          className='rounded-md bg-gray-900 p-2 px-4 text-white shadow-lg'
        >
          모집 글 등록
        </Link>
      </div>
    </div>
  )
}
