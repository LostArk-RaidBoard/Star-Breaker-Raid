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
    <div className='flex flex-col'>
      <label className='text-lg font-semibold'>• 레이드 타입</label>
      <div className='grid h-12 w-full grid-cols-2 text-base sm:grid-cols-3 lg:grid-cols-5'>
        {['학원', '트라이', '클경', '반숙', '숙련'].map((type) => (
          <div key={type} className='flex items-center justify-center gap-2'>
            <input
              type='radio'
              id={type}
              name='raidType'
              value={type}
              checked={updateRaidType === type}
              onChange={handleChange}
              className='h-4 w-4'
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
