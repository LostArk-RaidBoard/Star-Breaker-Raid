'use client'

import { createPostTage } from '@/app/action'

interface Props {
  goldCheck: boolean
  characterName: string
  raidName: string
  userId: string
}
export default function ScheduleGoldCheckBox({
  goldCheck,
  characterName,
  raidName,
  userId,
}: Props) {
  const updateFetchHandler = async (goldCheck: boolean) => {
    try {
      const response = await fetch(
        `/api/mypageScheduleUpdate?user_id=${userId}&character_name=${characterName}&raid_name=${raidName}&gold_check=${!goldCheck}`,
        {
          method: 'PUT',
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
    <label className='flex w-full items-center justify-between'>
      <span>골드 체크</span>
      <input
        type='checkbox'
        aria-label='골드 체크 버튼'
        checked={goldCheck}
        onClick={() => {
          updateFetchHandler(goldCheck)
        }}
        readOnly
      />
    </label>
  )
}
