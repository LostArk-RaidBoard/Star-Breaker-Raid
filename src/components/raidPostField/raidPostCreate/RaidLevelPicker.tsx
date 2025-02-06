'use client'

import GetRaidLevel from '@/components/utils/GetRaidLevel'
import { useCharacterInfoList } from '@/store/characterStore'
import { useRaidSelect } from '@/store/raidSelectStore'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RaidLevelPicker() {
  const { raidSelect, setRaidLevel, raidLevel, setRaidLimitLevel } = useRaidSelect()
  const [characterLevel, setCharacterLevel] = useState(10000.0)
  const [raidOptions, setRaidOptions] = useState([
    { value: '노말', level: 0 },
    { value: '하드', level: 0 },
  ])

  const pathname = usePathname()
  const { characterInfo } = useCharacterInfoList()

  const sigleRiadIn = [
    '발탄',
    '비아키스',
    '쿠크세이튼',
    '아브렐슈드',
    '카양겔',
    '일리아칸',
    '상아탑',
    '카멘',
    '서막 에키드나',
  ]

  useEffect(() => {
    if (raidSelect) {
      const raidLimitLevel = GetRaidLevel(raidSelect)

      // 업데이트된 레벨로 raidOptions 상태를 설정
      setRaidOptions([
        { value: '싱글', level: raidLimitLevel.노말 },
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
    <div className='p-4'>
      <h2 className='mb-3 text-base font-semibold text-gray-900'>레이드 난이도 선택</h2>

      <div className={`grid gap-4 ${pathname === '/schedule' ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {raidOptions.map((option, key) => {
          const isDisabled =
            characterLevel < option.level ||
            (pathname === '/schedule' && !sigleRiadIn.includes(raidSelect) && key === 0)

          return (
            <label
              key={`raidLevelChoose-${option.value}`}
              htmlFor={option.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm font-medium transition-all duration-300 ${
                raidLevel === option.value
                  ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                  : isDisabled
                    ? 'cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500 opacity-50'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              } ${pathname === '/raidpost/create' && key === 0 ? 'hidden' : ''}`}
            >
              <input
                type='radio'
                id={option.value}
                name='raidLevelChoose'
                value={option.value}
                checked={raidLevel === option.value}
                disabled={isDisabled}
                onChange={handleChange}
                className='hidden'
              />
              {option.value}
            </label>
          )
        })}
      </div>
    </div>
  )
}
