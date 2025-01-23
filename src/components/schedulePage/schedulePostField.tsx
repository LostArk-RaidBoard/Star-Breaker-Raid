import { auth } from '@/auth'
import ScheduleApplicationPost from '@/components/schedulePage/scheduleApplicationPost'
import ScheduleCreatePost from '@/components/schedulePage/scheduleCreatePost'
import ScheduleWeek from '@/components/schedulePage/scheduleWeek'
import CharacterSorted from '@/components/utils/characterSorted'
import { converToKoranTime1 } from '@/components/utils/converToKoreanTime'

import React from 'react'

interface RaidPost {
  post_id: number
  raid_name: string
  raid_time: string
  character_name: string
  character_classicon: string
  raid_level: string
  approval: boolean
  nickname: string
}

interface RaidPostCreate {
  post_id: number
  raid_name: string
  raid_time: string
  limit_level: number
  user_id: string
  character_name: string
  raid_limitperson: number
  character_classicon: string
  raid_level: string
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
  raid_level: string
  raid_gateway: string
}

interface CharacterName {
  character_name: string
  character_level: string
  server_name: string
}

const applicationPostGetHandler = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/scheduleAPI/scheduleAppliactionPostGet?user_id=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['applicationTage'] },
      },
    )
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
    const response = await fetch(
      `${process.env.API_URL}/api/raidPostAPI/createPost?user_id=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['createPostTage'] },
      },
    )
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
    const response = await fetch(
      `${process.env.API_URL}/api/scheduleAPI/scheduleGet?user_id=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['createPostTage'] },
      },
    )
    const data = await response.json()
    if (response.ok && response.status === 200) {
      return {
        weekSchedule: data.postRows,
        characterName: data.characterName,
      }
    } else {
      return {
        weekSchedule: [],
        characterName: [],
      }
    }
  } catch (error) {
    console.error(error)
    return {
      weekSchedule: [],
      characterName: [],
    }
  }
}

export default async function SchedulePostField() {
  const session = await auth()
  let userId = ''
  let applicationPostGet: RaidPost[] = []
  let createPostGet: RaidPostCreate[] = []
  let weekSchedule: Schedule[] = []
  let characterName: CharacterName[] = []

  if (session && session.user.id) {
    applicationPostGet = await applicationPostGetHandler(session.user.id)
    createPostGet = await createPostGetHandler(session.user.id)

    const { weekSchedule: scheduleData, characterName: characterData } =
      await weekScheduleGetHandler(session.user.id)
    weekSchedule = scheduleData
    characterName = CharacterSorted(characterData)
    userId = session.user.id
  }

  return (
    <div className='flex w-full flex-col'>
      <ScheduleWeek weekSchedule={weekSchedule} userId={userId} characterName={characterName} />
      <div className='mt-4 flex flex-col gap-4 rounded-md border border-gray-400 p-4 shadow-lg md:h-[400px] md:flex-row'>
        <ScheduleApplicationPost userId={userId} applicationPostGet={applicationPostGet} />
        <ScheduleCreatePost createPostGet={createPostGet} />
      </div>
    </div>
  )
}
