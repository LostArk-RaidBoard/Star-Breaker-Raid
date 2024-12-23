'use client'

import { useRaidSelect } from '@/store/raidSelectStore'
import { useEffect, useState } from 'react'

export default function RaidLimitPersonSelect() {
  const { raidSelect, raidLimitPerson, setRaidLimitPerson } = useRaidSelect()
  const [sixteen, setSixteen] = useState(false)
  const [eight, setEight] = useState(false)

  const raidLimitPersonHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(event.target.value, 10)
    setRaidLimitPerson(num)
  }

  useEffect(() => {
    if (raidSelect === '베히모스 노말') {
      setRaidLimitPerson(16)
      setSixteen(false)
      setEight(false)
    } else if (
      raidSelect === '상아탑 하드' ||
      raidSelect === '상아탑 노말' ||
      raidSelect === '카양겔 하드' ||
      raidSelect === '카양겔 노말' ||
      raidSelect === '쿠크세이튼 노말'
    ) {
      setRaidLimitPerson(4)
      setSixteen(true)
      setEight(true)
    } else {
      setRaidLimitPerson(8)
      setEight(false)
      setSixteen(true)
    }
  }, [raidSelect, setRaidLimitPerson])

  return (
    <div className='w-full'>
      <label className='text-lg'>• 최대인원 선택</label>
      <select
        name='raidSelect'
        aria-label='레이드 인원 선택'
        className='mt-1 h-12 w-full rounded-md border px-1 text-lg'
        value={raidLimitPerson}
        onChange={raidLimitPersonHandler}
      >
        <option className='text-base' value={16} disabled={sixteen}>
          16인
        </option>
        <option className='text-base' value={8} disabled={eight}>
          8인
        </option>
        <option className='text-base' value={4}>
          4인
        </option>
      </select>
    </div>
  )
}
