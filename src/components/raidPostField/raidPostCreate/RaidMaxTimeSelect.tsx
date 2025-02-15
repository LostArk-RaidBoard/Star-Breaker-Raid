'use client'

import { useRaidSelect } from '@/store/raidSelectStore'
import React from 'react'

export default function RaidMaxTimeSelect() {
  const { raidMaxTime, setRaidMaxTime } = useRaidSelect()

  const timeOptions = ['클리어까지', '1시간', '2시간', '3시간']

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidMaxTime(event.target.value)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-1 text-base font-semibold text-gray-900'>레이드 최대 시간</h2>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
        {timeOptions.map((option) => (
          <label
            key={`raidTimeout-${option}`}
            htmlFor={option}
            className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm font-medium transition-all duration-300 ${
              raidMaxTime === option
                ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <input
              type='radio'
              id={option}
              name='raidMaxTime'
              value={option}
              checked={raidMaxTime === option}
              onChange={handleChange}
              className='hidden'
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}
