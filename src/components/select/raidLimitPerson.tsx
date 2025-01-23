'use client'

import { useRaidSelect } from '@/store/raidSelectStore'
import React, { useEffect, useState } from 'react'

export default function RaidLimitPersonSelect() {
  const { raidSelect, raidLimitPerson, setRaidLimitPerson } = useRaidSelect()
  const [maxLimitPerson, setMaxLimitPerson] = useState(16)

  const raidLimitPersonHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(event.target.value, 10)
    setRaidLimitPerson(num)
  }

  useEffect(() => {
    if (raidSelect === '베히모스') {
      setMaxLimitPerson(16)
      setRaidLimitPerson(16) // 가장 마지막 숫자로 설정
    } else if (raidSelect === '상아탑' || raidSelect === '카양겔' || raidSelect === '쿠크세이튼') {
      setMaxLimitPerson(4)
      setRaidLimitPerson(4) // 가장 마지막 숫자로 설정
    } else {
      setMaxLimitPerson(8)
      setRaidLimitPerson(8) // 가장 마지막 숫자로 설정
    }
  }, [raidSelect, setRaidLimitPerson])

  return (
    <div className='h-20 w-full'>
      <label className='text-lg font-semibold'>• 최대인원 선택</label>
      <select
        name='raidMaxPeopleSelect'
        aria-label='레이드 인원 선택'
        className='mt-1 h-14 w-full rounded-md border border-gray-400 px-1 text-lg'
        value={raidLimitPerson}
        onChange={raidLimitPersonHandler}
      >
        {Array.from({ length: maxLimitPerson - 1 }, (_, i) => (
          <option key={i + 2} className='text-base' value={i + 2}>
            {i + 2}인
          </option>
        ))}
      </select>
    </div>
  )
}
