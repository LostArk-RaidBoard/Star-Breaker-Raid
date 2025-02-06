'use client'

import InputLayout from '@/components/ui/inputLayout'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function RaidGuideInputForm() {
  const [raidName, setRaidName] = useState('')
  const router = useRouter()

  // 폼 제출 시 실행되는 함수
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`?raidName=${raidName}`) // 검색어를 쿼리 파라미터로 전달
  }

  return (
    <form onSubmit={handleSearch} className='flex items-center justify-center gap-4'>
      <InputLayout
        setType={'text'}
        setName={'set_raidName'}
        setPlaceholder={'레이드 명칭'}
        setCSS={'rounded-md shadow-lg w-full sm:w-[500px]'}
        setValue={setRaidName}
        value={raidName}
      />
      <button
        type='submit' // 버튼 타입을 submit으로 변경
        className='flex h-12 w-24 items-center justify-center rounded-md border bg-gray-800 px-4 py-3 text-lg text-gray-100'
      >
        검색
      </button>
    </form>
  )
}
