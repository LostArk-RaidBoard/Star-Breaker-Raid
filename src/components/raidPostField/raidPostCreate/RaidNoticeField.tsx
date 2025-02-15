'use client'
import { useRaidSelect } from '@/store/raidSelectStore'
import React from 'react'

export default function RaidNoticeField() {
  const { raidNoti, setRaidNoti } = useRaidSelect()
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRaidNoti(event.target.value)
  }
  return (
    <div className='p-4'>
      <h2 className='mb-1 text-base font-semibold text-gray-900'>공지 사항</h2>
      <textarea
        id='raidNoti'
        name='raidNoti'
        aria-label='공지 사항 글'
        rows={6}
        placeholder='공지 사항 입력(필수X)'
        value={raidNoti} // 상태로 관리되는 값
        onChange={handleChange} // 변경 이벤트 핸들러
        className='mt-1 w-full rounded-md border border-gray-400 p-2' // 스타일 추가
      ></textarea>
    </div>
  )
}
