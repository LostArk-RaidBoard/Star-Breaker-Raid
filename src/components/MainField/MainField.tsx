'use server'
import SiteLink from '@/components/MainField/SiteLink'
import MainRaidGuide from '@/components/MainField/MainRaidGuide'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import MainCharacter from '@/components/MainField/MainCharacter'
import MainTeacherPosts from '@/components/MainField/MainTeacherPost'
import MainWePosts from '@/components/MainField/MainWePosts'
import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: any
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  applicant_count: number
  nickname: string
}

interface RaidMyPost {
  post_id: number
  raid_name: string
  raid_time: any
  limit_level: number
  user_id: string
  post_position: string
  noti: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  character_image: string
  approval: boolean
  applicant_count: number
}

interface CharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  class_icon_url: string
  transcendence: number
  elixir: number
  leap: number
  enlightenment: number
  evolution: number
  disable: boolean
}

interface RaidGuide {
  guide_id: number
  guide_name: string
  youtube_url: string
  image_url: string
  create_at: string
  update_at: string
  raid_main_image: string
  role_id: number
  like_count: number
}

/**
 * mainMainPost get
 * @returns 나의 일정 모집글 반환
 */
const fetchMinPostsFetch = async (userId: string): Promise<RaidMyPost[]> => {
  console.log('mainPostFetch test')
  try {
    const response = await fetch(`${process.env.API_URL}/api/mainMyPost?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['wePost', 'applicationList'] },
    })
    console.log('mainMainPost fetch')
    const data = await response.json()
    if (response.ok) {
      return data.postRows.map((post: RaidMyPost) => ({
        ...post,
        raid_time: convertToKoreanTime(post.raid_time), // 한국 시간으로 변환
      }))
    } else {
      return []
    }
  } catch (error) {
    console.error('fetchWePost Error' + error)
  }
  return []
}

export default async function MainField() {
  let userId = 'no'

  const session = await getServerSession(authOptions)
  if (session && session.user.id) {
    userId = session.user.id
  }

  const postsWeRows: RaidMyPost[] = await fetchMinPostsFetch(userId)

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-[880px] w-full flex-col gap-4 md:h-[550px] xl:h-[330px] xl:flex-row'>
        <div className='relative z-50 flex h-[210px] w-full grow flex-col justify-start rounded-md bg-gray-900 p-2 shadow-lg md:h-[220px] xl:h-full xl:w-[400px] xl:p-4'>
          <MainCharacter />
        </div>

        <div className='flex h-[650px] w-full flex-col gap-4 md:h-[330px] md:flex-row xl:h-full'>
          <MainTeacherPosts />
          <MainWePosts wePostsRows={postsWeRows} />
        </div>
      </div>
      <div className='mt-8 h-24 w-full overflow-hidden'>
        <SiteLink />
      </div>
      <div className='mt-8 w-full'>
        <MainRaidGuide userId={userId} />
      </div>
    </div>
  )
}
