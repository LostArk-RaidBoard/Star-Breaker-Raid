'use client'
import { createPostTage } from '@/app/action'
import Xmark from '@image/icon/xmark.svg'

interface Props {
  characterName: string
  raidName: string
  userId: string
}

export default function DeleteScheduleButton({ characterName, raidName, userId }: Props) {
  const deleteHandler = async (characterName: string, raidName: string, userId: string) => {
    try {
      const response = await fetch(
        `/api/mypageSchedulePost?user_id=${userId}&character_name=${characterName}&raid_name=${raidName}`,
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
      onClick={() => {
        deleteHandler(characterName, raidName, userId)
      }}
    >
      <Xmark className='h-4 w-4' />
    </button>
  )
}