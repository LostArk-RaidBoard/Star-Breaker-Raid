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
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  applicant_count: number
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
 * teacher Post get
 * @returns
 */
const fetchTeacherPosts = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidPostGet?posts_position=teacher`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['teacherPost'] },
    })
    const data = await response.json()
    console.log('Teacher Post Fetch')
    if (response.ok) {
      return data.postRows.map((post: RaidPost) => ({
        ...post,
        raid_time: convertToKoreanTime(post.raid_time), // 한국 시간으로 변환
      }))
    } else {
      return []
    }
  } catch (error) {
    console.error('fetchTeacherPost Error' + error)
  }
  return [] // 오류 발생 시 빈 배열 반환
}

/**
 * wePost get
 * @returns wePost 항목들 반환
 */
const fetchWePostsFetch = async (): Promise<RaidPost[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidPostGet?posts_position=user`, {
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
    console.error('fetchWePost Error' + error)
  }
  return []
}

const raidGuideFetch = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidGuideMainGet?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['raidGudieLike'] },
    })
    console.log('MainGuideFetch')
    const data = await response.json()
    if (response.ok) {
      return data.guideRows
    } else {
      return []
    }
  } catch (error) {
    console.error('MainraidGuide Error : ' + error)
    return []
  }
}

export default async function MainField() {
  const postsTeacherRows = await fetchTeacherPosts() // 포스트 데이터 가져오기
  const postsWeRows = await fetchWePostsFetch()
  const session = await getServerSession(authOptions)

  let userId = 'no'
  if (session && session.user.id) {
    userId = session.user.id
  }

  const raideGuide: RaidGuide[] = await raidGuideFetch(userId)

  return (
    <div className='mt-8 flex h-full w-full flex-col items-center justify-center'>
      <div className='flex h-[950px] w-full flex-col gap-4 md:h-[580px] xl:h-[360px] xl:flex-row'>
        <div className='relative flex h-60 w-full grow flex-col justify-start rounded-md bg-gray-900 p-2 shadow-lg md:h-[380px] xl:h-full xl:w-[400px] xl:p-4'>
          <MainCharacter />
        </div>

        <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
          <MainTeacherPosts teacherPostsRows={postsTeacherRows} />
          <MainWePosts wePostsRows={postsWeRows} />
        </div>
      </div>
      <div className='mt-8 h-24 w-full overflow-hidden'>
        <SiteLink />
      </div>
      <div className='mt-8 w-full'>
        <MainRaidGuide raideGuide={raideGuide} />
      </div>
    </div>
  )
}
