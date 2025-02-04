'use client'

import React from 'react'

interface Props {
  updateRaidMaxTime: string
  setUpdateRaidMaxTime: (maxTime: string) => void
}

export default function UpdateRaidMaxTime({ updateRaidMaxTime, setUpdateRaidMaxTime }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateRaidMaxTime(event.target.value)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-3 text-base font-semibold text-gray-900'>최대 시간 설정</h2>
      <div className='grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {['클리어까지', '1시간', '2시간', '3시간'].map((time) => (
          <label
            key={time}
            htmlFor={time}
            className={`group flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm transition-all duration-300 ${
              updateRaidMaxTime === time
                ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <input
              type='radio'
              id={time}
              name='raidMaxTime'
              value={time}
              checked={updateRaidMaxTime === time}
              onChange={handleChange}
              className='hidden'
            />
            <span className='select-none text-center text-sm font-medium'>{time}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
