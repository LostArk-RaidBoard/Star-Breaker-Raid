'use client'
import { useRaidSelect } from '@/store/raidSelectStore'
import React, { useEffect, useState } from 'react'

export default function RaidGatewayPicker() {
  const { raidGateway, setRaidGateway, raidSelect, raidLevel } = useRaidSelect()
  const [raidLevelSelect, setRaidLevelSelect] = useState('3막 모르둠')
  const raidOptions = [
    {
      value: '1~2관문',
      options: [
        '발탄',
        '발탄 싱글',
        '발탄 노말',
        '발탄 하드',

        '비아키스',
        '비아키스 싱글',
        '비아키스 노말',
        '비아키스 하드',

        '쿠크세이튼',
        '쿠크세이튼 싱글',
        '쿠크세이튼 노말',
        '쿠크세이튼 하드',

        '아브렐슈드',
        '아브렐슈드 싱글',
        '아브렐슈드 노말',
        '아브렐슈드 하드',

        '카양겔',
        '카양겔 싱글',
        '카양겔 노말',
        '카양겔 하드',

        '일리아칸',
        '일리아칸 싱글',
        '일리아칸 노말',
        '일리아칸 하드',

        '상아탑',
        '상아탑 싱글',
        '상아탑 노말',
        '상아탑 하드',

        '카멘',
        '카멘 싱글',
        '카멘 노말',
        '카멘 하드',

        '서막 에키드나',
        '서막 에키드나 싱글',
        '서막 에키드나 노말',
        '서막 에키드나 하드',

        '베히모스',
        '베히모스 노말',

        '1막 에기르',
        '1막 에기르 노말',
        '1막 에기르 하드',

        '2막 아브렐슈드',
        '2막 아브렐슈드 노말',
        '2막 아브렐슈드 하드',

        '3막 모르둠',
        '3막 모르둠 노말',
        '3막 모르둠 하드',
      ],
    },
    {
      value: '1~3관문',
      options: [
        '쿠크세이튼',
        '쿠크세이튼 싱글',
        '쿠크세이튼 노말',
        '쿠크세이튼 하드',

        '아브렐슈드',
        '아브렐슈드 싱글',
        '아브렐슈드 노말',
        '아브렐슈드 하드',

        '카양겔',
        '카양겔 싱글',
        '카양겔 노말',
        '카양겔 하드',

        '일리아칸',
        '일리아칸 싱글',
        '일리아칸 노말',
        '일리아칸 하드',

        '상아탑',
        '상아탑 싱글',
        '상아탑 노말',
        '상아탑 하드',

        '카멘',
        '카멘 싱글',
        '카멘 노말',
        '카멘 하드',

        '3막 모르둠',
        '3막 모르둠 노말',
        '3막 모르둠 하드',
      ],
    },
    {
      value: '1~4관문',
      options: [
        '아브렐슈드',
        '아브렐슈드 싱글',
        '아브렐슈드 노말',
        '아브렐슈드 하드',

        '카멘',
        '카멘 하드',
      ],
    },
    {
      value: '1관문',
      options: [
        '발탄',
        '발탄 싱글',
        '발탄 노말',
        '발탄 하드',

        '비아키스',
        '비아키스 싱글',
        '비아키스 노말',
        '비아키스 하드',

        '쿠크세이튼',
        '쿠크세이튼 싱글',
        '쿠크세이튼 노말',
        '쿠크세이튼 하드',

        '아브렐슈드',
        '아브렐슈드 싱글',
        '아브렐슈드 노말',
        '아브렐슈드 하드',

        '카양겔',
        '카양겔 싱글',
        '카양겔 노말',
        '카양겔 하드',

        '일리아칸',
        '일리아칸 싱글',
        '일리아칸 노말',
        '일리아칸 하드',

        '상아탑',
        '상아탑 싱글',
        '상아탑 노말',
        '상아탑 하드',

        '카멘',
        '카멘 싱글',
        '카멘 노말',
        '카멘 하드',

        '서막 에키드나',
        '서막 에키드나 싱글',
        '서막 에키드나 노말',
        '서막 에키드나 하드',

        '베히모스',
        '베히모스 노말',

        '1막 에기르',
        '1막 에기르 노말',
        '1막 에기르 하드',

        '2막 아브렐슈드',
        '2막 아브렐슈드 노말',
        '2막 아브렐슈드 하드',

        '3막 모르둠',
        '3막 모르둠 노말',
        '3막 모르둠 하드',

        '강습 나르하쉬 노말',
        '강습 나르하쉬 하드',
        '강습 타르칼 노말',
        '강습 타르칼 하드',
      ],
    },
    {
      value: '2관문',
      options: [
        '발탄',
        '발탄 싱글',
        '발탄 노말',
        '발탄 하드',

        '비아키스',
        '비아키스 싱글',
        '비아키스 노말',
        '비아키스 하드',

        '쿠크세이튼',
        '쿠크세이튼 싱글',
        '쿠크세이튼 노말',
        '쿠크세이튼 하드',

        '아브렐슈드',
        '아브렐슈드 싱글',
        '아브렐슈드 노말',
        '아브렐슈드 하드',

        '카양겔',
        '카양겔 싱글',
        '카양겔 노말',
        '카양겔 하드',

        '일리아칸',
        '일리아칸 싱글',
        '일리아칸 노말',
        '일리아칸 하드',

        '상아탑',
        '상아탑 싱글',
        '상아탑 노말',
        '상아탑 하드',

        '카멘',
        '카멘 싱글',
        '카멘 노말',
        '카멘 하드',

        '서막 에키드나',
        '서막 에키드나 싱글',
        '서막 에키드나 노말',
        '서막 에키드나 하드',

        '베히모스',
        '베히모스 노말',

        '1막 에기르',
        '1막 에기르 싱글',
        '1막 에기르 노말',
        '1막 에기르 하드',

        '2막 아브렐슈드',
        '2막 아브렐슈드 싱글',
        '2막 아브렐슈드 노말',
        '2막 아브렐슈드 하드',

        '3막 모르둠',
        '3막 모르둠 싱글',
        '3막 모르둠 노말',
        '3막 모르둠 하드',
      ],
    },
    {
      value: '3관문',
      options: [
        '쿠크세이튼',
        '쿠크세이튼 싱글',
        '쿠크세이튼 노말',
        '쿠크세이튼 하드',

        '아브렐슈드',
        '아브렐슈드 싱글',
        '아브렐슈드 노말',
        '아브렐슈드 하드',

        '카양겔',
        '카양겔 싱글',
        '카양겔 노말',
        '카양겔 하드',

        '일리아칸',
        '일리아칸 싱글',
        '일리아칸 노말',
        '일리아칸 하드',

        '상아탑',
        '상아탑 싱글',
        '상아탑 노말',
        '상아탑 하드',

        '카멘',
        '카멘 싱글',
        '카멘 노말',
        '카멘 하드',

        '3막 모르둠',
        '3막 모르둠 싱글',
        '3막 모르둠 노말',
        '3막 모르둠 하드',
      ],
    },
    {
      value: '4관문',
      options: [
        '아브렐슈드',
        '아브렐슈드 싱글',
        '아브렐슈드 노말',
        '아브렐슈드 하드',

        '카멘',
        '카멘 하드',
      ],
    },
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRaidGateway(event.target.value)
  }

  useEffect(() => {
    setRaidLevelSelect(raidSelect + ' ' + raidLevel)
    setRaidGateway('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raidLevel, raidSelect])

  return (
    <div className='p-4'>
      <h2 className='mb-1 text-base font-semibold text-gray-900'>레이드 관문 선택</h2>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {raidOptions.map((option) => {
          const isDisabled = !option.options.includes(raidLevelSelect)

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
