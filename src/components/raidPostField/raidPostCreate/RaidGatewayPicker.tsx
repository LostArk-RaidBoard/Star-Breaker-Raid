'use client'
import { useRaidSelect } from '@/store/raidSelectStore'
import React from 'react'

export default function RaidGatewayPicker() {
  const { raidGateway, setRaidGateway, raidSelect } = useRaidSelect()
  const raidOptions = [
    {
      value: '1~2관문',
      options: [
        '발탄',
        '비아키스',
        '서막 에키드나',
        '베히모스',
        '1막 에기르',
        '2막 아브렐슈드',
        '상아탑',
        '카양겔',
        '일리아칸',
        '쿠크세이튼',
        '카멘',
        '아브렐슈드',
        '3막 모르둠',
      ],
    },
    {
      value: '1~3관문',
      options: ['상아탑', '카양겔', '일리아칸', '쿠크세이튼', '카멘', '아브렐슈드', '3막 모르둠'],
    },
    { value: '1~4관문', options: ['카멘', '아브렐슈드'] },
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidGateway(event.target.value)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-3 text-base font-semibold text-gray-900'>레이드 관문 선택</h2>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {raidOptions.map((option) => {
          const isDisabled = !option.options.includes(raidSelect)

          return (
            <label
              key={`raidGatewaySelect-${option.value}`}
              htmlFor={option.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm font-medium transition-all duration-300 ${
                raidGateway === option.value
                  ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                  : isDisabled
                    ? 'cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500 opacity-50'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <input
                type='radio'
                id={option.value}
                name='raidGatewaySelect'
                value={option.value}
                checked={raidGateway === option.value}
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
