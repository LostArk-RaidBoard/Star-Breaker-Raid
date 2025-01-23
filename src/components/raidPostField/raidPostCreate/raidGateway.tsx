'use client'
import { useRaidSelect } from '@/store/raidSelectStore'
import React from 'react'

export default function RaidGateway() {
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
        '3막 칠흑, 폭풍의 밤',
      ],
    },
    {
      value: '1~3관문',
      options: [
        '상아탑',
        '카양겔',
        '일리아칸',
        '쿠크세이튼',
        '카멘',
        '아브렐슈드',
        '3막 칠흑, 폭풍의 밤',
      ],
    },
    { value: '1~4관문', options: ['카멘', '아브렐슈드'] },
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidGateway(event.target.value)
  }

  return (
    <div className='flex h-20 flex-col'>
      <label className='text-lg font-semibold'>• 레이드 관문 선택</label>

      <div className='grid h-12 w-full grid-cols-3 gap-4'>
        {raidOptions.map((option, key) => (
          <div
            key={`raidGatewaySelect-${option.value}`}
            className='flex items-center justify-center gap-2'
          >
            <input
              type='radio'
              name='raidGatewaySelect'
              key={`${option.value}-${key}`}
              className='text-base'
              value={option.value}
              checked={raidGateway === option.value}
              disabled={!option.options.includes(raidSelect)}
              onChange={handleChange}
            />
            <label htmlFor={option.value}>{option.value}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
