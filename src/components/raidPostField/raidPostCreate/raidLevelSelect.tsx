'use client'

import RaidLevel from '@/components/utils/raidLevel'
import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import React, { useEffect, useState } from 'react'

export default function RaidLevelSelect() {
  const { raidSelect, setRaidLevel, raidLevel, setRaidLimitLevel } = useRaidSelect()
  const [characterLevel, setCharacterLevel] = useState(10000.0)
  const [raidOptions, setRaidOptions] = useState([
    { value: '노말', level: 0 },
    { value: '하드', level: 0 },
  ])

  const { characterInfo } = useCharacterInfoList()

  useEffect(() => {
    if (raidSelect) {
      const raidLimitLevel = RaidLevel(raidSelect)

      // 업데이트된 레벨로 raidOptions 상태를 설정
      setRaidOptions([
        { value: '노말', level: raidLimitLevel.노말 },
        { value: '하드', level: raidLimitLevel.하드 },
      ])

      setRaidLimitLevel(raidOptions[0].level)
    }

    if (characterInfo.length > 0) {
      const level = parseFloat(characterInfo[0].character_level.replace(/,/g, ''))
      setCharacterLevel(level)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterInfo, raidSelect])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidLevel(event.target.value)
    if (raidLevel === '노말') {
      setRaidLimitLevel(raidOptions[0].level)
    } else {
      setRaidLimitLevel(raidOptions[1].level)
    }
  }

  return (
    <div className='flex h-20 flex-col'>
      <label className='text-lg font-semibold'>• 레이드 난이도 선택</label>

      <div className='grid h-12 w-full grid-cols-2 gap-4'>
        {raidOptions.map((option, key) => (
          <div
            key={`raidLevelChoose-${option.value}`}
            className='flex items-center justify-center gap-2'
          >
            <input
              type='radio'
              name='raidLevelChoose'
              key={`${option.value}-${key}`}
              className='text-base'
              value={option.value}
              checked={raidLevel === option.value}
              disabled={characterLevel < option.level}
              onChange={handleChange}
            />
            <label htmlFor={option.value}>{option.value}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
