import { auth } from '@/auth'
import ServerLevelCharacterSorter from '@/components/utils/ServerLevelCharacterSorter'
import RaidWeekPlanner from '@/components/schedulePage/RaidWeekPlanner.'

import React from 'react'

interface Schedule {
  schedule_id: number
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

export default async function SchedulePageField() {
  const session = await auth()
  let userId = ''
  let weekSchedule: Schedule[] = []
  let characterName: CharacterName[] = []

  if (session && session.user.id) {
    const { weekSchedule: scheduleData, characterName: characterData } =
      await weekScheduleGetHandler(session.user.id)
    weekSchedule = scheduleData
    characterName = ServerLevelCharacterSorter(characterData)
    userId = session.user.id
  }

  return (
    <div className='flex w-full flex-col'>
      <RaidWeekPlanner weekSchedule={weekSchedule} userId={userId} characterName={characterName} />
    </div>
  )
}
