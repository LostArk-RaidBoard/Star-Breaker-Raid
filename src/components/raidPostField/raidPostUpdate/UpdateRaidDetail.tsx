'use client'

import React from 'react'

interface Props {
  updateRaidType: string
  setUpdateRaidType: (type: string) => void
}

export default function UpdateRaidDetail({ updateRaidType, setUpdateRaidType }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateRaidType(event.target.value)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-3 text-base font-semibold text-gray-900'>레이드 타입</h2>
      <div className='grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
        {['학원', '트라이', '클경', '반숙', '숙련', '숙제'].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className={`group flex cursor-pointer items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm transition-all duration-300 ${
              updateRaidType === type
                ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <input
              type='radio'
              id={type}
              name='raidType'
              value={type}
              checked={updateRaidType === type}
              onChange={handleChange}
              className='hidden'
            />
            <span className='select-none text-center text-sm font-medium'>{type}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
