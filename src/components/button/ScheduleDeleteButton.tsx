'use client'
import { createPostTage } from '@/app/action'
import Xmark from '@image/icon/xmark.svg'
import React from 'react'

interface Props {
  schedule_id: number
}

export default function ScheduleDeleteButton({ schedule_id }: Props) {
  const deleteHandler = async (schedule_id: number) => {
    try {
      const response = await fetch(`/api/scheduleAPI/schedulePost?schedule_id=${schedule_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

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
        deleteHandler(schedule_id)
      }}
    >
      <Xmark className='h-4 w-4 stroke-[3px]' />
    </button>
  )
}
