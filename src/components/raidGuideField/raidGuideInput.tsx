'use client'

import InputLayout from '@/components/ui/inputLayout'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  searchQuery: string
}

export default function RaidGuideInput() {
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
        className='h-12 w-24 rounded-md border bg-gray-900 p-2 px-1 text-white'
      >
        검색
      </button>
    </form>
  )
}
