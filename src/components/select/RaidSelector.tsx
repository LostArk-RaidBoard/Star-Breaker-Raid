'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import React, { useEffect, useMemo, useState } from 'react'

export default function RaidSelector() {
  const { raidSelect, setRaidSelect } = useRaidSelect()
  const [characterLevel, setCharacterLevel] = useState(10000.0)
  const { characterInfo } = useCharacterInfoList()

  // Memoized raid options
  const raidOptions = useMemo(
    () => [
      { value: '강습 타르칼', level: 1680 },
      { value: '3막 모르둠', level: 1680 },
      { value: '2막 아브렐슈드', level: 1670 },
      { value: '강습 나르하쉬', level: 1660 },
      { value: '1막 에기르', level: 1660 },
      { value: '베히모스', level: 1640 },
      { value: '서막 에키드나', level: 1620 },
      { value: '카멘', level: 1610 },
      { value: '상아탑', level: 1600 },
      { value: '일리아칸', level: 1580 },
      { value: '카양겔', level: 1540 },
      { value: '아브렐슈드', level: 1490 },
      { value: '쿠크세이튼', level: 1475 },
      { value: '비아키스', level: 1430 },
      { value: '발탄', level: 1415 },
      ...(characterLevel < 1415 ? [{ value: '레이드 없음', level: 0 }] : []),
    ],
    [characterLevel],
  )

  useEffect(() => {
    if (characterInfo.length > 0) {
      const level = parseFloat(characterInfo[0].character_level.replace(/,/g, ''))
      setCharacterLevel(level)

      // 캐릭터 레벨에 맞는 첫 번째 레이드 옵션 선택
      const firstAvailableRaid = raidOptions.find((option) => level >= option.level)
      if (firstAvailableRaid) {
        setRaidSelect(firstAvailableRaid.value)
      } else {
        const zeroOption = { value: '레이드가 없습니다.', levle: '0' }
        setRaidSelect(zeroOption.value)
      }
    }
  }, [characterInfo, raidOptions, setRaidSelect])

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRaidSelect(e.target.value)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-1 text-base font-semibold text-gray-900'>레이드 선택</h2>
      <select
        name='raidSelect'
        aria-label='레이드 선택 창'
        className='h-14 w-full rounded-md border border-gray-400 px-1 text-lg'
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
