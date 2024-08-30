'use client'

import InputLayout from '@/components/ui/inputLayout'
import { useState } from 'react'

export default function RaidGuideInput() {
  const [raidName, setRaidName] = useState('')
  return (
    <div className='flex items-center justify-center gap-4'>
      <InputLayout
        setType={'text'}
        setName={'set_raidName'}
        setPlaceholder={'레이드 명칭'}
        setCSS={'rounded-md shadow-lg w-[400px]'}
        setValue={setRaidName}
        value={raidName}
      />
      <button className='h-12 w-16 rounded-md border p-2'>검색</button>
    </div>
  )
}
