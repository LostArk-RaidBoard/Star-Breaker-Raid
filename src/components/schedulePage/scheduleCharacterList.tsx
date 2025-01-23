'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Under from '@image/icon/under.svg'
import Up from '@image/icon/up.svg'
import GoldImage from '@image/asset/골드.png'

interface CharacterName {
  character_name: string
  character_level: string
  server_name: string
}

interface Schedule {
  user_id: string
  schedule_time: string
  raid_gold: number
  character_name: string
  raid_name: string
  gold_check: boolean
  raid_level: string
  raid_gateway: string
}

interface ScheduleCharacterListProps {
  characterList: CharacterName[]
  weekSchedule: Schedule[]
}

export default function ScheduleCharacterList({
  characterList,
  weekSchedule,
}: ScheduleCharacterListProps) {
  const [hidden, setHidden] = useState(true)

  const hiddenHandler = () => {
    setHidden(!hidden)
  }

  // 캐릭터별 데이터를 가공하여 준비
  const characterRaidData = characterList.map((character) => {
    // weekSchedule에서 character_name이 동일한 항목 필터링
    const relatedRaids = weekSchedule.filter(
      (schedule) => schedule.character_name === character.character_name,
    )

    // gold_check가 true인 raid_gold 합산
    const raidGoldSum = relatedRaids.reduce(
      (sum, raid) => (raid.gold_check ? sum + raid.raid_gold : sum),
      0,
    )

    // raid_name 리스트 생성
    const raidNames = relatedRaids.map((raid) => raid.raid_name + ' ' + raid.raid_level)

    return {
      character_name: character.character_name,
      character_level: character.character_level,
      raidGoldSum,
      raidNames,
    }
  })

  return (
    <div className='mt-4 flex flex-col'>
      <div className='flex items-center justify-between'>
        <span className='text-lg font-semibold'>• 캐릭별 주간 레이드</span>
        <button className='flex items-center justify-center gap-2' onClick={hiddenHandler}>
          <span className={`${hidden ? 'hidden' : ''} text-lg`}>접기</span>
          <span className={`${hidden ? '' : 'hidden'} text-lg`}>열기</span>
          <Under className={`${hidden ? '' : 'hidden'} h-4 w-4`} strokeWidth={4} />
          <Up className={`${hidden ? 'hidden' : ''} h-4 w-4`} strokeWidth={4} />
        </button>
      </div>
      {!hidden && (
        <div className='mt-4 overflow-x-auto rounded-md border border-gray-300 shadow-lg'>
          <table className='w-full min-w-[1190px] table-auto border-collapse'>
            {/* 테이블 헤더 */}
            <thead className='bg-gray-100'>
              <tr className='text-gray-700'>
                <th className='w-56 border border-gray-300 px-4 py-3 text-left text-sm font-bold'>
                  캐릭터 이름
                </th>
                <th className='w-40 border border-gray-300 px-4 py-3 text-left text-sm font-bold'>
                  캐릭터 레벨
                </th>
                <th className='w-40 border border-gray-300 px-4 py-3 text-left text-sm font-bold'>
                  획득 골드
                </th>
                <th className='border border-gray-300 px-4 py-3 text-left text-sm font-bold'>
                  레이드 이름
                </th>
              </tr>
            </thead>

            {/* 테이블 바디 */}
            <tbody>
              {characterRaidData.map((data, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } transition-colors`}
                >
                  {/* 캐릭터 이름 */}
                  <td className='border border-gray-300 px-4 py-3 text-sm text-gray-800'>
                    {data.character_name}
                  </td>

                  {/* 캐릭터 레벨 */}
                  <td className='border border-gray-300 px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <Image
                        src={'/장비.png'}
                        alt='장비'
                        width={24}
                        height={24}
                        className='rounded-md'
                      />
                      <span className='text-sm font-medium text-gray-800'>
                        {data.character_level}
                      </span>
                    </div>
                  </td>

                  {/* 획득 골드 */}
                  <td className='border border-gray-300 px-4 py-3'>
                    <div className='flex items-center gap-2 text-yellow-700'>
                      <Image
                        src={GoldImage}
                        alt='골드 이미지'
                        width={24}
                        height={24}
                        className='rounded-md'
                      />
                      <span className='text-sm font-medium'>{data.raidGoldSum}</span>
                    </div>
                  </td>

                  {/* 레이드 이름 */}
                  <td className='border border-gray-300 px-4 py-3 text-sm text-gray-700'>
                    {data.raidNames.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
