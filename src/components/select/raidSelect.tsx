'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import React, { useEffect, useState } from 'react'

export default function RaidSelect() {
  const { raidSelect, setRaidSelect } = useRaidSelect()
  const [characterLevel, setCharacterLevel] = useState(10000.0)
  const { characterInfo } = useCharacterInfoList()

  const raidOptions = [
    { value: '2막 아브렐슈드 하드', level: 1690 },
    { value: '2막 아브렐슈드 노말', level: 1670 },
    { value: '1막 에기르 하드', level: 1680 },
    { value: '1막 에기르 노말', level: 1660 },
    { value: '베히모스 노말', level: 1640 },
    { value: '서막 에키드나 하드', level: 1640 },
    { value: '서막 에키드나 노말', level: 1620 },
    { value: '카멘 하드 1~4관', level: 1630 },
    { value: '카멘 하드 4관', level: 1630 },
    { value: '카멘 하드 1~3관', level: 1630 },
    { value: '카멘 노말', level: 1610 },
    { value: '상아탑 하드', level: 1620 },
    { value: '상아탑 노말', level: 1600 },
    { value: '일리아칸 하드', level: 1600 },
    { value: '일리아칸 노말', level: 1580 },
    { value: '카양겔 하드', level: 1580 },
    { value: '카양겔 노말', level: 1540 },
    { value: '아브렐슈드 하드', level: 1540 },
    { value: '아브렐슈드 노말', level: 1490 },
    { value: '쿠크세이튼 노말', level: 1475 },
    { value: '비아키스 하드', level: 1460 },
    { value: '비아키스 노말', level: 1430 },
    { value: '발탄 하드', level: 1445 },
    { value: '발탄 노말', level: 1415 },
    { value: '레이드 없음', level: 0 },
  ]

  useEffect(() => {
    if (characterInfo.length > 0) {
      const level = parseFloat(characterInfo[0].character_level.replace(/,/g, ''))
      setCharacterLevel(level)
      // Find the first enabled option based on character level
      const firstAvailableRaid = raidOptions.find((option) => level >= option.level)
      if (firstAvailableRaid) {
        setRaidSelect(firstAvailableRaid.value)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterInfo])

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRaidSelect(e.target.value)
  }

  return (
    <div className='flex flex-col'>
      <label className='text-lg font-semibold'>• 레이드 선택</label>
      <select
        name='raidSelect'
        aria-label='레이드 선택 창'
        className='mt-1 h-14 w-full rounded-md border border-gray-400 px-1 text-lg'
        value={raidSelect}
        onChange={selectHandler}
      >
        {raidOptions.map((option) => (
          <option
            key={option.value}
            className='text-base'
            value={option.value}
            disabled={characterLevel < option.level}
          >
            {option.value}
          </option>
        ))}
      </select>
    </div>
  )
}
