import MyPost from '@/components/mypageField/myPost'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { convertToKoreanTime } from '@/components/utils/converToKoreanTime'

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

interface RaidPostCreate {
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

const applicationPostGetHandler = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mypagePostGet?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['applicationTage'] },
    })
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return data.postRows.map((post: RaidPost) => ({
        ...post,
        raid_time: convertToKoreanTime(post.raid_time), // 한국 시간으로 변환
      }))
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

const createPostGetHandler = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mypageCreatePost?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['createPostTage'] },
    })
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return data.postRows.map((post: RaidPostCreate) => ({
        ...post,
        raid_time: convertToKoreanTime(post.raid_time), // 한국 시간으로 변환
      }))
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function MyPostField() {
  const session = await getServerSession(authOptions)
  let userId = ''
  let applicationPostGet: RaidPost[] = []
  let createPostGet: RaidPostCreate[] = []

  if (session && session.user.id) {
    applicationPostGet = await applicationPostGetHandler(session.user.id)
    createPostGet = await createPostGetHandler(session.user.id)
    userId = session.user.id
  }

  return (
    <MyPost userId={userId} applicationPostGet={applicationPostGet} createPostGet={createPostGet} />
  )
}
