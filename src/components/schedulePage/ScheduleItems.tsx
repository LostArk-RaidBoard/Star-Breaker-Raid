'use client'

import { useState } from 'react'
import UP from '@image/icon/up.svg'
import Under from '@image/icon/under.svg'
import { toZonedTime } from 'date-fns-tz'
import ScheduleWeekGoldCheckBox from '@/components/button/ScheduleWeekGoldCheckBox'
import ScheduleDeleteButton from '@/components/button/ScheduleDeleteButton'

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

interface Props {
  schedule: Schedule
}

export default function ScheduleItems({ schedule }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const timeZone = 'Asia/Seoul'
  let bgColorClass = 'bg-gray-300'
  const raidTime = toZonedTime(schedule.schedule_time, timeZone)

  // 상태에 따른 배경색
  const today = toZonedTime(new Date(), timeZone)
  const raidDate = new Date(raidTime.getFullYear(), raidTime.getMonth(), raidTime.getDate())

  if (raidDate.getDate() === today.getDate()) {
    bgColorClass = 'bg-green-300'
  } else if (raidDate.getDate() > today.getDate()) {
    bgColorClass = 'bg-red-300'
  }

  return (
    <div className='mb-4 flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md'>
      {/* 상단 섹션: 레이드 이름과 레벨 */}
      <div className='flex items-center justify-between'>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            bgColorClass === 'bg-green-300'
              ? 'bg-green-200 text-green-800'
              : bgColorClass === 'bg-red-300'
                ? 'bg-red-200 text-red-800'
                : 'bg-gray-200 text-gray-800'
          }`}
        >
          {schedule.raid_name} {schedule.raid_level}
        </span>
        <ScheduleDeleteButton schedule_id={schedule.schedule_id} />
      </div>
      <span className='mb-2 indent-2 text-xs text-gray-500'>{schedule.raid_gateway}</span>

      {/* 캐릭터 이름 */}
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-gray-800'>{schedule.character_name}</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='text-sm text-gray-900 hover:text-gray-500'
        >
          {isExpanded ? (
            <UP className='h-4 w-4' strokeWidth={4} />
          ) : (
            <Under className='h-4 w-4' strokeWidth={4} />
          )}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* 시간 표시 */}
          <div className='mt-1 flex flex-col indent-2 text-sm text-gray-700'>
            <span className='text-xs text-gray-500'>{raidTime.toLocaleDateString('ko-KR')}</span>
            <span className='flex'>
              {raidTime.getHours()}시 {raidTime.getMinutes()}분
            </span>
          </div>

          {/* 골드 체크박스 */}
          <div className='mt-2 flex items-center'>
            <ScheduleWeekGoldCheckBox
              goldCheck={schedule.gold_check}
              characterName={schedule.character_name}
              raidName={schedule.raid_name}
              userId={schedule.user_id}
            />
          </div>
        </>
      )}
    </div>
  )
}
