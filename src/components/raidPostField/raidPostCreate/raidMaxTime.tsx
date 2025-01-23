'use client'

import { useRaidSelect } from '@/store/raidSelectStore'
import React from 'react'

export default function RaidMaxTime() {
  const { raidMaxTime, setRaidMaxTime } = useRaidSelect()

  const timeOptions = ['클리어까지', '1시간', '2시간', '3시간']

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidMaxTime(event.target.value)
  }

  return (
    <div className='flex h-20 flex-col'>
      <label className='text-lg font-semibold'>• 레이드 최대 시간</label>
      <div className='grid h-12 w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {timeOptions.map((option) => (
          <div
            key={`raidTimeout-${option}`}
            className='flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap'
          >
            <input
              type='radio'
              id={option}
              name='raidMaxTime'
              value={option}
              checked={raidMaxTime === option}
              onChange={handleChange}
              className='h-4 w-4'
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
