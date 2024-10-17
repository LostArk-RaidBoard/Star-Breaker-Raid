import MainCharacter from '@/components/MainField/MainCharacter'
import MainTeacherPosts from '@/components/MainField/MainTeacherPost'
import MainWePosts from '@/components/MainField/MainWePosts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import UtileCharacterDataFetch from '@/components/utils/utilCharacterGet'
import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: any
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
interface CharacterInfo {
  character_name: string
  user_id: string
  character_level: string
  character_class: string
  server_name: string
  class_image: string
  transcendence: number
  leap: number
  evolution: number
  enlightenment: number
  elixir: number
  class_icon_url: string
  disable: boolean
}

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
    if (response.ok) {
      return data.postRows.map((post: RaidPost) => ({
        ...post,
        raid_time: convertToKoreanTime(post.raid_time), // 한국 시간으로 변환
      }))
    }
  } catch (error) {
    console.error(error)
    return []
  }
  return [] // 오류 발생 시 빈 배열 반환
}

const fetchWePostsFetch = async (): Promise<RaidPost[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/raidPostGet?posts_position=user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['wePost'] },
    })
    const data = await response.json()
    if (response.ok && response.status === 201) {
      return data.postRows.map((post: RaidPost) => ({
        ...post,
        raid_time: convertToKoreanTime(post.raid_time), // 한국 시간으로 변환
      }))
    }
  } catch (error) {
    console.error(error)
    return []
  }
  return []
}

async function fetchApplicationsCount(postsRows: RaidPost[]): Promise<{ [key: number]: number }> {
  const counts: { [key: number]: number } = {}
  const promises = postsRows.map(async (item) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/applicationCount?post_id=${item.post_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 3600 },
        },
      )
      if (response.ok) {
        const data = await response.json()
        counts[item.post_id] = data.count + 1 || 1
      } else {
        counts[item.post_id] = 1
      }
    } catch (error) {
      console.error(error)
      counts[item.post_id] = 1 // 오류 발생 시 기본값 설정
    }
  })

  await Promise.all(promises)
  return counts // 모든 카운트가 포함된 객체 반환
}

export default async function MainPost() {
  const postsTeacherRows = await fetchTeacherPosts() // 포스트 데이터 가져오기
  const postsWeRows = await fetchWePostsFetch()
  const applicationsCount = await fetchApplicationsCount(postsTeacherRows) // 카운트 데이터 가져오기
  const weApplicationsCount = await fetchApplicationsCount(postsWeRows)

  // const session = await getServerSession(authOptions)
  // let userId = ''
  // let serverCharacter: CharacterInfo[] = []
  // if (session && session.user.id) {
  //   serverCharacter = await UtileCharacterDataFetch(session.user.id)
  //  userId = session.user.id
  // }

  return (
    <div className='flex h-full w-full flex-col gap-4 md:flex-row'>
      {/* <MainCharacter mainCharacter={serverCharacter} userId={userId} /> */}
      <MainTeacherPosts teacherPostsRows={postsTeacherRows} applicationsCount={applicationsCount} />
      <MainWePosts wePostsRows={postsWeRows} applicationsCount={weApplicationsCount} />
    </div>
  )
}
