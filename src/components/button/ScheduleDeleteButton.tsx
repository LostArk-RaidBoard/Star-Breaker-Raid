'use client'
import { createPostTage } from '@/app/action'
import Xmark from '@image/icon/xmark.svg'
import React from 'react'

interface Props {
  characterName: string
  raidName: string
  userId: string
  raidGateWay: string
}

export default function ScheduleDeleteButton({
  characterName,
  raidName,
  userId,
  raidGateWay,
}: Props) {
  const deleteHandler = async (characterName: string, raidName: string, userId: string) => {
    try {
      const response = await fetch(
        `/api/scheduleAPI/schedulePost?user_id=${userId}&character_name=${characterName}&raid_name=${raidName}&raid_gateway=${raidGateWay}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok && response.status == 200) {
        createPostTage()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <button
      aria-label='일정 삭제 버튼'
      onClick={() => {
        deleteHandler(characterName, raidName, userId)
      }}
    >
      <Xmark className='h-4 w-4 stroke-[3px]' />
    </button>
  )
}
