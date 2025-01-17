import AddScheduleButton from '@/components/button/addScheduleButton'
import DeleteScheduleButton from '@/components/button/deleteScheduleButton'
import ScheduleGoldCheckBox from '@/components/button/sheduleGoldCheckBox'
import Image from 'next/image'
import { toZonedTime } from 'date-fns-tz'
import React from 'react'
import GoldImage from '@image/asset/골드.png'

interface Schedule {
  user_id: string
  schedule_time: string
  raid_gold: number
  character_name: string
  raid_name: string
  gold_check: boolean
}

interface CharacterName {
  character_name: string
  character_level: string
  server_name: string
}

interface Props {
  weekSchedule: Schedule[]
  characterName: CharacterName[]
  userId: string
}

// 이번 주 수요일 오전 6시를 KST로 가져오는 함수 (화요일이면 전주 수요일로 계산)
function getThisWeekWednesday6AM() {
  const now = new Date()
  const dayOfWeek = now.getDay()

  // 수요일(3) 이후라면 이번 주 수요일, 그 전이라면 전주의 수요일로 설정
  const diffToWednesday = dayOfWeek >= 3 ? 3 - dayOfWeek : 3 - dayOfWeek - 7

  const thisWednesday = new Date(now)
  thisWednesday.setDate(now.getDate() + diffToWednesday)
  thisWednesday.setHours(0, 0, 0, 0) // 오전 6시로 설정

  return thisWednesday
}

export default function ScheduleWeek({ weekSchedule, userId, characterName }: Props) {
  const startWednesday = getThisWeekWednesday6AM()
  // 요일별로 데이터를 분류
  const daysArray = Array.from({ length: 7 }, () => [] as Schedule[])
  let sumGold = 0

  weekSchedule.forEach((post) => {
    // 골드 구하기
    if (post.gold_check) {
      sumGold += post.raid_gold
    }

    // 요일 구분하기
    // 요일 구분하기
    const raidTime = new Date(post.schedule_time) // 원본 시간
    const adjustedRaidTime = new Date(raidTime) // 복사본 생성
    adjustedRaidTime.setHours(adjustedRaidTime.getHours() + 9) // 9시간 추가

    const diff = (adjustedRaidTime.getTime() - startWednesday.getTime()) / (1000 * 60 * 60 * 24)
    if (diff >= 0.25 && diff < 7.25) {
      const diffDays = Math.floor(
        (adjustedRaidTime.getTime() - startWednesday.getTime()) / (1000 * 60 * 60 * 24),
      )
      if (diffDays >= 0 && diffDays < 8) {
        daysArray[diffDays].push(post)
      }
    }
  })

  return (
    <div className='rounded-md border border-gray-400 p-4 shadow-lg'>
      <span className='text-lg font-semibold'>• 이번 주 간략한 정보</span>
      <div className='mt-4 sm:ml-4'>
        {characterName.map((item, key) => {
          // weekSchedule에서 character_name이 동일한 항목 필터링
          const relatedRaids = weekSchedule.filter(
            (post) => post.character_name === item.character_name,
          )

          return (
            <div key={key} className='mb-2 flex flex-row flex-col items-start gap-2 sm:flex-row'>
              <div className='flex items-center'>
                <span className='w-32 font-semibold'>{item.character_name}</span>
                <span>{item.character_level}</span>
              </div>
              <div className='flex gap-2 font-semibold text-gray-500 sm:ml-2 sm:gap-4'>
                {/* 관련된 raid_name을 콤마로 구분하여 출력 */}
                {relatedRaids.map((post, key) => (
                  <span key={`${item.character_name}-${key}`}>{post.raid_name}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className='mt-4 flex w-full flex-col justify-between sm:flex-row'>
        <span className='text-lg font-semibold'>• 이번 주 레이드 일정</span>
        <div className='flex items-center justify-between gap-4 sm:justify-center'>
          <div className='flex items-center gap-1'>
            <Image
              src={GoldImage}
              alt='골드 이미지'
              width={25}
              height={25}
              style={{ width: '25px', height: 'auto' }}
            />
            <span className='text-lg text-yellow-700'>{sumGold}</span>
          </div>
          <AddScheduleButton userId={userId} />
        </div>
      </div>

      {/* Table */}
      <div className='mt-2 overflow-x-auto rounded-md'>
        <div className='table w-full min-w-[1190px] border-collapse'>
          {/* Table Header */}
          <div className='table-row bg-gray-300'>
            {['수요일', '목요일', '금요일', '토요일', '일요일', '월요일', '화요일'].map(
              (day, index) => (
                <div
                  key={day}
                  className={`table-cell w-[170px] p-2 text-center font-bold ${
                    index === 3 || index === 4 ? 'text-red-700' : ''
                  }`}
                >
                  {day}
                </div>
              ),
            )}
          </div>

          {/* Table Rows */}
          <div className='table-row border-b border-gray-300'>
            {daysArray.map((dayItems, dayIndex) => (
              <div
                key={`day-cell-${dayIndex}`}
                className={`table-cell p-2 align-top ${dayIndex === 6 ? '' : 'border-r border-gray-300'} `}
              >
                {dayItems?.map((item) => {
                  const timeZone = 'Asia/Seoul'
                  let bgColorClass = 'bg-gray-300'
                  const raidTime = toZonedTime(item.schedule_time, timeZone)

                  const raidDate = new Date(
                    raidTime.getFullYear(),
                    raidTime.getMonth(),
                    raidTime.getDate(),
                  )
                  const today = toZonedTime(new Date(), timeZone)

                  if (raidDate.getDate() === today.getDate()) {
                    bgColorClass = 'bg-green-300'
                  } else if (raidDate.getDate() > today.getDate()) {
                    bgColorClass = 'bg-red-300'
                  }

                  return (
                    <div
                      key={`${item.schedule_time}-${dayIndex}-${item.raid_name}`}
                      className={`mb-2 flex flex-col overflow-hidden truncate whitespace-nowrap border-b-2 border-dashed border-gray-700 p-1`}
                    >
                      <span className={`${bgColorClass} rounded-md p-1 font-semibold`}>
                        {item.raid_name}
                      </span>
                      <div className='flex items-center justify-between'>
                        <span className='font-semibold'>{item.character_name}</span>

                        <DeleteScheduleButton
                          characterName={item.character_name}
                          raidName={item.raid_name}
                          userId={item.user_id}
                        />
                      </div>
                      <span>{raidTime.getHours() + '시 ' + raidTime.getMinutes() + '분'}</span>
                      <ScheduleGoldCheckBox
                        goldCheck={item.gold_check}
                        characterName={item.character_name}
                        raidName={item.raid_name}
                        userId={item.user_id}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className='mt-2 text-sm'>
        * 이번 주 레이드 일정은 레이드 카운트와 골드 계산의 기준이 됩니다. 골드 체크가 완료되어야만
        골드가 합산되며, 메인 페이지에서 레이드 횟수로 추가됩니다.
      </p>
    </div>
  )
}
