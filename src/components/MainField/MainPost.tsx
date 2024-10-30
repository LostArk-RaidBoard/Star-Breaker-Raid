'use server'
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

export default async function MainPost() {
  const postsTeacherRows = await fetchTeacherPosts() // 포스트 데이터 가져오기
  const postsWeRows = await fetchWePostsFetch()

  return (
    <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
      <MainCharacter />
      <MainTeacherPosts teacherPostsRows={postsTeacherRows} />
      <MainWePosts wePostsRows={postsWeRows} />
    </div>
  )
}
