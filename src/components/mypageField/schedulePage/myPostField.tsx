import { auth } from '@/auth'
import { converToKoranTime1 } from '@/components/utils/converToKoreanTime'
import MypageWeek from '@/components/mypageField/schedulePage/mypageWeek'
import React from 'react'
import MypageApplicationPost from '@/components/mypageField/schedulePage/mypageApplicationPost'
import MypageCreatePost from '@/components/mypageField/schedulePage/mypageCreatePost'

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
  character_level: string
  character_name: string
  raid_limitperson: number
  raid_type: string
  raid_maxtime: string
  character_classicon: string
  approval: number
  rejected_count: number
}

interface Schedule {
  user_id: string
  schedule_time: string
  raid_gold: number
  character_name: string
  raid_name: string
  gold_check: boolean
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
      return data.postRows.map((item: RaidPost) => {
        item.raid_time = converToKoranTime1(item.raid_time)
        return item
      })
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
      return data.postRows.map((item: RaidPostCreate) => {
        item.raid_time = converToKoranTime1(item.raid_time)
        return item
      })
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

const weekScheduleGetHandler = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/mypageScheduleGet?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['createPostTage'] },
    })
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return data.postRows
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function MyPostField() {
  const session = await auth()
  let userId = ''
  let applicationPostGet: RaidPost[] = []
  let createPostGet: RaidPostCreate[] = []
  let weekSchedule: Schedule[] = []

  if (session && session.user.id) {
    applicationPostGet = await applicationPostGetHandler(session.user.id)
    createPostGet = await createPostGetHandler(session.user.id)
    weekSchedule = await weekScheduleGetHandler(session.user.id)
    userId = session.user.id
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-col gap-4 rounded-md border border-gray-400 p-4 shadow-lg md:h-[400px] md:flex-row'>
        <MypageApplicationPost userId={userId} applicationPostGet={applicationPostGet} />
        <MypageCreatePost createPostGet={createPostGet} />
      </div>
      <MypageWeek weekSchedule={weekSchedule} userId={userId} />
    </div>
  )
}
