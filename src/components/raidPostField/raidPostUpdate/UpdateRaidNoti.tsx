'use client'

import React from 'react'
interface Props {
  updateRaidNoti: string
  setUpdateRaidNoti: (noti: string) => void
}
export default function UpdateRaidNoti({ updateRaidNoti, setUpdateRaidNoti }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateRaidNoti(event.target.value)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-3 text-base font-semibold text-gray-900'>공지사항 수정</h2>
      <div className='flex flex-col'>
        <textarea
          id='raidNoti'
          name='raidNoti'
          aria-label='공지 사항 글'
          rows={5}
          placeholder='여기에 입력하세요...'
          value={updateRaidNoti}
          onChange={handleChange}
          className='rounded-lg border border-gray-400 bg-gray-200 p-3 text-sm text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
        ></textarea>
      </div>
    </div>
  )
}
